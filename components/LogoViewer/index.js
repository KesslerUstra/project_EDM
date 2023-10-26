"use client"

import { useLottie } from "lottie-react";
import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from './LogoViewer.module.css';

import animationLogo from "@/app/assets/json/logo.json";
import background from '@/public/img/background.png';


const options = {
    animationData: animationLogo,
    loop: false
};

function LogoViewer(){

    const [animationFinished, setAnimationFinished] = useState(false);
    const { View, destroy } = useLottie({
        ...options,
        onComplete: () => {
            setAnimationFinished(true);
        }
    });

    useEffect(() => {
        if (animationFinished) {
            destroy();
        }
    }, [animationFinished, destroy]);

    return(
        <>
            <Image style={{objectFit: 'contain', width: '100%', height: '100%', opacity: animationFinished ? '1' : '0', padding: '1.5px 0px'}} src={background} alt='Logo EDM' />
            <div className={styles.logo_box_absolute}>
                {View}
            </div>
        </>
    )
}

export default LogoViewer;