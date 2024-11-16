import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import * as adController from '@/app/lib/controller/adController';

// Define validation schema
const querySchema = z.object({
    publisherContractAddress: z.string(),
});

export async function GET(
    request: NextRequest,
    context: { params: { ethAddress: string } }
): Promise<NextResponse> {
    try {
        // Get ethAddress from path params
        const { ethAddress } = await context.params;
        const normalizedAddress = ethAddress.toLowerCase();
        // Get query parameters
        const { searchParams } = new URL(request.url);
        const queryParams = {
            publisherContractAddress: searchParams.get('publisherContractAddress'),
        };

        // Validate query parameters
        const validationResult = querySchema.safeParse(queryParams);
        if (!validationResult.success) {
            return NextResponse.json(
                { errors: validationResult.error.issues },
                { status: 400 }
            );
        }

        // Call controller
        const data = await adController.getAdSpaces(
            normalizedAddress,
            queryParams.publisherContractAddress!
        );

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