const fs = require('fs');
let storage = {};

module.exports = {
    put: (key, value) => {
        if (typeof key !== 'string') {
            throw new Error('The key should be string!');
        }

        if (storage.hasOwnProperty(key)) {
            throw new Error('The key already exists!');
        }

        storage[key] = value;
    },
    get: (key) => {
        if (typeof key !== 'string') {
            throw new Error('The key should be string!');
        }

        if (!storage.hasOwnProperty(key)) {
            throw new Error('The key doesnt exist!');
        } else {
            return storage[key];
        }
    },
    getAll: () => {
        if (Object.keys(storage).length === 0) {
            throw new Error('There is no records in storage!')
        }

        return storage;
    },
    update: (key, newValue) => {
        if (typeof key !== 'string') {
            throw new Error('The key should be string!');
        }

        if (!storage.hasOwnProperty(key)) {
            throw new Error('The key doesnt exist!');
        }

        storage[key] = newValue;
    },
    delete: (key) => {
        if (typeof key !== 'string') {
            throw new Error('The key should be string!');
        }

        if (!storage.hasOwnProperty(key)) {
            throw new Error('The key doesnt exist!');
        }

        delete storage[key];
    },
    clear: () => {
        storage = {};
    },
    save: () => {
        fs.writeFileSync('storage.json', JSON.stringify(storage), 'UTF-8');
    },
    load: () => {
        if (fs.existsSync('storage.json')) {
            let data = fs.readFileSync('storage.json');
            storage = JSON.parse(data);
        }
    }
};