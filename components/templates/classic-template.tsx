"use client"

import { format } from "date-fns"

interface ClassicTemplateProps {
  data: any
  customFields: Record<string, string>
  signatureImage: string | null
  companyLogo: string | null
}

export function ClassicTemplate({ data, customFields, signatureImage, companyLogo }: ClassicTemplateProps) {
  const name = data?.name || ""
  const course = data?.course || ""
  const date = data?.date ? new Date(data.date) : new Date()
  const signature = customFields?.signature || data?.signature || ""
  const dateFormat = customFields?.dateFormat || "MMMM dd, yyyy"
  const certificateId = customFields?.certificateId || ""
  const title = customFields?.title || "Certificate of Achievement"
  const subtitle = customFields?.subtitle || "This is to certify that"
  const achievementText = customFields?.achievementText || "has successfully completed"

  return (
    <div className="w-full h-full bg-gray-800 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Ornate border */}
      <div className="absolute inset-0 p-4">
        <div className="w-full h-full border-8 border-double border-gray-700 p-4">
          <div className="w-full h-full border border-gray-600"></div>
        </div>
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-amber-700"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-amber-700"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-amber-700"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-amber-700"></div>

      {/* Certificate ID */}
      {certificateId && (
        <div className="absolute top-12 right-12 text-xs text-amber-500/70 z-10">Certificate ID: {certificateId}</div>
      )}

      {/* Company Logo */}
      {companyLogo && (
        <div className="absolute top-12 left-12 w-16 h-16 z-10">
          <img
            src={companyLogo || "/placeholder.svg"}
            alt="Company Logo"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl">
        <div className="text-amber-700 text-lg font-serif tracking-wide">{title}</div>

        <div className="flex items-center justify-center w-64 h-1">
          <div className="w-full h-px bg-amber-700/50"></div>
          <div className="absolute w-4 h-4 bg-amber-700/20 rotate-45"></div>
        </div>

        <div className="text-sm text-gray-300 font-serif">{subtitle}</div>

        <div className="text-3xl font-serif text-amber-500">{name || "Recipient Name"}</div>

        <div className="text-sm text-gray-300 font-serif">{achievementText}</div>

        <div className="text-xl font-serif text-amber-400">{course || "Course Name"}</div>

        <div className="flex items-center justify-center w-64 h-1">
          <div className="w-full h-px bg-amber-700/50"></div>
          <div className="absolute w-4 h-4 bg-amber-700/20 rotate-45"></div>
        </div>

        <div className="grid grid-cols-2 gap-12 w-full pt-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 font-serif">Date</div>
            <div className="text-sm mt-1 text-amber-300 font-serif">{format(date, dateFormat)}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400 font-serif">Signature</div>
            {signatureImage ? (
              <div className="mt-1 h-10">
                <img
                  src={signatureImage || "/placeholder.svg"}
                  alt="Signature"
                  className="h-full mx-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-sm mt-1 text-amber-300 font-serif italic">{signature || "Signature"}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
