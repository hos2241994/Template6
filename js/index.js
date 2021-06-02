/*
======================
Navigation media Query
======================
*/
const navopen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
//Open Menu
navopen.addEventListener("click", ()=>{
    document.body.classList.add("active");
    menu.classList.add("open")
});

//Close menu
navClose.addEventListener("click", ()=>{
    document.body.classList.remove("active");
    menu.classList.remove("open")
});

/*
======================
Glide Js
======================
*/
const slider1 = document.getElementById("glide_1");
const slider2 = document.getElementById("glide_2");
const slider3 = document.getElementById("glide_3");
const slider5 = document.getElementById("glide_5");
/*
======================
Hero
======================
*/
if(slider1){
    new Glide(slider1, {
        type: "carousel",
        startAt: 0,
        //autoplay: 2000,
        hoverpause: true,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: "linear"
    }).mount()
}
/*
======================
Latest Products
======================
*/

if(slider2){
    new Glide(slider2, {
        type: "carousel",
        startAt: 0,
        hoverpause: true,
        perView: 4,
        animationDuration: 800,
        animationTimingFunc: "ease-in-out",
        breakpoints: {
            1200: {
                perView: 3,
            },
            768:{
                perView: 2
            }
        },
    }).mount()
}
/*
======================
Testimonial
======================
*/

if(slider3){
    new Glide(slider3, {
        type: "carousel",
        startAt: 0,
        //autoplay: 2000,
        hoverpause: true,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: "ease-in-out",
    }).mount()
}
/*
======================
News Section
======================
*/

if(slider5){
    new Glide(slider5, {
        type: "carousel",
        startAt: 0,
        //autoplay: 2000,
        hoverpause: true,
        perView: 3,
        animationDuration: 800,
        animationTimingFunc: "ease-in-out",
        breakpoints: {
            998: {
                perView: 2,
            },
            768: {
                perView: 1,
            }
        }
    }).mount()
}
/*
======================
Category Products
======================
*/

//Get Products
const getProducts = async() => {
    try{
        const results = await fetch("./data/products.json");
        const data = await results.json();
        return data.products;
    }catch(err){
        console.log(err)
    }
}

//Load Products
window.addEventListener("DOMContentLoaded", async() => {
    const products = await getProducts();
    displayProductItems(products);
});

//Display Products
const categoryCenter  =document.querySelector(".category__center");
const displayProductItems = items =>{
    let displayProducts = items.map(item =>
        `<div class="product category__product">
            <div class="product__header">
                <img src=${item.image} alt="">
            </div>
            <div class="product__footer">
                <h3>${item.title}</h3>
                <div class="rating">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                </div>
                <div class="product__price">$${item.price}
                </div>
                <a href="#">
                    <button type="button" class="product__btn">
                        Add To Cart
                    </button>
                </a>
                <ul>
                    <li>
                        <a href="#">
                            <svg>
                                <use xlink:href="./images/sprite.svg#icon-eye"></use>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <svg>
                                <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <svg>
                                <use xlink:href="./images/sprite.svg#icon-loop2"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>`
    );
    displayProducts = displayProducts.join('');
    categoryCenter.innerHTML = displayProducts;
};

//Filtering
const filterBtn = document.querySelectorAll('.filter-btn');
const categoryConatiner = document.querySelector('#category');
if(categoryConatiner){
    categoryConatiner.addEventListener('click', async(e)=>{
        const target = e.target.closest(".section__title")
        if(!target) return;
        else{
            const id  = target.dataset.id;
            let products = await getProducts();
            filterBtn.forEach(btn => {
                if(btn.classList.contains('active')) btn.classList.remove('active');
            });
            if(id === "All Products") {
                displayProductItems(products);
                target.classList.add('active');
            }else{
                products = products.filter(product => product.category === id);
                displayProductItems(products);
                target.classList.add('active');
            }
        }
    })
};

/*
======================
Pop Up
======================
*/
const popup = document.querySelector(".popup");
const closePopUp = document.querySelector(".popup__close");
if(popup){
    closePopUp.addEventListener("click", ()=> popup.classList.add("hide__popup"));

    window.addEventListener("load", () => {
        setTimeout(() => {
            popup.classList.remove("hide__popup")
        }, 500)
    })
}

/*
======================
Fixed navigation
======================
*/
const navBar = document.querySelector('.navigation');
const gototop = document.querySelector('.goto-top');
const scrollLink = document.querySelectorAll('.scroll-link');

//Smooth Scroll
scrollLink.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        const navHeight = navBar.getBoundingClientRect().height;
        const FixNav = navBar.classList.contains('fix__nav');
        let position = element.offsetTop - navHeight;

        if(!FixNav){
            position  = position - navHeight;
        }

        window.scrollTo({
            left: 0,
            top: position
        })
        document.body.classList.remove("active");
        menu.classList.remove("open")
    });
})

//Fix Navbar
window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navBar.getBoundingClientRect().height;
    if(scrollHeight > navHeight){
        navBar.classList.add('fix__nav');
    }else{
        navBar.classList.remove('fix__nav');
    }

    if(scrollHeight > 300){
        gototop.classList.add('show-top');
    }else{
        gototop.classList.remove('show-top');
    }
});






//Aos
document.addEventListener('readystatechange', () => {
    if (document.readyState == "complete") {
        AOS.init();
    }
});
