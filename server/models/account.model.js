import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        accountNumber: {
            type: String
        },
        balance: {
            type: Number
        }
    },
    {timestamps: true}
);

const Account = mongoose.model("Account", accountSchema);

export default Account;