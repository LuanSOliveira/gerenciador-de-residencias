import styles from './Header.module.scss'

const Header = () => {
    return(
        <div className={styles.Header}>
            <img src='../icon-header.png' alt='ícone de casa'/>
            <h1>Minhas Residências</h1>
        </div>
    )
}

export default Header