import styles from './page.module.css';
import SearchProblems from '@/components/SearchProblems';

export default function ProblemsLobby(){
    
    return(
        <div className={styles.main}>
            <h2 className={styles.title_problem}>Página de Problemas</h2>
            <SearchProblems />
        </div>
    )
}