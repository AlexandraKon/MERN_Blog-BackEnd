import mongoose from 'mongoose';

/**Create mongoose Schema */
const userSchema = new mongoose.Schema(
    {
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', userSchema);