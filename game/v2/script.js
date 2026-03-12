(function(){
    'use strict';
    console.log('reading js');

    const gameConsole = document.querySelector('#gameConsole p');
    const panel = document.querySelector('#panel');
    const player1HP = document.querySelector('#displayP1HP');
    const player2HP = document.querySelector('#displayP2HP');
    const p1image = document.querySelector('#p1image');
    const p2image = document.querySelector('#p2image');
    const laser1 = document.querySelector('#laser1');
    const laser2 = document.querySelector('#laser2');
    let continueGame = true;
    let soundControl = false;

    const sounds = {
        smallLaser: new Audio('sounds/smallLaser.mp3'),
        bigLaser:new Audio('sounds/bigLaser.mp3'),
        beep: new Audio('sounds/button.mp3'),
        dice: new Audio('sounds/roulette.mp3'),
        // diceStop: new Audio('sounds/rouletteStop.mp3'),
        explode: new Audio('sounds/explode.mp3'),
        heal: new Audio('sounds/heal.mp3'),
        win: new Audio('sounds/win.mp3'),
        bgm: new Audio('sounds/bgm.mp3')
    }

    sounds.bgm.play();
    sounds.bgm.loop = true;

    function adjustSound() {
        const allSounds = Object.values(sounds);
        const startSound = document.querySelector('#startSound');
        const gameSound = document.querySelector('#gameSound');
        const soundButtons = [startSound, gameSound];
        for (const eachSound of allSounds) {
                eachSound.volume = 0;
            }

        for (const eachButton of soundButtons) {
            eachButton.addEventListener('click', function(){
                if (soundControl) {
                    soundControl = false;
                    for (const eachButton of soundButtons) {
                        eachButton.className = 'soundOff';
                        eachButton.innerHTML = 'Sound Off';
                    }
                    for (const eachSound of allSounds) {
                        eachSound.volume = 0;
                    }
                } else {
                    soundControl = true;
                    for (const eachButton of soundButtons) {
                        eachButton.className = 'soundOn';
                        eachButton.innerHTML = 'Sound On';
                    }
                    for (const eachSound of allSounds) {
                        eachSound.volume = 1;
                    }
                    sounds.smallLaser.volume = 0.5;
                    sounds.bigLaser.volume = 0.8;
                    sounds.dice.volume = 0.6;
                    sounds.bgm.volume = 0.2;
                }
            });
        }

        
        
        // console.log(allSounds);
    }

    adjustSound();

    const gameData = {
        dice: ['dice-1.svg', 'dice-2.svg', 'dice-3.svg', 'dice-4.svg', 'dice-5.svg', 'dice-6.svg'],
        players: ['Player 1', 'Player 2'],
        health: [100, 100],
        hpDisplay: [player1HP, player2HP],
        playerImages: [p1image, p2image],
        lasers: [laser1, laser2],
        roll1: 1,
        roll2: 2,
        rollSum: 0,
        index: 0,
        oppIndex: 1,
        maxHP: 100,
        multiplier: 1,
        accumDamage: 0,
        rollsThisTurn: 0,
        singlePlayer: false,
        npcBehavior: 5,
        attackAction: true
    };

    const allButtons = document.querySelectorAll('button');
    for (const eachButton of allButtons) {
        eachButton.addEventListener('mouseup', function(){
            sounds.beep.play();
        })
    }

    switchScene();
    
    function switchScene(){
        //buttons and form
        const openRules = document.querySelectorAll('.readRules');
        const closeRules = document.querySelector('#closeRule');
        const startForm = document.querySelector('form');
        const quit = document.querySelector('#quit');

        // scenes
        const rules = document.querySelector('#rules');
        const audioSources = document.querySelector('#audioSources');
        const sourceBtn = document.querySelector('#sources');

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
            audioSources.className = 'off';
            gameSetUp();   
        });

        // quit game
        quit.addEventListener('click', function() {
            setTimeout(function(){
                location.reload();
            },300);
        })

        //audio
        sourceBtn.addEventListener('click', function(){
            if (audioSources.className = 'off') {
                audioSources.className = 'on';
            }
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

        if (gameData.npcBehavior > 2 && gameData.index === 1) {
                gameData.npcBehavior --;
            }

        setUpAction();
    }

    function setUpAction() {

        if (gameData.rollsThisTurn !== 0 && gameData.rollsThisTurn % 2 === 0) {
            gameData.multiplier++;
            // console.log(gameData.multiplier);
            document.querySelector('#number').innerHTML = `x ${gameData.multiplier}`;
        }

        for (const eachPlayer of gameData.playerImages) {
            eachPlayer.className = 'model'
        }

        if (gameData.singlePlayer && gameData.index === 1) {            
            // console.log(gameData.rollsThisTurn);        
            npcAction();
        } else {
            playerAction();
        }
    }

    function playerAction() {
        gameConsole.innerHTML += `<br>It's ${gameData.players[gameData.index]}'s turn!`;
        // control buttons
        document.querySelector('#controlButtons').innerHTML = '<button id="attack">Attack</button> <button id="endTurn">End Turn</button>'
        const attack = document.querySelector('#attack');
        const endTurn = document.querySelector('#endTurn');

        panel.className = 'on';
  
        attack.addEventListener('click', function(){
            // console.log('throw the dice and attack!');
            gameData.attackAction = true;
            rollDice();
            // attackOpponent();
        });

        endTurn.addEventListener('click', function(){
            // console.log('Throw the dice and heal! Turn ends here!')
            gameData.attackAction = false;
            rollDice();
            // healSelf();
        })
    }

    function npcAction() {
        const npcConsole = document.querySelector('#controlButtons');
        npcConsole.innerHTML = '<p>NPC</p>';
        if (gameData.rollsThisTurn <= gameData.npcBehavior) {
            npcConsole.innerHTML += '<p>Attacks!</p>';
            gameData.attackAction = true;
            rollDice();
            // setTimeout(attackOpponent, 1000);
        } else {
            npcConsole.innerHTML += '<p>Heals</p>';
            gameData.npcBehavior += 2;
            gameData.attackAction = false;
            rollDice();
            // setTimeout(healSelf, 1000);
        }

        panel.className = 'on';
    }

    function attackOpponent() {
        // rollDice();
        gameData.accumDamage += gameData.rollSum;
        gameData.rollsThisTurn++;
        // console.log(`damage is ${gameData.rollSum}`);
        // console.log(`total damage this turn is ${gameData.accumDamage}`);
        // console.log(`number of rolls taken this turn is ${gameData.rollsThisTurn}`);

        if (gameData.rollSum === 2) {
            gameData.health[gameData.index] = gameData.health[gameData.index] - gameData.accumDamage;
            gameConsole.innerHTML = `${gameData.players[gameData.index]} took ${gameData.accumDamage} damage!`;
            
            // insert self damage display
            // gameConsole.innerHTML = 'switching player';

            checkWinCondition();

            playAnimation('selfDamage');
            
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.health[gameData.index] = gameData.health[gameData.index] - gameData.rollSum * gameData.multiplier;
            gameConsole.innerHTML = `${gameData.players[gameData.index]} took ${gameData.rollSum * gameData.multiplier} damage!`;

            // insert self damage display
            // gameConsole.innerHTML = 'switching player';

            checkWinCondition();
    
            playAnimation('selfDamage');
                   
        } else {
            gameData.health[gameData.oppIndex] = gameData.health[gameData.oppIndex] - gameData.rollSum;
            gameConsole.innerHTML = `${gameData.players[gameData.index]} dealt ${gameData.rollSum} damage to ${gameData.players[gameData.oppIndex]}!`;

            // insert attacking display

            // continue turn
            checkWinCondition();
            
            playAnimation('damage')
            
        }
    }

    function healSelf() {
        gameData.health[gameData.index] += gameData.rollSum * gameData.multiplier;
        if (gameData.health[gameData.index] > gameData.maxHP) {
            gameData.health[gameData.index] = gameData.maxHP
        }

        gameConsole.innerHTML = `${gameData.players[gameData.index]} healed ${gameData.rollSum * gameData.multiplier}!`;

        playAnimation('heal');
    }

    function checkWinCondition() {
        if (gameData.health[gameData.index] <= 0) {
            // animateHPBar();
            gameConsole.innerHTML += `<br>${gameData.players[gameData.oppIndex]} has won!`;
            continueGame = false;
            setTimeout(function(){
                gameData.playerImages[gameData.index].className = 'modelDefeated';
            },2500);
        } else if (gameData.health[gameData.oppIndex] <= 0) {
            // animateHPBar();
            gameConsole.innerHTML += `<br>${gameData.players[gameData.index]} has won!`;
            continueGame = false;
            setTimeout(function(){
                gameData.playerImages[gameData.oppIndex].className = 'modelDefeated';
            },2500);
        }

        if (continueGame === false) {
            document.querySelector('#again').className = 'on';
            panel.className = 'off';
        }

        document.querySelector('#again').addEventListener('click', function(){
            setTimeout(function(){
                location.reload();
            },350);
        });
    }

    function animateHPBar() {
        const barP1 = document.querySelector('#player1HP');
        const barP2 = document.querySelector('#player2HP');
        let percentageP1 = gameData.health[0] / gameData.maxHP * 100;
        let percentageP2 = gameData.health[1] / gameData.maxHP * 100;

        if (gameData.health[0] > 0) {
            barP1.style.width = `${percentageP1}%`
        } else {
            barP1.style.width = '0%'
        }

        if (percentageP1 <= 20) {
            barP1.style.backgroundColor = 'red';
            gameData.hpDisplay[0].style.color = 'lightcoral'
        } else if (percentageP1 <=50){
            barP1.style.backgroundColor = 'yellow';
            gameData.hpDisplay[0].style.color = 'yellow';
        } else {
            barP1.style.backgroundColor = 'lime';
            gameData.hpDisplay[0].style.color = 'white';
        }

        if (gameData.health[1] > 0) {
            barP2.style.width = `${percentageP2}%`
        } else {
            barP2.style.width = '0%'
        } 

        if (percentageP2 <= 20) {
            barP2.style.backgroundColor = 'red'
            gameData.hpDisplay[1].style.color = 'lightcoral';
        } else if (percentageP2 <=50){
            barP2.style.backgroundColor = 'yellow';
            gameData.hpDisplay[1].style.color = 'yellow';
        } else {
            barP2.style.backgroundColor = 'lime';
            gameData.hpDisplay[1].style.color = 'white';
        }

        gameData.hpDisplay[gameData.index].innerHTML = `${gameData.health[gameData.index]}`;
        gameData.hpDisplay[gameData.oppIndex].innerHTML = `${gameData.health[gameData.oppIndex]}`;
    }

    function rollDice() {
        panel.className = 'off';

        let prevRoll1 = gameData.roll1;
        let prevRoll2 = gameData.roll2;
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        
        const dice1 = document.querySelector('#dice1');
        const dice2 = document.querySelector('#dice2');

        animateRoll(dice1, prevRoll1, gameData.roll1);
        animateRoll(dice2, prevRoll2, gameData.roll2);
    }

    function animateRoll(dice, start, end) {
        let count;
        let diceID = start;
        if (start > end) {
            count = 6 * 5 - start + end;
        } else {
            count = 6 * 4 + end - start;
        }
        
        // sounds.dice.load();
        sounds.dice.play();
        changeDiceSrc(dice, diceID, count);
        
    }

    function changeDiceSrc(dice, diceID, count) {
        setTimeout(function(){
            // sounds.roll.pause();
            dice.src = `images/${gameData.dice[diceID-1]}`;
            // sounds.roll.play();

            if (count > 0) {
                count--;
                if (diceID === 6) {
                    diceID = 1;
                } else {
                    diceID++;
                }

                changeDiceSrc(dice, diceID, count);
            }  
            else if (gameData.attackAction && dice === dice1) {
                setTimeout(function(){
                    sounds.dice.pause();
                    sounds.dice.currentTime = 0;
                    // sounds.diceStop.play();
                    setTimeout(attackOpponent,400);
                },100);
            } else if (gameData.attackAction === false && dice === dice1) {
                setTimeout(function(){
                    sounds.dice.pause();
                    sounds.dice.currentTime = 0;
                    // sounds.diceStop.play();
                    setTimeout(healSelf,400);
                },100);
            }
        },70);
    }

    function playAnimation(type) {
        switch(type) {
            case 'damage': 
                if(gameData.rollSum >= 8) {
                    gameData.lasers[gameData.index].className = 'bigLaser';
                    sounds.smallLaser.play();
                    sounds.smallLaser.currentTime = 0;
                    
                } else {
                    gameData.lasers[gameData.index].className = 'laserOn';
                    sounds.smallLaser.play();
                    sounds.smallLaser.currentTime = 0;
                }
                setTimeout(function(){
                    gameData.playerImages[gameData.oppIndex].className = 'modelHit';
                    sounds.bigLaser.play();
                    sounds.bigLaser.currentTime = 0;
                    animateHPBar();
                    setTimeout(function(){
                        gameData.lasers[gameData.index].removeAttribute('class');
                        if(continueGame){
                            setUpAction();
                        } else {
                            sounds.win.play();
                        }
                    }, 1000);
                },1000);
                break;
            case 'selfDamage': gameData.playerImages[gameData.index].className = 'modelHit';
                sounds.bigLaser.play();
                sounds.bigLaser.currentTime = 0;
                animateHPBar();
                if (continueGame){
                    setTimeout(newTurn, 1000);
                } else {
                    sounds.win.play();
                }
                break;
            default: gameData.playerImages[gameData.index].className = 'modelHeal';
                sounds.heal.play();
                sounds.heal.currentTime = 0;
                animateHPBar();
                // console.log(gameData.playerImages[gameData.index].className);
                if(continueGame){
                    setTimeout(newTurn, 1000);
                }
        }
    }
}());