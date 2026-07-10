import { handleMessage } from "@/conversation/MessageHandler";
import { peluFlow } from "@/flows/pelu";

type WhatsAppTextMessage = {
  from?: string;
  type?: string;
  text?: {
    body?: string;
  };
};

type WhatsAppWebhookBody = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      field?: string;
      value?: {
        metadata?: {
          phone_number_id?: string;
        };
        messages?: WhatsAppTextMessage[];
        statuses?: unknown[];
      };
    }>;
  }>;
};

function getWebhookSummary(body: WhatsAppWebhookBody) {
  const entries = body.entry ?? [];
  const changes = entries.flatMap((entry) => entry.changes ?? []);
  const messages = changes.flatMap((change) => change.value?.messages ?? []);
  const statuses = changes.flatMap((change) => change.value?.statuses ?? []);

  return {
    object: body.object,
    entryCount: entries.length,
    changeCount: changes.length,
    fields: [...new Set(changes.map((change) => change.field).filter(Boolean))],
    hasMessages: messages.length > 0,
    hasStatuses: statuses.length > 0,
    messageTypes: [
      ...new Set(messages.map((message) => message.type).filter(Boolean)),
    ],
    metadataPhoneNumberId: changes.find(
      (change) => change.value?.metadata?.phone_number_id
    )?.value?.metadata?.phone_number_id,
  };
}

function getIgnoredReason(body: WhatsAppWebhookBody): string {
  const entries = body.entry ?? [];

  if (entries.length === 0) {
    return "no_entries";
  }

  const changes = entries.flatMap((entry) => entry.changes ?? []);

  if (changes.length === 0) {
    return "no_changes";
  }

  const statuses = changes.flatMap((change) => change.value?.statuses ?? []);
  const messages = changes.flatMap((change) => change.value?.messages ?? []);

  if (statuses.length > 0 && messages.length === 0) {
    return "statuses_event";
  }

  if (messages.length === 0) {
    return "no_messages";
  }

  const firstMessage = messages[0];

  if (firstMessage.type !== "text") {
    return "unsupported_message_type";
  }

  if (!firstMessage.from) {
    return "missing_sender";
  }

  if (!firstMessage.text?.body) {
    return "missing_text_body";
  }

  return "unrecognized_payload";
}

function maskPhoneNumber(phoneNumber: string): string {
  return phoneNumber.slice(-4).padStart(phoneNumber.length, "*");
}

function getTextMessage(body: WhatsAppWebhookBody): {
  phoneNumber: string;
  text: string;
} | null {
  const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (message?.type !== "text" || !message.from || !message.text?.body) {
    return null;
  }

  return {
    phoneNumber: message.from,
    text: message.text.body,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const verifyToken = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    verifyToken === process.env.WHATSAPP_VERIFY_TOKEN &&
    challenge
  ) {
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WhatsAppWebhookBody;
    console.log("WhatsApp webhook received", getWebhookSummary(body));

    const incomingMessage = getTextMessage(body);

    if (!incomingMessage) {
      console.log("WhatsApp webhook ignored", {
        reason: getIgnoredReason(body),
      });
      return Response.json({ ok: true, ignored: true });
    }

    const { phoneNumber, text } = incomingMessage;
    console.log("WhatsApp incoming message:", {
      from: maskPhoneNumber(phoneNumber),
      textLength: text.length,
    });

    const missingConfig = [
      "WHATSAPP_PHONE_NUMBER_ID",
      "WHATSAPP_ACCESS_TOKEN",
    ].filter((key) => !process.env[key]);

    if (missingConfig.length > 0) {
      console.error("Missing WhatsApp configuration:", missingConfig);
      return Response.json({ ok: true });
    }

    const responseText = await handleMessage(peluFlow, phoneNumber, text);
    console.log("WhatsApp generated response:", {
      to: maskPhoneNumber(phoneNumber),
      textLength: responseText.length,
    });

    await sendWhatsAppMessage(phoneNumber, responseText);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return Response.json({ ok: true });
  }
}

async function sendWhatsAppMessage(to: string, text: string): Promise<void> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    console.error("Missing WhatsApp configuration.");
    return;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: {
            body: text,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error sending WhatsApp message:", {
        status: response.status,
        body: errorText,
      });
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
}
