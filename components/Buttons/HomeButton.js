"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineHome } from "react-icons/ai";
import styles from './HomeButton.module.css'

function BackButton(){

    const router = useRouter();

    return (
        <button className={styles.home_button} onClick={() => router.push('/')}><AiOutlineHome /></button>
    )
}

export default BackButton;