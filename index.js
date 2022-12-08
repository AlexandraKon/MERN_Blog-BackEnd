import express from 'express';
import mongoose from 'mongoose';

import { registerValidator, loginValidator, postCreateValidator} from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/userController.js';
import * as PostController from './controllers/postController.js';

/**Connect MongoDB*/
mongoose.connect(
    'mongodb+srv://admin:a@cluster0.fiu3xod.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('Error connecting to DB: ' + err.message));

/** Create app express*/ 
const app = express();

/** Read json requests */
app.use(express.json());

/** Post request - registration*/
app.post('/auth/register', registerValidator, UserController.register);
/** Post request - login*/
app.post('/auth/login', loginValidator, UserController.login);
/** Get request - account me with check authorization*/
app.get('/auth/me', checkAuth, UserController.getMe);

/** Get request - */
app.get('/posts', PostController.getAll);
/** Get request - */
app.get('/posts', checkAuth, postCreateValidator, PostController.create);
/** Get request - */
//app.get('/posts/:id', PostController.getOne);
/** Get request - */
//app.delete('/posts', PostController.remove);
/** Get request - */
//app.patch('/posts', PostController.update);

/** Run web-server in localhost:4444*/
app.listen(4444, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('Server ok!');
});