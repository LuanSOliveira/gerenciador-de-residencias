import styles from './Button.module.scss'

const Button = ({descricao, clicar}) => {
    return(
        <button className={styles.Button} onClick={clicar}>{descricao}</button>
    )
}

export default Button