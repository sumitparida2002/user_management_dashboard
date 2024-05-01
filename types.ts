import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  conversations: IConversation[];
  sentMessages: IMessage[];
  receivedMessages: IMessage[];
}

export interface IConversation {
  id: string;
  messages: IMessage[];
  users: IUser[];
}

export interface IMessage {
  id: string;
  text: string;
  image?: string;
  createdAt: Date;
  senderId: string;
  receiverId: string;
}

export interface ISetLayout {
  setLayout: (layout: boolean) => void;
}
