import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ required: true, type: Object })
  uid: string;

  @Prop({ required: true, type: String })
  token: string;

  @Prop({ required: true, type: String })
  date: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
