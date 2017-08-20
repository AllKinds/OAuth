import { Document, Schema, model } from 'mongoose';

interface IToken extends Document {
    value: string;
    userId: string;
    clientId: string;
}

const TokenSchema: Schema = new Schema({
    value: {
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

export let Token = model<IToken>('Token', TokenSchema);