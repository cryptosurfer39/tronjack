// BlackJack deal
// function
// Create deck
// function
// Shuffle deck
// function
// Add card[0] and card[2] to player hand, 1 and 3 to dealer
// Place card
// function
// Push card onto players array

$(document).ready(() => {
    var playersHand = [];
    var dealersHand = [];
    // to create an nth number of decks
    const freshDeck = createDeck();
    // slice is used to make a separate copy so that freshDeck won't be mutated
    var theDeck = freshDeck.slice();
    $('.deal-button').click(() => {
        theDeck = freshDeck.slice();
        theDeck = shuffleDeck(theDeck);
        playersHand = [];
        dealersHand = [];
        var topCard = theDeck.shift();
        playersHand.push(topCard);
        topCard = theDeck.shift();
        dealersHand.push(topCard);
        topCard = theDeck.shift();
        playersHand.push(topCard);
        topCard = theDeck.shift();
        dealersHand.push(topCard);

        placeCard('player', 1, playersHand[0]);
        placeCard('dealer', 1, dealersHand[0]);
        placeCard('player', 2, playersHand[1]);
        placeCard('dealer', 2, dealersHand[1]);

        calculateTotal(playersHand, 'player');
        calculateTotal(dealersHand, 'dealer');

    });
    $('.hit-button').click(() => {
        var topCard = theDeck.shift();
        playersHand.push(topCard);
        placeCard('player', playersHand.length, playersHand[playersHand.length - 1]);
        calculateTotal(playersHand, 'player');

    });
    $('.stand-button').click(() => {
        var dealersTotal = calculateTotal(dealersHand, 'dealer');
        while (dealersTotal < 17) {
            var topCard = theDeck.shift();
            dealersHand.push(topCard);
            placeCard('dealer', dealersHand.length, topCard);
            dealersTotal = calculateTotal(dealersHand, 'dealer');
        };
        checkWin();
    });

    function createDeck() {
        var newDeck = [];
        const suits = ['h', 's', 'd', 'c'];
        // s is suits
        for (let s = 0; s < suits.length; s++) {
            // c is card 
            for (let c = 1; c <= 13; c++) {
                newDeck.push(c + suits[s]);
            };
        };
        return newDeck;
    };

    function shuffleDeck(aDeckToBeShuffled) {
        for (let i = 0; i < 50000; i++) {
            var rand1 = Math.floor(Math.random() * aDeckToBeShuffled.length);
            var rand2 = Math.floor(Math.random() * aDeckToBeShuffled.length);
            card1Defender = theDeck[rand1];
            aDeckToBeShuffled[rand1] = aDeckToBeShuffled[rand2];
            aDeckToBeShuffled[rand2] = card1Defender;
        };
        return aDeckToBeShuffled;
    };

    function placeCard(who, where, what) {
        var classSelector = `.${who}-cards .card-${where}`;
        $(classSelector).html(`<img src="images/cards/${what}.png" />`);
    };

    function calculateTotal(hand, who) {
        var handTotal = 0;
        var thisCardsValue = 0;
        for (let i = 0; i < hand.length; i++) {
            thisCardsValue = Number(hand[i].slice(0, -1));
            handTotal += thisCardsValue
        };
        var classSelector = `.${who}-total`;
        $(classSelector).html(`${who} :${handTotal}`);
        return handTotal;
    };

    function checkWin() {
        var playerTotal = calculateTotal(playersHand, 'player');
        var dealersTotal = calculateTotal(dealersHand, 'dealer');
        if (playerTotal > 21 || dealersTotal > playerTotal) {
            alert('You lose!')
        } else if (dealersTotal > 21 || playerTotal > dealersTotal) {
            alert('You win!')
        } else if (playersHand.length == 2 && playerTotal == 21) {
            alert("Woh!  That's a blackjack!")
        } else if (dealersHand.length == 2 && dealersTotal == 21) {
            alert("Dealer got blackjack! Better luck next time.");
        } else {
            alert("Draw...play again!");
        }
    }

    function reset() {

    }
});