import React from 'react'
import PageProblems from '@/components/PageProblems';


export default function HomeProblems({params}) {
  return (
    <PageProblems confgId={params.problemHeader} />
  )
}