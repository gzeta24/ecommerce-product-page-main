const listItem = document.querySelector('.list-item');
const thumbnails = document.querySelectorAll('.thumb');
const mainPicture = document.querySelector('.main-picture');
const imgIndicator = document.getElementById('img-indicator');
const btnPrev = document.getElementById('previous');
const btnNext = document.getElementById('next');
const btnCart = document.getElementById('cart');
const btnMinus = document.getElementById('quant-minus');
const btnPlus = document.getElementById('quant-plus');
const itemQuantity = document.getElementById('item-quantity');
const btnMenu = document.getElementById('menu');
const btnCloseMenu = document.getElementById('close-menu');
const mobileSidebar = document.querySelector('.mobile-sidebar');
const blackFilter = document.querySelector('.black-filter');
const cartList = document.querySelector('.cart-list');
const cartListItems = document.querySelector('.cart-list-items');
let cartItems = 0;

cartList.style.display = 'none';

function setMainImage(id) {
    const item = document.getElementById(id)
    item.style.opacity = '0.5';
    const newId = parseInt(id.at(1)) - 1
    const distance = item.offsetLeft - (document.getElementById('t' + toString(newId).offsetLeft + document.getElementById('t' + toString(newId).offsetWidth)))
    imgIndicator.style.transform = `translateX(${distance}px)`;
    mainPicture.innerHTML = `<img src="images/image-product-${id.at(1)}.jpg" alt="" width="400" height="400">`
    thumbnails.forEach(t => {if (t != item) t.style.opacity = '1'})
}

function changeImage(btn) {
    const source = document.getElementById('product-img').src;
    const imgId = parseInt(source.charAt(source.length - 5));
    if (btn == 'n' && imgId < 4) {
        const newId = imgId + 1;
        mainPicture.innerHTML = `<img id="product-img" src="images/image-product-${newId}.jpg" alt="" width="400" height="400">`
    } else if (btn == 'p' && imgId > 1) {
        const newId = parseInt(imgId) - 1;
        mainPicture.innerHTML = `<img id="product-img" src="images/image-product-${newId}.jpg" alt="" width="400" height="400">`
    }
}

function showCart() {
    if (cartList.style.display == 'none') {
        cartList.style.display = 'flex';
    } else {
        cartList.style.display = 'none';
    }
}

function changeItemQuantity(c) {
    console.log(itemQuantity.innerText)
    if (c == '+' && parseInt(itemQuantity.innerText) < 99) {
        itemQuantity.innerText = parseInt(itemQuantity.innerText) + 1;
    } else if (c == '-' && parseInt(itemQuantity.innerText) > 0) {
        itemQuantity.innerText = parseInt(itemQuantity.innerText) - 1;
    }
}

function showSidebar() {
    mobileSidebar.style.transition = 'transform .5s'
    mobileSidebar.style.transform = 'translateX(0)';
    blackFilter.style.display = 'block';
    if (cartList.style.display == 'flex') showCart();
}

function hideSidebar() {
    mobileSidebar.style.transition = 'transform 1s'
    mobileSidebar.style.transform = 'translateX(-900px)';
    blackFilter.style.display = 'none';
}

function addToCart() {
    if (parseInt(itemQuantity.innerText) > 0) {
        cartItems += parseInt(itemQuantity.innerText);
        const price = 125 * cartItems;
        cartListItems.innerHTML = `
        <div class="item-info">
            <img id="cart-item-img" src="images/image-product-1-thumbnail.jpg" width='60' height='60'>
            <div class="item-title">
                <p>Fall Limited Edition Sneakers</p>
                <p>$125.00 x <span id="cart-quant"></span><span id="total-price"> $${price.toString()}</span></p>
            </div>
            <button id="clear-cart" onclick="clearCart()">
                <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
            </button>
        </div>
        <button id="checkout">Checkout</button>
        `
        const cartQuant = document.getElementById('cart-quant');
        cartQuant.innerText = cartItems.toString();
        document.getElementById('clear-cart').style.display = 'block';
    }
}

function clearCart() {
    cartItems = 0;
    cartListItems.innerHTML = `
        <h4 id="cart-empty">Your cart is empty</h4>
    `
}