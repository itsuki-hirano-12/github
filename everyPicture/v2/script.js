(function() {
    'use strict';
    console.log('reading js');
    const cards = document.querySelectorAll('img');
    // console.log(cards);
    let prevCard = 'initial';
    const playArea = document.querySelector('#playArea');

    window.addEventListener('load', function() {

        // setting images to front side in html, then turning them into back side after images load
        // I was having a problem when checking on the github link where there was a slight delay to image switching the first time I clicked on each image. I think this was because the front sides of the cards were being loaded when source is switched rather than when the page is loaded
        // this code should allow all the front side images to load at the start and avoid timing errors when switching source in JS
        // I also set images to 0 opacity until they're loaded and turned back
        for (const eachCard of cards) {
            eachCard.src = 'images/back.jpg';
            eachCard.style.opacity = '1';
        }

        setTimeout( function(){
            dealCards();
            // start after cards have been placed
            setTimeout( function(){
                clickCards();

                // calling switchText once here to place intial text
                switchText();
            }, 700);    
        }, 1500);
    });

    function clickCards(){
        for (let i=0; i<cards.length; i++) {
            cards[i].addEventListener('click', function(){
                // to set different animations, the intial set positions, and set positions after card have been chosen once have different class names
                // all cards will be set to .flipped unless they're still in intial set position. This allows a card in-play to go back to its set position when another card is clicked OR when itself is clicked again
                for (const eachCard of cards) {
                    if (eachCard.className !== 'set') {
                        eachCard.className = 'flipped';
                    }             
                }

                // when a different card is clicked, switch card
                if (i !== prevCard) {
                    cards[i].className = 'inPlay';
                    prevCard = i;
                } else {
                    // if card in-play is clicked, no card is selected
                    prevCard = 'initial'
                }

                // using timeout function to delay image source switch to coordinate with flipping animation
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
        //card number is array ID + 1 because I started the image and text names at 1 instead of 0
        const number = cardID +1;
        const textBox = document.querySelector(`#text${number}`);
        const sections = document.querySelectorAll('section');
        const initialText = document.querySelector('#initial-text');
        
        // console.log(number);

        for (const eachSection of sections) {
                eachSection.className = 'textOut';
            }

        if (prevCard === 'initial') {
            // if no card is selected, go back to initial text and default color
            initialText.className = 'textInPlay';
            playArea.style.backgroundColor = 'rgb(25, 25, 112, 0.2)'
            playArea.style.borderColor = 'midnightblue';
        } else {
            // if card is selected, bring in corresponding text
            textBox.className = 'textInPlay';  
            
            // change playing area box color depending on card in play
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

    // switches image source
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