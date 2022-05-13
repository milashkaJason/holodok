const feedbackCards = document.querySelectorAll('.feedback-block .card');
const feedbackCardsLength = feedbackCards.length;
let cardToShow = 3;
const showMoreBtn = document.querySelector('.show-more');

showMoreBtn.addEventListener('click', () => {
    showMore()
})

const show = () => {
    if (feedbackCardsLength >= cardToShow) {
        feedbackCards.forEach((card, index) => {
            if (index > cardToShow - 1) {
                card.classList.add('hide');
            } else {
                card.classList.remove('hide');
            }
        })
    }
    if (feedbackCardsLength <= cardToShow) {
        showMoreBtn.style.display = 'none'
    }
}

function showMore () {
    console.log(feedbackCardsLength, cardToShow)
    if (feedbackCardsLength - cardToShow < 3) {
        cardToShow += feedbackCardsLength - cardToShow;
    } else {
        cardToShow += 3;
    }
    show()
}

show();

