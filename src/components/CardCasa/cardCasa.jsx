import styles from './CardCasa.module.scss'

const CardCasa = ({casa, locatario}) => {
    function DefineIcone(){
        if(casa.status === 'locada'){
            return './icon-card-1.png'
        }
        else if(casa.status === 'liberada'){
            return './icon-card-2.png'
        }
        else if(casa.status === 'fechada'){
            return './icon-card-3.png'
        }
    }

    function DefineNomeLocatario(){
        if(locatario){
            return locatario.nome
        }
        else{
            return 'Sem Locatário'
        }
    }

    function DefineTelefoneLocatario(){
        if(locatario){
            return `(${locatario.telefone.ddd}) ${locatario.telefone.numero}`
        }
        else{
            return '- - -'
        }
    }

    return(
        <div className={styles.CardCasa}>
            <div className={styles.Titulo}>
                <img className={styles.IconPadrao} src={DefineIcone()} alt='ícone de casa'/>
                <div className={styles.Descricao}>
                    <h2>{casa.nome}</h2>
                    <h3>{`Locatário: ${DefineNomeLocatario()}`}</h3>
                </div>
            </div>
            <div className={styles.Informacoes}>
                <p>{`${casa.endereco}, ${casa.numero} ${casa.complemento}`}</p>
                <p>{`Bairro: ${casa.bairro}`}</p>
                <div className={styles.Contato}>
                    <img className={styles.IconContato} src='./icon-card-4.png' alt='ícone de telefone'/>
                    <p>{DefineTelefoneLocatario()}</p>
                </div>
            </div>
        </div>
    )
}

export default CardCasa