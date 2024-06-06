import { useEffect, useMemo, useState } from 'react';

type FormState<T> = {
    [K in keyof T]: string;
}

export type FormValidations<T> = {
    [K in keyof T]: [(value: string | number | boolean | unknown) => boolean, string];
}

type FormHookResult<T> = {
    [K in keyof T]: string;
} & {
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
    isFormValid?: boolean;
    formState: FormState<T>;
    formValidation: Record<string, string | null>;
}

export const useForm = <T extends Record<string, string>>
    (initialForm: T, formValidations: { [key: string]: [(value: string) => boolean, string] }): FormHookResult<T> => {

    const [formState, setFormState] = useState<FormState<T>>(initialForm);
    const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

    useEffect(() => {
        createValidators();
        // eslint-disable-next-line
    }, [formState]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.values(formValidation)) {
            if (formValue !== null) {
                return false;
            }
        }
        return true;
    }, [formValidation]);

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckValues: Record<string, string | null> = {};
        if (!formValidations) { return; }

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMesage] = formValidations[formField];
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMesage;
        }

        setFormValidation(formCheckValues);
    }

    return {
        ...formState,
        formState,
        ...formValidation,
        formValidation,
        onInputChange,
        onResetForm,
        isFormValid
    }
}