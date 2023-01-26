import { useContext, useState } from 'react'
import { AppContext } from '../../context/context'
import { db } from '../../Database/db'
import { doc, updateDoc } from 'firebase/firestore'
import Button from '../Button/button'
import styles from './Formulario.module.scss'
import { PagamentosPorMes } from '../../functions/meses'

const FormularioCriaAno = ({idDaCasa}) => {
    const {setApresentaCriaAno, listaCasas} = useContext(AppContext)

    const [novoAno, setNovoAno] = useState('')

    function FecharForm(){
        setApresentaCriaAno(false)
    }

    async function AtualizarDados(e){
        e.preventDefault()

        const listaPagamentos = listaCasas[idDaCasa].pagamentos
        const pagamentoAdicionado = {ano: novoAno, id: listaPagamentos.length, meses: PagamentosPorMes(novoAno)}
        listaPagamentos.push(pagamentoAdicionado)
        const casaDocRef = doc(db, 'casas', `${idDaCasa}`)
        await updateDoc(casaDocRef, {pagamentos: listaPagamentos})
        FecharForm()

    }

    return(
        <div className={styles.BoxFormulario}>
            <form className={styles.Formulario} onSubmit={(e) => AtualizarDados(e)} data-aos="zoom-in">
                <div className={styles.Titulo}>
                    <h2>NOVO ANO</h2>
                    <img src='../icon-form-1.png' alt='ícone botão fechar' onClick={FecharForm}/>
                </div>
                <div className={styles.CamposInput}>
                    <input 
                        type='number' placeholder='Informe o ano' required 
                        value={novoAno} onChange={(e) => setNovoAno(e.target.value)}
                    />
                </div>
                <div className={styles.BoxBotao}>
                    <Button descricao={'Salvar'}/>                    
                </div>
            </form>
        </div>
    )
}

export default FormularioCriaAno