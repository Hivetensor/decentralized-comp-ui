// app/api/auth/route.ts
import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const {walletAddress} = await req.json();

        let user = await prisma.user.findUnique({
            where: {walletAddress}
        });

        if (!user) {
            user = await prisma.user.create({
                data: {walletAddress}
            });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            {error: 'Failed to authenticate'},
            {status: 500}
        );
    }
}