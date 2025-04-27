"use client"
import type { TemplateType } from "@/lib/types"
import { ElegantTemplate } from "@/components/templates/elegant-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CustomTemplate } from "@/components/templates/custom-template"

interface CertificatePreviewProps {
  data: any
  template: TemplateType
  customFields: Record<string, string>
  signatureImage?: string | null
  companyLogo?: string | null
  id?: string
}

export function CertificatePreview({
  data,
  template,
  customFields,
  signatureImage = null,
  companyLogo = null,
  id = "certificate-preview",
}: CertificatePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "elegant":
        return (
          <ElegantTemplate
            data={data}
            customFields={customFields}
            signatureImage={signatureImage}
            companyLogo={companyLogo}
          />
        )
      case "modern":
        return (
          <ModernTemplate
            data={data}
            customFields={customFields}
            signatureImage={signatureImage}
            companyLogo={companyLogo}
          />
        )
      case "classic":
        return (
          <ClassicTemplate
            data={data}
            customFields={customFields}
            signatureImage={signatureImage}
            companyLogo={companyLogo}
          />
        )
      case "custom":
        return (
          <CustomTemplate
            data={data}
            customFields={customFields}
            signatureImage={signatureImage}
            companyLogo={companyLogo}
          />
        )
      default:
        return (
          <ElegantTemplate
            data={data}
            customFields={customFields}
            signatureImage={signatureImage}
            companyLogo={companyLogo}
          />
        )
    }
  }

  return (
    <div id={id} className="w-full aspect-[1.414/1] bg-background rounded-md overflow-hidden">
      {renderTemplate()}
    </div>
  )
}
