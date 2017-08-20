import { Document, Schema, model } from 'mongoose';

interface IPerson extends Document{
    id: string;
    firstName: string;
    lastName: string;
    phone: Number;
    mail?: string;
}

export const PersonSchema: Schema = new Schema ({
    id: String,
    firstName: String,
    lastName: String,
    phone: Number,
    mail: String
});

// Export the Mongoose model
export let Person = model<IPerson>('Person', PersonSchema);