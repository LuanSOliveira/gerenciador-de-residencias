import { createContext, useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { casasCollectionRef, locatariosCollectionRef } from "../Database/db";

export const AppContext = createContext()

const AppProvider = ({children}) => {

    const [apresentaForm, setApresentaForm] = useState(false)
    const [apresentaEdit, setApresentaEdit] = useState(false)
    const [apresentaEditarCasa, setApresentaEditarCasa] = useState(false)
    const [apresentaCriaAno, setApresentaCriaAno] = useState(false)
    const [apresentaEditPagamento, setApresentaEditPagamento] = useState(false)
    const [apresentaHistorico, setApresentaHistorico] = useState(false)

    const [listaCasas, setListaCasas] = useState([])
    const [listaLocatarios, setListaLocatarios] = useState([])
    const [listaCasasFiltrada, setListaCasasFiltrada] = useState([])
    const [listaLocatariosFiltrada, setListaLocatariosFiltrada] = useState([])

    const [locatarioSelecionado, setLocatarioSelecionado] = useState('')
    const [mesSelecionado, setMesSelecionado] = useState('')
    const [anoSelecionado, setAnoSelecionado] = useState('')
    const [casaSelecionada, setCasaSelecionada] = useState('')

    function GetTabelaFirebase (referencia, setValor, setValor2){
        const get = async () => {
            const data = await getDocs(referencia)
            setValor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setValor2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        get()
    }

    useEffect(() => {
        GetTabelaFirebase(casasCollectionRef, setListaCasas, setListaCasasFiltrada)
        GetTabelaFirebase(locatariosCollectionRef, setListaLocatarios, setListaLocatariosFiltrada)
    },[])

    return(
        <AppContext.Provider 
            value={
                {
                    apresentaForm, setApresentaForm,
                    apresentaEdit, setApresentaEdit,
                    apresentaEditarCasa, setApresentaEditarCasa,
                    apresentaCriaAno, setApresentaCriaAno,
                    apresentaEditPagamento, setApresentaEditPagamento,
                    apresentaHistorico, setApresentaHistorico,
                    listaCasas, setListaCasas,
                    listaLocatarios, setListaLocatarios,
                    listaCasasFiltrada, setListaCasasFiltrada,
                    listaLocatariosFiltrada, setListaLocatariosFiltrada,
                    locatarioSelecionado, setLocatarioSelecionado,
                    mesSelecionado, setMesSelecionado,
                    anoSelecionado, setAnoSelecionado,
                    casaSelecionada, setCasaSelecionada
                }
            }
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;