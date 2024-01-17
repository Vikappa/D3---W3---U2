const mainContainer = document.getElementById('mainContainer')
const mainRow = document.getElementById('mainSpinner')
const cartRow = document.getElementById('cartRow')
document.getElementById('')
let listaLibriPerEsecuzione = []
const carrello = []

const recastTime = 5000 //ms

const refreshSchermataLibri = function () {
    mainRow.innerHTML = ``
    let stringaFinale = ``
    for (let index = 0; index < listaLibriPerEsecuzione.length; index++) {
        let book = new Book(listaLibriPerEsecuzione[index].asin, listaLibriPerEsecuzione[index].title, listaLibriPerEsecuzione[index].img, listaLibriPerEsecuzione[index].price, listaLibriPerEsecuzione[index].category, index)
        stringaFinale = stringaFinale + `${book.buildCard()}`
    }
    mainRow.innerHTML = stringaFinale
}

const removeFromShelfScreen = function (x) {

    listaLibriPerEsecuzione.splice(x, 1)

    refreshSchermataLibri()
    console.log(listaLibriPerEsecuzione)
}

class Book {
    constructor(asin, title, img, price, category, indexarray) {
        this.asin = asin
        this.title = title
        this.img = img
        this.price = price
        this.category = category
        this.indexarray = indexarray
    }

    buildCard() {
        return `<div class="card col-3 m-3 p-0" style="width: 18rem;">
        <img src="${this.img}" class="card-img-top" alt="Copertina di ${this.title}">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <p class="card-text">Categoria: ${this.category}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Prezzo: €${this.price}</li>
        </ul>
        <div class="card-body d-flex justify-content-between m-0 p-1">
        <a href="#" class="card-link"><button type="button" onclick=addToCart(${this.indexarray}) class="btn btn-primary pt-1 m-1"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
  Aggiungi al carrello
  <i class="bi bi-bag-plus"></i></button></a>
  <button type="button" onclick=removeFromShelfScreen(${this.indexarray}) class="btn btn-link">Scarta</button>
          </div>
        
        <p class="px-3 mb-0 pb-0 text-center">asin ${this.asin}</p>
      </div>`
    }

}

const totalPrice = function () {
    let ritorno = 0

    for (let g = 0; g < carrello.length; g++) {
        ritorno += carrello[g].price
    }

    return ritorno
}

const removeFromCart = function (x) {
    carrello.splice(x, 1)
    refreshCartScreen()
    if (carrello.length === 0) {
        cartRow.innerHTML = ``
    }
}

const refreshCartScreen = function () {
    cartRow.innerHTML = ``
    let stringaFinale = `<div class="card">
    <div class="card-header">
      Carrello
    </div>
    <div class="card-body">
      <h5 class="card-title">I tuoi libri: </h5>`
    let finaleStringa = `<a href="#" class="btn btn-primary">€${totalPrice()}</a>
    </div>
  </div>`
    for (let index = 0; index < carrello.length; index++) {
        stringaFinale = stringaFinale + `<p class="card-text fs-6">${carrello[index].title}, €${carrello[index].price}
        <span class="badge bg-danger" onclick=removeFromCart(${index}) >Rimuovi</span>
        </p>
        `
    }
    stringaFinale = stringaFinale + finaleStringa
    cartRow.innerHTML = stringaFinale
}

const addToCart = function (x) {

    carrello.push(listaLibriPerEsecuzione[x])
    refreshCartScreen()
}


const startRender = function (arrayLibriDaRenderizzare) {
    mainRow.innerHTML = ``
    let stringaFinale = ``
    mainContainer.className = `container`
    for (let index = 0; index < arrayLibriDaRenderizzare.length; index++) {
        let book = new Book(arrayLibriDaRenderizzare[index].asin, arrayLibriDaRenderizzare[index].title, arrayLibriDaRenderizzare[index].img, arrayLibriDaRenderizzare[index].price, arrayLibriDaRenderizzare[index].category, index)
        stringaFinale = stringaFinale + `${book.buildCard()}`

    }
    mainRow.innerHTML = stringaFinale
}

const start = function () {
    fetch('https://striveschool-api.herokuapp.com/books', {
        // method: 'GET' // il GET è il metodo in ogni caso predefinito
    })
        .then((response) => {
            if (response.ok) {
                console.log('la fetch è finita bene!')
                return response.json()
            } else {
                console.log("la fetch non è finita come ce l'aspettavamo")
                throw new Error() // teletrasportiamoci nel catch()
            }
        })
        .then((booklist) => {

            booklist.forEach((book) => {
                listaLibriPerEsecuzione.push(book)
            })
            startRender(listaLibriPerEsecuzione)
        })
        .catch((error) => {
            console.log('errore generico', error)

        })

}
start()

document.getElementById('btnReset').addEventListener("click", function () {
    localStorage.clear()
})

