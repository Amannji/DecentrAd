import { NextRequest, NextResponse } from 'next/server';
import * as adController from '@/app/lib/controller/adController';

export async function GET(
    request: NextRequest,
    context: { params: { ethAddress: string } }
): Promise<NextResponse> {
    try {
        // Get ethAddress from path params
        const { ethAddress } = await context.params;
        const normalizedAddress = ethAddress.toLowerCase();

        // Call controller
        const data = await adController.getContractAddress(normalizedAddress);

        if (!data) {
            return NextResponse.json(
                { message: "No Data found for the given address" },
                { status: 400 }
            );
        }

        return NextResponse.json({ data });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}