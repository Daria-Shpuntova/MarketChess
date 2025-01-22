import React, { createContext, useContext, useState } from 'react';
import fetchBasketItems from "./Basket/fetchBasketItems.js";

const BasketContext = createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const loadBasketItems = async () => {
        const items = await fetchBasketItems(); // Ваша функция для получения данных
        setBasketItems(items.basket || []);
    };

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const updateItemQuantity = async (id, newQuantity) => {
        const csrftoken = getCookie('csrftoken');

        console.log('updateItemQuantity', id, newQuantity)
        try {
            const response = await fetch('http://localhost:8000/api/update_basket', {
                method: 'PATCH', // Или 'PUT', в зависимости от Вашего API
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({id:id, quantity: newQuantity }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
         loadBasketItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const deleteItemFromBasket = async (id) =>{
        const csrftoken = getCookie('csrftoken');
        console.log('Delete', id)

        try {
            const response = await fetch('http://localhost:8000/api/delete', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({id: id}),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadBasketItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    }


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addToCart = (productId) => {
        const csrftoken = getCookie('csrftoken');
        console.log(document.cookie, 'document.cookie')
        console.log('add to cart')
        fetch('http://localhost:8000/api/add-to-cart/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken, // Добавляем CSRF-токен в заголовки
            },
            body: JSON.stringify({ product_id: productId }),
        })
        .then(response => response.json())
        .then(data => {
            setModalMessage('Товар успешно добавлен в корзину!');
            setIsModalOpen(true);
            loadBasketItems();
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const checkout = async () => {
    const csrftoken = getCookie('csrftoken');
    try {
        const response = await fetch('http://localhost:8000/api/checkout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ items: basketItems }), // Отправляем товары из корзины
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Если заказ успешно оформлен, обновляем корзину
                await loadBasketItems(); // Обновляем корзину
                alert('Заказ успешно оформлен')
                console.log('Заказ успешно оформлен');
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
        }
    };



    return (
        <BasketContext.Provider value={{ basketItems, setBasketItems, updateItemQuantity, deleteItemFromBasket, addToCart, isModalOpen, closeModal, modalMessage,  checkout, loadBasketItems }}>
            {children}
        </BasketContext.Provider>
    );
};


