import { useContext } from 'react'
import { AppContext } from '../../context/context'
import CardLocatario from '../CardLocatario/cardLocatario'
import styles from './Historico.module.scss'

const Historico = ({idDaCasa}) => {
    const {listaCasas, listaLocatarios, setApresentaHistorico} = useContext(AppContext)

    const listaHistorico = listaCasas[idDaCasa].historico

    return(
        <div className={styles.BoxHistorico}>
            <div className={styles.Historico} data-aos="zoom-in">
                <div className={styles.Titulo}>
                    <h2>HISTÓRICO</h2>
                    <img src='../icon-form-1.png' alt='ícone botão fechar' onClick={() => setApresentaHistorico(false)}/>
                </div>
                <div className={styles.BoxCards}>
                    {
                        listaHistorico.map(
                            (locatario) => 
                                <div key={locatario} className={styles.Cards}>
                                    <CardLocatario locatario={listaLocatarios[locatario]} idLocatario={locatario}/>
                                </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Historico