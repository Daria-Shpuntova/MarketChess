import './Gallery.css'

export default function Gallery(){
    return(
        <section className='containerSecond containerGallery'>
            <h2 className='neon'>Галерея</h2>
            <div className='allGallery'>
                <div className='galleryBigOne'>
                    <img src='http://localhost:8000/gallery/1.png'/>
                </div>
                <div className='galleryMany'>
                    <div>
                    <img src='http://localhost:8000/gallery/2.png'/>
                    <img src='http://localhost:8000/gallery/3.png'/>
                    <img src='http://localhost:8000/gallery/4.png'/>
                    <img src='http://localhost:8000/gallery/5.png'/>
                        </div>
                </div>
                <div className='galleryMany'>
                    <div>
                    <img src='http://localhost:8000/gallery/6.png'/>
                    <img src='http://localhost:8000/gallery/7.png'/>
                    <img src='http://localhost:8000/gallery/8.png'/>
                    <img src='http://localhost:8000/gallery/9.png'/>
                        </div>
                </div>
                <div className='galleryBigOne'>
                <img src='http://localhost:8000/gallery/10.png'/>
                </div>
            </div>
        </section>
    )
}