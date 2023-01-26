import { useContext } from "react"
import FiltroCards from "../../components/FiltroCards/filtroCards"
import FormularioCadastrar from "../../components/Formulario/formularioCadastrar"
import Header from "../../components/Header/header"
import Navbar from "../../components/Navbar/navbar"
import QuadroCards from "../../components/QuadroCards/quadroCards"
import { AppContext } from "../../context/context"

const Home = () => {
    const {apresentaForm} = useContext(AppContext)

    return(
        <div className='Home'>
            <Header/>
            <Navbar pagina="/"/>
            <FiltroCards pagina="/"/>
            <QuadroCards pagina="/"/>
            {
                (apresentaForm === true) && <FormularioCadastrar pagina="/"/>
            }            
        </div>
    )
}

export default Home