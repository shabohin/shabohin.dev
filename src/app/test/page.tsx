import { Layout } from '@/widgets/Layout/Layout'
import React from 'react'

export default async function TestPage() {
  return (
    <Layout.Main>
      <div>the quick brown fox jumps over the lazy dog</div>
      <div>THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG</div>
      <div>{'1234567890-=!@#$%^&*()_+[{}]`~;:\'",<.>/?|'}</div>
    </Layout.Main>
  )
}
