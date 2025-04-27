"use client"

import { format } from "date-fns"

interface ModernTemplateProps {
  data: any
  customFields: Record<string, string>
  signatureImage: string | null
  companyLogo: string | null
}

export function ModernTemplate({ data, customFields, signatureImage, companyLogo }: ModernTemplateProps) {
  const name = data?.name || ""
  const course = data?.course || ""
  const date = data?.date ? new Date(data.date) : new Date()
  const signature = customFields?.signature || data?.signature || ""
  const dateFormat = customFields?.dateFormat || "MMMM dd, yyyy"
  const certificateId = customFields?.certificateId || ""
  const title = customFields?.title || "Certificate of Achievement"
  const subtitle = customFields?.subtitle || "This is to certify that"
  const achievementText = customFields?.achievementText || "has successfully completed the course"

  return (
    <div className="w-full h-full bg-gray-900 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-2 border-blue-500/20 rotate-45"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-purple-500/20 rotate-12"></div>
      <div className="absolute top-1/4 right-12 w-8 h-8 bg-blue-500/10 rounded-full"></div>
      <div className="absolute bottom-1/4 left-12 w-8 h-8 bg-purple-500/10 rounded-full"></div>

      {/* Certificate ID */}
      {certificateId && (
        <div className="absolute top-8 right-8 text-xs text-blue-400/70 z-10">Certificate ID: {certificateId}</div>
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl">
        <div className="text-blue-400 text-sm tracking-widest uppercase font-bold">{title}</div>

        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-12 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        <div className="text-sm text-gray-400">{subtitle}</div>

        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {name || "Recipient Name"}
        </div>

        <div className="text-sm text-gray-400">{achievementText}</div>

        <div className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {course || "Course Name"}
        </div>

        <div className="grid grid-cols-2 gap-12 w-full pt-6">
          <div className="text-center border-t border-gray-800 pt-2">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Date</div>
            <div className="text-sm mt-1">{format(date, dateFormat)}</div>
          </div>

          <div className="text-center border-t border-gray-800 pt-2">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Signature</div>
            {signatureImage ? (
              <div className="mt-1 h-10">
                <img
                  src={signatureImage || "/placeholder.svg"}
                  alt="Signature"
                  className="h-full mx-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-sm mt-1 font-medium text-blue-400">{signature || "Signature"}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
