const cardShaw = document.getElementById('cards-show')
const loadCardByButton = () => {
    const searchField = document.getElementById('search-field')
    const error = document.getElementById('error')
    const searchValue = parseInt(searchField.value)
    searchField.value = ""
    error.innerText = ""
    cardShaw.innerHTML = ""
    if (isNaN(searchValue)) {
        error.innerText = "Please enter a number!"
        searchField.value = ""
        cardShaw.innerHTML = ""
    } else if ((searchValue <= 0) || searchValue == "" || searchValue > 52) {
        error.innerText = "Please enter a valid number!"
        searchField.value = ""
        cardShaw.innerHTML = ""
    } else {
        fetch(`https://www.deckofcardsapi.com/api/deck/new/draw/?count=${searchValue}`)
            .then(response => response.json())
            .then(data => cardsDisplayed(data.cards))
    }

}

const cardsDisplayed = (cards) => {
    for (const card of cards) {
        // console.log(card)
        const div = document.createElement('div')
        div.classList.add('col-lg-3')
        div.classList.add('mt-3')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${card.suit}</h5>
                <p class="card-text">${card.code}</p>
                <button onclick="cardDetails('${card.code}')" class="btn btn-primary">See Details</button>
            </div>
        </div>
        `
        cardShaw.appendChild(div)
    }
}

// see Details
const cardDetails = (code) => {
    fetch(`https://www.deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(response => response.json())
        .then(data => {
            const allCard = data.cards
            const singleCard = allCard.find(card => card.code === code)
                // console.log(singleCard)
            const div = document.createElement('div')
            div.classList.add('col-lg-12')
            div.classList.add('see-details-div')
            cardShaw.innerHTML = ""
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                    <img src="${singleCard.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${singleCard.suit}</h5>
                    <p class="card-text">${singleCard.code}</p>
                </div>
            </div>
            `
            cardShaw.appendChild(div)
        })
}