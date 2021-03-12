document.addEventListener("DOMContentLoaded", (e) => {
    /*_service-information_*/
    'use strict';
    console.log(e.target, 'Страница прогружена !');
    /*_service-information_*/

    const preloader = () => {
        const hellopreloader = document.getElementById("hellopreloader_preload");

        const fadeOutnojquery = (el) => {
            el.style.opacity = 1;
            const interhellopreloader = setInterval(() => {
                el.style.opacity = el.style.opacity - 0.05;
                if (el.style.opacity <= 0.05) {
                    clearInterval(interhellopreloader);
                    hellopreloader.style.display = "none";
                }
            }, 16);
        }

        window.onload = () => {
            setTimeout(() => {
                fadeOutnojquery(hellopreloader);
            }, 200);
        };
    };

    const getData = (url, callback) => {
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    console.log(res, 'Данные JSON прогружены !');
                    return res.json();
                }
                throw new Error(res.statusText);
            })
            .then(callback)
            .catch((err) => {
                console.error(err);
            });
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
            document.body.style.overflow = 'hidden';
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
                document.body.style.overflow = 'scroll';
                modal.classList.remove('open');
            }
        });

        const escapeHandler = (event) => {
            if (event.code === 'Escape' || event.key === 'Escape' || event.keyCode === 27) {
                document.body.style.overflow = 'scroll';
                closeModal();
            }
        };

        cardDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);
    };

    const renderCrossSell = () => {
        const crossSellAdd = document.querySelector('.cross-sell__add');
        const crossSellList = document.querySelector('.cross-sell__list');
        const allGoods = [];
        const shuffle = arr => arr.sort(() => Math.random() - 0.3);

        const createCrossSellItem = ({photo, name, price}) => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src="${photo}" alt="${name}">
                    <h3 class="cross-sell__title">${name}</h3>
                    <p class="cross-sell__price">${price} ₽</p>
                    <button class="button button_buy cross-sell__button">Купить</button>
                </article>
            `;
            return liItem;
        };

        const renderCrossSell = arr => {
            arr.forEach(item => {
                crossSellList.append(createCrossSellItem(item));
            });
        }

        const createCrossSellList = (goods = []) => {
            allGoods.push(...shuffle(goods));
            const fourItems = allGoods.splice(0, 4);
            renderCrossSell(fourItems);
        };

        crossSellAdd.addEventListener('click', () => {
            renderCrossSell(allGoods);
            crossSellAdd.remove();
        });

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    };

    preloader();
    tabs();
    accordion();
    modal();
    renderCrossSell();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
});
