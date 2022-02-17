import { Message } from "@/models/message";
import pusher, { Channel } from "pusher-js";
import { roomActions } from "redux-conf/roomSlice";
import store from "redux-conf/store";
import RoomEvents from "common/roomEvents";
import { decryptMessage, encryptMessage } from "common/encryption";
import { boardActions } from "redux-conf/boardSlice";
import { confirmHandshake, joinRoom, leaveRoom, sendHandshake } from "./api";
import { generateName, generatePassword } from "utils/valueGenerators";

const bindEventHandlers = (channel: Channel, pusher: pusher) =>
{
    channel.bind('pusher:subscription_succeeded', () =>
    {
        const { player, roomCode, password } = store.getState().room;
        joinRoom(
            JSON.stringify({
                message: encryptMessage(player!, roomCode)
            }),
            roomCode
        );
        if (player && roomCode && password)
        {
            console.log(pusher.allChannels().map(c => c.name));
            const channels = pusher
                .allChannels()
                .filter(c => c.name !== roomCode)
                .map(c => c.name);
            for (let cn of channels)
            {
                console.log('unsubbing from ', cn);
                leaveRoom(encryptMessage(player, password), password);
                pusher.unsubscribe(cn);
            }
        }
    });
    channel.bind('pusher:subscription_error', (data: any) =>
    {
        console.log('sub error ', data);
    });
    channel.bind(RoomEvents.MESSAGE, (data: { message: string; }) =>
    {
        const { password } = store.getState().room;
        const dispatch = store.dispatch;
        const decryptedData = tryDecryptMessage(data, password);
        if (decryptedData)
        {
            const message: Message = JSON.parse(decryptedData);
            dispatch(roomActions.receiveMessage(message));
        }
    });
    channel.bind(RoomEvents.PLAYER_JOINED, (data: { message: string; }) =>
    {
        const dispatch = store.dispatch;
        const { roomCode, player, password } = store.getState().room;
        const decryptedData = tryDecryptMessage(data, roomCode);
        if (decryptedData)
        {
            // if I am not the one who joined, then I'm the host
            if (player !== decryptedData && !password)
            {
                const playerName = generateName();
                const pwd = generatePassword(64);
                dispatch(roomActions.acceptHandshake({ name: playerName, password: pwd }));
                sendHandshake(
                    JSON.stringify({
                        message: encryptMessage(JSON.stringify({
                            host: playerName,
                            name: generateName([playerName]),
                            password: pwd
                        }), roomCode)
                    }), roomCode);
            }
        }
    });
    channel.bind(RoomEvents.PLAYER_LEFT, (data: { message: string; }) =>
    {
        const { password, player } = store.getState().room;
        const dispatch = store.dispatch;
        const decryptedData = tryDecryptMessage(data, password);
        if (decryptedData)
        {
            if (decryptedData !== player)
            {
                dispatch(roomActions.receiveMessage({
                    sender: 'System',
                    message: `${decryptedData} has left the room.`
                }));
            }
            dispatch(roomActions.playerLeftRoom());
            dispatch(boardActions.reset(false));
        }
    });
    channel.bind(RoomEvents.HANDSHAKE, (data: { message: string; }) =>
    {
        const { roomCode, player } = store.getState().room;
        const dispatch = store.dispatch;
        const decryptedData = tryDecryptMessage(data, roomCode);
        if (decryptedData)
        {
            const { host, name, password } = JSON.parse(`${decryptedData}`);
            if (player !== host)
            {
                dispatch(roomActions.acceptHandshake({
                    name, password
                }));
                confirmHandshake(
                    JSON.stringify({
                        message: encryptMessage(
                            JSON.stringify({ name: name, host: host }),
                            password)
                    }),
                    roomCode);
            } else
            {
                console.log('Ignoring handshake');
            }
        }
    });
    channel.bind(RoomEvents.HANDHSAKE_CONFIRMED, (data: { message: string; }) =>
    {
        const { player, password } = store.getState().room;
        const dispatch = store.dispatch;
        const decryptedData = tryDecryptMessage(data, password);
        if (decryptedData)
        {
            const { host, name } = JSON.parse(decryptedData);
            dispatch(roomActions.goOnline);
            dispatch(boardActions.setCurrentToken(
                host === player ? 'X' : 'O')
            );
            dispatch(roomActions.receiveMessage({
                sender: 'System',
                message: host === player ?
                    `${name} has joined the room, say hi!` :
                    `Welcome to ${host}'s room`
            }));
        }
    });
    channel.bind(RoomEvents.CLEAR_BOARD, (data: { message: string; }) =>
    {
        const { password, player } = store.getState().room;
        const dispatch = store.dispatch;
        const decryptedData = tryDecryptMessage(data, password);
        if (decryptedData && player !== decryptedData)
        {
            dispatch(
                boardActions.reset(true)
            );
        }
        dispatch(roomActions.receiveMessage({
            sender: 'System',
            message: `${decryptedData} cleared the board!`
        }));
    });
    channel.bind(RoomEvents.BOARD_UPDATE, (data: { message: string; }) =>
    {
        const { password, player } = store.getState().room;
        const dispatch = store.dispatch;
        const decryptedData = tryDecryptMessage(data, password);
        if (decryptedData)
        {
            const { player: movingPlayer, index } = JSON.parse(decryptedData);
            if (player !== movingPlayer)
            {
                dispatch(boardActions.placeToken({
                    index: Number.parseInt(index),
                    withSwap: false
                }));
            }
        }
    });
};

const tryDecryptMessage = (message: { message: string; }, key: string): string | undefined =>
{
    const msg = decryptMessage(message.message, key);
    return msg;
};

export default bindEventHandlers;