
import React from 'react'
import PageProblems from '@/components/PageProblems';


export default function Home({params}) {
  console.log(params)
  return (
    <PageProblems confg={params.problemHeader} />
  )
}