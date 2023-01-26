import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/context'
import Button from '../Button/button'
import styles from './Navbar.module.scss'

const Navbar = ({pagina}) => {
    const {setApresentaForm, setApresentaEditarCasa, setApresentaHistorico} = useContext(AppContext)

    function MostrarForm(){
        setApresentaForm(true)
    }

    return(
        <div className={styles.Navbar}>
            {
                (pagina === '/') &&
                <>
                    <Button descricao={"Nova Casa"} clicar={MostrarForm}/>
                    <Link to='/locatarios'>
                        <Button descricao={"Locatários"}/>                
                    </Link>
                </>
            }
            {
                (pagina === '/locatarios') &&
                <>
                    <Button descricao={"Novo"} clicar={MostrarForm}/>
                    <Link to='/'>
                        <Button descricao={"Voltar"}/>
                    </Link>
                </>
            }
            {
                (pagina === '/casa') &&
                <>
                    <Button descricao={'Editar'} clicar={() => setApresentaEditarCasa(true)}/>
                    <Button descricao={'Histórico'} clicar={() => setApresentaHistorico(true)}/>
                    <Link to='/'>
                        <Button descricao={'Voltar'}/>
                    </Link>
                
                </>
            }
        </div>
    )
}

export default Navbar