(function(){
    'use strict';
    console.log('reading js');
    let cardFlipped;
    let cardFlippedBack;
    const cards = document.querySelectorAll('img');
    let prevCard = -1;

    // ------- experiment on how to animate the card flip without using overlapping images in html
    // ------- this also makes css shorter since I don't have to define position for every single image
    // const image = document.querySelector('img');

    //I'm using timeout function to delay when the src image actually switches so that it changes in middle of the animation when rotation is 90 degrees
    

    // image.addEventListener('mouseover', function(){
    //     clearTimeout(cardFlipped);
    //     image.className = 'flip';
    //     cardFlipped = setTimeout(function(){
    //         image.src = 'images/front1.jpg';
    //     }, 500); 
    // });

    // image.addEventListener('mouseleave', function(){
    //     clearTimeout(cardFlipped);
    //     image.className = 'flipBack';
    //     cardFlipped = setTimeout(function(){
    //         image.src = 'images/back.jpg';
    //     }, 500);    
    // });

    // ------- incorporating card flip animation with mouse position --------
    document.addEventListener('mousemove', function(event){
        

        const windowSize = window.innerWidth;
        const mouseArea = windowSize / 5;
        const xPos = event.clientX;
        const flipCard = Math.floor(xPos / mouseArea);

        if (flipCard !== prevCard) {
            for (let i=0; i < cards.length; i++) {
                if (i === flipCard) {
                    // clearTimeout(cardFlipped);
                    // clearTimeout messes up the flips sometimes when the mouse is moving fast
                    cards[i].className = 'flip';
                    cardFlipped = setTimeout(function(){
                        cards[i].src = `images/front${flipCard}.jpg`;
                    }, 500);                    
                } else if (i === prevCard) {
                    // clearTimeout(cardFlippedBack);
                    cards[i].className = 'flipBack';
                    cardFlippedBack = setTimeout(function(){
                        cards[i].src = 'images/back.jpg';
                    }, 500);   
                }
            }

            // cards[flipCard].src = `images/front${flipCard}.jpg`;
            // cards[prevCard].src = 'images/back.jpg';
            prevCard = flipCard;
        }
    });
}());