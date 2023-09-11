import styles from './SoonPage.module.css';
import HomeButton from '../Buttons/HomeButton';

export default function SoonPage({title = undefined, notFound = false}){
    return(
        <div className={styles.soon_box}>
            {!notFound &&
                <span className={styles.title}>Página em Desenvolvimento</span>
            }
            {title !== undefined &&
                <span className={styles.description}>{title}</span>
            }
            <div style={{marginTop: '60px'}}>
                <HomeButton />
            </div>
        </div>
    )
}