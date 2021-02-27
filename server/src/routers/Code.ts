import { Router } from 'express';
const router = Router();

var request = require('request');

router.post('/', (req: any, res: any) => {
    //   res.send(req.body);
    const data = {
        ...req.body,
        clientId: 'ea736c0edffc53ecad54581e3a22e27b',
        clientSecret:
            '10f9b9f228599f46347319df937b48e11eeb11114a376f51234beda05c4e6cd6',
        // clientId: process.env.CLIENT_ID,
        // clientSecret: process.env.CLIENT_SECRET,
    };

    request(
        {
            url: 'https://api.jdoodle.com/v1/execute',
            method: 'POST',
            json: data,
        },
        function (error: any, response: any, body: any) {
            res.send(body);
        }
    );
});
export default router;
