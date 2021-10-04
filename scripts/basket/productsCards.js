'use strict';

const pathToImages = 'img';
const pathToProductsImages = `${pathToImages}/featured`;
const featuredItemsEl = document.querySelector('.product__box');

/**
 * Эта функция принимает один из объектов из массива products в файле products.js.
 * @param {ProductDTO} product объект с информацией о продукте
 * @returns {string} html-разметка карточки товара
 */
function getProductMarkup(product) {
    return `
        

        <figure class="card__item">
            <div class="card__img">
                <img src="${pathToProductsImages}/${product.image}" alt="${product.name}">
                <div class="overlay">
                    <button class=" overlayBtn"  data-productId="${product.id}">
                        <div class="overlayBtn__border">
                            <img src="img/basket.png" alt=""> Add to cart 
                        </div>
                    </button>
                </div>
            </div>
            <figcaption class="card__text">
                <a class="card__item__link" href="product.html">
                    <h3 class="header__card">${product.name}</h3>
                    <p class="description__card">${product.description}</p>
                    <p class="price__card">${product.price}</p>
                </a>
            </figcaption>
        </figure>
    `;
}

/**
 * Функция вставляет карточки товаров в страницу.
 * @param {ProductDTO[]} products массив товаров из файла products.js
 * @param {HTMLDivElement} featuredItemsEl элемент с классом .product__box
 */
function insertProductsIntoPage(products, featuredItemsEl) {
    let productsMarkup = '';
    for (let product of products) {
        productsMarkup += getProductMarkup(product);
    }
    featuredItemsEl.insertAdjacentHTML('afterbegin', productsMarkup);
}

/**
 * Функция назначает обработку клика на все кнопки "Add to cart".
 */
function addEventListenersForAddToCartButtons() {
    const addToCartBtns = document.querySelectorAll('button[data-productId]');
    addToCartBtns.forEach(function (button) {
        button.addEventListener('click', addedProductHandler);
    })
}

/**
 * Функция-обработчик события клика по кнопке "Add to cart".
 * @param {MouseEvent} event
 */
function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId);
}

insertProductsIntoPage(products, featuredItemsEl);
addEventListenersForAddToCartButtons();
