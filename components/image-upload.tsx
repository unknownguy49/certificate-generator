"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, X } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (dataUrl: string) => void
  label?: string
}

export function ImageUpload({ onImageUpload, label = "Upload Image" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        setPreview(dataUrl)
        onImageUpload(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onImageUpload("")
  }

  return (
    <div className="space-y-2">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {preview ? (
        <div className="relative border rounded-md p-2">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-20 mx-auto" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/80"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full h-20 flex flex-col gap-1 justify-center items-center"
          onClick={handleButtonClick}
        >
          <ImageIcon className="h-5 w-5" />
          <span className="text-xs">{label}</span>
        </Button>
      )}
    </div>
  )
}
