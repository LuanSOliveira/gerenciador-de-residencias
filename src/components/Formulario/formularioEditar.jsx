import { useContext, useState } from 'react'
import { AppContext } from '../../context/context'
import { db, locatariosCollectionRef } from '../../Database/db'
import { doc, getDocs, updateDoc } from 'firebase/firestore'
import Button from '../Button/button'
import styles from './Formulario.module.scss'

const FormularioEditar = () => {
    const {setApresentaEdit, listaLocatarios, setListaLocatarios, locatarioSelecionado, setLocatarioSelecionado, setListaLocatariosFiltrada} = useContext(AppContext)

    const [locatarioNome, setLocatarioNome] = useState(listaLocatarios[locatarioSelecionado].nome)
    const [locatarioContratoIni, setLocatarioContratoIni] = useState(listaLocatarios[locatarioSelecionado].contrato.inicio)
    const [locatarioContratoFim, setLocatarioContratoFim] = useState(listaLocatarios[locatarioSelecionado].contrato.fim)
    const [locatarioDdd, setLocatarioDdd] = useState(listaLocatarios[locatarioSelecionado].telefone.ddd)
    const [locatarioNumero, setLocatarioNumero] = useState(listaLocatarios[locatarioSelecionado].telefone.numero)
    const [locatarioStatus, setLocatarioStatus] = useState(listaLocatarios[locatarioSelecionado].status)

    const [desabilitarDados, setDesabilitarDados] = useState(true)
    const [editar, setEditar] = useState(false)

    function FecharForm(){
        setApresentaEdit(false)
        setLocatarioSelecionado('')
    }

    function AtivarEdicao(){
        setEditar(true)
        setDesabilitarDados(false)
    }

    function AtualizaStatus(e){
        setLocatarioContratoFim(e.target.value)
        setLocatarioStatus('inativo')
    }

    function AtualizaTabela(referencia, setValor, setValor2){
        const get = async () => {
            const data = await getDocs(referencia)
            setValor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setValor2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        get()
    }

    async function AtualizarDados(){
        const locatarioAtualizado = {
            contrato: {fim: locatarioContratoFim, inicio: locatarioContratoIni},
            nome: locatarioNome,
            status: locatarioStatus,
            telefone: {ddd: locatarioDdd, numero: locatarioNumero}
        }

        await updateDoc(doc(db, 'locatarios', `${locatarioSelecionado}`), locatarioAtualizado)
        FecharForm()
        AtualizaTabela(locatariosCollectionRef, setListaLocatarios, setListaLocatariosFiltrada)
    }

    return(
        <div className={styles.BoxFormulario}>
            <form className={styles.Formulario} onSubmit={(e) => e.preventDefault()} data-aos="zoom-in">
                <div className={styles.Titulo}>
                    <h2>INFORMAÇÕES</h2>
                    <img src='../icon-form-1.png' alt='ícone botão fechar' onClick={FecharForm}/>
                </div>
                <div className={styles.CamposInput}>
                    <label>Nome:
                        <input 
                            type='text' placeholder='Nome do Locatário' required 
                            value={locatarioNome} onChange={(e) => setLocatarioNome(e.target.value)}
                            disabled={desabilitarDados}
                        />
                    </label>
                    <label>Início do contrato:
                        <input 
                            type='date' placeholder='Início do Contrato' required 
                            value={locatarioContratoIni} onChange={(e) => setLocatarioContratoIni(e.target.value)}
                            disabled={desabilitarDados}
                        />                        
                    </label>
                    <label>Fim do contrato:
                        <input 
                            type='date' placeholder='Fim do Contrato'
                            value={locatarioContratoFim} onChange={(e) => AtualizaStatus(e)}
                            disabled={desabilitarDados}
                        />
                    </label>
                    <label>DDD:
                        <input 
                            type='number' placeholder='DDD Telefone' 
                            value={locatarioDdd} onChange={(e) => setLocatarioDdd(e.target.value)}
                            disabled={desabilitarDados}
                        />
                    </label>
                    <label>Telefone:
                        <input 
                            type='number' placeholder='Númeto Telefone' 
                            value={locatarioNumero} onChange={(e) => setLocatarioNumero(e.target.value)}
                            disabled={desabilitarDados}
                        />
                    </label>
                    <label>
                        Status: 
                        <select onChange={(e) => setLocatarioStatus(e.target.value)} disabled={desabilitarDados} value={locatarioStatus}>
                            <option value='ativo'>Ativo</option>
                            <option value='inativo'>Inativo</option>
                        </select>
                    </label>
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

export default FormularioEditar