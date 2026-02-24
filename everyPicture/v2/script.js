(function() {
    'use strict';
    console.log('reading js');
    const cards = document.querySelectorAll('img');
    // console.log(cards);
    let prevCard = 'initial';
    const playArea = document.querySelector('#playArea');

    
    

    window.addEventListener('load', function() {
    for (const eachCard of cards) {
        eachCard.src = 'images/back.jpg';
        eachCard.style.opacity = '1';
    }

        setTimeout( function(){
            dealCards();
            // start after cards have been placed
            setTimeout( function(){
                clickCards();
                switchText();
            }, 700);    
        }, 1500);
    });

    function clickCards(){
        for (let i=0; i<cards.length; i++) {
            cards[i].addEventListener('click', function(){
                for (const eachCard of cards) {
                    if (eachCard.className !== 'set') {
                        eachCard.className = 'flipped';
                    }             
                }
                if (i !== prevCard) {
                    cards[i].className = 'inPlay';
                    prevCard = i;
                } else {
                    prevCard = 'initial'
                }

                setTimeout( function(){
                    flipCard(i);
                }, 1500);
                
                switchText(i);
            });
        }

    }

    function dealCards(){   
        for (const eachCard of cards) {
            eachCard.className = 'set';
        }
    }

    function switchText(cardID){
        const number = cardID +1;
        const textBox = document.querySelector(`#text${number}`);
        const sections = document.querySelectorAll('section');
        const initialText = document.querySelector('#initial-text');
        
        // console.log(number);

        for (const eachSection of sections) {
                eachSection.className = 'textOut';
            }
        if (prevCard === 'initial') {
            initialText.className = 'textInPlay';
            playArea.style.backgroundColor = 'rgb(25, 25, 112, 0.2)'
            playArea.style.borderColor = 'midnightblue';
        } else {
            textBox.className = 'textInPlay';  
            
            switch(number) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    playArea.style.backgroundColor = 'rgba(25, 25, 112, 0.2)'
                    playArea.style.borderColor = 'midnightblue';
                    break;
                case 6: 
                    playArea.style.backgroundColor = 'rgba(102, 51, 153, 0.2)'
                    playArea.style.borderColor = 'rebeccapurple';
                    break;
                case 7:
                case 8:
                    playArea.style.backgroundColor = 'rgba(102, 205, 171, 0.2)'
                    playArea.style.borderColor = 'teal';
                    break;
                default:
                    playArea.style.backgroundColor = 'rgba(25, 25, 112, 0.2)'
                    playArea.style.borderColor = 'midnightblue';
            }
        }       
    }

    function flipCard(cardID) {
        const cardNumber = cardID +1;

        for (const eachCard of cards) {
            if(eachCard.className !== 'inPlay') {
                eachCard.src = 'images/back.jpg';
            } else if (cardNumber < 6) {
                eachCard.src = `images/card${cardNumber}.jpg`;
            } else {
                eachCard.src = `images/card${cardNumber}.png`;
            }
        }
    }
}());