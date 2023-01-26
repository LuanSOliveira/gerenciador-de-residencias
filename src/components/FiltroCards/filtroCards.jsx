import { useContext } from 'react'
import { AppContext } from '../../context/context'
import styles from './FiltroCards.module.scss'

const FiltroCards = ({pagina}) => {
    const {listaCasas, setListaCasasFiltrada, listaLocatarios, setListaLocatariosFiltrada} = useContext(AppContext)

    function FiltrarLista(status, listaGeral, setlistaFiltrada){
        let novaLista = []
        listaGeral.map((objeto) => (status === objeto.status) && novaLista.push(objeto))
        setlistaFiltrada(novaLista)
    }

    return(
        <div className={styles.FiltroCards}>
            <h2>Filtrar:</h2>
            <div className={styles.BoxIcones}>
                {
                    (pagina === '/') 
                    ? 
                    <>
                        <img src='./icon-filter-1.png' alt='ícone filtro todos' className={styles.IconeTodos} onClick={() => setListaCasasFiltrada(listaCasas)}/>
                        <img src='./icon-card-1.png' alt='ícone casas locadas' onClick={() => FiltrarLista('locada', listaCasas, setListaCasasFiltrada)}/>
                        <img src='./icon-card-2.png' alt='ícone casas liberadas' onClick={() => FiltrarLista('liberada', listaCasas, setListaCasasFiltrada)}/>
                        <img src='./icon-card-3.png' alt='ícone casas fechadas' onClick={() => FiltrarLista('fechada', listaCasas, setListaCasasFiltrada)}/>                    
                    </>
                    :
                    <>
                        <img src='./icon-filter-2.png' alt='ícone filtro todos' className={styles.IconeTodos} onClick={() => setListaLocatariosFiltrada(listaLocatarios)}/>
                        <img src='./icon-card-5.png' alt='ícone usuário ativo' onClick={() => FiltrarLista('ativo', listaLocatarios, setListaLocatariosFiltrada)}/>                  
                        <img src='./icon-card-6.png' alt='ícone usuário inativo' onClick={() => FiltrarLista('inativo', listaLocatarios, setListaLocatariosFiltrada)}/>                  
                    </>
                }
            </div>
        </div>
    )
}

export default FiltroCards