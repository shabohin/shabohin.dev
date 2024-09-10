import chokidar from 'chokidar'
import path from 'path'
import { generatePdf } from './generatePdf'

export function watchAndGeneratePdf() {
  const resumePath = path.join(process.cwd(), 'content', 'resume.md')
  const generatePdfPath = path.join(process.cwd(), 'src', 'features', 'PdfGenerator', 'lib', 'generatePdf.ts')

  const watcher = chokidar.watch([resumePath, generatePdfPath], {
    persistent: true,
  })

  const reloadGeneratePdf = () => {
    delete require.cache[require.resolve('./generatePdf')]
    return require('./generatePdf').generatePdf
  }

  generatePdf().catch(console.error)

  watcher.on('change', async (changedPath) => {
    console.log(`File ${changedPath} has been changed`)

    if (changedPath === generatePdfPath) {
      console.log('Reloading generatePdf module')
      const updatedGeneratePdf = reloadGeneratePdf()
      await updatedGeneratePdf().catch(console.error)
    } else {
      await generatePdf().catch(console.error)
    }
  })

  console.log(`Watching for changes in ${resumePath} and ${generatePdfPath}`)

  return () => watcher.close()
}
