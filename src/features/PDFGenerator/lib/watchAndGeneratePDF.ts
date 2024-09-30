import chokidar from 'chokidar'
import path from 'path'
import { generatePDF } from './generatePDF'

export function watchAndGeneratePDF() {
  const resumePath = path.join(process.cwd(), 'content', 'resume.md')
  const generatePDFPath = path.join(process.cwd(), 'src', 'features', 'PDFGenerator', 'lib', 'generatePDF.ts')

  const watcher = chokidar.watch([resumePath, generatePDFPath], {
    persistent: true,
  })

  const reloadGeneratePDF = () => {
    delete require.cache[require.resolve('./generatePDF')]
    return require('./generatePDF').generatePdf
  }

  const resumeMarkdownPath = path.join(process.cwd(), 'content', 'resume.md')
  const resumeOutputPath = path.join(process.cwd(), 'out', 'resume.pdf')
  generatePDF(resumeMarkdownPath, resumeOutputPath).catch(console.error)

  const cvMarkdownPath = path.join(process.cwd(), 'content', 'cv.md')
  const cvOutputPath = path.join(process.cwd(), 'out', 'cv.pdf')
  generatePDF(cvMarkdownPath, cvOutputPath).catch(console.error)

  watcher.on('change', async (changedPath) => {
    console.log(`File ${changedPath} has been changed`)

    if (changedPath === generatePDFPath) {
      console.log('Reloading generatePDF module')
      const updatedGeneratePdf = reloadGeneratePDF()
      await updatedGeneratePdf().catch(console.error)
    } else {
      generatePDF(resumeMarkdownPath, resumeOutputPath).catch(console.error)
      generatePDF(cvMarkdownPath, cvOutputPath).catch(console.error)
    }
  })

  console.log(`Watching for changes in ${resumePath} and ${generatePDFPath}`)

  return () => watcher.close()
}
