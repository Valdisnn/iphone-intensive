document.addEventListener("DOMContentLoaded", (e) => {
    /*_service-information_*/
    'use strict';
    console.log(e.target, 'Страница прогружена !');
    /*_service-information_*/

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const res = JSON.parse(request.response);
                callback(res);
            } else {
                console.error(new Error('Ошибка:' + request.status));
            }
        });

        request.send();
    };

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
                name: 'Смартфон Apple iPhone 12 Pro 512GB Gold',
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
            closeAllDrops(button, dropDown);
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
        });
    };

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        const modal = document.querySelector('.modal');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const modalTitle = document.querySelector('.modal__title');
        const modalSubtitle = modal.querySelector('.modal__subtitle');
        const modalTitleSubmit = document.querySelector('.modal__title-submit');

        const openModal = (event) => {
            const target = event.target;
            modal.classList.add('open');
            document.addEventListener('keydown', escapeHandler);
            modalTitle.textContent = cardDetailsTitle.textContent;
            modalTitleSubmit.value = cardDetailsTitle.textContent;
            modalSubtitle.textContent = target.dataset.buttonBuy;
        };

        const closeModal = () => {
            modal.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler);
        };

        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('modal__close') || target === modal) {
                modal.classList.remove('open');
            }
        });

        const escapeHandler = (event) => {
            if (event.code === 'Escape' || event.key === 'Escape' || event.keyCode === 27) {
                closeModal();
            }
        };

        cardDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);
    };

    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list');

        const createCrossSellItem = (good) => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
                    <h3 class="cross-sell__title">${good.name}</h3>
                    <p class="cross-sell__price">${good.price} ₽</p>
                    <div class="button button_buy cross-sell__button">Купить</div>
                </article>
            `;
            return liItem;
        };

        const createCrossSellList = (goods) => {
            goods.forEach(item => {
                crossSellList.append(createCrossSellItem(item));
            });
        };

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    };

    tabs();
    accordion();
    modal();
    renderCrossSell();
});
