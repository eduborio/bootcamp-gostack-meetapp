import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Eduardo Borio',
        email: 'eduborio1@gmail.com',
        password_hash: 'borio',
    });

    res.json(user);
});

export default routes;
