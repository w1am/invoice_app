import { Schema, model } from 'mongoose';

const ClientSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    fax: {
        type: String,
        required: false
    },
    address: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Client', ClientSchema);