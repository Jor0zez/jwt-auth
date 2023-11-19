import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  login: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  registerDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
