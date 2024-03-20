import { hashPassword } from '../../services/auth';
import { UserType } from '../../types/UserType';

export const userData = {
    id: '1',
    name: 'test',
    email: 'test@test.com',
    imageUrl: null,
    password: hashPassword('12345678'),
    resetPasswordOTP: 123458,
    resetPasswordExpiration: new Date(
        Date.now() + 1000 * 60 * 60 * 24,
    ), // 1 day
    password_updated_at: null,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
} as UserType;