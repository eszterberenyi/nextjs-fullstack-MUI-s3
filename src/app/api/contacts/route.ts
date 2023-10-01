import prisma from "@/src/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const formData = await req.json();
    try {
        const createdContact = await prisma.contact.create({
            data: formData,
        });
        return NextResponse.json(createdContact)
    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json(formData)
    }
}
