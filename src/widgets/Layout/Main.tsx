import { FC } from 'react'
import styles from './Layout.module.css'
import cn from 'classnames'

interface Props {
  children: React.ReactNode
}

export const Main: FC<Props> = ({ children }) => {
  return <footer className={cn(styles.content, styles.main)}>{children}</footer>
}
