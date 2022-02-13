// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import RoomEvents from 'common/roomEvents';
import type { NextApiRequest, NextApiResponse } from 'next';
import handleServerPusherRequest from 'server/handleServerPusherRequest';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
)
{
    return await handleServerPusherRequest(req, res, RoomEvents.MESSAGE);
}
