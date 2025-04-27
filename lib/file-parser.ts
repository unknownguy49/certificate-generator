import * as XLSX from "xlsx"

export async function parseFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result

        if (file.name.endsWith(".csv")) {
          // Parse CSV
          const result = parseCSV(data as string)
          resolve(result)
        } else if (file.name.endsWith(".xlsx")) {
          // Parse XLSX
          const result = parseXLSX(data)
          resolve(result)
        } else {
          reject(new Error("Unsupported file format"))
        }
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}

function parseCSV(csvData: string): any[] {
  // Simple CSV parser
  const lines = csvData.split("\n")
  const headers = lines[0].split(",").map((header) => header.trim())

  const result = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    const values = lines[i].split(",").map((value) => value.trim())
    const row: Record<string, string> = {}

    headers.forEach((header, index) => {
      row[header] = values[index] || ""
    })

    result.push(row)
  }

  return result
}

function parseXLSX(data: ArrayBuffer | string): any[] {
  const workbook = XLSX.read(data, { type: "array" })
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]

  return XLSX.utils.sheet_to_json(worksheet)
}
