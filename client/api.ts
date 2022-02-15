import axios from "axios";
import RoomEvents from "common/roomEvents";
import store from "redux-conf/store";

const API_URL = '/api/sendMessage';

export const joinRoom = async (name: string, channel: string) =>
    await sendAxiosRequest(API_URL, name, RoomEvents.PLAYER_JOINED, channel);
export const leaveRoom = async (name: string, channel: string) =>
    await sendAxiosRequest(API_URL, name, RoomEvents.PLAYER_LEFT, channel);
export const sendMessage = async (message: string, channel: string) =>
    await sendAxiosRequest(API_URL, message, RoomEvents.MESSAGE, channel);
export const sendHandshake = async (message: string, channel: string) =>
    await sendAxiosRequest(API_URL, message, RoomEvents.HANDSHAKE, channel);
export const confirmHandshake = async (name: string, channel: string) =>
    await sendAxiosRequest(API_URL, name, RoomEvents.HANDHSAKE_CONFIRMED, channel);
export const sendMove = async (data: string, channel: string) =>
    await sendAxiosRequest(API_URL, data, RoomEvents.BOARD_UPDATE, channel);
export const sendReset = async (data: string, channel: string) =>
    await sendAxiosRequest(API_URL, data, RoomEvents.CLEAR_BOARD, channel);

const sendAxiosRequest = async (url: string, data: string, event: string, channel: string) =>
{
    return await axios.post(url, { message: data, channel: channel, event });
};