import { useContext } from 'react'
import { AppContext } from '../../context/context'
import { FormatarDatas } from '../../functions/dates'
import styles from './CardMesPagamento.module.scss'

const CardMesPagamento = ({idMes, ano}) => {
    const {setApresentaEditPagamento, setMesSelecionado} = useContext(AppContext)
    const mesSelecionado = ano.meses[idMes]

    function EditaBordaStatus(status){
        if(status === 'Aguardando'){
            return `${styles.BordaStatus} ${styles.BordaStatusAguardando}`
        }
        else if(status === 'Caução'){
            return `${styles.BordaStatus} ${styles.BordaStatusCaucao}`
        }
        else if(status === 'Pago'){
            return `${styles.BordaStatus} ${styles.BordaStatusPago}`
        }
        else if(status === 'Pago com Atraso'){
            return `${styles.BordaStatus} ${styles.BordaStatusAtraso}`
        }
        else if(status === 'Devendo'){
            return `${styles.BordaStatus} ${styles.BordaStatusDevendo}`
        }
    }

    function ApresentaEditarPagamento(){
        setApresentaEditPagamento(true)
        setMesSelecionado(mesSelecionado)
    }

    return(
        <div className={styles.CardMesPagamento} onClick={ApresentaEditarPagamento}>
            <div className={EditaBordaStatus(mesSelecionado.status)}></div>
            <div className={styles.BoxInformacoes}>
                <div className={styles.Cabecalho}>
                    <div className={styles.Textos}>
                        <h3>{mesSelecionado.mes}</h3>
                        <p><b>Status:</b> {mesSelecionado.status}</p>
                    </div>
                    <img src={(mesSelecionado.nota) ? '../icon-card-9.png' : '../icon-card-8.png' } alt='ícone de notas'/>
                </div>
                <div className={styles.Datas}>
                    <p><b>Vencimento:</b> {FormatarDatas(mesSelecionado.vencimento)}</p>
                    <p><b>Pagamento:</b> {(mesSelecionado.pagamento) ? FormatarDatas(mesSelecionado.pagamento) : '---'}</p>
                    <p><b>Pagamento Via:</b> {(mesSelecionado.formaPag) ? mesSelecionado.formaPag : '---'}</p>
                </div>
            </div>
        </div>
    )
}

export default CardMesPagamento