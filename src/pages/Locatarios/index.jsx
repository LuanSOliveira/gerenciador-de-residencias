import { useContext } from "react"
import FiltroCards from "../../components/FiltroCards/filtroCards"
import FormularioCadastrar from "../../components/Formulario/formularioCadastrar"
import FormularioEditar from "../../components/Formulario/formularioEditar"
import Header from "../../components/Header/header"
import Navbar from "../../components/Navbar/navbar"
import QuadroCards from "../../components/QuadroCards/quadroCards"
import { AppContext } from "../../context/context"

const Locatarios = () => {
    const {apresentaForm, apresentaEdit} = useContext(AppContext)

    return(
        <div className='Locatarios'>
            <Header/>
            <Navbar pagina='/locatarios'/>
            <FiltroCards pagina='/locatarios'/>
            <QuadroCards pagina='/locatarios'/>
            {
                (apresentaForm === true) && <FormularioCadastrar pagina='/locatarios'/>
            }
            {
                (apresentaEdit === true) && <FormularioEditar/>
            }            
        </div>
    )
}

export default Locatarios