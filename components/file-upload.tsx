"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileIcon, UploadIcon } from "lucide-react"

interface FileUploadProps {
  onFileUpload: (file: File) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && (file.type === "text/csv" || file.type.includes("spreadsheet") || file.name.endsWith(".xlsx"))) {
      setFileName(file.name)
      onFileUpload(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 text-center ${
        isDragging ? "border-primary bg-primary/10" : "border-border"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Input ref={fileInputRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={handleFileChange} />

      {fileName ? (
        <div className="flex items-center justify-center gap-2">
          <FileIcon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">{fileName}</span>
          <Button variant="ghost" size="sm" onClick={handleButtonClick}>
            Change
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-center">
            <UploadIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports CSV and XLSX files</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleButtonClick}>
            Browse Files
          </Button>
        </div>
      )}
    </div>
  )
}
