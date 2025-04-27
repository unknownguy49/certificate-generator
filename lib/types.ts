export type TemplateType = "elegant" | "modern" | "classic" | "custom"

export interface CertificateData {
  name: string
  course: string
  date: string
  [key: string]: any
}

export interface CustomFields {
  title?: string
  subtitle?: string
  achievementText?: string
  signature?: string
  dateFormat?: string
  certificateId?: string
  [key: string]: any
}
