import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import type { ControllerProps, FieldValues } from 'react-hook-form'
import { Controller, useController } from 'react-hook-form'

type ImageUploadProps = {
  name: string
  disabled?: boolean
  label?: string
}

type EXImageUploadProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & ImageUploadProps

const ImageUpload = <T extends FieldValues>({ name, disabled, label, control, rules }: EXImageUploadProps<T>) => {
  const { field, fieldState } = useController<T>({ name, control, rules })
  const { error } = fieldState
  const [base64, setBase64] = useState('')

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const base64String = e.target.result
        setBase64(base64String)
        field.onChange(base64String) // ここで base64 文字列をセット
      }
      reader.readAsDataURL(file)
    },
    [field],
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <div
      {...getRootProps({
        className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700',
      })}
    >
      {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <input
              {...field}
              {...getInputProps()}
              value={undefined}
              type="file"
              className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {base64 && (
              <div className="flex items-center justify-center">
                <Image src={base64} height="100" width="100" alt="Uploaded image" />
              </div>
            )}
            {error && <span className="text-red-500">{error.message}</span>}
          </>
        )}
      />
    </div>
  )
}

export default ImageUpload
