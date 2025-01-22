import Menu from "../Menu/Menu.jsx";

export default function HeaderAllProd({hh1}){
    return (
        <>
            <Menu />
            <div className='container containerHead'>
                <h1 className='neon'>{hh1}</h1>

            </div>
        </>
    )
}