import { mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

import * as authData from '../../../data/__tests__/authData';
import * as authService from '../../../services/auth';
import { UserType } from '../../../types/UserType';
import { CSRF_SECRET } from '../../../constants';
import { prismaMock } from '../mocks/prismaMock';


jest.mock('../../../utils/PrismaClient', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));
jest.mock('../../../utils/emailSender', () => ({
    __esModule: true,
    sendEmail: jest.fn(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

afterAll(() => {
    prismaMock.$disconnect()
    jest.clearAllMocks()
})

export {
    mockDeep,
    mockReset,
    PrismaClient,
    authData,
    authService,
    UserType,
    CSRF_SECRET,
    prismaMock,
};
