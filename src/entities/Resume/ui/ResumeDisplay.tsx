import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
    content: string
}

const ResumeDisplay: React.FC<Props> = ({ content }) => {
    return (
        <div className="resume-container">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    )
}

export default ResumeDisplay
