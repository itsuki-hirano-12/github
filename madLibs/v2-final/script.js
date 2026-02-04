(function(){
    'use strict';
    console.log('reading js');

    
    const myForm = document.querySelector('#input form');
    const input = document.querySelector('#input');
    const output = document.querySelector('#output');
    const reset = document.querySelector('#reset');
    const track = document.querySelector('#track');
    const tape = document.querySelector('#tape');

    myForm.addEventListener('submit', function(event){
        // ----------- switch screen --------------
        event.preventDefault();
        input.className = 'off';
        output.className = 'on';
        track.className = 'finish';
        tape.className = 'cut';

        // ----------- record input ----------------
        const animal1 = document.querySelector('#animal1').value;
        const food = document.querySelector('#food').value;
        const animal2 = document.querySelector('#animal2').value;
        const length = document.querySelector('#length').value;
        const adv = document.querySelector('#adverb').value;
        const adj1 = document.querySelector('#adjective1').value;
        const place = document.querySelector('#placement').value;
        const adj2 = document.querySelector('#adjective2').value;
    });

    reset.addEventListener('click', function(){
        // ----------- switch screen --------------
        input.className = 'on';
        output.className = 'off';
        track.removeAttribute('class');
        tape.removeAttribute('class');
    })

    
    
}());