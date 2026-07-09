"use client";

import { useState } from "react";
import { Flow, Session } from "@/engine/types";
import { startConversation } from "@/engine/FlowEngine";
import { handleMessage } from "@/conversation/MessageHandler";

type ChatMessage = {
  from: "bot" | "user";
  text: string;
};

type ReceptionProps = {
  flow: Flow;
};

export default function Reception({ flow }: ReceptionProps) {
  const initialSession: Session = startConversation(flow);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "bot",
      text: initialSession.message,
    },
  ]);

  async function sendMessage() {
    const cleanInput = input.trim();

    if (!cleanInput) {
      return;
    }

    setInput("");

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        from: "user",
        text: cleanInput,
      },
    ]);

    const botResponse = await handleMessage(flow, "web-demo-user", cleanInput);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        from: "bot",
        text: botResponse,
      },
    ]);
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Katniss Reception</h1>

      <div className="mb-4 flex h-[500px] flex-col gap-3 overflow-y-auto rounded-xl bg-gray-50 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.from === "bot"
                ? "self-start rounded-xl bg-gray-200 px-4 py-2"
                : "self-end rounded-xl bg-black px-4 py-2 text-white"
            }
          >
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {message.text}
            </pre>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Escribe una opción..."
        />

        <button
          className="rounded-xl bg-black px-4 py-2 text-white"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}