(function(){
    'use strict';
    console.log('reading js');

    const gameConsole = document.querySelector('#gameConsole p');
    const panel = document.querySelector('#panel');
    const player1HP = document.querySelector('#displayP1HP');
    const player2HP = document.querySelector('#displayP2HP');
    let continueGame = true;

    const gameData = {
        dice: ['dice-1.svg', 'dice-2.svg', 'dice-3.svg', 'dice-4.svg', 'dice-5.svg', 'dice-6.svg'],
        players: ['Player 1', 'Player 2'],
        health: [100, 100],
        hpDisplay: [player1HP, player2HP],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        oppIndex: 1,
        maxHP: 100,
        multiplier: 1,
        accumDamage: 0,
        rollsThisTurn: 0,
        singlePlayer: false,
        npcBehavior: 3
    };

    

    switchScene();
    
    function switchScene(){
        //buttons and form
        const openRules = document.querySelectorAll('.readRules');
        const closeRules = document.querySelector('#closeRule');
        const startForm = document.querySelector('form');
        const quit = document.querySelector('#quit');

        // scenes
        const rules = document.querySelector('#rules');

        // open and close rules
        for (const eachButton of openRules) {
            eachButton.addEventListener('click', function(){
            rules.className = 'overlay';
        });
        }

        closeRules.addEventListener('click', function(){
            rules.className = 'off';
        });

    
        document.addEventListener('keydown', function(event){
            if (event.key === 'Escape' && rules.className === 'overlay') {
                rules.className = 'off';
            }
        });

        // start game
        startForm.addEventListener('submit', function(event){
            event.preventDefault();
            gameSetUp();   
        });

        // quit game
        quit.addEventListener('click', function() {
            location.reload();
        })
    }

    function gameSetUp() {
        // manage form data
        processFormData();

        const start = document.querySelector('#start');
        const game = document.querySelector('#gameScreen');
        start.className = 'off'
        game.className = 'on';

        // randomize starting player
        gameData.index = Math.round(Math.random());
        gameConsole.innerHTML = `The Game Has Started!`;

        newTurn();
        
    }

    function processFormData() {
        const formData = {
            mode: document.querySelector('input[name="npc"]:checked').value,
            maxHP: document.querySelector('input[name="hp"]:checked').value,
            p1: document.querySelector('input[name="p1"]:checked').value,
            p2: document.querySelector('input[name="p2"]:checked').value
        }
    //    console.log(formData.mode.value);
    //    console.log(formData.p1.value)
        // console.log(formData);

        if (formData.mode === 'npc') {
            gameData.singlePlayer = true;
            gameData.players[1] = 'NPC';
            document.querySelector('#player2 h2').innerHTML = 'NPC';
        }

        gameData.maxHP = formData.maxHP;
        gameData.health[0] = gameData.maxHP;
        gameData.health[1] = gameData.maxHP;
        gameData.hpDisplay[0].innerHTML = gameData.maxHP;
        gameData.hpDisplay[1].innerHTML = gameData.maxHP;

        document.querySelector('#p1image').src = `images/${formData.p1}.svg`;
        document.querySelector('#p2image').src = `images/${formData.p2}.svg`;
    }

    function newTurn() {
        gameData.oppIndex = gameData.index;
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        gameData.multiplier = 1;
        document.querySelector('#number').innerHTML = `x ${gameData.multiplier}`;
        gameData.accumDamage = 0;
        gameData.rollsThisTurn = 0;

        setUpAction();
    }

    function setUpAction() {
        gameConsole.innerHTML += `<br>It's ${gameData.players[gameData.index]}'s turn!`;
        // control buttons
        document.querySelector('#controlButtons').innerHTML = '<button id="attack">Attack</button> <button id="endTurn">End Turn</button>'
        const attack = document.querySelector('#attack');
        const endTurn = document.querySelector('#endTurn');

        panel.className = 'on';

        if (gameData.rollsThisTurn !== 0 && gameData.rollsThisTurn % 2 === 0) {
            gameData.multiplier++;
            console.log(gameData.multiplier);
            document.querySelector('#number').innerHTML = `x ${gameData.multiplier}`;
        }
        
        attack.addEventListener('click', function(){
            // console.log('throw the dice and attack!');
            attackOpponent();
        });

        endTurn.addEventListener('click', function(){
            // console.log('Throw the dice and heal! Turn ends here!')
            healSelf();
        })
    }

    function attackOpponent() {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        // console.log(gameData.roll1);
        // console.log(gameData.roll2);
        document.querySelector('#dice1').src = `images/${gameData.dice[gameData.roll1-1]}`;
        document.querySelector('#dice2').src = `images/${gameData.dice[gameData.roll2-1]}`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        gameData.accumDamage += gameData.rollSum;
        gameData.rollsThisTurn++;
        // console.log(`damage is ${gameData.rollSum}`);
        // console.log(`total damage this turn is ${gameData.accumDamage}`);
        // console.log(`number of rolls taken this turn is ${gameData.rollsThisTurn}`);

        if (gameData.rollSum === 2) {
            gameData.health[gameData.index] = gameData.health[gameData.index] - gameData.accumDamage;
            gameConsole.innerHTML = `Oh no, snake eyes!<br>${gameData.players[gameData.index]} took ${gameData.accumDamage} damage!`;
            
            // insert self damage display
            panel.className = 'off';
            // gameConsole.innerHTML = 'switching player';
            gameData.hpDisplay[gameData.index].innerHTML = `${gameData.health[gameData.index]}`;

            // new turn
            checkWinCondition();
            if (continueGame) {
                setTimeout(newTurn, 1000);
            }
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.health[gameData.index] = gameData.health[gameData.index] - gameData.rollSum * gameData.multiplier;
            gameConsole.innerHTML = `Oh no, you rolled a 1!<br>${gameData.players[gameData.index]} took ${gameData.rollSum * gameData.multiplier} damage!`;

            // insert self damage display
            panel.className = 'off';
            // gameConsole.innerHTML = 'switching player';
            gameData.hpDisplay[gameData.index].innerHTML = `${gameData.health[gameData.index]}`;

            //new turn
            checkWinCondition();
            if (continueGame) {
                setTimeout(newTurn, 1000);
            }       
        } else {
            gameData.health[gameData.oppIndex] = gameData.health[gameData.oppIndex] - gameData.rollSum;
            gameConsole.innerHTML = `${gameData.players[gameData.index]} dealt ${gameData.rollSum} damage to ${gameData.players[gameData.oppIndex]}!`;

            // insert attacking display
            gameData.hpDisplay[gameData.oppIndex].innerHTML = `${gameData.health[gameData.oppIndex]}`;
            panel.className = 'off';

            // continue turn
            checkWinCondition();
            if (continueGame) {
                setTimeout(setUpAction, 1000);
            }
        }
    }

    function healSelf() {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        document.querySelector('#dice1').src = `images/${gameData.dice[gameData.roll1-1]}`;
        document.querySelector('#dice2').src = `images/${gameData.dice[gameData.roll2-1]}`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        gameData.health[gameData.index] += gameData.rollSum * gameData.multiplier;
        if (gameData.health[gameData.index] > gameData.maxHP) {
            gameData.health[gameData.index] = gameData.maxHP
        }

        gameConsole.innerHTML = `${gameData.players[gameData.index]} healed ${gameData.rollSum * gameData.multiplier}!`;

        gameData.hpDisplay[gameData.index].innerHTML = `${gameData.health[gameData.index]}`;

        setTimeout(newTurn, 1000);
    }

    function checkWinCondition() {
        if (gameData.health[gameData.index] <= 0) {
            gameConsole.innerHTML += `<br>${gameData.players[gameData.oppIndex]} has won!`;
            continueGame = false;
        } else if (gameData.health[gameData.oppIndex] <= 0) {
            gameConsole.innerHTML += `<br>${gameData.players[gameData.index]} has won!`;
            continueGame = false;
        }

        if (continueGame === false) {
            document.querySelector('#again').className = 'on';
        }

        document.querySelector('#again').addEventListener('click', function(){
            location.reload();
        });
    }
}());