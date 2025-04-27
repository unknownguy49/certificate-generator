"use client"

import { format } from "date-fns"

interface CustomTemplateProps {
  data: any
  customFields: Record<string, string>
  signatureImage: string | null
  companyLogo: string | null
}

export function CustomTemplate({ data, customFields, signatureImage, companyLogo }: CustomTemplateProps) {
  const name = data?.name || ""
  const course = data?.course || ""
  const date = data?.date ? new Date(data.date) : new Date()
  const signature = customFields?.signature || data?.signature || ""
  const dateFormat = customFields?.dateFormat || "MMMM dd, yyyy"
  const certificateId = customFields?.certificateId || ""
  const title = customFields?.title || "Certificate of Achievement"
  const subtitle = customFields?.subtitle || "This certifies that"
  const achievementText = customFields?.achievementText || "has successfully completed"

  return (
    <div className="w-full h-full bg-gray-900 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Placeholder for custom template */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-lg text-gray-600">Custom Template</div>
      </div>

      {/* Certificate ID */}
      {certificateId && (
        <div className="absolute top-8 right-8 text-xs text-white/70 z-10">Certificate ID: {certificateId}</div>
      )}

      {/* Company Logo */}
      {companyLogo && (
        <div className="absolute top-8 left-8 w-16 h-16 z-10">
          <img
            src={companyLogo || "/placeholder.svg"}
            alt="Company Logo"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl bg-black/50 p-8 rounded-lg">
        <div className="text-white text-lg font-bold">{title}</div>

        <div className="text-sm text-gray-300">{subtitle}</div>

        <div className="text-3xl font-bold text-white">{name || "Recipient Name"}</div>

        <div className="text-sm text-gray-300">{achievementText}</div>

        <div className="text-xl font-medium text-white">{course || "Course Name"}</div>

        <div className="grid grid-cols-2 gap-12 w-full pt-6">
          <div className="text-center">
            <div className="text-sm text-gray-400">Date</div>
            <div className="text-sm mt-1 text-white">{format(date, dateFormat)}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400">Signature</div>
            {signatureImage ? (
              <div className="mt-1 h-10">
                <img
                  src={signatureImage || "/placeholder.svg"}
                  alt="Signature"
                  className="h-full mx-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-sm mt-1 text-white">{signature || "Signature"}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
