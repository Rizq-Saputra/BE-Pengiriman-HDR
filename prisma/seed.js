const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
    const admin1 = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: await bcrypt.hash('admin', 10)
        }
    })

    const admin2 = await prisma.admin.upsert({
        where: { username: 'admin2' },
        update: {},
        create: {
            username: 'admin2',
            password: await bcrypt.hash('password', 10)
        }
    })

    console.log(admin1, admin2)
}

main()
    .then(() => {
        console.log('Seed data inserted successfully')
    })
    .catch((error) => {
        console.error('Error inserting seed data:', error)
    })
    .finally(() => {
        prisma.$disconnect()
    })