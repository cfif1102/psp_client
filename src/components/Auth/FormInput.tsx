import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React from 'react'
import {
    FieldError,
    Path,
    UseFormClearErrors,
    UseFormRegisterReturn,
} from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/store'
import { FormInputLabelStyled, FormInputStyled } from '@styles/form-input'

interface Props<T extends Record<string, any>> {
    type: 'text' | 'password' | 'email' | 'date'
    value: string
    error: FieldError | undefined
    action: ActionCreatorWithPayload<string>
    register: UseFormRegisterReturn
    extraClass?: string | undefined
    labelText: string
    id: Path<T>
    placeholder?: string | undefined
    clearError: UseFormClearErrors<T>
    showLabel?: boolean | undefined
}

export const FormInput = <T extends Record<string, any>>(props: Props<T>) => {
    const {
        error,
        type,
        action,
        register,
        extraClass,
        value,
        id,
        labelText,
        placeholder,
        clearError,
        showLabel,
    } = props

    const dispatch = useDispatch<AppDispatch>()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (clearError) {
            clearError(id)
        }

        dispatch(action(e.target.value))
    }

    return (
        <div className={`form-group ${extraClass}`}>
            {(showLabel === undefined || showLabel === true) && (
                <FormInputLabelStyled htmlFor={id}>
                    {labelText}
                </FormInputLabelStyled>
            )}
            <FormInputStyled
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                {...register}
                onChange={handleInputChange}
                className="w-100"
            />
            {error && <span className="text-danger my-1">{error.message}</span>}
        </div>
    )
}
