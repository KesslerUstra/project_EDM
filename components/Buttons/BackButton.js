"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { TiArrowBackOutline, TiArrowBack } from "react-icons/ti";
import styles from './BackButton.module.css'

function BackButton(){

    const router = useRouter();

    function returnFunction(){
        var x = setTimeout('alert("x");',200);
        for (var i = 0; i <= x; i++)
            clearTimeout(i);
        router.back()
    }

    return (
        <button className={styles.back_button} onClick={() => returnFunction()}><TiArrowBackOutline /> <TiArrowBack className={styles.icon_back_button} /></button>
    )
}

export default BackButton;