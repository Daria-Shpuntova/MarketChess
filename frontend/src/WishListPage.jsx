import Head from "./components/Head/Head.jsx";
import Footer from "./components/Footetr/Footer.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import {BasketProvider} from "./components/BasketContext.jsx"

export default function WishlistPage(){
    return(
        <>
            <BasketProvider>
            <Head hh1="Избранное" />
            <Wishlist />
            <Footer />
             </BasketProvider>
        </>
    )
}