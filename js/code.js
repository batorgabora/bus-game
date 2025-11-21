document.addEventListener('DOMContentLoaded', function() {

    const cardImages = [
        'assets/cards/clubs/clubs-2.svg',
        'assets/cards/clubs/clubs-3.svg',
        'assets/cards/clubs/clubs-4.svg',
        'assets/cards/clubs/clubs-5.svg',
        'assets/cards/clubs/clubs-6.svg',
        'assets/cards/clubs/clubs-7.svg',
        'assets/cards/clubs/clubs-8.svg',
        'assets/cards/clubs/clubs-9.svg',
        'assets/cards/clubs/clubs-10.svg',
        'assets/cards/clubs/clubs-ace.svg',
        'assets/cards/clubs/clubs-jack.svg',
        'assets/cards/clubs/clubs-king.svg',
        'assets/cards/clubs/clubs-queen.svg',
        'assets/cards/diamonds/diamonds-2.svg',
        'assets/cards/diamonds/diamonds-3.svg',
        'assets/cards/diamonds/diamonds-4.svg',
        'assets/cards/diamonds/diamonds-5.svg',
        'assets/cards/diamonds/diamonds-6.svg',
        'assets/cards/diamonds/diamonds-7.svg',
        'assets/cards/diamonds/diamonds-8.svg',
        'assets/cards/diamonds/diamonds-9.svg',
        'assets/cards/diamonds/diamonds-10.svg',
        'assets/cards/diamonds/diamonds-ace.svg',
        'assets/cards/diamonds/diamonds-jack.svg',
        'assets/cards/diamonds/diamonds-king.svg',
        'assets/cards/diamonds/diamonds-queen.svg',
        'assets/cards/hearts/hearts-2.svg',
        'assets/cards/hearts/hearts-3.svg',
        'assets/cards/hearts/hearts-4.svg',
        'assets/cards/hearts/hearts-5.svg',
        'assets/cards/hearts/hearts-6.svg',
        'assets/cards/hearts/hearts-7.svg',
        'assets/cards/hearts/hearts-8.svg',
        'assets/cards/hearts/hearts-9.svg',
        'assets/cards/hearts/hearts-10.svg',
        'assets/cards/hearts/hearts-ace.svg',
        'assets/cards/hearts/hearts-jack.svg',
        'assets/cards/hearts/hearts-king.svg',
        'assets/cards/hearts/hearts-queen.svg',
        'assets/cards/spades/spades-2.svg',
        'assets/cards/spades/spades-3.svg',
        'assets/cards/spades/spades-4.svg',
        'assets/cards/spades/spades-5.svg',
        'assets/cards/spades/spades-6.svg',
        'assets/cards/spades/spades-7.svg',
        'assets/cards/spades/spades-8.svg',
        'assets/cards/spades/spades-9.svg',
        'assets/cards/spades/spades-10.svg',
        'assets/cards/spades/spades-ace.svg',
        'assets/cards/spades/spades-jack.svg',
        'assets/cards/spades/spades-king.svg',
        'assets/cards/spades/spades-queen.svg',
    ];

    const questions = [
        "Will the card be Red or Black?",
        "Will the card's value be Higher or Lower",
        "Will the card fall between or outside the values of your first two cards",
        "Guess the suit of your fourth card",
    ];

    const counter = document.getElementById("counter");
    const question = document.getElementById("question");
    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    const card3 = document.getElementById("card3");
    const card4 = document.getElementById("card4");

    const btnTopLeft = document.getElementById("top-left");
    const btnTopRight = document.getElementById("top-right");
    const btnBottomLeft = document.getElementById("bottom-left");
    const btnBottomRight = document.getElementById("bottom-right");
    const jokerCard = document.querySelector('.info');
    const rulesDiv = document.getElementById('rules');

    let deck = [...cardImages];
    let drawnCards = [];
    let counterQuestions = 0;
    let cardColor = "";
    let cardSuit = "";
    let compareCard = "";

    function resetDeck() {
        deck = [...cardImages];
    }

    function draw() {
        if (deck.length === 0) {
            resetDeck();
        }
        let index = Math.floor(Math.random() * deck.length);
        let card = deck[index];
        deck.splice(index, 1);
        return card;
    }

    function valuate(cardsrc) {
        if (!cardsrc) return 0;
        for (let i = 2; i <= 10; i++) {
            if (cardsrc.includes(`-${i}.`)) {
                return i;
            }
        }
        if (cardsrc.includes("jack")) return 11;
        else if (cardsrc.includes("queen")) return 12;
        else if (cardsrc.includes("king")) return 13;
        else if (cardsrc.includes("ace")) return 14;
        return 0;
    }

    function suit(cardsrc) {
        if (!cardsrc) return "";
        if (cardsrc.includes("hearts")) return "heart";
        else if (cardsrc.includes("clubs")) return "club";
        else if (cardsrc.includes("spades")) return "spade";
        else if (cardsrc.includes("diamonds")) return "diamond";
        return "";
    }

    function color(cardsrc) {
        if (!cardsrc) return "";
        if (suit(cardsrc) === "heart" || suit(cardsrc) === "diamond") {
            return "red";
        } else if (suit(cardsrc) === "club" || suit(cardsrc) === "spade") {
            return "black";
        }
        return "";
    }

    function showButtons(btn1, btn2) {
        btnTopLeft.style.backgroundImage = "none";
        btnTopRight.style.backgroundImage = "none";
        btnBottomLeft.style.backgroundImage = "none";
        btnBottomRight.style.backgroundImage = "none";

        if (btn1 === btnTopLeft) btn1.style.backgroundImage = "url('assets/chips/blue_chip.png')";
        else if (btn1 === btnTopRight) btn1.style.backgroundImage = "url('assets/chips/green_chip.png')";
        else if (btn1 === btnBottomLeft) btn1.style.backgroundImage = "url('assets/chips/red_chip.png')";
        else if (btn1 === btnBottomRight) btn1.style.backgroundImage = "url('assets/chips/black_chip.png')";

        if (btn2 === btnTopLeft) btn2.style.backgroundImage = "url('assets/chips/blue_chip.png')";
        else if (btn2 === btnTopRight) btn2.style.backgroundImage = "url('assets/chips/green_chip.png')";
        else if (btn2 === btnBottomLeft) btn2.style.backgroundImage = "url('assets/chips/red_chip.png')";
        else if (btn2 === btnBottomRight) btn2.style.backgroundImage = "url('assets/chips/black_chip.png')";
    }

    function showAllButtons() {
        btnTopLeft.style.backgroundImage = "url('assets/chips/blue_chip.png')";
        btnTopRight.style.backgroundImage = "url('assets/chips/green_chip.png')";
        btnBottomLeft.style.backgroundImage = "url('assets/chips/red_chip.png')";
        btnBottomRight.style.backgroundImage = "url('assets/chips/black_chip.png')";
    }

    function revealCards() {
        if (counterQuestions > 0) {
            card1.src = drawnCards[0];
            card1.style.visibility = "visible";
        } else {
            card1.src = "assets/cards/card-back.svg";
            card1.style.visibility = "visible";
        }

        if (counterQuestions > 1) {
            card2.src = drawnCards[1];
            card2.style.visibility = "visible";
        } else if (counterQuestions === 1) {
            card2.src = "assets/cards/card-back.svg";
            card2.style.visibility = "visible";
        } else {
            card2.style.visibility = "hidden";
        }

        if (counterQuestions > 2) {
            card3.src = drawnCards[2];
            card3.style.visibility = "visible";
        } else if (counterQuestions === 2) {
            card3.src = "assets/cards/card-back.svg";
            card3.style.visibility = "visible";
        } else {
            card3.style.visibility = "hidden";
        }

        if (counterQuestions > 3) {
            card4.src = drawnCards[3];
            card4.style.visibility = "visible";
        } else if (counterQuestions === 3) {
            card4.src = "assets/cards/card-back.svg";
            card4.style.visibility = "visible";
        } else {
            card4.style.visibility = "hidden";
        }
    }

    function startNewGame() {
        resetDeck();
        drawnCards = [draw(), draw(), draw(), draw()];
        counterQuestions = 0;
        updateQuestion();
        revealCards();
    }

    function processLogic() {
        let isCorrect = false;

        if (counterQuestions === 0) {
            if (color(drawnCards[0]) === cardColor) {
                isCorrect = true;
            }
        } else if (counterQuestions === 1) {
            let val1 = valuate(drawnCards[0]);
            let val2 = valuate(drawnCards[1]);
            let actual = val2 > val1 ? "Higher" : "Lower";
            if (val1 === val2) actual = "Same";
            if (compareCard === actual) {
                isCorrect = true;
            }
        } else if (counterQuestions === 2) {
            let val1 = valuate(drawnCards[0]);
            let val2 = valuate(drawnCards[1]);
            let val3 = valuate(drawnCards[2]);
            let min = Math.min(val1, val2);
            let max = Math.max(val1, val2);
            let actual = (val3 > min && val3 < max) ? "Between" : "Outside";
            if (compareCard === actual) {
                isCorrect = true;
            }
        } else if (counterQuestions === 3) {
            let actualSuit = suit(drawnCards[3]);
            if (cardSuit === actualSuit) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            counterQuestions++;
            if (counterQuestions > 3) {
                revealCards();
                question.innerHTML = "YOU WIN!";
                setTimeout(function() {
                    startNewGame();
                }, 1500);
            } else {
                revealCards();
                updateQuestion();
            }
        } else {
            counterQuestions++;
            revealCards();
            question.innerHTML = "GAME OVER!";
            setTimeout(function() {
                startNewGame();
            }, 1500);
        }
    }

    function updateQuestion() {
        question.innerHTML = questions[counterQuestions];
        
        const path = "assets/chips/"; 

        btnTopLeft.style.backgroundImage = "none";
        btnTopRight.style.backgroundImage = "none";
        btnBottomLeft.style.backgroundImage = "none";
        btnBottomRight.style.backgroundImage = "none";
        
        btnTopLeft.style.visibility = "hidden";
        btnTopRight.style.visibility = "hidden";
        btnBottomLeft.style.visibility = "hidden";
        btnBottomRight.style.visibility = "hidden";

        if (counterQuestions === 0) {
            btnTopLeft.style.backgroundImage = `url('${path}black_chip.png')`;
            btnTopLeft.style.visibility = "visible";

            btnBottomLeft.style.backgroundImage = `url('${path}red_chip.png')`;
            btnBottomLeft.style.visibility = "visible";
        } 
        else if (counterQuestions === 1) {
            btnTopLeft.style.backgroundImage = `url('${path}up.png')`;
            btnTopLeft.style.visibility = "visible";

            btnTopRight.style.backgroundImage = `url('${path}down.png')`;
            btnTopRight.style.visibility = "visible";
        } 
        else if (counterQuestions === 2) {
            btnTopLeft.style.backgroundImage = `url('${path}between.png')`;
            btnTopLeft.style.visibility = "visible";

            btnTopRight.style.backgroundImage = `url('${path}outside.png')`;
            btnTopRight.style.visibility = "visible";
        } 
        else if (counterQuestions === 3) {
            btnTopLeft.style.backgroundImage = `url('${path}diamond.png')`;
            btnTopLeft.style.visibility = "visible";

            btnTopRight.style.backgroundImage = `url('${path}club.png')`;
            btnTopRight.style.visibility = "visible";

            btnBottomLeft.style.backgroundImage = `url('${path}heart.png')`;
            btnBottomLeft.style.visibility = "visible";

            btnBottomRight.style.backgroundImage = `url('${path}spade.png')`;
            btnBottomRight.style.visibility = "visible";
        }
    }

    btnTopLeft.addEventListener("click", function() {
        if (counterQuestions === 0) cardColor = "black";
        else if (counterQuestions === 1) compareCard = "Higher";
        else if (counterQuestions === 2) compareCard = "Between";
        else if (counterQuestions === 3) cardSuit = "diamond";
        processLogic();
    });

    btnTopRight.addEventListener("click", function() {
        if (counterQuestions === 0) cardColor = "black";
        else if (counterQuestions === 1) compareCard = "Lower";
        else if (counterQuestions === 2) compareCard = "Outside";
        else if (counterQuestions === 3) cardSuit = "club";
        processLogic();
    });

    btnBottomLeft.addEventListener("click", function() {
        if (counterQuestions === 0) cardColor = "red";
        else if (counterQuestions === 1) compareCard = "Higher";
        else if (counterQuestions === 2) compareCard = "Between";
        else if (counterQuestions === 3) cardSuit = "heart";
        processLogic();
    });

    btnBottomRight.addEventListener("click", function() {
        if (counterQuestions === 0) cardColor = "red";
        else if (counterQuestions === 1) compareCard = "Lower";
        else if (counterQuestions === 2) compareCard = "Outside";
        else if (counterQuestions === 3) cardSuit = "spade";
        processLogic();
    });

    jokerCard.addEventListener('click', () => {
        rulesDiv.style.display = 'block';
    });

    window.addEventListener('click', (event) => {
        if (event.target === rulesDiv) {
            rulesDiv.style.display = 'none';
        }
    });

    startNewGame();
});