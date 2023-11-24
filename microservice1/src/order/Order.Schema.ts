import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Order extends Document{
    @Prop() userName:String
    @Prop() price:String
    @Prop() createDate:String
    @Prop() email:String
}
export const OrderSchema = SchemaFactory.createForClass(Order)