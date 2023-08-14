
import { useState } from "react";
import Logo from '../../assets/img/zorro.png';
import styles from "./SliderHome.module.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css'
import { Link } from "react-router-dom";

export const  SliderHome = ({ items }) =>{
    const [selectedRadio, setSelectedRadio] = useState('tap-1');
    
    const settings = {
        dots: true,
       fade:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        
        
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ],
         
          appendDots: dots => (
            <div   >
              <ul className="slick-dots slick-thumb"> {dots} </ul>
            </div>
          ),
          customPaging: i => (
            <div
              style={{
                width: "50px",
                height:"20px",
                
                
              }}
            >
              
            </div>
          )
          
    };
      
    return(
        <>
        <div className={styles.body}>

          <div className={styles.containerSliderHome} >
                <Slider {...settings} className={styles.sliderDesing}>
                  {items.map((item, index) => (
                    <div key={index} className={styles.blogcard}>

                      <div className={styles.innerpart}>
                          <img src={item.imageUrl} className={styles.img} alt={item.title} />
                          <div className={styles.contentCard }>
                              <div className={styles.title} >{item.title}</div>
                              <p className={styles.text}>{item.description}</p>
                            <Link to={item.urlNav}> <button >Ver más </button></Link>
                          </div>
                      </div>
                    </div>
                  ))}
                </Slider>
          </div>
        </div>
             {/* <div >
                <div className={styles.blogcard}>
                <input type="radio" name="select" id="tap-1" className={styles['tap-1']} checked={selectedRadio === 'tap-1'} onChange={() => setSelectedRadio('tap-1')} />
                <input type="radio" name="select" id="tap-2" className={styles['tap-2']} checked={selectedRadio === 'tap-2'} onChange={() => setSelectedRadio('tap-2')} />
                <input type="radio" name="select" id="tap-3" className={styles['tap-3']} checked={selectedRadio === 'tap-3'} onChange={() => setSelectedRadio('tap-3')} />
                <input type="checkbox" id="imgTap" />
                <div className={styles.sliders}>
                    <label htmlFor="tap-1" className={`${styles.tap} ${styles['tap-1']}`}></label>
                    <label htmlFor="tap-2" className={`${styles.tap} ${styles['tap-2']}`}></label>
                    <label htmlFor="tap-3" className={`${styles.tap} ${styles['tap-3']}`}></label>
                </div>
            
                <div className={styles.innerpart}>
                    <label htmlFor="imgTap" className={styles.img}>
                    <img className={styles['img-1']} src={Logo} alt="Profile 1" />
                    </label>
                    <div className={`${styles.contentCard} ${styles['contentCard-1']}`}>
                    <span>26 December 2017</span>
                    <div className={styles.title}>Lorem Ipsum Dolor</div>
                    <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo animi atque aliquid pariatur voluptatem numquam, quisquam. Neque est voluptates doloribus!</div>
                    <button>Read more</button>
                    </div>
                </div>
                <div className={styles.innerpart}>
                    <label htmlFor="imgTap" className={styles.img}>
                    <img className={styles['img-2']} src="" alt="Profile 2" />
                    </label>
                    <div className={`${styles.contentCard} ${styles['contentCard-2']}`}>
                    <span>26 December 2017</span>
                    <div className={styles.title}>Lorem Ipsum Dolor</div>
                    <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo animi atque aliquid pariatur voluptatem numquam, quisquam. Neque est voluptates doloribus!</div>
                    <button>Read more</button>
                    </div>
                </div>
                <div className={styles.innerpart}>
                    <label htmlFor="imgTap" className={styles.img}>
                    <img className={styles['img-3']} src="" alt="Profile 3" />
                    </label>
                    <div className={`${styles.contentCard} ${styles['contentCard-3']}`}>
                    <span>26 December 2017</span>
                    <div className={styles.title}>Lorem Ipsum Dolor</div>
                    <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo animi atque aliquid pariatur voluptatem numquam, quisquam. Neque est voluptates doloribus!</div>
                    <button>Read more</button>
                    </div>
                </div>
                
                </div>
            </div>  */}
        </>
    )    
}