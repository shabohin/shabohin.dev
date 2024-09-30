import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import { MarkdownDisplay } from '@/entities/MarkdownDisplay/ui/MarkdownDisplay'
import { Layout } from '@/widgets/Layout/Layout'

async function getCVContent() {
  const resumePath = path.join(process.cwd(), 'content', 'cv-page.md')
  const resumeContent = await fs.readFile(resumePath, 'utf8')
  return resumeContent
}

export default async function CVPage() {
  const resumeContent = await getCVContent()

  return (
    <>
      <Layout.Header>CV</Layout.Header>
      <Layout.Main>
        <MarkdownDisplay content={resumeContent} />
      </Layout.Main>
    </>
  )
}
