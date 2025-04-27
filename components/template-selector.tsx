"use client"

import type React from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { UploadIcon } from "lucide-react"
import type { TemplateType } from "@/lib/types"
import { useState } from "react"

interface TemplateSelectorProps {
  selectedTemplate: TemplateType
  onTemplateChange: (template: TemplateType) => void
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const [customTemplate, setCustomTemplate] = useState<File | null>(null)

  const handleCustomTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCustomTemplate(file)
      onTemplateChange("custom")
    }
  }

  return (
    <RadioGroup
      value={selectedTemplate}
      onValueChange={(value) => onTemplateChange(value as TemplateType)}
      className="grid grid-cols-2 gap-2"
    >
      <div className="col-span-2 space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="elegant" id="elegant" />
          <Label htmlFor="elegant" className="cursor-pointer">
            Elegant Dark
          </Label>
        </div>
        <div className="bg-black rounded-md p-2 border border-gray-800 h-16 flex items-center justify-center text-xs text-center">
          <span className="text-gray-400">Minimalist design with gold accents</span>
        </div>
      </div>

      <div className="col-span-2 space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="modern" id="modern" />
          <Label htmlFor="modern" className="cursor-pointer">
            Modern Dark
          </Label>
        </div>
        <div className="bg-gray-900 rounded-md p-2 border border-gray-800 h-16 flex items-center justify-center text-xs text-center">
          <span className="text-gray-400">Contemporary design with geometric elements</span>
        </div>
      </div>

      <div className="col-span-2 space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="classic" id="classic" />
          <Label htmlFor="classic" className="cursor-pointer">
            Classic Dark
          </Label>
        </div>
        <div className="bg-gray-800 rounded-md p-2 border border-gray-700 h-16 flex items-center justify-center text-xs text-center">
          <span className="text-gray-400">Traditional design with ornate borders</span>
        </div>
      </div>

      <div className="col-span-2 space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" disabled={!customTemplate} />
          <Label htmlFor="custom" className="cursor-pointer">
            Custom Template
          </Label>
        </div>
        <div className="border border-dashed border-gray-700 rounded-md p-2 h-16 flex flex-col items-center justify-center">
          <Label
            htmlFor="custom-template-upload"
            className="cursor-pointer flex items-center gap-1 text-xs text-muted-foreground"
          >
            <UploadIcon className="h-3 w-3" />
            {customTemplate ? customTemplate.name : "Upload your design"}
          </Label>
          <input
            id="custom-template-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCustomTemplateUpload}
          />
        </div>
      </div>
    </RadioGroup>
  )
}
