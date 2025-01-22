import ChangeCount from "./ChangeCount.jsx";

const BasketItem = ({product, changeMinus, changePlus, deletItem}) => {
    return (
        <tr className='basketItem'>
            <td className='basketItemImage'><img src={`http://localhost:8000/${product.image}`}  alt={product.name}/></td>
            <td>{product.name}</td>
            <td><ChangeCount count={product.quantity} maxCount={product.available} id={product.id} changeMinus={changeMinus} changePlus={changePlus}/></td>

            {product.discount ?(
                <td>{product.price - (product.price * (product.discount / 100))}</td>
            ):(
                <td>{product.price}</td>
            )}

            <td><div className='btn btnDelete' onClick={() => {
                deletItem(product.id)
            }}><p className='neon'>Удалить</p></div></td>
        </tr>
    )
}

export default BasketItem;