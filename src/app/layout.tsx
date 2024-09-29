import '@/shared/styles/global.css'
import { Layout } from '@/widgets/Layout/Layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
          <Layout.Footer>footer</Layout.Footer>
        </Layout>
      </body>
    </html>
  )
}
