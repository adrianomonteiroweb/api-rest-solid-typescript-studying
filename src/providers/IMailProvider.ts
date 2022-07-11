interface IAddress {
  email: string;
  name: string;
}

export interface IMessage {
  to: string | object;
  from: string | object;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}
