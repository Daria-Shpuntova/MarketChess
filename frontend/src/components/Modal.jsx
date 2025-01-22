import {Link} from "react-router-dom";

const Modal = ({ message, onClose }) => {
    return (
        <div className="modalActive">
            <div className="modal-content">
                <p className="close" onClick={onClose}>
                    <svg width="100" height="100" viewBox="0 0 102 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="4.46447" y1="97.4645" x2="97.4645" y2="4.46447" stroke="white" strokeWidth="10"/>
                        <line x1="4.53553" y1="4.46447" x2="97.5355" y2="97.4645" stroke="white" strokeWidth="10"/>
                    </svg></p>
                <div className='modalBody'>
                    <p>{message}</p>
                    <Link to={`/basketPage`} className='btnBasket btn'>
                        <p className='neon'>Перейти в корзину</p>
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default Modal;