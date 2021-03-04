import { Router } from 'express';
const router = Router();

var request = require('request');

router.post('/', (req: any, res: any) => {
    const config = {
        ...req.body,
        clientId: process.env.CODE_CLIENT_ID,
        clientSecret: process.env.CODE_CLIENT_SECRET,
    };

    request(
        {
            url: process.env.CODE_URL,
            method: 'POST',
            json: config,
        },
        (err: any, _: any, body: any) => {
            res.send(body);
        }
    );
});
export default router;
