import PostModel from '../models/Post.js';

/** Create a post */
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

/**Get All posts */
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "fall get all posts",
        });
    };
};

/** Get one post*/
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {viewsCount: 1},
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        msg: "Fall get this post",
                    });
                }

                if(!doc) {
                    return res.status(404).json({
                        message: 'Post does not found!'
                    })
                }
                res.json(doc);
            },
        );
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Fall get this post",
        });
    };
};

/** Delete one post by id*/
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        msg: "Fall remove this post",
                    });
                }

                if(!doc) {
                    return res.status(404).json({
                        message: 'Post does not found!'
                    })
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Fall delete this post",
        });
    };
};


export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        
        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            msg: "Fall update this post",
        });
    }
};