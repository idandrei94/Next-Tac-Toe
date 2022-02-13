import { Message } from "@/models/message";
import { Channel } from "pusher-js";
import { Dispatch } from "react";
import { roomActions } from "redux-conf/roomSlice";
import store from "redux-conf/store";
import RoomEvents from "common/roomEvents";
import { decryptMessage } from "common/encryption";

const bindEventHandlers = (dispatch: Dispatch<any>, channel: Channel) =>
{
    channel.bind(RoomEvents.MESSAGE, (data: string) =>
    {
        const decryptedData = tryDecryptMessage(data);
        console.log('received message ', decryptedData);
        if (decryptedData)
        {
            const message: Message = JSON.parse(decryptedData);
            console.log(message);
            dispatch(roomActions.receiveMessage(message));
        }
    });
    channel.bind(RoomEvents.PLAYER_JOINED, (data: string) =>
    {
        console.log('player joined ', data);
        const decryptedData = tryDecryptMessage(data);
        console.log('decr', decryptedData);
        if (decryptedData)
        {
            console.log('player joined ', decryptedData);
            dispatch(roomActions.receiveMessage({
                sender: 'System',
                message: `${decryptedData} has joined the room, say hi!`
            }));
        }
    });
    channel.bind(RoomEvents.PLAYER_LEFT, (data: string) =>
    {
        const decryptedData = tryDecryptMessage(data);
        if (decryptedData)
        {
            dispatch(roomActions.receiveMessage({
                sender: 'System',
                message: `${decryptedData} has left the room.`
            }));
        }
    });
};

const tryDecryptMessage = (message: string) =>
{
    const pwd = store.getState().room.password;
    return pwd ? decryptMessage(message, pwd) : undefined;
};

export default bindEventHandlers;