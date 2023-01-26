import { doc, getDocs, setDoc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { AppContext } from '../../context/context'
import { casasCollectionRef, db, locatariosCollectionRef } from '../../Database/db'
import Button from '../Button/button'
import styles from './Formulario.module.scss'

const FormularioCadastrar = ({pagina}) => {
    const {
            setApresentaForm, listaCasas,
            setListaCasas, listaLocatarios, setListaLocatarios, 
            setListaCasasFiltrada, setListaLocatariosFiltrada
          } = useContext(AppContext)

    const [casaNome, setCasaNome] = useState('')
    const [casaEndereco, setCasaEndereco] = useState('')
    const [casaNumero, setCasaNumero] = useState('')
    const [casaComplemento, setCasaComplemento] = useState('')
    const [casaBairro, setCasaBairro] = useState('')
    const [casaCep, setCasaCep] = useState('')
    const [casaLocatario, setCasaLocatario] = useState('')
    const [casaStatus, setCasaStatus] = useState('liberada')

    const [locatarioNome, setLocatarioNome] = useState('')
    const [locatarioContratoIni, setLocatarioContratoIni] = useState('')
    const [locatarioContratoFim, setLocatarioContratoFim] = useState('')
    const [locatarioDdd, setLocatarioDdd] = useState('')
    const [locatarioNumero, setLocatarioNumero] = useState('')
    const [locatarioStatus, setLocatarioStatus] = useState('ativo')

    function FecharForm(){
        setApresentaForm(false)
    }

    function AtualizaTabela(referencia, setValor, setValor2){
        const get = async () => {
            const data = await getDocs(referencia)
            setValor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setValor2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        get()
    }

    async function AdicionarCasa(evento){
        evento.preventDefault()

        let historicoAdicionado = []

        if (casaLocatario){
            historicoAdicionado.push(casaLocatario)
        }

        const novaCasa = {
            bairro: casaBairro,
            cep: casaCep,
            complemento: casaComplemento,
            endereco: casaEndereco,
            historico: historicoAdicionado,
            locatario: casaLocatario,
            nome: casaNome,
            numero: casaNumero,
            pagamentos: [],
            status: casaStatus
        }

        await setDoc(doc(db, 'casas', `${(listaCasas.length > 0) ? (parseInt(listaCasas.at(-1).id) + 1) : 0}`), novaCasa)
        FecharForm()
        AtualizaTabela(casasCollectionRef, setListaCasas, setListaCasasFiltrada)
    }

    async function AdicionarLocatario(evento){
        evento.preventDefault()

        const novoLocatario = {
            contrato: {fim: locatarioContratoFim, inicio: locatarioContratoIni},
            nome: locatarioNome,
            status: locatarioStatus,
            telefone: {ddd: locatarioDdd, numero: locatarioNumero}
        }

        await setDoc(doc(db, 'locatarios', `${(listaLocatarios.length > 0) ? (parseInt(listaLocatarios.at(-1).id) + 1) : 0}`), novoLocatario)
        FecharForm()
        AtualizaTabela(locatariosCollectionRef, setListaLocatarios, setListaLocatariosFiltrada)
    }

    return(
        <div className={styles.BoxFormulario}>
            {
                (pagina === '/') &&
                    <form className={styles.Formulario} onSubmit={(e) => AdicionarCasa(e)} data-aos="zoom-in">
                        <div className={styles.Titulo}>
                            <h2>NOVA CASA</h2>
                            <img src='./icon-form-1.png' alt='ícone botão fechar' onClick={FecharForm}/>
                        </div>
                        <div className={styles.CamposInput}>
                            <label>Nome:
                                <input type='text' placeholder='Nome da Casa' required value={casaNome} onChange={(e) => setCasaNome(e.target.value)}/>
                            </label>
                            <label>Endereço:
                                <input type='text' placeholder='Endereço' required value={casaEndereco} onChange={(e) => setCasaEndereco(e.target.value)}/>
                            </label>
                            <label>Número:
                                <input type='number' placeholder='Número' required value={casaNumero} onChange={(e) => setCasaNumero(e.target.value)}/>
                            </label>
                            <label>Complemento:
                                <input type='text' placeholder='Complemento' value={casaComplemento} onChange={(e) => setCasaComplemento(e.target.value)}/>
                            </label>
                            <label>Bairro:
                                <input type='text' placeholder='Bairro' required value={casaBairro} onChange={(e) => setCasaBairro(e.target.value)}/>
                            </label>
                            <label>CEP:
                                <input type='number' placeholder='CEP' value={casaCep} onChange={(e) => setCasaCep(e.target.value)}/>
                            </label>
                            <label>
                                Locatário: 
                                <select onChange={(e) => setCasaLocatario(e.target.value)}>
                                    <option value=''></option>
                                    {
                                        listaLocatarios.map(
                                            (locatario) =>
                                                (locatario.status === 'ativo') && <option key={locatario.id} value={locatario.id}>{locatario.nome}</option>
                                        )
                                    }
                                </select>
                            </label>
                            <label>
                                Status: 
                                <select onChange={(e) => setCasaStatus(e.target.value)}>
                                    <option value='liberada'>Liberada</option>
                                    <option value='locada'>Locada</option>
                                    <option value='fechada'>Fechada</option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.BoxBotao}>
                            <Button descricao={'Criar'}/>
                        </div>
                    </form>
            }
            {
                (pagina === '/locatarios') &&
                    <form className={styles.Formulario} onSubmit={(e) => AdicionarLocatario(e)} data-aos="zoom-in">
                        <div className={styles.Titulo}>
                            <h2>NOVO LOCATÁRIO</h2>
                            <img src='./icon-form-1.png' alt='ícone botão fechar' onClick={FecharForm}/>
                        </div>
                        <div className={styles.CamposInput}>
                            <label>
                                Nome:
                                <input type='text' placeholder='Nome do Locatário' required value={locatarioNome} onChange={(e) => setLocatarioNome(e.target.value)}/>
                            </label>
                            <label>
                                Início do contrato:
                                <input type='date' placeholder='Início do Contrato' required value={locatarioContratoIni} onChange={(e) => setLocatarioContratoIni(e.target.value)}/>
                            </label>
                            <label>
                                Fim do contrato:
                                <input type='date' placeholder='Fim do Contrato' value={locatarioContratoFim} onChange={(e) => setLocatarioContratoFim(e.target.value)}/>                    
                            </label>
                            <label>
                                DDD:
                                <input type='number' placeholder='DDD Telefone' value={locatarioDdd} onChange={(e) => setLocatarioDdd(e.target.value)}/>
                            </label>
                            <label>
                                Telefone:
                                <input type='number' placeholder='Númeto Telefone' value={locatarioNumero} onChange={(e) => setLocatarioNumero(e.target.value)}/>
                            </label>
                            <label>
                                Status: 
                                <select onChange={(e) => setLocatarioStatus(e.target.value)}>
                                    <option value='ativo'>Ativo</option>
                                    <option value='inativo'>Inativo</option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.BoxBotao}>
                            <Button descricao={'Criar'}/>
                        </div>
                    </form>
            }
        </div>
    )
}

export default FormularioCadastrar