import Link from "next/link";
import styles from './page.module.css';
import BackButton from "@/components/Buttons/BackButton";
import createImage from '@/public/img/create_back.png';
import importImage from '@/public/img/import_back.png';
import Image from "next/image";


export default function ChoicePage(){
    return (
        <div className={styles.choice_box}>
            <BackButton />
            <h2>Escolha uma Opção</h2>
            <div className={styles.cards_box}>
                <Link href={'./create'} className={styles.card_box} style={{'--color-card-stroke': 'var(--color-green-1)'}}>
                    <div>
                        <span className={styles.title_card}>
                            <span></span>
                            <span></span>
                            <span></span>
                            Criar Problema
                        </span>
                    </div>
                    <div className={styles.background_box}>
                    <Image priority={false} style={{objectFit: 'contain', width: '100%', height: '100%'}} src={createImage} alt='Imagem de fundo com polignos' />
                    </div>
                </Link>
                <Link href={''}  aria-disabled={true} className={styles.card_box} style={{'--color-card-stroke': 'var(--color-blue-4)' , pointerEvents: 'none'}}>
                    <div>
                        <span className={styles.title_card}>
                            <span></span>
                            <span></span>
                            <span></span>
                            Importar Problema
                        </span>
                    </div>
                    <div className={styles.background_box}>
                    <Image priority={false} style={{objectFit: 'contain', width: '100%', height: '100%'}} src={importImage} alt='Imagem de fundo com polignos' />
                    </div>
                </Link>
            </div>
        </div>
    )
}