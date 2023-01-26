import { doc, getDocs, updateDoc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { AppContext } from '../../context/context'
import { casasCollectionRef, db } from '../../Database/db'
import Button from '../Button/button'
import styles from './Formulario.module.scss'

const FormularioEditarCasa = ({idDaCasa}) => {
    const {
            setApresentaEditarCasa, listaCasas,
            setListaCasas, listaLocatarios, setListaCasasFiltrada 
          } = useContext(AppContext)

    const casaAtual = listaCasas[idDaCasa]

    const [casaNome, setCasaNome] = useState(casaAtual.nome)
    const [casaEndereco, setCasaEndereco] = useState(casaAtual.endereco)
    const [casaNumero, setCasaNumero] = useState(casaAtual.numero)
    const [casaComplemento, setCasaComplemento] = useState(casaAtual.complemento)
    const [casaBairro, setCasaBairro] = useState(casaAtual.bairro)
    const [casaCep, setCasaCep] = useState(casaAtual.cep)
    const [casaLocatario, setCasaLocatario] = useState(casaAtual.locatario)
    const [casaStatus, setCasaStatus] = useState(casaAtual.status)

    function FecharForm(){
        setApresentaEditarCasa(false)
    }

    function AtualizaTabela(referencia, setValor, setValor2){
        const get = async () => {
            const data = await getDocs(referencia)
            setValor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setValor2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        get()
    }

    async function EditarCasa(evento){
        evento.preventDefault()

        let historicoAtualizado = casaAtual.historico

        if(casaAtual.historico.length > 0){
            if(casaLocatario !== casaAtual.historico[0] && casaLocatario !== ''){
                historicoAtualizado.unshift(casaLocatario)
            }
        }
        else{
            if(casaLocatario !== ''){
                historicoAtualizado.push(casaLocatario)
            }
        }

        const novosDados = {
            bairro: casaBairro,
            cep: casaCep,
            complemento: casaComplemento,
            endereco: casaEndereco,
            historico: historicoAtualizado,
            locatario: casaLocatario,
            nome: casaNome,
            numero: casaNumero,
            status: casaStatus
        }

        const casaDocRef = doc(db, 'casas', `${idDaCasa}`)
        await updateDoc(casaDocRef, novosDados)

        FecharForm()
        AtualizaTabela(casasCollectionRef, setListaCasas, setListaCasasFiltrada)
    }

    return(
        <div className={styles.BoxFormulario}>
            <form className={styles.Formulario} onSubmit={(e) => EditarCasa(e)} data-aos="zoom-in">
                <div className={styles.Titulo}>
                    <h2>EDITAR CASA</h2>
                    <img src='../icon-form-1.png' alt='ícone botão fechar' onClick={FecharForm}/>
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
                    <Button descricao={'Salvar'}/>
                </div>
            </form>
        </div>
    )
}

export default FormularioEditarCasa