const {genSalt, hashSync} = require('bcryptjs');

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const hash = hashSync(password, 20);
        resolve(hash);
    });
}

module.exports = hashPassword;