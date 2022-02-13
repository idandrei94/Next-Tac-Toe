import axios from "axios";

export const joinRoom = async (name: string) => await sendAxiosRequest('/api/joinRoom', name);
export const leaveRoom = async (name: string) => await sendAxiosRequest('/api/leaveRoom', name);
export const sendMessage = async (name: string) => await sendAxiosRequest('/api/sendMessage', name);

const sendAxiosRequest = async (url: string, data: string) =>
{
    return await axios.post(url, { message: data });
};