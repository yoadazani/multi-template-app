import { hashPassword } from '../../services/auth';
import { UserType } from '../../types/UserType';

const userData = {
    id: '1',
    name: 'test',
    email: 'test@test.com',
    imageUrl: null,
    password: hashPassword('12345678'),
    resetPasswordOTP: 123456,
    resetPasswordExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
    password_updated_at: null,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
} as UserType;

const validSignupInfo = {
    name: 'test',
    email: 'test@test.com',
    password: '12345678',
};

const invalidSignupInfo = [
    {
        email: 'test@test.com',
        password: '12345678',
    },
    {
        name: 'test',
        password: '12345678',
    },
    {
        name: 'test',
        email: 'test@test.com',
    },
];

const validLoginInfo = {
    email: 'test@test.com',
    password: '12345678',
};

const invalidLoginInfo = [
    {
        name: 'test',
        email: 'test@test.com',
        password: '12345678',
    },
    {
        password: '12345678',
    },
    {
        email: 'test@test.com',
    },
];

const invalidTokens = [
    [
        '',
        '12345678',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkOWU4MTcwLWU1NDItNDI5OS04NWNlLWZiNTNhNGQ2NmVkNiIsImVtYWlsIjoieW9hZDIzQGdtYWlsLmNvbSIsImlhdCI6MTcxMDA5MzI4NCwiZXhwIjoxNzEwMDk2ODg0fQ.ESouPcSLrXPGWghmmcYcW9fOOADcWfayrGKEB1MBj5I',
    ],
];

const validEmails = ['test@test.com', 'test@test.net'];

const invalidEmails = ['test@test.co.il', 'test@test.outlook', 'test@test'];

const validConfirmEmailInfo = {
    email: 'test@test.com',
    OTP: 123456,
};

const invalidConfirmEmailInfo = {
    email: 'test@test.com',
    OTP: 123457,
};

const validResetPasswordInfo = {
    email: 'test@test.com',
    newPassword: '208389403',
    userOTP: 123456,
};

const invalidResetPasswordInfo = {
    email: 'test@test.co.il',
    newPassword: '208389403',
    userOTP: 123456,
};
export {
    userData,
    validSignupInfo,
    invalidSignupInfo,
    validLoginInfo,
    invalidLoginInfo,
    invalidTokens,
    validEmails,
    invalidEmails,
    validConfirmEmailInfo,
    invalidConfirmEmailInfo,
    validResetPasswordInfo,
    invalidResetPasswordInfo,
};
