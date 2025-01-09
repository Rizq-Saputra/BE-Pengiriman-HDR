const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

beforeAll(async () => {
    try {
        await prisma.$connect()
    } catch (error) {
        console.error('Database connection failed:', error)
        throw error
    }
})

afterAll(async () => {
    try {
        await prisma.$disconnect()
    } catch (error) {
        console.error('Database disconnect failed:', error)
        throw error
    }
})

afterEach(async () => {
    try {
        // Clean up test data for all tables
        await prisma.pengiriman.deleteMany()
        await prisma.supir.deleteMany()
        await prisma.admin.deleteMany()
        await prisma.kendaraan.deleteMany()
        await prisma.pelanggan.deleteMany()
        await prisma.barang.deleteMany();
    } catch (error) {
        console.error('Test cleanup failed:', error)
        throw error
    }
})

module.exports = {
    prisma // Export prisma instance for reuse in tests
}