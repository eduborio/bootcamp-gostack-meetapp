import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    res.send("Eduardo Borio: 25k mensais de reais at 2020 jun!!!!");
});

export default routes;