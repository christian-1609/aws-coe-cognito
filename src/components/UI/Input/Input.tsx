import React from 'react';

export interface IInputComponent {
    errorMessage?: string;
    isSubmited: boolean;
    fieldName: string;
};

export const Input = ({ errorMessage, isSubmited, fieldName, ...props }: IInputComponent & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <>
            <div className="space-y-1">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={`${props?.id}`}>{fieldName}</label>
                    <input className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...props}
                    />
                </div>
            </div>
            {
                !!errorMessage && isSubmited ?
                    <small className="text-red-500" dangerouslySetInnerHTML={{ __html: errorMessage }}>
                    </small> : <small />
            }
        </>
    )
}
