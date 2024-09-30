import { generatePDF } from '../src/features/PDFGenerator'
import path from 'path'

const resumeMarkdownPath = path.join(process.cwd(), 'content', 'resume.md')
const resumeOutputPath = path.join(process.cwd(), 'out', 'resume.pdf')

const cvMarkdownPath = path.join(process.cwd(), 'content', 'cv.md')
const cvOutputPath = path.join(process.cwd(), 'out', 'cv.pdf')

try {
  generatePDF(resumeMarkdownPath, resumeOutputPath)
  generatePDF(cvMarkdownPath, cvOutputPath)
  console.log('PDF generation completed successfully.')
} catch (error) {
  console.error('PDF generation failed:', error)
}
