import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const timothy = await prisma.contact.create({
        data: {
            name: 'Timothy Lewis',
            email: 't.lewis@mail.com',
            phone: '+36 01 234 5678',
            },
    })
    const jacqueline = await prisma.contact.create({
        data: {
            name: 'Jacqueline Bray',
            email: 'j.bray@mail.com',
            phone: '+36 01 234 5678',
        },
    })
    const sarah = await prisma.contact.create({
        data: {
            name: 'Sarah Wright',
            email: 's.wright@mail.com',
            phone: '+36 01 234 5678',
        },
    })
    const lucy = await prisma.contact.create({
        data: {
            name: 'Lucy Jones',
            email: 'l.jones@mail.com',
            phone: '+36 01 234 5678',
        },
    })
    const jake = await prisma.contact.create({
        data: {
            name: 'Jake Perez',
            email: 'j.perez@mail.com',
            phone: '+36 01 234 5678',
        },
    })
    const adebayo = await prisma.contact.create({
        data: {
            name: 'Adebayo Rodriguz',
            email: 'a.rodriguez@mail.com',
            phone: '+36 01 234 5678',
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })