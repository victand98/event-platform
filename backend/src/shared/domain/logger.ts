interface MessageWithContext {
  message: string;
  context: Record<string, unknown>;
}

type SimpleMessage = string;

type Message = SimpleMessage | MessageWithContext;

interface Logger {
  info(message: Message): void;
  error(message: Message): void;
  warn(message: Message): void;
}

export { Logger, Message };
