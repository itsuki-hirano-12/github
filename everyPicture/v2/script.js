(function() {
    'use strict';
    console.log('reading js');
    const cards = document.querySelectorAll('img');
    const container = document.querySelector('#container');
    let xPos;
    let yPos;
    console.log(cards);
    const deckArea = document.querySelector('#deckArea');
    let prevCard = 'initial';

    window.addEventListener('load', function() {
        setTimeout( function(){
            dealCards();
            // start after cards have been placed
            setTimeout( function(){
                clickCards();
                switchText();
            }, 2000);    
        }, 2000);

        
        

        // container.addEventListener('mousemove', reportPos);

        // function reportPos(event) {
        //     xPos = event.clientX;
        //     yPos = event.clientY;
        // }
        

        // for (const eachCard of cards) {
        //     eachCard.addEventListener('click', function(event){
        //         eachCard.style.top = '10px';
        //         eachCard.style.left = `${xPos}`;
        //     })
        // }
    });

    function clickCards(){
        for (let i=0; i<cards.length; i++) {
            cards[i].addEventListener('click', function(){
                for (const eachCard of cards) {
                    eachCard.className = 'flipped';
                }
                if (i !== prevCard) {
                    cards[i].className = 'inPlay';
                    prevCard = i;      
                } else {
                    prevCard = 'initial'
                }
                switchText(i);
            });
        }

    }

    function dealCards(){   
        for (const eachCard of cards) {
            eachCard.className = 'flipped';
        }
    }

    function switchText(cardID){
        const number = cardID +1;
        const textBox = document.querySelector(`#text${number}`);
        const initialText = document.querySelector('#initial-text');
        if (prevCard === 'initial') {
            initialText.className = 'textInPlay';
        } else {
            initialText.className = 'textOut';
            textBox.className = 'textInPlay';
        }
    }
}());