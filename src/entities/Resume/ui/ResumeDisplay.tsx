import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  content: string
}

const ResumeDisplay: React.FC<Props> = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>
}

export default ResumeDisplay
