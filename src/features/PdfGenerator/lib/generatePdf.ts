import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'
import { promisify } from 'util'
import { marked } from 'marked'

const readFile = promisify(fs.readFile)

async function markdownToHtml(markdown: string): Promise<string> {
  return marked.parse(markdown)
}

export async function generatePdf() {
  try {
    const resumeContent = await readFile(path.join(process.cwd(), 'content', 'full-resume.md'), 'utf8')
    const htmlContent = await markdownToHtml(resumeContent)
    console.log('resumeContent :>> ', resumeContent);

    const doc = new PDFDocument()
    const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf')
    const writeStream = fs.createWriteStream(pdfPath)

    doc.pipe(writeStream)

    doc.fontSize(16).text('Resume1', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text(htmlContent, { align: 'left' })

    doc.end()

    await new Promise((resolve) => writeStream.on('finish', resolve))

    console.log('PDF successfully generated on assemblyе')
  } catch (error) {
    console.error('Error during PDF generation during build:', error)
    throw error
  }
}

module.exports = { generatePdf }
