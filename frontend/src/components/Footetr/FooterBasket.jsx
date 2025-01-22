import './Footer.css'

import {useBasket} from "../BasketContext.jsx";

export default function FooterBasket(){
    const { checkout } = useBasket();

    return(
        <>
            <div onClick={ checkout} className='footerBNT'>
                    <p className='neon'>Оформить заказ</p>
            </div>

            <footer>
                <p>Интернет-магазин создан в учебных целях в 2025году <a className='neon' href='https://daryaspuntovawebsites.ru/'>Шпунтовой Дарьей</a> </p>
            </footer>
        </>
    )
}