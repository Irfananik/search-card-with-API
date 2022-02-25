const loadCardByButton = () => {
    const searchField = document.getElementById('search-field')
    const error = document.getElementById('error')
    const searchValue = searchField.value
    searchField.value = ""
    if (isNaN(searchValue)) {
        error.innerText = "Please enter a number!"
        searchField.value = ""
    } else if ((searchValue <= 0) || searchValue == "") {
        error.innerText = "Please enter a valid number!"
        searchField.value = ""
    } else {
        fetch('https://www.deckofcardsapi.com/api/deck/new/draw/?count=3')
            .then(response => response.json())
            .then(data => console.log(data))
    }

}