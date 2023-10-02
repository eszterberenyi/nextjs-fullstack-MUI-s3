import { PrismaClient } from '@prisma/client'
import * as fs from 'fs';
import {uploadImageToBucket} from "../src/s3";

const prisma = new PrismaClient()

export type Contact = {
    name: string;
    email: string;
    phone: string;
    hasPhoto: boolean;
};

export type ContactWithId = {
    id: number;
    name: string;
    email: string;
    phone: string;
    hasPhoto: boolean;
};

type ContactWithImage = [Contact, string];

const contacts : ContactWithImage[] = [
    [
        {
            name: 'Timothy Lewis',
            email: 't.lewis@mail.com',
            phone: '+36 01 234 5678',
            hasPhoto: true
        }, 'Timothy.jpeg'
    ],
    [
        {
            name: 'Jacqueline Bray',
            email: 'j.bray@mail.com',
            phone: '+36 01 234 5678',
            hasPhoto: true
        }, 'Jacqueline.jpeg',
    ],
    [
        {
            name: 'Sarah Wright',
            email: 's.wright@mail.com',
            phone: '+36 01 234 5678',
            hasPhoto: true
        }, 'Sarah.jpeg',
    ],
    [
        {
            name: 'Lucy Jones',
            email: 'l.jones@mail.com',
            phone: '+36 01 234 5678',
            hasPhoto: true
        }, 'Lucy.jpeg',
    ],
    [
        {
            name: 'Adebayo Rodriguz',
            email: 'a.rodriguez@mail.com',
            phone: '+36 01 234 5678',
            hasPhoto: true
        }, 'Adebayo.jpeg',
    ],
    [
        {
            name: 'Jake Perez',
            email: 'j.perez@mail.com',
            phone: '+36 01 234 5678',
            hasPhoto: true
        }, 'Jake.jpeg',
    ]

]

async function main() {
    for (let contact of contacts) {
        const person = await prisma.contact.create({
            data: contact[0]
        });
        await uploadImageToBucket(fs.readFileSync(`public/images/${contact[1]}`), person.id)
    }
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
