//Create an array that holds all cards
var icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

//shuffle function from http://stackoverflow.com/a/2450976
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

shuffle(icons);

const cardsContainer = document.querySelector('.deck');

let openedCards = [];
let matchedCards = [];

/*
* Initializing the Game
*/
function init(){
	//Creating the cards
	for (let i = 0; i < icons.length; i++) {
		const card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = `<i class='${icons[i]}'></i>`;
		cardsContainer.appendChild(card);

		//Adding Click Event
		click(card);
	}
}

/*
* Click Event
*/
function click(card){
		//Adding an Event Listener to the cards
	card.addEventListener('click', function(){

		const currentCard = this;
		const previousCard =openedCards[0];


	//matching cards
		if (openedCards.length === 1) {

			card.classList.add('open', 'show', 'disabled', 'animated', 'wobble');
			openedCards.push(this);

			compare(currentCard, previousCard);

		}else{
			currentCard.classList.add('open', 'show', 'disabled', 'animated', 'wobble');
			openedCards.push(this);
		}
	});
}


/*
*Comparing the Cards
*/

function compare(currentCard, previousCard){
	if (currentCard.innerHTML === previousCard.innerHTML) {

				//matching cards
				currentCard.classList.add('match');
				previousCard.classList.add('match');

				matchedCards.push(currentCard, previousCard);
				openedCards = [];

				//check if game is over
				gameOver();

			}else{
				
				setTimeout(function(){
					currentCard.classList.remove('open', 'show', 'disabled', 'animated', 'wobble');
					previousCard.classList.remove('open', 'show', 'disabled', 'animated', 'wobble');

					openedCards = [];
				}, 200);
				
			}
			addMove();
}

//Checking if Game is Over
function gameOver(){
	setTimeout (function(){
		if(matchedCards.length === icons.length){
			
			swal({
			  title: 'Congratulations',
			  type: 'success',
			  text: 'You have won the game . Moves conceded are ' + moves + '. You have got ' + stars + ' Stars Time taken is ' + hours + ' Hours ' + min + ' Minutes and ' + sec + ' Seconds',
			  icon: "success",
			  allowOutsideClick: false,
              showCancelButton: true,
			  confirmButtonText: 'Play Again',
              confirmButtonColor: '#0000FF',
              cancelButtonText: 'Close',
              cancelButtonColor: '#FF0000'
			}).then(function() {
                location.reload();
            }, function(dismiss) {
                console.log('Yes');
            });
            letsStop = 1;
		}
		
	}, 600);
	
}
		  

//Adding Moves Counter
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;
function addMove(){
	moves++;

	 if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
	movesContainer.innerHTML = moves;

	rating();
}

/*
*Timer
*/

let min = 0;
let sec = 0;
let hours = 0;
let letsStop = 0;


function startTimer() {
    setInterval(function() {
        if (letsStop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
            // if(letsStop === 1)
            // {
            //     break;
            // } 
            //console.log(min);
            //console.log(sec);
        }

    }, 1000);
};


/*
*Rating
*/
const none = `
		<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;

const starsContainer = document.querySelector('.stars');
var stars;

function rating(){


const perfect = `
			<li><i class="fa fa-star star1"></i></li>
            <li><i class="fa fa-star star2"></i></li>
            <li><i class="fa fa-star star3"></i></li>`;

const veryGood = `
			<li><i class="fa fa-star star1"></i></li>
            <li><i class="fa fa-star star2"></i></li>
            <li><i class="fa fa-star"></i></li>`;

const good = `
			<li><i class="fa fa-star star1"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;

	if(moves <= 20){
		starsContainer.innerHTML = perfect;
		stars = 3;
	}else if(moves >= 21 && moves < 30){
		starsContainer.innerHTML = veryGood;
		stars = 2;
	}else{
		starsContainer.innerHTML = good;
		stars = 1;
	}
}

// Reset Button
$('.restart').on('click', function() {
    location.reload();
});
//Function to start the Game
init();