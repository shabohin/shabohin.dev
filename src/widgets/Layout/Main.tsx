import { FC } from 'react'
import styles from './Layout.module.css'

interface Props {
  children: React.ReactNode
}

export const Main: FC<Props> = ({ children }) => {
  return <footer className={styles.content}>{children}</footer>
}
