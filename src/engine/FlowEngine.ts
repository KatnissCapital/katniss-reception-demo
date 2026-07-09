import { Flow, Session, State } from "@/engine/types";

function buildMessage(state: State): string {
  const options = state.options ?? {};

  const optionLines = Object.entries(options).map(([key, option]) => {
    return `${key}. ${option.label}`;
  });

  if (optionLines.length === 0) {
    return state.question;
  }

  return `${state.question}\n\n${optionLines.join("\n")}`;
}

export function startConversation(flow: Flow): Session {
  const initialState = flow.states[flow.initialStep];

  return {
    step: flow.initialStep,
    message: buildMessage(initialState),
    answers: {},
  };
}

export function nextStep(
  flow: Flow,
  session: Session,
  input: string
): Session {
  const currentState = flow.states[session.step];

  if (!currentState) {
    const initialState = flow.states[flow.initialStep];

    return {
      step: flow.initialStep,
      message: buildMessage(initialState),
      answers: {},
    };
  }

  if (currentState.valueKey && currentState.next) {
    const nextState = flow.states[currentState.next];

    return {
      step: currentState.next,
      message: buildMessage(nextState),
      answers: {
        ...session.answers,
        [currentState.valueKey]: input,
      },
    };
  }

  const selectedOption = currentState.options?.[input];

  if (!selectedOption) {
    return {
      ...session,
      message: `No he entendido tu respuesta.\n\n${buildMessage(currentState)}`,
    };
  }

  const nextState = flow.states[selectedOption.next];

  return {
    step: selectedOption.next,
    message: buildMessage(nextState),
    answers: {
      ...session.answers,
      ...(selectedOption.value ?? {}),
    },
    pendingAction: selectedOption.action,
  };
}