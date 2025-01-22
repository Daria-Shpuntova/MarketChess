import Menu from "../Menu/Menu.jsx";
import {Link} from "react-router-dom";

export default function Head({hh1}){
    return (
        <>
            <Menu />
            <div className='container containerHead'>
                <h1 className='neon'>{hh1}</h1>
                <Link to={`/chessAll`} className='btnBy btn'>
                    <p className='neon'>Купить</p>
                </Link>
            </div>

        </>

    )
}