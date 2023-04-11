'use client'

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (imageSrc: string) => void
    value: string
}

const ImageUpload = ({
    onChange,
    value,
}:ImageUploadProps) => {
    const handleUpload = useCallback((imageSrc:any) => {
        onChange(imageSrc.info.secure_url)
    },[ onChange ])

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="dsbm7pto"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }:any) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                            relative
                            cursor-pointer
                            hover:opacity-70
                            transition
                            border-dashed
                            border-2
                            p-20
                            border-neutral-300
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-4
                            text-neutral-600
                        "
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-ls">
                            Click to upload
                        </div>
                        {value && (
                             <div className="
                             absolute inset-0 w-full h-full">
                            <Image 
                                alt="Listing Image"
                                fill
                                style={{ objectFit: 'cover' }}
                                src={value}
                            />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload