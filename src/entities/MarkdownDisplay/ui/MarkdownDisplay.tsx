import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  content: string
}

export const MarkdownDisplay: React.FC<Props> = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>
}
