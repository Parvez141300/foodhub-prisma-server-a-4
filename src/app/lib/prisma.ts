import { envVars } from "../utils/env";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

const connectionString = envVars.DATABASE_URL;

const adapter = new PrismaPg({ connectionString, ssl:{rejectUnauthorized: false} })
const prisma = new PrismaClient({ adapter })

export { prisma }