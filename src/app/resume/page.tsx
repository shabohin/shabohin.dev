import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import ResumeDisplay from '@/entities/Resume/ui/ResumeDisplay'

async function getResumeContent() {
    const resumePath = path.join(process.cwd(), 'content', 'full-resume.md')
    const resumeContent = await fs.readFile(resumePath, 'utf8')
    return resumeContent
}

export default async function ResumePage() {
    const resumeContent = await getResumeContent()

    return (
        <div className="page-container">
            <ResumeDisplay content={resumeContent} />
        </div>
    )
}