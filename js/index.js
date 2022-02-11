'use strict'
let headerburger = document.querySelector('.header__burger');
    headerburger.addEventListener('click', showMenu);

let menuNav = document.querySelector('.header__menu');
let menuLink = document.querySelectorAll('.menu__link');
    for(let i of menuLink){
        i.addEventListener('click', showMenu);
    }

function showMenu(e){
    if(e.target.className == 'active'){
        e.target.className.remove('active');
    } else{
        headerburger.classList.toggle('active');
        menuNav.classList.toggle('active');
    }
}


// вся логика секции калькулятор //

// первые элемент span лежащий в первом li
let firstLi = document.querySelector('#first__element');

// это ul в который будем вставлять элементы li
let listChoice = document.querySelector('.calc__list-choice');
    listChoice.addEventListener('click', (e) => {
        listChoice.classList.toggle('show-menu');
        listChoiceItem.classList.toggle('show-menu');
});

// первый пункт который будет появляться при загрузке страницы
let listChoiceItem = document.querySelector('.calc__list-items');

// это <p> в которую вставляем значение массы продукта
let calcItemMass = document.querySelector('#calc__item-mass');

// это <p> в которую вставляем значение средней стоимости
let calcItemCost = document.querySelector('#calc__item-cost');

// это значение в калькуляторе (в которое нужно будет увеличивать или уменьшать)
let priceText = document.querySelector('.price__text');

// это кнопка уменьшения стоимости
let priceMinus = document.querySelector('#price__minus');


// это кнопка для увеличения стоимости
let pricePlus = document.querySelector('#price__plus');


// итоговая сумма (которая высчитывается)
// прибыль = кол-во вещей * (среднюю цену которую выбрал человек - средняя закупка)
let sumEnd = document.querySelector('.calc__summ-price');

// получаем title над видео (номер товара)
let blockTitle = document.querySelector('.block__title');

// получаем ссылку под калькулятором
let numberProductLink = document.querySelector('.calc__link');


let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://nomadbylife.pythonanywhere.com/api-auth/all_product/')
xhr.send()
xhr.onload = function (){
    let arrDataProduct = [];
    if(xhr.status != 200){
    } else{
        let a = xhr.response;
        a = JSON.parse(a);
        arrDataProduct = a;
        console.log(arrDataProduct)
        // функция showItem (на событие клика по конкретному item в списке)
        function showItem(e){
            let dataId = e.target.getAttribute('data_id');
            for(let i of arrDataProduct){
                if(dataId == i.id){
                    firstLi.innerHTML = `${i.title}`;
                    numberProductLink.setAttribute('data-numberVideo', `${i.number_product}`);
                    calcItemMass.innerHTML = `${i.massa} кг`;
                    calcItemCost.innerHTML = `${i.avg_price} BYN`;
                    priceText.innerHTML = `${i.avg_price}`;
                    sumEnd.innerHTML = `${(Number(i.stock_in_bag) * Number(i.avg_price)).toFixed(2)} BYN`;
                }
            }
        }
        function setListProduct(){
            for(let i of arrDataProduct){
                if(i.id == 1){
                    firstLi.setAttribute('data_id', `${i.id}`);
                    calcItemMass.innerHTML = `${i.massa} кг`;
                    calcItemCost.innerHTML = `${i.avg_price} BYN`;
                    priceText.innerHTML = `${i.avg_price}`;
                    sumEnd.innerHTML = `${Number(i.stock_in_bag) * Number(i.avg_price)} BYN`;
                    firstLi.prepend(`${i.title}`);
                } else{
                    let liItem = document.createElement('li');
                    liItem.setAttribute('data_id', `${i.id}`);
                    liItem.innerHTML = `${i.title}`;
                    liItem.addEventListener('click', showItem);
                    listChoiceItem.append(liItem);
                }
            }
            let liFirstAppend = document.createElement('li');
            liFirstAppend.setAttribute('data_id', `${arrDataProduct[0].id}`);
            liFirstAppend.innerHTML = `${arrDataProduct[0].title}`;
            numberProductLink.setAttribute('data-numberVideo', `${arrDataProduct[0].number_product}`);
            liFirstAppend.addEventListener('click', showItem);
            listChoiceItem.prepend(liFirstAppend);
        }

        priceMinus.addEventListener('click', calcPrice);
        pricePlus.addEventListener('click', calcPrice);

        function calcPrice(e){
            let sumResultCurrent = 0;
            let itemTarget = 0;
            for(let i of arrDataProduct){
                if(i.title === firstLi.textContent){
                    itemTarget = i.stock_in_bag;
                }
            }
            if(e.target.id == 'price__minus'){
                if(priceText.textContent > parseFloat(calcItemCost.textContent)){
                    priceText.innerHTML = `${Math.floor((Number(priceText.innerHTML) - 1).toFixed(2))}`;
                    sumResultCurrent = (Number(itemTarget) * (Number(parseFloat(priceText.innerHTML)) - Number(parseFloat(calcItemCost.innerHTML)))).toFixed(2);
                    sumEnd.innerHTML = `${sumResultCurrent} BYN`;
                }
            }
            if(e.target.id == 'price__plus'){
                priceText.innerHTML = `${Math.floor((Number(priceText.innerHTML) + 1).toFixed(2))}`;
                sumResultCurrent = (Number(itemTarget) * (Number(parseFloat(priceText.innerHTML)) - Number(parseFloat(calcItemCost.innerHTML)))).toFixed(2);
                sumEnd.innerHTML = `${sumResultCurrent} BYN`;
            }
        }
        setListProduct()
    }
};


// слайдер //
let iframeCarousel = document.querySelector('#iframeCarousel');

let videoCarousel = document.querySelector('.video__carousel');

function slider(){
    fetch('https://nomadbylife.pythonanywhere.com/api-auth/all_video/')
    .then(response => response.json())
    .then(allvideo => {
        console.log(allvideo)
        let allVideoCount = 0;
        for(let i of allvideo){
            if(i.url[0] != undefined){
                videoCarousel.innerHTML += `<div class="caroules__item" data-video="2">
                <img src="https://nomadbylife.pythonanywhere.com/${i.url[0].image}" data-numberProduct='${i.number_product}' data-urlVideo='${i.url[0].url}' class="carousel__img" alt="" id='${i.id}' data-id='${allVideoCount}'">
                </div>`;
            }
            allVideoCount++;
        }
        function addEventImg(){
            let carouselImg = document.querySelectorAll('.carousel__img');
            for(let i of carouselImg){
                i.addEventListener('click', (e) => {
                    console.log('Кликнул на IMG');
                    slideCurrent(e.target.id, e)
                })
            }
        }

        addEventImg();

        numberProductLink.addEventListener('click', setVideoLink);

        function setVideoLink(){
            let number = numberProductLink.getAttribute('data-numberVideo');
            
            itemsImg.forEach(item => {
                if(item.getAttribute('data-numberproduct') == number){
                    iframeCarousel.src = item.getAttribute('data-urlvideo');
                    blockTitle.innerHTML = `Товар №${item.getAttribute('data-numberproduct')}`;
                    counter = item.getAttribute('data-id');
                    itemsImg.forEach(item => item.getAttribute('data-id') != counter ? item.classList.remove('imgBorder') : item.classList.add('imgBorder'));
                    blockTitle.innerHTML = `Товар №${itemsImg[counter].getAttribute('data-numberproduct')}`;
                    

                    position = -itemWidth * counter;
                    setPosition(position);
                }
            })
        }



        // карусель //
        
        let position = 0;
        let slidersToShow = 7;
        let counter = 0;

        if(window.innerWidth < 540){
            slidersToShow = 5;
        }

        const slidersToScroll = 1;
        const container = document.querySelector('.carousel');
        const track = document.querySelector('.video__carousel');
        const btnPrev = document.querySelector('#buttonLeft');
        const btnNext = document.querySelector('#buttonRight');
        const items = document.querySelectorAll('.caroules__item');
        const itemsImg = document.querySelectorAll('.caroules__item img');
        const itemCount = items.length;
        const itemWidth = container.clientWidth / slidersToShow;
        const movePosition = slidersToScroll * itemWidth;

        itemsImg[0].classList.add('imgBorder');
        iframeCarousel.src = itemsImg[0].getAttribute('data-urlvideo');
        blockTitle.innerHTML = `Товар №${itemsImg[0].getAttribute('data-numberproduct')}`

        items.forEach((item) => {
            item.addEventListener('click', setUrlItem);
            item.style.minWidth = `${itemWidth}px`;
        });

        function setUrlItem(e){
            iframeCarousel.src = e.target.getAttribute('data-urlvideo');
            blockTitle.innerHTML = `Товар №${e.target.getAttribute('data-numberproduct')}`;

            counter = e.target.getAttribute('data-id');
            itemsImg.forEach(item => item.getAttribute('data-id') != counter ? item.classList.remove('imgBorder') : item.classList.add('imgBorder'));
            blockTitle.innerHTML = `Товар №${itemsImg[counter].getAttribute('data-numberproduct')}`
        }
        
        btnNext.addEventListener('click', () => {
            if(counter != itemsImg.length - 1){
                counter++
                itemsImg.forEach(item => item.getAttribute('data-id') != counter ? item.classList.remove('imgBorder') : item.classList.add('imgBorder'));
                iframeCarousel.src = itemsImg[counter].getAttribute('data-urlvideo');
                blockTitle.innerHTML = `Товар №${itemsImg[counter].getAttribute('data-numberproduct')}`
            } else{
                counter = itemsImg.length - 1;
            }

            const itemsLeft = itemCount - (Math.abs(position) + slidersToShow * itemWidth) / itemWidth;

            position -= itemsLeft >= slidersToScroll ? movePosition : itemsLeft * itemWidth;
        
            setPosition();
            checkBtns();
        });
        
        btnPrev.addEventListener('click', () => {
            if(counter != 0){
                counter--
                itemsImg.forEach(item => item.getAttribute('data-id') != counter ? item.classList.remove('imgBorder') : item.classList.add('imgBorder'));
                iframeCarousel.src = itemsImg[counter].getAttribute('data-urlvideo');
                blockTitle.innerHTML = `Товар №${itemsImg[counter].getAttribute('data-numberproduct')}`
            } else{
                counter = 0;
            }


            const itemsLeft = Math.abs(position) / itemWidth;
        
            position += itemsLeft >= slidersToScroll ? movePosition : itemsLeft * itemWidth;
        
            setPosition();
            checkBtns();
        });
        
        const setPosition = () => {
            track.style.transform = `translateX(${position}px)`;
        };
        
        const checkBtns = () => {
            btnPrev.disabled = position === 0;
            btnNext.disabled = position <= - (itemCount - slidersToShow) * itemWidth;
        };
        // ----------------------------------- //





        // let videoButtonLeft = document.querySelector('#buttonLeft');
        //     videoButtonLeft.addEventListener('click', prevVideo);

        // let videoButtonRight = document.querySelector('#buttonRight');
        //     videoButtonRight.addEventListener('click', nextVideo);

        // let arrVideo = document.querySelectorAll('.carousel__img');
        //     iframeCarousel.src = arrVideo[0].getAttribute('data-urlVideo');
        //     arrVideo[0].classList.add('imgBorder');
        //     blockTitle.textContent = `Товар №${arrVideo[0].getAttribute('data-numberProduct')}`;

        // function nextVideo(e){
        //     if(e.target.id == 'next' || e.target.id == 'buttonRight'){
        //         slideNext()
        //     }
        // }
        
        // function prevVideo(e){
        //     if(e.target.id == 'prev' || e.target.id == 'buttonLeft'){
        //         slidePrev()
        //     }
        // }

        // function slideNext(){
        //     if(slideIndex == arrVideo.length){
        //         videoButtonRight.disabled = true;
        //         videoButtonLeft.disabled = false;
        //     } else{
        //         slideShow(slideIndex += 1)
        //     }
        // }
        // function slidePrev(){
        //     if(slideIndex == 0){
        //         videoButtonLeft.disabled = true;
        //         videoButtonRight.disabled = false;
        //     } else{
        //         slideShow(slideIndex -= 1)
        //     }
        // }
        // function slideCurrent(n){
        //     slideShow(slideIndex = n)
        // }
        
        // function slideShow(n, e){
        //     // if(n > arrVideo.length){
        //     //     slideIndex = 1
        //     // }
        //     // if(n < 1){
        //     //     slideIndex = arrVideo.length
        //     // }
        //     iframeCarousel.src = arrVideo[n].getAttribute('data-urlVideo');
        //     for(let i of arrVideo){
        //         if(n != arrVideo.length){
        //             if(i.id != n){
        //                 i.classList.remove('imgBorder')
        //             } else{
        //                 blockTitle.textContent = `Товар №${i.getAttribute('data-numberProduct')}`;
        //                 i.classList.add('imgBorder')
        //             }
        //         }
        //     }
        // }
    })
}

slider();
