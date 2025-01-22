import './Footer.css'
import {Link} from "react-router-dom";

export default function Footer(){
    return(
        <>
            <div className='footerBNT'>
                <Link to={`/chessAll`} className='btn'>
                    <p className='neon'>Купить сейчас</p>
                </Link>
            </div>
            <footer>
                <p>Интернет-магазин создан в учебных целях в 2025году <a className='neon' href='https://daryaspuntovawebsites.ru/'>Шпунтовой Дарьей</a> </p>
            </footer>
        </>
    )
}