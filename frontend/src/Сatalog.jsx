import Head from "./components/Head/Head.jsx";
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import Gallery from "./components/Gallary/Gallery.jsx";
import Footer from "./components/Footetr/Footer.jsx";
import HeaderAllProd from "./components/HeaderAllProd/HeaderAllProd.jsx";
import {BasketProvider} from "./components/BasketContext.jsx"

export default function Catalog(){
    return(
        <>
            <BasketProvider>
                <HeaderAllProd hh1='Каталог шахмат'/>
                <AllProducts />
                <Gallery />
                <Footer />
            </BasketProvider>
        </>
    )
}