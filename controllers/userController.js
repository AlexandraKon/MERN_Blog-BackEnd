import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

/**
 * Controller user register
 * Request - info from user and response - info to user
 */
export const register = async (req, res) => {
    try {
        
        const password = req.body.password;
        const salt  = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        //create token
        const token = jwt.sign(
            {
            _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        //put off password hash
        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "fall registration",
        });
    }
};

/**Controller user login */
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        //compare password 
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass) {
            return res.status(400).json({
                message: 'Login or password is incorrect',
            });
        }

        //create token
        const token = jwt.sign(
            {
            _id: user._id,
            },
            'secret123',
            {
                expiresIn: '300d',
            },
        );

        //put off password hash
        const { passwordHash, ...userData } = user._doc;

        //return answer
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "fall login",
        });
    }
}

/**Controller user account (getMe) */
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Invalid login",
            });
        }

        //create token
        const token = jwt.sign(
            {
            _id: user._id,
            },
            'secret123',
            {
                expiresIn: '300d',
            },
        );

        //put off password hash
        const { passwordHash, ...userData } = user._doc;

        //return answer
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "No connection",
        });
    }
};