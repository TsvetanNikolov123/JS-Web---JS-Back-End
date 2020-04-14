const envConfig = {
    development: {
        // change dbConnectionStr with your path to DB !!!
        dbConnectionStr: 'mongodb://admin:pesho123@ds111425.mlab.com:11425/expressjs-course',
        jwtSecret: 'some-secret',
        port: 3000,
        rootPath: '../',
    },

    production: {
        dbConnectionStr: 'some-prod-string',
        jwtSecret: process.env.SECRET || 'some-secret',
        port: process.env.port || 3000,
        rootPath: '../',
    }
};

module.exports = envConfig;