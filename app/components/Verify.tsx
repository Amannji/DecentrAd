'use client'
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

export default function Verify() {
    const onSuccess = (result: ISuccessResult) => {
        console.log(result);
    };

    const handleVerify = async (proof: ISuccessResult) => {
        const res = await fetch("/api/verify", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(proof),
        })
        if (!res.ok) {
            throw new Error("Verification failed.");
        }
    };
    return (
        <IDKitWidget
            app_id={process.env.NEXT_PUBLIC_WORLD_ID_APP_ID as `app_${string}`}
            action="login"
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Device}
        >
            {({ open }) => 
                <button 
                    onClick={open}
                    className="px-6 py-2 text-sm font-medium text-green-600 bg-white border-2 border-green-600 rounded-full hover:bg-green-50 transition-colors"
                >
                    Verify with World ID
                </button>
            }
        </IDKitWidget>
    )
}
