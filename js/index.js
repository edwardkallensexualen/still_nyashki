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
        // функция showItem (на событие клика по конкретному item в списке)
        function showItem(e){
            let dataId = e.target.getAttribute('data_id');
            for(let i of arrDataProduct){
                if(dataId == i.id){
                    firstLi.innerHTML = `${i.title}`;
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


















// получим объект списка и вставим их
// function getListChoice(){
//     const listProduct = fetch('https://nomadbylife.pythonanywhere.com/api-auth/product/')
//                             .then((response) => response.json())
//                             .then((product) => {
//                                 let listChoiceItem = document.querySelector('.calc__list-items');
//                                 let listChoice = document.querySelector('.calc__list-choice');
//                                     listChoice.addEventListener('click', (e) => {
//                                     listChoice.classList.toggle('show-menu');
//                                     listChoiceItem.classList.toggle('show-menu');
//                                     if(e.target.classList == 'calc__list'){
//                                         console.log(111);
//                                     } else{
//                                         let itemChoice = e.target;
//                                         li.textContent = itemChoice.textContent;
//                                     }
//                                 });
//                                 let li = document.createElement('li');
//                                 for(let i of product){
//                                     if(i.id == 1){
//                                         li.innerHTML = product[0].title;
//                                         li.className = 'calc__list';
//                                         li.setAttribute('data-id', `${i.id}`);
//                                         listChoice.prepend(li);
//                                     } else{
//                                         let itemLi = document.createElement('li');
//                                         itemLi.innerHTML += i.title;
//                                         itemLi.setAttribute('data-id', `${i.id}`);
//                                         listChoiceItem.append(itemLi);
//                                     }
//                                 }
                                
//         let priceText = document.querySelector('.price__text');
//         let arrItemLi = document.querySelectorAll('[data-id]');
//             for(let i of arrItemLi){
//                 i.addEventListener('click', (e) => (
//                         fetch(`https://nomadbylife.pythonanywhere.com/api-auth/product/${e.target.getAttribute('data-id')}`)
//                         .then((response) => response.json())
//                         .then((item) => {
//                             i.setAttribute('data-massa', `${item[0].massa}`);
//                             i.setAttribute('data-avg-price', `${item[0]['avg_price']}`);
//                             i.setAttribute('data-stock-in-bag', `${item[0]['stock_in_bag']}`);
//                             let calcItemMass = document.querySelector('#calc__item-mass');
//                             let calcItemCost = document.querySelector('#calc__item-cost');
//                                 calcItemCost.innerHTML = `${i.getAttribute('data-massa')} BYN`;
//                                 calcItemMass.innerHTML = `${i.getAttribute('data-stock-in-bag')} КГ`;
//                                 priceText.innerHTML = `${i.getAttribute('data-avg-price')}`;
//                     })
//                 ))
//             }
//     })
// }
// getListChoice()








///////////////////////// Запросы на AndPoint 

// let minus = document.querySelector('#price__minus');
//     minus.addEventListener('click', countCost);
// let plus = document.querySelector('#price__plus');
//     plus.addEventListener('click', countCost);

// function countCost(e){
//     let priceText = document.querySelector('.price__text');
//         console.log(priceText)
//     let priceTextValue = Number(priceText.innerHTML);
//     let dataAttributeBag = document.querySelector('#calc__item-mass');
//     let countThingInBag = Number(dataAttributeBag.getAttribute('data'));
//     let calcSumm = document.querySelector('.calc__summ-price');
//     let calcItemCost = document.querySelector('#calc__item-cost');
//     let calcItemCostNum = Number(calcItemCost.getAttribute('data-avg-price'));

//     if(e.target.id == 'price__minus'){
//         if(priceTextValue > 1){
//             priceTextValue = priceTextValue - 1;
//             priceText.innerHTML = `${priceTextValue}`;
//             let inCome = +countThingInBag * (+priceTextValue - +calcItemCostNum);
//                 calcSumm.innerHTML = `${parseInt(inCome)} BYN`;
//                 console.log(countThingInBag, priceTextValue, calcItemCostNum)
//             // прибыль = кол-во вещей * (среднюю цену которую выбрал человек - средняя закупка)
//         }
//     } else{
//         priceTextValue = priceTextValue + 1;
//         priceText.innerHTML = `${priceTextValue}`;
//         let inCome = +countThingInBag * (+priceTextValue - +calcItemCostNum);
//         calcSumm.innerHTML = `${parseInt(inCome)} BYN`;
//     }
// }

// function getListChoice(){
//     const listProduct = fetch('https://nomadbylife.pythonanywhere.com/api-auth/product/')
//                             .then((response) => response.json())
//                             .then((product) => {
//                                 let listChoiceItem = document.querySelector('.calc__list-items');
//                                 let listChoice = document.querySelector('.calc__list-choice');
//                                     listChoice.addEventListener('click', () => {
//                                         listChoice.classList.toggle('show-menu');
//                                         listChoiceItem.classList.toggle('show-menu');
//                                     });
//                                     for(let i of product){
//                                         if(i.id == 1){
//                                             let li = document.createElement('li');
//                                                 li.innerHTML = product[0].title;
//                                                 li.setAttribute('data', `${i.id}`)
//                                                 //li.id = `list__${product[0].id}`;
//                                                 listChoice.prepend(li);
//                                         } else{
//                                             let liItem = document.createElement('li');
//                                                 liItem.innerHTML = i.title;
//                                                 liItem.setAttribute('data', `${i.id}`);
//                                                 //liItem.id = `list__${i.id}`;
//                                                 liItem.addEventListener('click', getItemChoice);
//                                             listChoiceItem.append(liItem);
//                                         }
//                                     }
//                             });
// }
// getListChoice();

// получаем объект из списка (сам элемент) и заполняем калькулятор
// function getItemChoice(e){
//     let itemAttribute = e.target.getAttribute('data');
//     let calcItemMass = document.querySelector('#calc__item-mass');
//     let calcItemCost = document.querySelector('#calc__item-cost');
//     fetch(`https://nomadbylife.pythonanywhere.com/api-auth/product/${itemAttribute}`)
//         .then((response) => response.json())
//         .then((product) => {
//             calcItemMass.setAttribute('data', `${product[0].stock_in_bag}`)
//             calcItemCost.setAttribute('data-avg-price', `${product[0].avg_price}`)
//             calcItemCost.innerHTML = `${product[0].avg_price} BYN`;
//             calcItemMass.innerHTML = `${product[0].massa} КГ`;
//         })
// }

// let dataArr = [];
// let xhr = new XMLHttpRequest();
//     xhr.open('GET', 'https://nomadbylife.pythonanywhere.com/api-auth/product/1')
//     // xhr.responseType = 'json'
//     // xhr.setRequestHeader('Content-Type', 'application/json')
//     xhr.send()
//     xhr.onload = function (){
//         if(xhr.status != 200){
//             // console.log(111, xhr.statusText);
//         } else{
//             // console.log(xhr.response);
//             let a = xhr.response;
//             a = JSON.parse(a);
//             dataArr.push(a);
//         }
//     };

// console.log(dataArr)