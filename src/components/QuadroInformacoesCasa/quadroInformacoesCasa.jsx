import { useContext } from 'react'
import { AppContext } from '../../context/context'
import { FormatarDatas } from '../../functions/dates'
import CardMesPagamento from '../CardMesPagamento/cardMesPagamento'
import styles from './QuadroInformacoesCasa.module.scss'

const QuadroInformacoesCasa = ({idDaCasa}) => {
    const {setApresentaCriaAno, listaCasas, listaLocatarios, anoSelecionado, setAnoSelecionado} = useContext(AppContext)

    const casaSelecionada = listaCasas[idDaCasa]

    function DefineIcone(){
        if(casaSelecionada.status === 'locada'){
            return '../icon-card-1.png'
        }
        else if(casaSelecionada.status === 'liberada'){
            return '../icon-card-2.png'
        }
        else if(casaSelecionada.status === 'fechada'){
            return '../icon-card-3.png'
        }
    }

    return(
        <div className={styles.QuadroInformacoesCasa}>
            <div className={styles.BoxInformacoes}>
                <div className={styles.BoxCabecalho}>
                    <img className={styles.IconPadrao} src={DefineIcone()} alt='ícone de casa'/>
                    <div className={styles.Cabecalho}>
                        <h2>{casaSelecionada.nome}</h2>
                    </div>
                </div>
                <div className={styles.BoxEndereco}>
                    <h3>Endereço:</h3>
                    <p>{`${casaSelecionada.endereco}, ${casaSelecionada.numero} ${casaSelecionada.complemento}`}</p>
                    <p>{`Bairro: ${casaSelecionada.bairro}`}</p>
                </div>
                <div className={styles.BoxLocatario}>
                    <h3>Locatario:</h3>
                    <div className={styles.Locatario}>
                        {
                            (!casaSelecionada.locatario)
                            ?
                                <>
                                    <p>Sem locatário nesta casa</p>
                                    <p>Início de contrato: ---</p>
                                    <p>Telefone: (--) ---</p>
                                </>
                            :
                                <>
                                    <p>{listaLocatarios[casaSelecionada.locatario].nome}</p>
                                    <p>{`Início de contrato: ${FormatarDatas(listaLocatarios[casaSelecionada.locatario].contrato.inicio)}`}</p>                                
                                    <p>{`Telefone: (${listaLocatarios[casaSelecionada.locatario].telefone.ddd}) ${listaLocatarios[casaSelecionada.locatario].telefone.numero}`}</p>                                
                                </>
                        }
                    </div>
                </div>
                <div className={styles.BoxPagamentos}>
                    <h2>Pagamentos</h2>
                    <div className={styles.SelectAno}>
                        <select onChange={(e) => setAnoSelecionado(e.target.value)}>
                            <option value=''></option>
                            {
                                casaSelecionada.pagamentos.map(
                                    (pagamento) => <option key={pagamento.id} value={pagamento.id}>{pagamento.ano}</option>
                                )
                            }
                        </select>
                        <img src='../icon-card-7.png' alt='ícone adicionar ano' onClick={() => setApresentaCriaAno(true)}/>
                    </div>
                    <div className={styles.BoxCardsPagamento}>
                        {
                            (!anoSelecionado)
                            ? ""
                            : casaSelecionada.pagamentos[anoSelecionado].meses.map(
                                (mes) => <CardMesPagamento key={mes.id} idMes={mes.id} ano={casaSelecionada.pagamentos[anoSelecionado]}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuadroInformacoesCasa