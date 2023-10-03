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
