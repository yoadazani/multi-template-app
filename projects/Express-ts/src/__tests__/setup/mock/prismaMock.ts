import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import prisma from '../../../utils/PrismaClient';

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
