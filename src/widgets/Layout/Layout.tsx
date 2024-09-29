import { FC, ReactNode } from 'react'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { LayoutSizeObserver } from './LayoutSizeObserver'

import styles from './Layout.module.css'

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> & {
  Header: typeof Header
  Main: typeof Main
  Footer: typeof Footer
} = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <LayoutSizeObserver />
    </div>
  )
}

Layout.Header = Header
Layout.Main = Main
Layout.Footer = Footer
