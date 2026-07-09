import { Flow, Session } from "@/engine/types";
import { nextStep } from "@/engine/FlowEngine";
import { dispatchAction } from "@/actions/ActionDispatcher";

export type ConversationMessage = {
  from: "user" | "bot";
  text: string;
};

export type ConversationResult = {
  session: Session;
  messages: ConversationMessage[];
};

export async function sendConversationMessage(
  flow: Flow,
  session: Session,
  input: string
): Promise<ConversationResult> {
  const result = nextStep(flow, session, input);

  const messages: ConversationMessage[] = [
    {
      from: "user",
      text: input,
    },
    {
      from: "bot",
      text: result.message,
    },
  ];

  if (result.pendingAction) {
    const actionMessage = await dispatchAction(
      result.pendingAction,
      result.answers
    );

    messages.push({
      from: "bot",
      text: actionMessage,
    });
  }

  return {
    session: result,
    messages,
  };
}
