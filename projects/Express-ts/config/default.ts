import customEnvVariables from './custom-environment-variables';

export default {
    env: customEnvVariables.env,
    app: {
        start: `Server is running on {0}`
    },
    server: {
        port: 3000,
        host: `localhost`,
        protocol: `http`,
        url: '{protocol}://{host}:{port}',
    },
    auth: {
        jwtSecret: customEnvVariables.auth.jwtSecret,
        expiresIn: '1h',
        otp_expiration: 1000 * 60 * 10,
    },
    email: {
        service: 'gmail.com',
        port: 465,
        secure: false,
        emailUser: customEnvVariables.email.emailUser,
        emailPass: customEnvVariables.email.emailPass,
    },
};
