document.addEventListener("DOMContentLoaded", (e) => {
    /*_service-information_*/
    'use strict';
    console.log(e.target, 'Страница прогружена !');
    /*_service-information_*/

    const tabs = () => {
        const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
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
            cardDetailChangeElems.forEach(btn => btn.classList.remove('active'));
        }

        cardDetailChangeElems.forEach((btn, i) => {
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

    const accordion = () => {
        const characteristicsListElem = document.querySelector('.characteristics__list');
        const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

        characteristicsItemElems.forEach((elem) => {
            if (elem.children[1].classList.contains('active')) {
                elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
            }
        })

        const open = (button, dropDown) => {
            closeAllDrops();
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            button.classList.add('active');
            dropDown.classList.add('active');
        };

        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };

        const closeAllDrops = (button, dropDown) => {
            characteristicsItemElems.forEach((elem) => {
                if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            });
        };

        characteristicsListElem.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? close(target, description) : open(target, description);
            }
        });

        document.body.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.closest('.characteristics__list')) {
                closeAllDrops();
            }
        })
    };

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const modal = document.querySelector('.modal');

        cardDetailsButtonBuy.addEventListener('click', () => {
            modal.classList.add('open');
        });

        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('modal__close') || target.classList.contains('modal')) {
                modal.classList.remove('open');
            }
        });
    };

    tabs();
    accordion();
    modal();
});
