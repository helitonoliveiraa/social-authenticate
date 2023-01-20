import { PrismaClient } from '@prisma/client';
import prisma from '../prisma/index';

export class BaseService {
  protected client: PrismaClient;

  constructor() {
    this.client = prisma;
  }
}