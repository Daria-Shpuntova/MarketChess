import React, { useEffect, useState } from 'react';
import {useBasket} from "../BasketContext.jsx";
import './WishList.css'
import Modal from "../Modal.jsx";

const Wishlist = () => {
    const [wishListItems, setwishListItems] = useState([]);
    const { addToCart, isModalOpen, closeModal, modalMessage } = useBasket();

    const fetchWishListItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/wishlist', {
                method: 'GET',
                credentials: 'include', // Добавлено для передачи session_key
            });
            console.log(response, 'responseWishList');
            if (!response.ok) {
                console.log(response, 'response');
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data, 'data');
            setwishListItems(data.wishlist);
        } catch (error) {
            console.error('Error fetching basket items:', error);
        }
    };

    useEffect(() => {
        fetchWishListItems();
    }, []);

    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Проверьте, начинается ли кука с имени
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
    }

     const deleteItemWishList = async (id) =>{
        const csrftoken = getCookie('csrftoken');
        console.log('Delete', id)

        try {
            const response = await fetch('http://localhost:8000/api/deleteWishlist', {
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
            fetchWishListItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    }

    const addToBasket = (id) => {
        addToCart(id);
        deleteItemWishList(id)
    }


    return (
        <>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
            <h2 className='wishlistH2 neon'>Избранное</h2>
        <div className='wishlist'>
            {wishListItems.length === 0 ? (
                <p>В избранном ничего нет</p>

            ) : (
                <div className='containerSecond'>
                    <table>
                        <thead>
                        <tr>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {wishListItems.map(item => (
                            <tr key={item.id} className='basketItem'>
                                <td className='basketItemImage'><img src={`http://localhost:8000/${item.image}`}
                                                                     alt={item.name}/></td>
                                <td>{item.name}</td>
                                {item.discount ? (
                                    <td>{item.price - (item.price * (item.discount / 100))}</td>
                                ) : (
                                    <td>{item.price}</td>
                                )}
                                <td>
                                    <div className='btn btnDelete' onClick={() => {
                                        addToBasket(item.id)
                                    }}><p className='neon'>Добавить в корзину</p></div>
                                </td>
                                <td>
                                    <div className='btn btnDelete' onClick={() => {
                                        deleteItemWishList(item.id)
                                    }}><p className='neon'>Удалить</p></div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
        </>
    );
};

export default Wishlist;
