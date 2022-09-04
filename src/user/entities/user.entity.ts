import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;
  @Prop()
  bio: string;
  @Prop()
  phone: number;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  googleID: string;
  @Prop()
  facebookID: string;
  @Prop()
  githubID: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
