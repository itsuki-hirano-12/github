(function() {
    'use strict';
    console.log('reading js');
    const cards = document.querySelectorAll('img');
    // console.log(cards);
    let prevCard = 'initial';

    window.addEventListener('load', function() {
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

        for (const eachSection of sections) {
                eachSection.className = 'textOut';
            }
        if (prevCard === 'initial') {
            initialText.className = 'textInPlay';
        } else {
            textBox.className = 'textInPlay';
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