
import Basket from "./components/Basket/Basket.jsx";
import FooterBasket from "./components/Footetr/FooterBasket.jsx";
import HeaderAllProd from "./components/HeaderAllProd/HeaderAllProd.jsx";
import {BasketProvider} from "./components/BasketContext.jsx"

export default function BasketPage(){
    return(
        <>
            <BasketProvider >
            <HeaderAllProd hh1="Корзина" />
            <Basket />
            <FooterBasket />
            </BasketProvider>
        </>
    )
}