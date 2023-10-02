import React from 'react'
import { ContactWithId } from "@/prisma/seed";

interface Props {
    contactsData: ContactWithId[]
}


const ContactList = (props: Props) => {
    return (
        <div>ContactList</div>
    )
}

export default ContactList
