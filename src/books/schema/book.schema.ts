import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({type: () => String})
  _id!: string;

  @Prop()
  title!: string;

  @Prop({required: false})
  isbn?: string;

  @Prop({nullable: true})
  coverExists?: boolean;

  @Prop({nullable: true})
  cover?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
