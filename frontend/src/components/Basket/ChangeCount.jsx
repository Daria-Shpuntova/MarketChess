const ChangeCount = ({count,maxCount, id, changeMinus, changePlus}) => {

    return (
        <>
            {count < maxCount ? (
                <div className='basketItemCount'>
                    <button onClick={() => changeMinus(id)}>-</button>
                    <div>{count}</div>
                    <button onClick={() => changePlus(id)}>+</button></div>
                    ) : (
                <>
                    <div className='basketItemCount'>
                    <button onClick={() => changeMinus(id)}>-</button>
                    <div>{count}</div>
                    <button disabled>+</button> </div>
                    <p className='basketItemCountP'>Максимальное <br />количество<br/> для заказа</p>
                </>

            )}</>

    )
}

export default ChangeCount;