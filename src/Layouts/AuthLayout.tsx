import React from 'react'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white">
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="max-h-auto mx-auto max-w-xl">
                    {children}
                </div>
            </div>
        </div>
    )
}
