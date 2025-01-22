import Head from "./components/Head/Head.jsx";
import HistoryS from "./components/History/History.jsx";
import NewProduct from "./components/NewProduct/NewProduct.jsx";
import Gallery from "./components/Gallary/Gallery.jsx";
import Footer from "./components/Footetr/Footer.jsx";
import {BasketProvider} from "./components/BasketContext.jsx"

export default function History(){
    return(
        <>
            <BasketProvider>
            <Head hh1="История шахмат"/>
            <HistoryS />
            <NewProduct />
            <Gallery />
            <Footer />
            </BasketProvider>
        </>
    )
}