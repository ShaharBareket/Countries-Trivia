'use strict'

var gCorrectSound = new Audio('audio/correct.wav');
var gWrongSound = new Audio('audio/wrong.mp3');
var gWinSound = new Audio('audio/win.wav');

var gQuests = createQuests();
var gOptsCount = gQuests[0].opts.length;
var gCurrQstIdx;

function init() {
    gCurrQstIdx = 0;
    renderQuest(gCurrQstIdx);
    for (let i = 0; i < gOptsCount; i++) {
        var elOptsContainer = document.querySelector(`.opt${i + 1}-container`);
        elOptsContainer.style.display = 'block';
        elOptsContainer.classList.remove('right');
    }
    var elWinnerModal = document.querySelector('.winner-modal');
    elWinnerModal.style.display = 'none';
    var elReplayBtn = document.querySelector('.replay-btn');
    elReplayBtn.style.display = 'none';

}

function createQuests() {
    var quests = [];
    quests.push({ id: 0, opts: ['USA', 'Canada', 'Australia', 'Greece'], correctOptIndex: 0 });
    quests.push({ id: 1, opts: ['India', 'Spain', 'China', 'UK'], correctOptIndex: 2 });
    quests.push({ id: 2, opts: ['Belgium', 'Mexico', 'Poland', 'Brazil'], correctOptIndex: 3 });
    quests.push({ id: 3, opts: ['Israel', 'Italy', 'Armenia', 'Bolivia'], correctOptIndex: 0 });
    quests.push({ id: 4, opts: ['Japan', 'Russia', 'Cuba', 'Cyprus'], correctOptIndex: 1 });
    quests.push({ id: 5, opts: ['Peru', 'Ecuador', 'Japan', 'Norway'], correctOptIndex: 1 });
    return quests;
}

function renderQuest(qstIdx) {
    var elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = `<img src="img/${qstIdx}.png" />`;
    for (let i = 0; i < gOptsCount; i++) {
        var elOptsContainer = document.querySelector(`.opt${i + 1}-container`);
        elOptsContainer.classList.remove('wrong');
        elOptsContainer.innerText = gQuests[qstIdx].opts[i];
    }
}

function checkAnswer(optIdx) {
    console.log('quest' + (gQuests[gCurrQstIdx].id + 1))
    if (optIdx === gQuests[gCurrQstIdx].correctOptIndex) {
        gCurrQstIdx++;
        gCorrectSound.play();
        var elOptsContainer = document.querySelector(`.opt${optIdx + 1}-container`);
        elOptsContainer.classList.add('right');
        if (gCurrQstIdx > gQuests.length - 1) return endGame();
        setTimeout(function() { renderQuest(gCurrQstIdx) }, 750);
        setTimeout(function() { elOptsContainer.classList.remove('right') }, 750);

    } else {
        var elOptsContainer = document.querySelector(`.opt${optIdx + 1}-container`);
        elOptsContainer.classList.add('wrong');
        gWrongSound.play();
        setTimeout(function() { elOptsContainer.classList.remove('wrong') }, 750);
    }
}

function endGame() {
    var elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = `<img src="img/win.gif" />`;
    for (let i = 0; i < gOptsCount; i++) {
        var elOptsContainer = document.querySelector(`.opt${i + 1}-container`);
        elOptsContainer.classList.remove('wrong');
        elOptsContainer.style.display = 'none';
    }
    var elWinnerModal = document.querySelector('.winner-modal');
    elWinnerModal.style.display = 'block';
    var elReplayBtn = document.querySelector('.replay-btn');
    elReplayBtn.style.display = 'block';
    gWinSound.play();
}