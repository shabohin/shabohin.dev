import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import ResumeDisplay from '@/entities/Resume/ui/ResumeDisplay'
import { Layout } from '@/widgets/Layout/Layout'

async function getResumeContent() {
  const resumePath = path.join(process.cwd(), 'content', 'resume.md')
  const resumeContent = await fs.readFile(resumePath, 'utf8')
  return resumeContent
}

export default async function ResumePage() {
  const resumeContent = await getResumeContent()

  return (
    <>
      <Layout.Header>Resume</Layout.Header>
      <Layout.Main>
        <ResumeDisplay content={resumeContent} />
      </Layout.Main>
    </>
  )
}
