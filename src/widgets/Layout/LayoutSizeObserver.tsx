'use client'

import { useEffect, useState } from 'react'
import styles from './Layout.module.css'

export const LayoutSizeObserver = () => {
  useEffect(() => {
    const updateLayout = () => {
      const style = getComputedStyle(document.documentElement)
      const scale = parseInt(style.getPropertyValue('--scale'))
      const symbolWidth = parseInt(style.getPropertyValue('--symbol-width'))
      const symbolHeight = parseInt(style.getPropertyValue('--symbol-line-height'))

      const maxCols = Math.floor(window.innerWidth / (symbolWidth * scale))
      const maxRows = Math.floor(window.innerHeight / (symbolHeight * scale))

      let cols = maxCols
      let rows = maxRows

      document.documentElement.style.setProperty('--cols', cols.toString())
      document.documentElement.style.setProperty('--rows', rows.toString())

      console.log(
        `Screen size: ${cols}x${rows} characters | Char size: ${symbolWidth * scale}x${
          symbolHeight * scale
        } | Scale: ${scale}x | Screen width: ${window.innerWidth}px`,
      )
    }

    window.addEventListener('resize', updateLayout)
    updateLayout()

    return () => {
      window.removeEventListener('resize', updateLayout)
    }
  }, [])

  return null
}
