import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/context'
import CardCasa from '../CardCasa/cardCasa'
import CardLocatario from '../CardLocatario/cardLocatario'
import styles from './QuadroCards.module.scss'

const QuadroCards = ({pagina}) => {
    const {listaCasasFiltrada, listaLocatariosFiltrada, setCasaSelecionada} = useContext(AppContext)

    return(
        <div className={styles.QuadroCards}>
            {
                (pagina === '/') 
                ? 
                    <ul>
                        {
                            listaCasasFiltrada.map(
                                (casa) =>
                                    <li key={casa.id}>
                                        <Link to={`/casa/${casa.id}`} style={{ textDecoration: 'none', color: '#000000' }} onClick={() => setCasaSelecionada(casa.id)}>
                                            <CardCasa casa={casa} locatario={(casa.locatario) ? listaLocatariosFiltrada[casa.locatario] : ""}/>                                        
                                        </Link>
                                    </li>
                            )
                        }
                    </ul>
                :
                    <ul>
                        {
                            listaLocatariosFiltrada.map(
                                (locatario) =>
                                    <li key={locatario.id}>
                                        <CardLocatario locatario={locatario} idLocatario={locatario.id}/>
                                    </li>
                            )
                        }
                    </ul>
            }
        </div>
    )
}

export default QuadroCards