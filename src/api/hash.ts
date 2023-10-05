import bcrypt from 'bcryptjs';

export type hash = {
    hash: string
    salt: string
}

const toHash = async (password: string):Promise<hash | string> => {
    const saltRounds = 10;

    try {
        return await new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    console.log('Ошибка при генерации соли', err);
                    reject(err);
                    return;
                }

                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        console.log('Ошибка шифрования', err);
                        reject(err);
                    } else {
                        console.log('Хеш успешно создан');
                        resolve({ hash, salt });
                    }
                });
            });
        });
    // try {
    //     return await new Promise((resolve, reject) => {
    //         bcrypt.hash(password, saltRounds, (err, hash) => {
    //             if (err) {
    //                 // Обработка ошибки
    //                 console.log('Ошибка шифрования', err);
    //                 reject(err);
    //             } else {
    //                 // Отправить хеш на сервер
    //                 console.log('Хеш успешно создан');
    //                 resolve(hash);
    //             }
    //         });
    //     });
    } catch (e) {
        console.log(e);
        return 'error';
    }
};

export default toHash;
