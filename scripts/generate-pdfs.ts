import { generatePdf } from '../src/features/PdfGenerator'

generatePdf()
  .then(() => {
    console.log('PDF generation complete')
  })
  .catch((error) => {
    console.error('PDF generation failed:', error)
    process.exit(1)
  })
