import React from 'react'
import styles from './page.module.css'
import LogoViewer from '@/components/LogoViewer'
import SearchProblems from '@/components/SearchProblems'

export default function Home() {

  return (
    <>
      <div className={styles.main}>
        <div className={styles.logo}>
          <LogoViewer />
        </div>
        <div className={styles.title_list_box}>
          <div className={styles.stroke}></div>
          <div className={styles.bar} style={{margin: ' 0px 36px 0px -10px'}}></div>
          <h2>Lista de Problemas</h2>
          <div className={styles.bar} style={{margin: ' 0px 20px 0px 6px'}}></div>
          <div className={styles.stroke}></div>
        </div>
        <SearchProblems />
      </div>
    </>
  )
}