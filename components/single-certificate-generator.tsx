"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TemplateSelector } from "@/components/template-selector"
import { CertificatePreview } from "@/components/certificate-preview"
import { useToast } from "@/hooks/use-toast"
import type { TemplateType } from "@/lib/types"
import { ImageUpload } from "@/components/image-upload"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { downloadCertificate } from "@/lib/certificate-utils"

export default function SingleCertificateGenerator() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("elegant")
  const [isGenerating, setIsGenerating] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [customFields, setCustomFields] = useState<Record<string, string>>({
    title: "Certificate of Achievement",
    subtitle: "This certifies that",
    achievementText: "has successfully completed",
    signature: "",
    dateFormat: "MMMM dd, yyyy",
    certificateId: "",
  })
  const [signatureImage, setSignatureImage] = useState<string | null>(null)
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCustomFieldChange = (field: string, value: string) => {
    setCustomFields((prev) => ({ ...prev, [field]: value }))
  }

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template)
  }

  const handleSignatureUpload = (dataUrl: string) => {
    setSignatureImage(dataUrl)
  }

  const handleLogoUpload = (dataUrl: string) => {
    setCompanyLogo(dataUrl)
  }

  const handleGenerateCertificate = async () => {
    if (!formData.name || !formData.course) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate certificate generation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsGenerating(false)
    setCertificateGenerated(true)
    toast({
      title: "Certificate generated",
      description: "Your certificate has been generated and is ready for download.",
    })
  }

  const handleDownloadCertificate = async () => {
    try {
      await downloadCertificate(`certificate-${formData.name}-${Date.now()}`, "single-certificate")
      toast({
        title: "Certificate downloaded",
        description: "Your certificate has been downloaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your certificate.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Recipient Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter recipient name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course/Achievement</Label>
            <Input
              id="course"
              name="course"
              placeholder="Enter course or achievement"
              value={formData.course}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label>Certificate Template</Label>
            <TemplateSelector selectedTemplate={selectedTemplate} onTemplateChange={handleTemplateChange} />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="customization">
              <AccordionTrigger>Certificate Customization</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificate-id">Certificate ID (Optional)</Label>
                    <Input
                      id="certificate-id"
                      placeholder="Enter certificate ID"
                      value={customFields.certificateId}
                      onChange={(e) => handleCustomFieldChange("certificateId", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Certificate Title</Label>
                    <Input
                      id="title"
                      placeholder="Certificate of Achievement"
                      value={customFields.title}
                      onChange={(e) => handleCustomFieldChange("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Certificate Subtitle</Label>
                    <Input
                      id="subtitle"
                      placeholder="This certifies that"
                      value={customFields.subtitle}
                      onChange={(e) => handleCustomFieldChange("subtitle", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievement-text">Achievement Text</Label>
                    <Input
                      id="achievement-text"
                      placeholder="has successfully completed"
                      value={customFields.achievementText}
                      onChange={(e) => handleCustomFieldChange("achievementText", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signature-text">Signature Text</Label>
                    <Input
                      id="signature-text"
                      placeholder="Signature"
                      value={customFields.signature}
                      onChange={(e) => handleCustomFieldChange("signature", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Input
                      id="date-format"
                      placeholder="Date Format (e.g., MMMM DD, YYYY)"
                      value={customFields.dateFormat}
                      onChange={(e) => handleCustomFieldChange("dateFormat", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="block mb-2">Signature Image (Optional)</Label>
                    <ImageUpload onImageUpload={handleSignatureUpload} label="Upload Signature" />
                  </div>

                  <div className="space-y-2">
                    <Label className="block mb-2">Company Logo (Optional)</Label>
                    <ImageUpload onImageUpload={handleLogoUpload} label="Upload Logo" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button className="w-full" onClick={handleGenerateCertificate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Certificate"}
          </Button>

          {certificateGenerated && (
            <Button className="w-full" variant="secondary" onClick={handleDownloadCertificate}>
              Download Certificate
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Certificate Preview</h3>
            <CertificatePreview
              data={formData}
              template={selectedTemplate}
              customFields={customFields}
              signatureImage={signatureImage}
              companyLogo={companyLogo}
              id="single-certificate"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
