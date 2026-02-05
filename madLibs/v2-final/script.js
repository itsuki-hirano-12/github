(function(){
    'use strict';
    console.log('reading js');

    // --------- variables for data input --------------
    const myForm = document.querySelector('#input form');
    const formData = document.querySelectorAll('input[type=text]');
    // console.log(formData);

    const inputHeader = document.querySelector('#input h2');

    // --------- variables for visual effects--------
    const input = document.querySelector('#input');
    const output = document.querySelector('#output');
    const reset = document.querySelector('#reset');
    const track = document.querySelector('#track');
    const tape = document.querySelector('#tape');
    const podium = document.querySelector('#podium');

    // -------- data submission -------------
    myForm.addEventListener('submit', function(event){
        event.preventDefault();
        
        processFormData(formData);    
    });

    // ----------- functions for processing data -----------
    function processFormData(formData){
        const words = [];
        const emptyFields = [];
        let counter = 0;

        for (const eachWord of formData) {
            if( eachWord.value) {
                words.push(eachWord.value);
            } else {
                emptyFields.push(counter);
            }
            counter++;
        }

        if( emptyFields.length > 0) {
            showErrors(formData, emptyFields);
        } else {
            makeMadLib(words);
        }
    }

    function showErrors(formData, emptyFields) {
        const errorId = formData[emptyFields[0]].id;
        
        inputHeader.innerHTML = 'Please fill out all the words!';
        inputHeader.style.color = 'yellow';
        document.querySelector(`#${errorId}`).focus();
    }

    function makeMadLib(words) {
        const myText = `I entered my pet <span>${words[0]}</span> in a race. I gave him his favorite treat, <span>${words[1]}</span> to hype him up before the race. He was very excited to race against his rival, <span>${words[2]}</span>. The race is <span>${words[3]}</span> long, and this is the longest race he had ever participated in so I was worried.<br><br>
        The race started and everyone's pets started running <span>${words[4]}</span> to the goal. My <span>${words[0]}</span> struggled at the start but began to catch up. He went ahead of his rival <span>${words[2]}</span> at the last second!.<br><br>
        My <span>${words[0]}</span> crossed the finish line and looked <span>${words[5]}</span> in the end. He won <span>${words[6]}</span> place, and got a <span>${words[7]}</span> trophy.`;

        // ----------- switch screen --------------
        showOutput();

        // ------ reset values -------
        document.querySelector('#output p').innerHTML = myText;
        for(const eachField of formData) {
            eachField.value = '';
        }
    }

    // ---------- functions to switch screens ------------
    function showOutput() { 
        input.className = 'off';
        output.className = 'on';
        track.className = 'finish';
        tape.className = 'cut';
        podium.removeAttribute('class');
    }

    reset.addEventListener('click', function(){
        input.className = 'on';
        output.className = 'off';
        track.removeAttribute('class');
        tape.removeAttribute('class');
        podium.className = 'hidden';
        inputHeader.innerHTML = 'Give me some words!';
        inputHeader.style.color = 'white';
    });

    // window.addEventListener('onbeforeunload', function(event){
    //     window.scrollTo(0,0);
    // });  
}());