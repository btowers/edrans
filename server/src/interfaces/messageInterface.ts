import mongoose from 'mongoose';

export interface MessageI {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: string;
  message: string;
}

export interface newMessageI {
  userId: mongoose.Types.ObjectId;
  type: string;
  message: string;
}

export interface MessageBaseClass {
  getMessages(userId: string): Promise<MessageI[]>;
  createMessage(userId: string, message: any): Promise<MessageI>;
}
