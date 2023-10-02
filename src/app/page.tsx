import React from "react";
import Contacts from '@/src/components/contacts/Contacts'
import prisma from "@/src/db";
import { ContactWithId } from "@/prisma/seed";


export default async function Home() {

    const contacts: ContactWithId[] = await prisma.contact.findMany();

    return (
        <main>
            <Contacts contactsData={contacts}/>
        </main>
    )
}
