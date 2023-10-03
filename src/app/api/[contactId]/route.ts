import prisma from "@/src/db";
import { NextResponse, NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    try {
        await prisma.contact.delete({
            where: {
              id: Number(req.url.slice(-1)),
            },
        })
        return NextResponse.json(res)
     } catch (error) {
         console.error (error);
         return NextResponse.json(res)
     }      
}

export const PUT = async (req: NextRequest, res: NextResponse) => {
    try {
        const contactId = Number(req.url.slice(-1));
        const formData = await req.json();
  
        const existingContact = await prisma.contact.findUnique({
          where: {
            id: contactId,
          },
        });
  
        if (!existingContact) {
          return NextResponse.json({ error: 'Contact not found' }, {status: 404});
        }
        const updatedContactData = {
            name: formData.name === '' ? existingContact.name : formData.name,
            email: formData.email === '' ? existingContact.email : formData.email,
            phone: formData.phone === '' ? existingContact.phone: formData.phone,
            hasPhoto: existingContact.hasPhoto,
        }
  
        await prisma.contact.update({
          where: {
            id: contactId,
          },
          data: updatedContactData,
        });
  
        return NextResponse.json({ message: 'Contact updated successfully' }, {status: 200} );
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, {status: 500});
      }
}

