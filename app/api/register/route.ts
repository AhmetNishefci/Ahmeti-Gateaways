import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

// this function is used to register a user
export async function POST(request: Request) {

    // get the body
    const body = await request.json()

    //Get data from request body
    const { email, name, password } = body

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    //Create user
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    // return the user
    return NextResponse.json(user)
}