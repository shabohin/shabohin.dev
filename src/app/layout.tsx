import { ReactNode } from 'react'
import '@/shared/styles/global.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="window">
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  )
}
