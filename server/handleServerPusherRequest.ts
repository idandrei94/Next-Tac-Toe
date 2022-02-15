import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const handleServerPusherRequest = async (req: NextApiRequest, res: NextApiResponse) =>
{
    if (req.method === 'POST')
    {
        const { message, event, channel } = req.body;
        if (message)
        {
            var pusher = new Pusher({
                appId: process.env.APP_ID!,
                key: process.env.KEY!,
                secret: process.env.SECRET!,
                cluster: process.env.CLUSTER!,
            });
            await pusher.trigger(channel, event, message);
            return res.status(200).send({});
        } else
        {
            res.status(400).send({});
        }
    }
    else res.status(405).send({});
};

export default handleServerPusherRequest;