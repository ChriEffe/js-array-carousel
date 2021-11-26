/*Dati tre array contenenti:
- una lista ordinata di 5 immagini,
- una lista ordinata dei relativi 5 luoghi e
- una lista di 5 news, creare un carosello come nella foto allegata.
MILESTONE 1
Per prima cosa, creiamo il markup statico: costruiamo il container e inseriamo l’immagine grande a sinistra e le thumbnails sulla destra in modo da poter stilare lo slider; avremo così la struttura base e gli stili pronti per poterci poi concentrare solamente sull’aspetto logico.
MILESTONE 2
Adesso rimuoviamo tutto il markup statico e inseriamo le immagini dinamicamente servendoci dell’array fornito e un semplice ciclo for che concatena un template literal.Al termine di questa fase ci ritroveremo con lo stesso slider, ma costruito dinamicamente attraverso JavaScript.
MILESTONE 3
Al click dell’utente sulle frecce verso l’alto o verso il basso, l’immagine attiva diventa visibile in formato grande a sinistra e nel suo angolo in basso a destra dovranno essere aggiunti i relativi:
- titolo e
- testo.
Allo stesso tempo nelle miniature l’immagine attiva dovrà apparire in evidenza rispetto alle altre.*/

// Dati disponibili
const items = [
    'img/01.jpg',
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
    'img/05.jpg'
];

const title = [
    'Svezia',
    'Svizzera',
    'Gran Bretagna',
    'Germania',
    'Paradise'
]

const text = [
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
    'Lorem ipsum',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
    'Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
]

//Seleziono elementi DOM
const itemsContainer = document.querySelector('.slider .items');
const thumbsContainer = document.querySelector('.slider .thumbs');

for (let i = 0; i < items.length; i++) {

    //Se sono al primo elemento aggiungo le classi "first" e "active"
    let classElement = '';
    if (i == 0) {
        classElement = 'first active';
    } else if (i == items.length - 1) { //Se sono nell'ultimo aggiungo la classe "last"
        classElement = 'last';
    }

    const tag = 
       `<div class="item ${classElement}">
            <img src="${items[i]}" alt="">
            <div class ="text">
            <h3>${title[i]}</h3>
            <p>${text[i]}</p>
        </div>`;
    const tagThumb = 
       `<div class="thumb ${classElement}">
             <img src="${items[i]}" alt="">
        </div>`;

    itemsContainer.innerHTML += tag;
    thumbsContainer.innerHTML += tagThumb;
}

//Seleziono pulsante next e prev

const buttonNext = document.querySelector('.slider .thumbs .next');
const buttonPrev = document.querySelector('.slider .thumbs .prev');

//Aggiugno funzione
buttonNext.addEventListener('click',
    function () {
        //Cerco elemento con classe active
        const elementActive = document.querySelector('.slider .items .item.active');
        const thumbActive = document.querySelector('.slider .thumbs .thumb.active');

        //Cerco in una lista una stringa
        const listClasses = elementActive.classList; //['active', 'item', 'last']
        let last = false;
        for (let i = 0; i < listClasses.length; i++) {
            //Ad ogni giro ho una stringa
            if (listClasses[i] == 'last') {
                last = true;
            }
        }

        //"Contains" cerca una stringa all'interno di classlist e ci restituisce un valore booleano
        let lastThumb = thumbActive.classList.contains('last');

        //Questo elemento non e l'ultimo
        //Se non trovo all'interno della lista di classi "last" allora vado avanti
        if (last == false) { 
            //Se non sono nell'ultimo rimuovo classe active
            elementActive.classList.remove('active');
            //Cerco elemento successivo a questo
            const elementNext = elementActive.nextElementSibling;
            //Aggiungo classe active
            elementNext.classList.add('active');
        }
        //Altrimenti non faccio nulla
        if (lastThumb == false) {
            thumbActive.classList.remove('active');
            const thumbNext = thumbActive.nextElementSibling;
            thumbNext.classList.add('active');
        }
    }
);

//addEventListener dopo la prima
buttonPrev.addEventListener('click',
    function () {
        //Vado a cercare elemento con classe "active"
        const elementActive = document.querySelector('.slider .items .item.active');
        const thumbActive = document.querySelector('.slider .thumbs .thumb.active');

        //Cerco in una lista una stringa 
        const listClasses = elementActive.classList; //['active', 'item', 'last']
        let first = false;
        for (let i = 0; i < listClasses.length; i++) {
            //Ad ogni giro ho una stringa
            if (listClasses[i] == 'first') {
                first = true;
            }
        }

        let firstThumb = thumbActive.classList.contains('first');


        //Questo elemento non e l'ultimo
        //Se non trovo all'interno della lista di classi "first" allora vado avanti
        if (first == false) { 
            //Se non sono nell'ultimo rimuovo classe active
            elementActive.classList.remove('active');
            //Cerco elemento successivo a questo
            const elementPrev = elementActive.previousElementSibling;
            //Aggiungo classe "active"
            elementPrev.classList.add('active');
        }

        if (firstThumb == false) {
            thumbActive.classList.remove('active');
            const thumbPrev = thumbActive.previousElementSibling;
            thumbPrev.classList.add('active');
        }
        //Altrimenti non faccio nulla
    }
);