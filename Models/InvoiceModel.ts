import { Schema,model } from "mongoose";
import { Invoceinterface } from "../Interface/InvoiceInterface";

const InvoiceSchema= new Schema<Invoceinterface>({
    BusinessName:{type:String,required:true},
    BusinessAddress:{type:String,required:true},
    ServiceDescription:{type:String,required:true},
    Quantity:{type:Number,require:true},
    UnitPrice:{type:Number,required:true},
    Amount:{type:Number,required:true},
    ClientName:{type:String,required:true},
    Email:{type:String,required:true},
    Phone:{type:String,required:true},
    Date:{type:String,required:true},
    DueDate:{type:String,required:true}
})

export const InvoiceModel =  model<Invoceinterface>('Invoice',InvoiceSchema)