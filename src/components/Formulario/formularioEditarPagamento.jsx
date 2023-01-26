import { useContext, useState } from 'react'
import { AppContext } from '../../context/context'
import { db } from '../../Database/db'
import { doc, updateDoc } from 'firebase/firestore'
import Button from '../Button/button'
import styles from './Formulario.module.scss'

const FormularioEditarPagamento = ({idDaCasa}) => {
    const {
            setApresentaEditPagamento, mesSelecionado, 
            setMesSelecionado, anoSelecionado, listaCasas
          } = useContext(AppContext)

    const [dataVencimento, setDataVencimento] = useState(mesSelecionado.vencimento)
    const [dataPagamento, setDataPagamento] = useState(mesSelecionado.pagamento)
    const [statusPagamento, setStatusPagamento] = useState(mesSelecionado.status)
    const [notasPagamento, setNotasPagamento] = useState(mesSelecionado.nota)
    const [formaPagamento, setFormaPagamento] = useState(mesSelecionado.formaPag)

    const [desabilitarDados, setDesabilitarDados] = useState(true)
    const [editar, setEditar] = useState(false)

    function AtivarEdicao(){
        setEditar(true)
        setDesabilitarDados(false)
    }

    function FecharForm(){
        setApresentaEditPagamento(false)
        setMesSelecionado('')
    }

    async function AtualizarDados(){
        let listaPagamentos = listaCasas[idDaCasa].pagamentos
        listaPagamentos[anoSelecionado].meses[mesSelecionado.id].pagamento = dataPagamento
        listaPagamentos[anoSelecionado].meses[mesSelecionado.id].vencimento = dataVencimento
        listaPagamentos[anoSelecionado].meses[mesSelecionado.id].status = statusPagamento
        listaPagamentos[anoSelecionado].meses[mesSelecionado.id].nota = notasPagamento
        listaPagamentos[anoSelecionado].meses[mesSelecionado.id].formaPag = formaPagamento

        const casaDocRef = doc(db, 'casas', `${idDaCasa}`)
        await updateDoc(casaDocRef, {pagamentos: listaPagamentos})
        FecharForm()
    }

    return(
        <div className={styles.BoxFormulario}>
            <form className={styles.Formulario} onSubmit={(e) => e.preventDefault()} data-aos="zoom-in">
                <div className={styles.Titulo}>
                    <h2>{mesSelecionado.mes}</h2>
                    <img src='../icon-form-1.png' alt='ícone botão fechar' onClick={FecharForm}/>
                </div>
                <div className={styles.CamposInput}>
                    <label>
                        Data Vencimento:
                        <input 
                            type='date' placeholder='Vencimento' required 
                            value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)}
                            disabled={desabilitarDados}
                        />
                    </label>
                    <label>
                        Data Pagamento:
                        <input 
                            type='date' placeholder='Pagamento' required 
                            value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)}
                            disabled={desabilitarDados}
                        />
                    </label>
                    <label>
                        Status: 
                        <select onChange={(e) => setStatusPagamento(e.target.value)} value={statusPagamento} disabled={desabilitarDados}>
                            <option value='Aguardando'>Aguardando</option>
                            <option value='Caução'>Caução</option>
                            <option value='Pago'>Pago</option>
                            <option value='Pago com Atraso'>Pago com Atraso</option>
                            <option value='Devendo'>Devendo</option>
                        </select>
                    </label>
                    <label>
                        Pagamento: 
                        <select onChange={(e) => setFormaPagamento(e.target.value)} value={formaPagamento} disabled={desabilitarDados}>
                            <option value=''></option>
                            <option value='Dinehiro'>Dinheiro</option>
                            <option value='PIX'>PIX</option>
                            <option value='Transferencia'>Transferência</option>
                        </select>
                    </label>
                    <textarea
                        type='text' placeholder='Notas'
                        value={notasPagamento} onChange={(e) => setNotasPagamento(e.target.value)}
                        disabled={desabilitarDados}
                    >
                    </textarea>                        
                </div>
                <div className={styles.BoxBotao}>
                    {
                        (editar) ? <Button descricao={'Salvar'} clicar={AtualizarDados}/> : <Button descricao={'Editar'} clicar={AtivarEdicao}/>
                    }
                </div>
            </form>
        </div>
    )
}

export default FormularioEditarPagamento