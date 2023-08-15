"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { TiArrowBackOutline } from "react-icons/ti";
import styles from './BackButton.module.css'

function BackButton(){

    const router = useRouter();

    return (
        <button className={styles.back_button} onClick={() => router.back()} type='button'><TiArrowBackOutline /></button>
    )
}

export default BackButton;