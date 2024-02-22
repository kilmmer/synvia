export default () => ({
    database: {
        host: process.env.DATABASE_HOST.toString(),
        user: process.env.DATABASE_USERNAME.toString(),
        password: process.env.DATABASE_PASSWORD.toString(),
        database: process.env.DATABASE_NAME.toString(),
        port: parseInt(process.env.DATABASE_PORT),
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
});
