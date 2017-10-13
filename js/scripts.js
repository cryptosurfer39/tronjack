$(document).ready(() => {
    $('#myModal').modal('hide');
    const freshDeck = createDeck();
    var theDeck = [];
    var playersHand = [];
    var dealersHand = [];
    var playerMoney = 100;
    var dealerMoney = 10000000000;
    var potTotal = 0;
    var playerBet = 0;
    $('.double-button').prop('disabled', true);
    $('.stand-button').prop('disabled', true);
    $('.magic-button').prop('disabled', true);
    $('.magic').hide();

    $('.new-game-button').click(() => {
        playersHand = [];
        dealersHand = [];
        playerTotal = 0;
        dealerTotal = 0;
        potTotal = 0;
        playerBet = 0;
        $('.card').html('<img src="images/cards/deck.png" />');
        $('.pot-total').html('0');
        $('.game-text').html('Welcome to Blackjack!')
        $('.player-total').html('0');
        $('.dealer-total').html('0')
        $('.deal-button').prop('disabled', false)
        $('.player-bet').html('0');
        $('.stand-button').prop('disabled', true);
        $('.magic-button').prop('disabled', true);
        $('.magic').hide();
    });
    $('.deal-button').click(() => {
        $('.hit-button').prop('disabled', false);
        $('.double-button').prop('disabled', false);
        $('magic-button').prop('disabled', false);
        var newDeck = freshDeck.slice();
        theDeck = shuffleDeck(newDeck);
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
        placeCard('player', 1, playersHand[0])
        placeCard('dealer', 1, dealersHand[0])
        placeCard('player', 2, playersHand[1])
        placeCard('dealer', 2, dealersHand[1])
        calculateTotal(playersHand, 'player');
        calculateTotal(dealersHand, 'dealer');
    });
    $('.hit-button').click(() => {
        console.log(theDeck)
        $('.double-button').prop('disabled', true)
        if (calculateTotal(playersHand, 'player') <= 21) {
            var topCard = theDeck.shift();
            playersHand.push(topCard);
            placeCard('player', playersHand.length, topCard);
            calculateTotal(playersHand, 'player')
        } else if (calculateTotal(playersHand, 'player') == 0) {
            $('.hit-button').prop('disabled', true);
        } else {
            $('.hit-button').prop('disabled', true);
        }
    });
    $('.stand-button').click(() => {
        $('.hit-button').prop('disabled', true);
        $('.double-button').prop('disabled', true)
        var dealerTotal = calculateTotal(dealersHand, 'dealer');
        while (dealerTotal < 17) {
            var topCard = theDeck.shift();
            dealersHand.push(topCard);
            placeCard('dealer', dealersHand.length, topCard);
            dealerTotal = calculateTotal(dealersHand, 'dealer')
        }
        checkWin();
    });
    $('.bet1-button').click(() => {
        $('.stand-button').prop('disabled', false);
        playerMoney -= 1;
        $('.player-money').html(playerMoney)
        potTotal += 1;
        $('.pot-total').html(potTotal)
        playerBet += 1;
        $('.player-bet').html(playerBet)
    });
    $('.bet5-button').click(() => {
        $('.stand-button').prop('disabled', false);
        playerMoney -= 5;
        $('.player-money').html(playerMoney)
        potTotal += 5;
        $('.pot-total').html(potTotal)
        playerBet += 5;
        $('.player-bet').html(playerBet)
    });
    $('.bet10-button').click(() => {
        $('.stand-button').prop('disabled', false);
        playerMoney -= 10;
        $('.player-money').html(playerMoney)
        potTotal += 10;
        $('.pot-total').html(potTotal)
        playerBet += 10;
        $('.player-bet').html(playerBet)
    });
    $('.double-button').click(() => {
        if (playerBet > 0) {
            $('.deal-button').prop('disabled', true);
            $('.hit-button').prop('disabled', true);
            var topCard = theDeck.shift();
            playersHand.push(topCard);
            placeCard('player', playersHand.length, topCard);
            calculateTotal(playersHand, 'player')
            doubleBet = playerBet * 2;
            playerMoney = playerMoney - (doubleBet / 2);
            $('.player-bet').html(doubleBet);
            $('.player-money').html(playerMoney);
            $('double-button').prop('disabled', true);
        }
    });
    $('.magic-button').click(() => {
        console.log(theDeck)
        $('.magic').show();
        $('.magic').html("Don't open up the console.")
    });

    function createDeck() {
        var newDeck = [];
        const suits = ['h', 's', 'd', 'c'];
        for (let s = 0; s < suits.length; s++) {
            for (let c = 1; c <= 13; c++) {
                newDeck.push(c + suits[s])
            };
        };
        return newDeck;
    };

    function shuffleDeck(arrayToBeShuffled) {
        for (let i = 0; i < 50000; i++) {
            var rand1 = Math.floor(Math.random() * arrayToBeShuffled.length)
            var rand2 = Math.floor(Math.random() * arrayToBeShuffled.length)
            var saveValueOfCard1 = arrayToBeShuffled[rand1];
            arrayToBeShuffled[rand1] = arrayToBeShuffled[rand2];
            arrayToBeShuffled[rand2] = saveValueOfCard1;
        };
        return arrayToBeShuffled;
    };

    function placeCard(who, where, card) {
        var classSelector = `.${who}-cards .card-${where}`;
        $(classSelector).html(`<img src="images/cards/${card}.png" />`).css({
            // 'transform': 'rotateY(360deg)',
            // 'transition': 'all 2s'
        })
    }

    function calculateTotal(hand, who) {
        var handTotal = 0;
        var thisCardTotal = 0;
        var hasAce = false;
        var totalAces = 0;
        for (let i = 0; i < hand.length; i++) {
            thisCardTotal = Number(hand[i].slice(0, -1));
            if (thisCardTotal == 1) {
                hasAce = true;
                thisCardTotal = 11;
                totalAces++;
            } else if (thisCardTotal > 10) {
                thisCardTotal = 10;
            }
            handTotal += thisCardTotal;
        }
        for (let i = 0; i < totalAces; i++) {
            if (handTotal > 21) {
                handTotal -= 10;
            }
        }
        var classSelector = `.${who}-total`;
        $(classSelector).html(handTotal);
        return handTotal;
    };

    function checkWin() {
        var playerTotal = calculateTotal(playersHand, 'player');
        var dealersTotal = calculateTotal(dealersHand, 'dealer');
        if (playerTotal > 21 || dealersTotal > playerTotal) {
            $('.game-text').html("Dealer Wins!")
            dealerMoney += potTotal;
            potTotal = 0;
            $('.pot-total').html(potTotal)
            $('.dealer-money').html(dealerMoney);
        } else if (playersHand.length == 2 && playerTotal == 21) {
            $('.game-text').html("Woh, That's a Blackjack!")
            playerMoney += potTotal;
            potTotal = 0;
            $('.pot-total').html(potTotal)
            $('.player-money').html(playerMoney);
        } else if (dealersTotal > 21 || playerTotal > dealersTotal) {
            $('.game-text').html("You Win!")
            playerMoney += potTotal;
            potTotal = 0;
            $('.pot-total').html(potTotal)
            $('.player-money').html(playerMoney);
        } else if (dealersHand.length == 2 && dealersTotal == 21) {
            $('.game-text').html("Dealer got Blackjack. Better luck next time.")
            dealerMoney += potTotal;
            potTotal = 0;
            $('.pot-total').html(potTotal)
            $('.dealer-money').html(dealerMoney);
        } else {
            $('.game-text').html("Draw, Dealer Wins!")
            dealerMoney += potTotal;
            potTotal = 0;
            $('.pot-total').html(potTotal)
            $('.dealer-money').html(dealerMoney);
        }
    }

});