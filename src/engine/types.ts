export type Answers = Record<string, string>;

export type Action = {
  name: string;
};

export type Option = {
  label: string;
  next: string;
  value?: Answers;
  action?: Action;
};

export type State = {
  question: string;
  options?: Record<string, Option>;
  next?: string;
  valueKey?: string;
};

export type Flow = {
  id: string;
  initialStep: string;
  states: Record<string, State>;
};

export type Session = {
  step: string;
  message: string;
  answers: Answers;
  pendingAction?: Action;
};