import { useContext } from "react"
import FormularioCriaAno from "../../components/Formulario/formularioCriarAno"
import FormularioEditar from "../../components/Formulario/formularioEditar"
import FormularioEditarCasa from "../../components/Formulario/formularioEditarCasa"
import FormularioEditarPagamento from "../../components/Formulario/formularioEditarPagamento"
import Header from "../../components/Header/header"
import Historico from "../../components/Historico/historico"
import Navbar from "../../components/Navbar/navbar"
import QuadroInformacoesCasa from "../../components/QuadroInformacoesCasa/quadroInformacoesCasa"
import { AppContext } from "../../context/context"

const Casa = () => {
    const {apresentaCriaAno, apresentaEditPagamento, apresentaEditarCasa, apresentaHistorico, apresentaEdit, casaSelecionada} = useContext(AppContext)
    return(
        <div className='Casa'>
            <Header/>
            <Navbar pagina={"/casa"}/>
            <QuadroInformacoesCasa idDaCasa={casaSelecionada}/>
            {
                (apresentaCriaAno === true) && <FormularioCriaAno idDaCasa={casaSelecionada}/>
            }
            {
                (apresentaEditPagamento === true) && <FormularioEditarPagamento idDaCasa={casaSelecionada}/>
            }
            {
                (apresentaEditarCasa === true) && <FormularioEditarCasa idDaCasa={casaSelecionada}/>
            }
            {
                (apresentaHistorico === true) && <Historico idDaCasa={casaSelecionada}/>
            }
            {
                (apresentaEdit === true) && <FormularioEditar/>
            }
        </div>
    )
}

export default Casa