import html2canvas from "html2canvas"

export async function downloadCertificate(filename: string, elementId: string): Promise<void> {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error("Certificate element not found")
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      allowTaint: true,
      backgroundColor: null,
    })

    // Convert to PNG
    const dataUrl = canvas.toDataURL("image/png")

    // Create download link
    const link = document.createElement("a")
    link.download = `${filename}.png`
    link.href = dataUrl
    link.click()

    return Promise.resolve()
  } catch (error) {
    console.error("Error generating certificate:", error)
    return Promise.reject(error)
  }
}
