import PostModel from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "fall create a new post",
        });
    };
};
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "fall create a new post",
        });
    };
};

export const getOne = async (req, res) => {
};

export const update = async (req, res) => {
};