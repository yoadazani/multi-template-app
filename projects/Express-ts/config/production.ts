export default {
    env: 'production',
    server: {
        port: 8080,
        protocol: 'https',
    },
    auth: {
        expiresIn: '1d',
    },
    email: {
        port: 578,
        secure: true,
    }
};
