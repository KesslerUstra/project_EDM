"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { TiArrowBackOutline, TiArrowBack } from "react-icons/ti";
import styles from './BackButton.module.css'

function BackButton(){

    const router = useRouter();

    return (
        <button className={styles.back_button} onClick={() => router.back()} type='button'><TiArrowBackOutline /> <TiArrowBack className={styles.icon_back_button} /></button>
    )
}

export default BackButton;