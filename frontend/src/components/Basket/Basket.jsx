import {useEffect} from "react";
import './Basket.css'
import BasketItem from "./BasketItem.jsx";
import {useBasket} from "../BasketContext.jsx";


const Basket = () => {
    const { basketItems, setBasketItems, loadBasketItems, updateItemQuantity, deleteItemFromBasket } = useBasket();

     useEffect(() => {
        loadBasketItems(); // Загружаем данные при монтировании компонента
    }, []); // Добавляем loadBasketItems в зависимости


    const deletItem = (id) =>{
        deleteItemFromBasket(id)
    }

    const changePlus = (id) => {
        setBasketItems((items) => {
            return items.map((product) =>{
                if( product.id === id) {
                    updateItemQuantity(id, product.quantity+1)
                    return {
                        ...product,
                        count:product.quantity + 1,
                        priceTotal: (product.quantity + 1) * product.price
                    }
                }
                 return product
            });
            }
        )
    }

    const changeMinus = (id) => {
        setBasketItems((items) => {
            return items.map((product) =>{
                if (product.id === id){
                    if ((product.quantity - 1)>0) {
                        updateItemQuantity(id, product.quantity-1)
                        return {
                        ...product,
                        count:product.quantity - 1,
                        priceTotal: (product.quantity + 1) * product.price
                    }
                    } else {
                        deletItem(product.id)
                    }
                }
                return product
            })
        })
    }

        const totalAmount = basketItems.reduce((total, item) => {
            const discountedPrice = item.discount
                ? item.price - (item.price * (item.discount / 100))
                : item.price;
            return total + (discountedPrice * item.quantity);
        }, 0);


    return (
        <section className='containerSecond containerBasket'>
            {basketItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                <div className='basketItems'>
                    <table>
                        <thead>
                        <tr>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {basketItems.map(item => (
                                <BasketItem product={item} key={item.id} changePlus={changePlus} changeMinus={changeMinus} deletItem={deletItem}/>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <p>Общее количество: {basketItems.reduce((total, item) => total + item.quantity, 0)}</p>
                    <p>Общая сумма: {totalAmount} </p>
                </div>
                </>
            )}
        </section>
    );
}

export default Basket;
