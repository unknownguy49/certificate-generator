import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BulkCertificateGenerator from "@/components/bulk-certificate-generator"
import SingleCertificateGenerator from "@/components/single-certificate-generator"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Certificate Generator</h1>
        <ModeToggle />
      </header>

      <Tabs defaultValue="bulk" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="bulk">Bulk Generation</TabsTrigger>
          <TabsTrigger value="single">Single Certificate</TabsTrigger>
        </TabsList>
        <TabsContent value="bulk" className="mt-6">
          <BulkCertificateGenerator />
        </TabsContent>
        <TabsContent value="single" className="mt-6">
          <SingleCertificateGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
