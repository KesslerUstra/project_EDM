"use client"

import { useLottie } from "lottie-react";
import animationLogo from "@/app/assets/json/logo.json";
import Image from 'next/image'
import background from '@/app/assets/img/background.png'
import styles from './LogoViewer.module.css'

const options = {
    animationData: animationLogo,
    loop: false
};

function LogoViewer(){

    const { View } = useLottie(options);

    return(
        <>
            <Image style={{objectFit: 'contain', width: '100%', height: '100%', opacity: '0'}} src={background} alt='Logo' />
            <div className={styles.logo_box_absolute}>
                {View}
            </div>
        </>
    )
}

export default LogoViewer;
