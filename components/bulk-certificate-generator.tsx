"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/components/file-upload"
import { TemplateSelector } from "@/components/template-selector"
import { CertificatePreview } from "@/components/certificate-preview"
import { useToast } from "@/hooks/use-toast"
import type { TemplateType } from "@/lib/types"
import { parseFile } from "@/lib/file-parser"
import { ImageUpload } from "@/components/image-upload"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { downloadCertificate } from "@/lib/certificate-utils"

export default function BulkCertificateGenerator() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("elegant")
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [customFields, setCustomFields] = useState<Record<string, string>>({})
  const [signatureImage, setSignatureImage] = useState<string | null>(null)
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
  const [certificateGenerated, setCertificateGenerated] = useState(false)

  const handleFileUpload = async (file: File) => {
    setFile(file)
    try {
      const data = await parseFile(file)
      setPreviewData(data)
      toast({
        title: "File uploaded successfully",
        description: `${data.length} records found in the file.`,
      })
    } catch (error) {
      toast({
        title: "Error parsing file",
        description: "Please make sure your file is a valid CSV or XLSX file.",
        variant: "destructive",
      })
    }
  }

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template)
  }

  const handleCustomFieldChange = (field: string, value: string) => {
    setCustomFields((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignatureUpload = (dataUrl: string) => {
    setSignatureImage(dataUrl)
  }

  const handleLogoUpload = (dataUrl: string) => {
    setCompanyLogo(dataUrl)
  }

  const handleGenerateCertificates = async () => {
    if (!file || previewData.length === 0) {
      toast({
        title: "No data available",
        description: "Please upload a valid file first.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate certificate generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsGenerating(false)
    setCertificateGenerated(true)
    toast({
      title: "Certificates generated",
      description: `${previewData.length} certificates have been generated and are ready for download.`,
    })
  }

  const handleDownloadCertificate = async () => {
    try {
      await downloadCertificate(
        `certificate-${previewData[previewIndex]?.name || "certificate"}-${Date.now()}`,
        "preview-certificate",
      )
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

  const handlePreviewNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setPreviewIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else {
      setPreviewIndex((prev) => (prev < previewData.length - 1 ? prev + 1 : prev))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload CSV or XLSX File</Label>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>

          {previewData.length > 0 && (
            <Alert>
              <AlertDescription>{previewData.length} records found in the file.</AlertDescription>
            </Alert>
          )}

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
                      onChange={(e) => handleCustomFieldChange("certificateId", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Certificate Title</Label>
                    <Input
                      id="title"
                      placeholder="Certificate of Achievement"
                      defaultValue="Certificate of Achievement"
                      onChange={(e) => handleCustomFieldChange("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Certificate Subtitle</Label>
                    <Input
                      id="subtitle"
                      placeholder="This certifies that"
                      defaultValue="This certifies that"
                      onChange={(e) => handleCustomFieldChange("subtitle", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievement-text">Achievement Text</Label>
                    <Input
                      id="achievement-text"
                      placeholder="has successfully completed"
                      defaultValue="has successfully completed"
                      onChange={(e) => handleCustomFieldChange("achievementText", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signature-text">Signature Text</Label>
                    <Input
                      id="signature-text"
                      placeholder="Signature"
                      onChange={(e) => handleCustomFieldChange("signature", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Input
                      id="date-format"
                      placeholder="Date Format (e.g., MMMM DD, YYYY)"
                      defaultValue="MMMM dd, yyyy"
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

          <Button
            className="w-full"
            onClick={handleGenerateCertificates}
            disabled={isGenerating || previewData.length === 0}
          >
            {isGenerating ? "Generating..." : "Generate Certificates"}
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
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="data" disabled={previewData.length === 0}>
                Data
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="pt-4">
              {previewData.length > 0 ? (
                <div className="space-y-4">
                  <CertificatePreview
                    data={previewData[previewIndex]}
                    template={selectedTemplate}
                    customFields={customFields}
                    signatureImage={signatureImage}
                    companyLogo={companyLogo}
                    id="preview-certificate"
                  />
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => handlePreviewNavigation("prev")}
                      disabled={previewIndex === 0}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      {previewIndex + 1} of {previewData.length}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => handlePreviewNavigation("next")}
                      disabled={previewIndex === previewData.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <p className="text-muted-foreground">Upload a file to preview certificates</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="data" className="pt-4">
              {previewData.length > 0 ? (
                <div className="overflow-auto max-h-[400px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        {Object.keys(previewData[0]).map((key) => (
                          <th key={key} className="text-left p-2">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className="border-b">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="p-2">
                              {value as string}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <p className="text-muted-foreground">No data available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
