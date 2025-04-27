"use client"

import { format } from "date-fns"

interface ElegantTemplateProps {
  data: any
  customFields: Record<string, string>
  signatureImage: string | null
  companyLogo: string | null
}

export function ElegantTemplate({ data, customFields, signatureImage, companyLogo }: ElegantTemplateProps) {
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
    <div className="w-full h-full bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 to-transparent opacity-20"></div>
        <div className="w-full h-full grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-yellow-500/10"></div>
          ))}
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-4 border border-yellow-500/30"></div>
      <div className="absolute inset-6 border border-yellow-500/20"></div>

      {/* Certificate ID */}
      {certificateId && (
        <div className="absolute top-8 right-8 text-xs text-yellow-500/70">Certificate ID: {certificateId}</div>
      )}

      {/* Company Logo */}
      {companyLogo && (
        <div className="absolute top-8 left-8 w-16 h-16">
          <img
            src={companyLogo || "/placeholder.svg"}
            alt="Company Logo"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl">
        <div className="text-yellow-500 text-sm tracking-widest uppercase">{title}</div>

        <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

        <div className="text-sm text-gray-400">{subtitle}</div>

        <div className="text-3xl font-serif text-yellow-500 font-bold">{name || "Recipient Name"}</div>

        <div className="text-sm text-gray-400">{achievementText}</div>

        <div className="text-xl font-medium">{course || "Course Name"}</div>

        <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

        <div className="flex justify-between w-full pt-6">
          <div className="text-center">
            <div className="text-sm text-gray-400">Date</div>
            <div className="text-sm mt-1">{format(date, dateFormat)}</div>
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
              <div className="text-sm mt-1 font-serif text-yellow-500">{signature || "Signature"}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
