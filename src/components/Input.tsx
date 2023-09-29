'use client'

import React, { forwardRef } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'

type InputProps = {
  name: string
  disabled?: boolean
  type?: string
  placeholder?: string
  label?: string
}

type EXInputProps<T extends FieldValues> = UseControllerProps<T> & InputProps

const Input = <T extends FieldValues>({
  name,
  disabled,
  type = 'text',
  placeholder,
  label,
  control,
  rules,
}: EXInputProps<T>) => {
  const { field, fieldState } = useController<T>({ name, control, rules })
  const { error } = fieldState

  return (
    <div className="w-full">
      {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
      <input
        {...field}
        value={field.value || ''}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export default Input
