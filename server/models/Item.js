import { Schema, model } from 'mongoose';

const ItemSchema = new Schema({
    Description: String,
    UnitCost: Number,
    Quantity: Number,
    Amount: Number,
    AdditionalDetails: {
        type: String,
        required: false,
        default: ''
    },
    favourite: Boolean
});

export default model('Item', ItemSchema);