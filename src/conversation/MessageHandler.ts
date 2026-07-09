import { dispatchAction } from "@/actions/ActionDispatcher";
import { startConversation, nextStep } from "@/engine/FlowEngine";
import { Flow, Session } from "@/engine/types";

const sessions = new Map<string, Session>();

function getSessionKey(flow: Flow, userId: string): string {
  return `${flow.id}:${userId}`;
}

export async function handleMessage(
  flow: Flow,
  userId: string,
  text: string
): Promise<string> {
  const cleanText = text.trim();
  const sessionKey = getSessionKey(flow, userId);

  let session = sessions.get(sessionKey);

  if (!session) {
    session = startConversation(flow);
    sessions.set(sessionKey, session);

    if (cleanText === "") {
      return session.message;
    }
  }

  let updatedSession = nextStep(flow, session, cleanText);

  if (updatedSession.pendingAction) {
    const actionMessage = await dispatchAction(
      updatedSession.pendingAction,
      updatedSession.answers
    );

    updatedSession = {
      ...updatedSession,
      message: `${actionMessage}\n\n${updatedSession.message}`,
      pendingAction: undefined,
    };
  }

  sessions.set(sessionKey, updatedSession);

  return updatedSession.message;
}

export function resetSession(flow: Flow, userId: string): void {
  sessions.delete(getSessionKey(flow, userId));
}

export function getSession(flow: Flow, userId: string): Session | undefined {
  return sessions.get(getSessionKey(flow, userId));
}