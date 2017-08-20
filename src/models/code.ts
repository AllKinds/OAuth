import { Document, Schema, model } from 'mongoose';

interface ICode extends Document {
    value: string;
    redirectUri: string;
    userId: string;
    clientId: string;
}

const CodeSchema: Schema = new Schema({
    value: {
        type: String,
        required: true
    },
    redirectUri: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    }
});

export let Code = model<ICode>('Code', CodeSchema);