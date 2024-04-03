import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

import * as authData from '../../data/__tests__/authData';
import * as authService from '../../services/auth';
import { UserType } from '../../types/UserType';
import { CSRF_SECRET } from '../../constants';
import { prismaMock } from './mock/prismaMock';
import App from '../../app';

jest.mock('../../utils/PrismaClient', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));
jest.mock('../../utils/emailSender', () => ({
    __esModule: true,
    sendEmail: jest.fn(),
}));

export {
    supertest,
    Test,
    TestAgent,
    mockDeep,
    mockReset,
    PrismaClient,
    authData,
    authService,
    UserType,
    CSRF_SECRET,
    prismaMock,
    App,
};
