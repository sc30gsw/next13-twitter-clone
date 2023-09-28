'use client'

import { error } from 'console'
import React, { forwardRef } from 'react'

type InputProps = {
  disabled?: boolean
  type?: string
  placeholder?: string
  label?: string
  error?: string
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, type = 'text', placeholder, label, error }, ref) => {
    return (
      <div className="w-full">
        {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
        <input
          ref={ref}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        />
        {error && <span className="text-red-500">{error}</span>}
      </div>
    )
  },
)

export default Input
