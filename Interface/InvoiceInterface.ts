import { Document } from "mongoose";

export interface Invoceinterface extends Document{
    BusinessName : string,
    BusinessAddress:string,
    ServiceDescription:string,
    Quantity:number,
    UnitPrice:number,
    Amount:number,
    ClientName:string,
    Email:string,
    Phone:string,
    Date:string
    DueDate:string,
    Paid:boolean,
    OverDue:boolean

}