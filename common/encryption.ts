import * as cryptojs from 'crypto-js';

const encryptMessage = (data: string, password: string) => cryptojs.AES.encrypt(
    JSON.stringify({ payload: data }),
    password).toString();

const decryptMessage = (data: string, password: string) =>
    JSON.parse(
        cryptojs.AES.decrypt(data, password)
            .toString(cryptojs.enc.Utf8)).payload;

export { encryptMessage, decryptMessage };