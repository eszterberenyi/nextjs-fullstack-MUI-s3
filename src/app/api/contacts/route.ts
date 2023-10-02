import prisma from "@/src/db";
import fs from "fs";
import { generateUploadURL } from "@/src/s3";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    try {
       const contacts = await prisma.contact.findMany();
       return NextResponse.json(contacts)
    } catch (error) {
        console.error (error);
        return NextResponse.json(res)
    }      
}


export const POST = async (req: Request) => {
    const formData = await req.json();
    try {
        const createdContact = await prisma.contact.create({
            data: {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                hasPhoto: formData.hasPhoto,
            }
        });
        // if (createdContact.hasPhoto) {            
        // }
        // const url = await generateUploadURL(createdContact.id);
        // console.log('url', url)
        return NextResponse.json(createdContact)
    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json(formData)
    }
}
