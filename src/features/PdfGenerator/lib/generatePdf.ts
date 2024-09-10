import fs from 'fs'
import path from 'path'
import markdownIt from 'markdown-it'
import htmlPdf from 'html-pdf'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export async function generatePdf() {
  try {
    const inputFile = path.join(process.cwd(), 'content', 'resume.md')
    const outputFile = path.join(process.cwd(), 'public', 'resume.pdf')

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
            :root {
              --color-white: rgb(234, 230, 226);
              --color-light: rgb(164, 163, 161);
              --color-dark: rgb(92, 93, 95);
              --color-black: rgb(20, 26, 32);
            }
            body {
              font-family: 'Helvetica', 'Arial', sans-serif;
              line-height: 1.5;
              color: var(--color-black);
              font-size: 9pt;
              margin: 0;
              // padding: 20pt;
              max-width: 800pt;
              margin: 0 auto;
            }
            h1 {
              color: var(--color-black);
              font-size: 18pt;
              margin-bottom: 5pt;
              border-bottom: 1pt solid var(--color-light);
              padding-bottom: 5pt;
            }
            h2 {
              color: var(--color-dark);
              font-size: 14pt;
              margin-top: 15pt;
              margin-bottom: 5pt;
            }
            h3 {
              color: var(--color-dark);
              font-size: 12pt;
              margin-top: 10pt;
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
              color: var(--color-dark) !important;
              text-decoration: underline;

            }
            h1 + p {
              margin-bottom: 10pt;
            }
            h2 + p {
              font-weight: bold;
            }
            h2 + p + p {
              color: var(--color-light);
              font-style: italic;
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

    console.log('PDF успешно сгенерирован')
  } catch (error) {
    console.error('Ошибка при генерации PDF:', error)
    throw error
  }
}

export default generatePdf
