import Head from "./components/Head/Head.jsx";
import BeginHistory from "./components/BeginHistory/BeginHistory.jsx";
import NewProduct from "./components/NewProduct/NewProduct.jsx";
import Rules from "./components/Rules/Rules.jsx";
import Gallery from "./components/Gallary/Gallery.jsx";
import Footer from "./components/Footetr/Footer.jsx";
import {BasketProvider} from "./components/BasketContext.jsx"

export default function HomePage(){
    return(
        <>
        <BasketProvider>
            <Head hh1="Неоновые шахматы"/>
            <BeginHistory />
            <NewProduct />
            <Rules />
            <Gallery />
            <Footer />
        </BasketProvider>
        </>
    )
}