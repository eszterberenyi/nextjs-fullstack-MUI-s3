import {Request, Response} from "next/dist/compiled/@edge-runtime/primitives";
import { generateUploadURL } from '../../../s3'

export async function POST(req: Request, res: Response) {
    const uploadURL = await generateUploadURL();

}