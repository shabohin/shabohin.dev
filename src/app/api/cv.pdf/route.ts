import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const pdfPath = path.join(process.cwd(), 'out', 'cv.pdf')

  if (fs.existsSync(pdfPath)) {
    const pdfBuffer = fs.readFileSync(pdfPath)
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=cv.pdf',
      },
    })
  } else {
    return new NextResponse('PDF not found', { status: 404 })
  }
}
