import React from 'react'
import './ProductPage.css'
import config from '../config'

export default function ProductPage() {
  return (
    <div>
    
    <section class="product-details">
    <div class="product-img">

<div class="swiper mySwiper">
    <div class="swiper-wrapper">
    
    <div class="swiper-slide">
        
    <img alt="hjvhj"/>
    </div>
    <div class="swiper-slide">
        <img src="images/tab.jpg" alt='ima'/>
    </div>
    <div class="swiper-slide">
        <img src="images/tab.jpg" alt='ima'/>
    </div>
    <div class="swiper-slide">
        <img src="images/tab.jpg" alt='img' />
    </div>

    </div>

   {/*<div class="slider-btns">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
  </div>*/}
</div>


   
</div>
        <div>
       <title>Product Page HTML</title>
        <link rel="stylesheet" href="/ProductPage.css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>
    
       <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
        />
    
       
        <div class="product-text">
            <span class="product-category">Women Clothes & Dresses</span>
            <h3>ASOS Women Clothe</h3>
            <span class="product-price">$135.3</span>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis laboriosam vitae ab aspernatur qui facere a commodi cupiditate praesentium. Aliquam, voluptatem est debitis consequuntur ex autem exercitationem quas dolorem alias?
                <br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo, enim non molestias dolores eos officia minima quidem architecto labore soluta? Expedita officiis voluptas sapiente officia debitis, mollitia eum quia.
            </p>
            <br/>
            <br/>
         
            <div class="product-size-container">
                <strong>Select Size:-</strong>
                <div class="product-size">
                    <input type="checkbox" class="s-checkbox" id="s-xl"/>
                    <label for="s-xl" class="s-label">XL</label>
                    <input type="checkbox" class="s-checkbox" id="s-s"/>
                    <label for="s-s" class="s-label">S</label>
                    <input type="checkbox" class="s-checkbox" id="s-m"/>
                    <label for="s-m" class="s-label">M</label>
                    <input type="checkbox" class="s-checkbox" id="s-l"/>
                    <label for="s-l" class="s-label">L</label>
                </div>
            </div>

            <div class="product-button">
                <a href="#" class="add-bag-btn">Add To Bag</a>
                <a href="#" class="add-wishlist-btn">Add To Wishlist</a>
            </div>
            <a href="#" class="help-btn">Need Any Help?</a>
        </div>
    </div>
    </section>

    

    </div>
  )
}