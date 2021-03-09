document.addEventListener("DOMContentLoaded", (e) => {
    /*_service-information_*/
    'use strict';
    console.log(e.target, 'Страница прогружена !');
    /*_service-information_*/

    const tabs = () => {
        const cardDetailChangeElem = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitleElem = document.querySelector('.card-details__title');
        const cardImageItem = document.querySelector('.card__image_item');
        const cardDetailPrice = document.querySelector('.card-details__price');
        const descriptionMemory = document.querySelector('.description__memory');

        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: '99990',
                memoryROM: 128,
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img: 'img/iPhone-silver.png',
                price: '109990',
                memoryROM: 256,
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Gold',
                img: 'img/iPhone-gold.png',
                price: '129990',
                memoryROM: 512,
            },
        ];

        const undoActive = () => {
            cardDetailChangeElem.forEach(btn => btn.classList.remove('active'));
        }

        cardDetailChangeElem.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')) {
                    undoActive();
                    btn.classList.add('active');
                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItem.src = data[i].img;
                    cardImageItem.alt = data[i].name;
                    cardDetailPrice.textContent = `${data[i].price} ₽`;
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                }
            });
        });
    };

    tabs();
});
