const container = document.getElementById('game');

let cardscount = 8,
    cardArray = [],
    firstCard = null,
    secondCard = null;

function btnStartGame(number) {
    let btn = document.createElement('button');
    btn.classList.add('start__game')
    btn.innerHTML = 'Начать игру';

    btn.addEventListener('click', function (){
        container.innerHTML = '';
        newGame(container, createNumbersArray, shuffle, number)
        btn.remove()
        function timer() {
            setTimeout(()=> {
                alert('Game Over');
                container.innerHTML = '';
                btnStartGame(cardscount);
            }, 60000)
        }
        timer()
    })
    container.append(btn);

}

class Card {
    _open = false
    _success = false

    constructor(container, number, action) {
        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.card.textContent = number;
        this.number = number;
        this.card.addEventListener('click',
            () => {
                if (this.open === false && this.success === false) {
                    this.open = true
                    action(this)
                }

            })
        container.append(this.card);
    }

    set open(value) {
        this._open = value
        value ? this.card.classList.add('open') : this.card.classList.remove('open')
    }

    get open() {
        return this._open
    }

    set success(value) {
        this._success = value
        value ? this.card.classList.add('success') : this.card.classList.remove('success')
    }

    get success() {
        return this._success
    }
}

function createNumbersArray(count, shuffle) {
    const arr = [];
    for (let i = 1; i <= count; ++i) {
        arr.push(i);
        arr.push(i);
    }
    shuffle(arr)
    return arr;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
}

function newGame(container, createNumbersArray, shuffle, cardscount) {
    for (const cardNumber of createNumbersArray(cardscount, shuffle)) {
        cardArray.push(new Card(container, cardNumber, flip))
    }

    function flip(card) {

        if (firstCard !== null && secondCard !== null) {
            if (firstCard.number !== secondCard.number) {
                firstCard.open = false
                secondCard.open = false
                firstCard = null
                secondCard = null
            }
        }

        if (firstCard == null) {
            firstCard = card
        } else {
            if (secondCard == null) {
                secondCard = card
            }
        }


        if (firstCard !== null && secondCard !== null) {
            if (firstCard.number === secondCard.number) {
                firstCard.success = true
                secondCard.success = true
                firstCard = null
                secondCard = null
            }
        }
        if (document.querySelectorAll('.card.success').length === createNumbersArray(cardscount, shuffle).length) {
            alert('You Win');
            container.innerHTML = '';
            btnStartGame(cardscount)
        }
    }
}
btnStartGame(cardscount)




