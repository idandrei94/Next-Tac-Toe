import * as cryptojs from 'crypto-js';

const encryptMessage = (data: string, key: string): string =>
{
    // return data;
    const encrypted = cryptojs.AES.encrypt(
        JSON.stringify({ payload: data }), key).toString();
    return encrypted;
};

const decryptMessage = (data: string, key: string): string | undefined =>
{
    // return data;
    try
    {
        const decrypted = JSON.parse(
            cryptojs.AES.decrypt(data, key)
                .toString(cryptojs.enc.Utf8)).payload;
        return decrypted;
    } catch (error)
    {
        return undefined;
    }
};

export { encryptMessage, decryptMessage };