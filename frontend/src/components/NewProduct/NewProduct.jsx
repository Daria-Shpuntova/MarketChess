import './NewProduct.css'
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {useBasket} from "../BasketContext.jsx";


export default function NewProduct(){
    const [set, newSet] = useState([]);
    const { addToCart, basketItems, isModalOpen, closeModal, modalMessage } = useBasket();

    useEffect(() => {
        fetch('http://localhost:8000/api/chessNew')
            .then(response => response.json())
            .then(data => {
                newSet(data);
            })
            .catch(error => console.error('Error fetching data:', error));
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




    return(
        <section className='containerSecond containerNew'>
            <h2 className='neon'>Новинки</h2>
            <div className='productsNew'>
                {set.map(s => (
                    <div key={s.id} className='product' style={{backgroundImage: `url(${s.image})`}}>
                        <div className='productCardHead'>
                            <h3 className='neon'>{s.name}</h3>
                            {s.discount_percentage ? (<p className='neon'>-{s.discount_percentage}%</p>) : (<></>)}
                        </div>
                        <div className='productCardFoot'>
                            <div>
                                {s.discount_percentage ? (
                                    <p><s>{s.price}</s>
                                        <span
                                            className='neon price'>{s.price - (s.price * (s.discount_percentage / 100))}</span>
                                    </p>
                                ) : (
                                    <p className='neon price'>{s.price}</p>
                                )}
                            </div>
                            <div className='productSvg'>
                                <svg className='neon' xmlns="http://www.w3.org/2000/svg" id="Layer_1"
                                     data-name="Layer 1" width="64" height="64" viewBox="0 0 512 512">
                                    <path className='neon'
                                          d="M256,490.67a21.31,21.31,0,0,1-15.09-6.25l-174-174A144.36,144.36,0,0,1,256,93.13a144.27,144.27,0,0,1,189.07,13.15L430,121.37l15.09-15.09a144.25,144.25,0,0,1,0,204.15l-174,174A21.27,21.27,0,0,1,256,490.67Zm-87-384A101.65,101.65,0,0,0,97.1,280.26L256,439.16l158.9-158.9a101.7,101.7,0,0,0,0-143.81h0a101.8,101.8,0,0,0-143.81,0,21.34,21.34,0,0,1-30.17,0A101.42,101.42,0,0,0,169,106.71Z"
                                          fill="#ffffff" id="id_102"/>
                                </svg>
                                    {s.quantity === 0 ? (
                                        <p>Нет в наличии</p>
                                    ) : (
                                        basketItems.some(item => item.id === s.id) ? (
                                            <svg className='neon' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100"
                                                 height="100" viewBox="0,0,256,256">
                                                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1"
                                                   strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
                                                   strokeDasharray="" strokeDashoffset="0" fontFamily="none"
                                                   fontWeight="none" fontSize="none" textAnchor="none">
                                                    <g transform="scale(3.55556,3.55556)">
                                                        <path
                                                            d="M57.658,12.643c1.854,1.201 2.384,3.678 1.183,5.532l-25.915,40c-0.682,1.051 -1.815,1.723 -3.064,1.814c-0.098,0.008 -0.197,0.011 -0.294,0.011c-1.146,0 -2.241,-0.491 -3.003,-1.358l-13.051,-14.835c-1.459,-1.659 -1.298,-4.186 0.36,-5.646c1.662,-1.46 4.188,-1.296 5.646,0.361l9.563,10.87l23.043,-35.567c1.203,-1.854 3.68,-2.383 5.532,-1.182z"></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        ) : (
                                            <>
                                                <svg onClick={() => addToCart(s.id)} className='neon'
                                                     xmlns="http://www.w3.org/2000/svg" width="64" height="64"
                                                     viewBox="0 0 64 64" fill="none">
                                                    <path className='neon'
                                                          d="M61.55 23.3399C61.3628 23.1092 61.1266 22.9231 60.8584 22.7951C60.5903 22.6671 60.2971 22.6004 60 22.5999H54.72L49.84 5.87994C49.7188 5.46451 49.4662 5.09959 49.12 4.83994C48.7738 4.5803 48.3527 4.43994 47.92 4.43994H16.08C15.6472 4.43994 15.2262 4.5803 14.88 4.83994C14.5338 5.09959 14.2811 5.46451 14.16 5.87994L9.27996 22.5999H3.99996C3.7 22.5939 3.40251 22.6554 3.12954 22.7799C2.85657 22.9044 2.6151 23.0887 2.42303 23.3192C2.23096 23.5496 2.0932 23.8204 2.01997 24.1113C1.94674 24.4023 1.9399 24.706 1.99996 24.9999L8.99996 57.9999C9.09551 58.4566 9.34773 58.8656 9.71297 59.1559C10.0782 59.4463 10.5335 59.5998 11 59.5899H53C53.4665 59.5998 53.9217 59.4463 54.287 59.1559C54.6522 58.8656 54.9044 58.4566 55 57.9999L62 24.9999C62.0532 24.7072 62.0404 24.4063 61.9625 24.1191C61.8847 23.8319 61.7437 23.5657 61.55 23.3399ZM21.93 46.9399C21.93 47.4704 21.7192 47.9791 21.3442 48.3542C20.9691 48.7292 20.4604 48.9399 19.93 48.9399C19.3995 48.9399 18.8908 48.7292 18.5158 48.3542C18.1407 47.9791 17.93 47.4704 17.93 46.9399V34.5099C17.93 33.9795 18.1407 33.4708 18.5158 33.0957C18.8908 32.7207 19.3995 32.5099 19.93 32.5099C20.4604 32.5099 20.9691 32.7207 21.3442 33.0957C21.7192 33.4708 21.93 33.9795 21.93 34.5099V46.9399ZM34 46.9399C34 47.4704 33.7893 47.9791 33.4142 48.3542C33.0391 48.7292 32.5304 48.9399 32 48.9399C31.4695 48.9399 30.9608 48.7292 30.5858 48.3542C30.2107 47.9791 30 47.4704 30 46.9399V34.5099C30 33.9795 30.2107 33.4708 30.5858 33.0957C30.9608 32.7207 31.4695 32.5099 32 32.5099C32.5304 32.5099 33.0391 32.7207 33.4142 33.0957C33.7893 33.4708 34 33.9795 34 34.5099V46.9399ZM46.07 46.9399C46.07 47.4704 45.8593 47.9791 45.4842 48.3542C45.1091 48.7292 44.6004 48.9399 44.07 48.9399C43.5395 48.9399 43.0308 48.7292 42.6558 48.3542C42.2807 47.9791 42.07 47.4704 42.07 46.9399V34.5099C42.07 33.9795 42.2807 33.4708 42.6558 33.0957C43.0308 32.7207 43.5395 32.5099 44.07 32.5099C44.6004 32.5099 45.1091 32.7207 45.4842 33.0957C45.8593 33.4708 46.07 33.9795 46.07 34.5099V46.9399ZM13.44 22.5999L17.58 8.43994H46.42L50.56 22.5999H13.44Z"
                                                      fill="#ffffff" id="id_103"/>
                                            </svg>

                                            </>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to={`/chessAll`} className='btnBy btn'>
                <p className='neon'>Весь каталог</p>
            </Link>
        </section>
    )
}
