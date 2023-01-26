import { useContext } from 'react'
import { AppContext } from '../../context/context'
import { FormatarDatas } from '../../functions/dates'
import styles from './CardLocatario.module.scss'

const CardLocatario = ({locatario, idLocatario}) => {

    const {setApresentaEdit, setLocatarioSelecionado} = useContext(AppContext)

    function DefineIcon(){
        if(locatario.status === 'ativo'){
            return '../icon-card-5.png'
        }
        else{
            return '../icon-card-6.png'
        }
    }

    function AbrirFormEditar(){
        setApresentaEdit(true)
        setLocatarioSelecionado(idLocatario)
    }

    return(
        <div className={styles.CardLocatario} onClick={AbrirFormEditar}>
            <div className={styles.Titulo}>
                <img className={styles.IconPadrao} src={DefineIcon()} alt='ícone de locatário'/>
                <div className={styles.Descricao}>
                    <h2>{locatario.nome}</h2>
                </div>
            </div>
            <div className={styles.Informacoes}>
                <p>{`Contrato Início: ${FormatarDatas(locatario.contrato.inicio)}`}</p>
                <p>{`Contrato Fim: ${FormatarDatas(locatario.contrato.fim)}`}</p>
                <div className={styles.Contato}>
                    <img className={styles.IconContato} src='../icon-card-4.png' alt='ícone de telefone'/>
                    <p>{`(${locatario.telefone.ddd}) ${locatario.telefone.numero}`}</p>
                </div>
            </div>

        </div>
    )
}

export default CardLocatario