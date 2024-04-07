import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { authService } from '../setup/global'


jest.mock('../../utils/PrismaClient', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));
jest.mock('../../utils/emailSender', () => ({
    __esModule: true,
    sendEmail: jest.fn(),
}));

describe('given auth service', () => {
    it('should generate CSRF token and return it', () => {
        const { csrfToken } = authService.generateCSRFToken()

        expect(csrfToken).not.toBeNull()
        expect(csrfToken).not.toBeUndefined()
        expect(typeof csrfToken).toBe('string')
    })
})