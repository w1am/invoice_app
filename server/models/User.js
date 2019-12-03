import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    companyName: String,
    address: String,
    phone: String,
    email: String,
    password: String,
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }]
});

export default model('User', UserSchema);