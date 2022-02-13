import crypto from 'crypto';

const names = ['Xiovrois, The Adorable',
    'Miossiad, Lord Of The White',
    'Norut, The Grumpy',
    'Vaermait, Braveheart',
    'Ossur, The Barbarian',
    'Athu, The Fierce',
    'Netys, Eater Of Bunnies',
    'Eovaerri, The Redeemer',
    'Xandiores, Gentleheart',
    'Frurmionol, The Powerful',
    'Roivnor, The Chosen',
    'Ummeinth, The Powerful',
    'Saildriag, The Victorious',
    'Qaytanth, The Clumsy One',
    'Ursanth, The Mysterious',
    'Caegheo, The Black',
    'Oirrurth, The Dark',
    'Doivnassiorth, Champion Of Dragons',
    'Payseidaig, Champion Of Dragons',
    'Nullaerayth, Lord Of The Green',
    'Choiphu, The Kind',
    'Pullion, The Mysterious',
    'Teirvayg, The Insane',
    'Qazzu, Champion Of The White',
    'Vumryg, The Kind',
    'Vevnunth, The Life Giver',
    'Unnairth, The Magnificent',
    'Aenniontieth, The Evil One',
    'Pundroinan, The Strong Minded',
    'Otanais, The Scary'];

const colors = [
    'red',
    'blue',
    'green',
    'cyan',
    'white',
    'orange',
    'purple'
];

export const generateName = (exclusions: string[] = []) =>
{
    const filteredList = names.filter(n => !exclusions.find(e => e === n));
    return `${generatePassword(16)}${filteredList[Math.floor(Math.random() * filteredList.length - 1)]}`;
};

export const generateColor = (exclusions: string[] = []) =>
{
    const filteredList = colors.filter(n => !exclusions.find(e => e === n));
    return filteredList[Math.floor(Math.random() * filteredList.length - 1)];
};

export const generatePassword = (length: number = 16) =>
{
    return crypto.randomBytes(length / 2).toString('hex');
};

export const generateRoomId = (exclusions: string[] = []) =>
{
    let id = '';
    do
    {
        id = crypto.randomBytes(4).toString('hex');
    } while (exclusions.find(e => e === id));
    return id;
};