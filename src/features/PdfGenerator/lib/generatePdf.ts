import fs from 'fs'
import path from 'path'
import markdownIt from 'markdown-it'
import htmlPdf from 'html-pdf'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export async function generatePdf() {
  try {
    const inputFile = path.join(process.cwd(), 'content', 'resume.md')
    const outputFile = path.join(process.cwd(), 'out', 'resume.pdf')

    const markdown = await readFile(inputFile, 'utf8')

    const md = new markdownIt()
    const html = md.render(markdown)

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Roman Shabohin - Resume</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
            body {
              font-family: 'Mulish', 'Helvetica', 'Arial', sans-serif;
              line-height: 1.5;
              color: #141a20;
              font-size: 9pt;
              margin: 0;
              max-width: 800pt;
              margin: 0 auto;
            }
            h1 {
              color: #141a20;
              font-size: 18pt;
              margin-bottom: 8pt;
            }
            h2 {
              color: #141a20;
              font-size: 14pt;
              margin-top: 10pt;
              margin-bottom: 5pt;
            }
            h3 {
              color: #141a20;
              font-size: 12pt;
              margin-top: 10pt;
              margin-bottom: 5pt;
            }
            h4 {
              color: #141a20;
              font-size: 10pt;
              margin-top: 8pt;
              margin-bottom: 5pt;
            }
            p {
              margin: 0 0 5pt 0;
            }
            ul {
              margin: 5pt 0;
              padding-left: 15pt;
            }
            li {
              margin-bottom: 3pt;
            }
            a {
              color: #141a20;
              text-decoration: underline;
            }
            h1 + p {
              margin-bottom: 10pt;
            }
          </style>
      </head>
      <body>
          ${html}
      </body>
      </html>
    `

    const options = {
      format: 'A4' as 'A4',
      border: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in',
      },
    }

    await new Promise((resolve, reject) => {
      htmlPdf.create(fullHtml, options).toFile(outputFile, (err, res) => {
        if (err) {
          console.error('Error when creating PDF:', err)
          reject(err)
        } else {
          console.log(`PDF successfully created: ${res.filename}`)
          resolve(res)
        }
      })
    })

    console.log('PDF successfully generated')
  } catch (error) {
    console.error('Error during PDF generation:', error)
    throw error
  }
}

export default generatePdf
