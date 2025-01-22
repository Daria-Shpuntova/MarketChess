const fetchBasketItems = async () => {
    console.log(document.cookie, 'document.cookie Корзине')
    try {
        const response = await fetch(`http://localhost:8000/api/basket`,  {
            method: 'GET',
            credentials: 'include', // Добавлено для передачи session_key
            headers: {
                    'Content-Type': 'application/json',
                },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response, 'response.json()')
        const data = await response.json();
        console.log(data, 'data Корзина')
        return data

        } catch (error) {
            console.error('Fetch error:', error);
        }
}

export default fetchBasketItems;