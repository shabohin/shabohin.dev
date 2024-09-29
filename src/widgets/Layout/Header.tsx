import { FC } from 'react'

import cn from 'classnames'

import styles from './Layout.module.css'

interface Props {
  children: string
}

export const Header: FC<Props> = ({ children }) => {
  return <header className={cn(styles.content, styles.header)}>{children}</header>
}
