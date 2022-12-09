import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidator, loginValidator, postCreateValidator} from './validations/validations.js';

import {checkAuth, handleValidationError} from './utils/index.js';

import { UserController, PostController} from './controllers/index.js';

/**Connect MongoDB*/
mongoose.connect(
    'mongodb+srv://admin:a@cluster0.fiu3xod.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('Error connecting to DB: ' + err.message));

/** Create app express*/ 
const app = express();

/** Create storage for images by Multer */
const storage = multer.diskStorage({
    destination: (_, __, cb) => { //path to save images
        cb( null, 'uploads');
    },
    filename: (_, file, cb) => { //path to save images
        cb( null, file.originalname);
    },
});

const upload = multer({storage});

/** Read json requests */
app.use(express.json());
app.use(cors());
/**Get request - for get STATIC file! */
app.use('/uploads', express.static('uploads'));

/** Post request - registration*/
app.post('/auth/register', registerValidator, handleValidationError, UserController.register);
/** Post request - login*/
app.post('/auth/login', loginValidator, handleValidationError, UserController.login);
/** Get request - account me with check authorization*/
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

/** Get request - */
app.get('/posts', PostController.getAll);
/** Get request - */
app.get('/posts/:id', PostController.getOne);

/** Get request - */
app.post('/posts', checkAuth, postCreateValidator, handleValidationError, PostController.create);
/** Get request - */
app.delete('/posts/:id', checkAuth, PostController.remove);
/** Get request - */
app.patch('/posts/:id', checkAuth, postCreateValidator, handleValidationError, PostController.update);

/** Run web-server in localhost:4444*/
app.listen(4444, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('Server ok!');
});