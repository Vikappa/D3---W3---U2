const mainContainer = document.getElementById('mainContainer')
const mainRow = document.getElementById('mainSpinner')
const cartRow = document.getElementById('cartRow')
const linkCarrello = document.getElementById('linkCarrello')
const dropCarrello = document.getElementById('dropCarrello')
document.getElementById('')
let listaLibriPerEsecuzione = []
const carrello = []

const recastTime = 5000 //ms

const linktocard = function (asinInput) {
    document.getElementById(`card${asinInput}`).scrollIntoView({ behavior: 'smooth' })
}

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
        return `<div class="card col-2 col-md-4 col-lg-3 m-3 p-0" style="width: 18rem;" id="card${this.asin}">
        <img src="${this.img}" class="card-img-top img-fluid" alt="Copertina di ${this.title}">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <p class="card-text d-none d-md-inline">Categoria: ${this.category}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Prezzo: €${this.price}</li>
        </ul>
        <div class="card-body d-flex justify-content-between m-0 p-1">
        <a class="card-link"><button type="button" onclick=addToCart(${this.indexarray}) class="btn btn-primary pt-1 m-1"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
  Aggiungi al carrello
  <i class="bi bi-bag-plus"></i></button></a>
  <button type="button" onclick=removeFromShelfScreen(${this.indexarray}) class="btn btn-link">Scarta</button>
          </div>
        
        <p class="px-3 mb-0 pb-0 text-center" style="font-size:0.75rem">asin ${this.asin}</p>
      </div>`
    }

}

const saveCart = function () {

}

const totalPrice = function () {
    let ritorno = 0

    for (let g = 0; g < carrello.length; g++) {
        ritorno += carrello[g].price
    }

    return ritorno.toFixed(2)
}

const removeFromCart = function (x) {
    carrello.splice(x, 1)
    refreshCartScreen()
    if (carrello.length === 0) {
        cartRow.innerHTML = ``
    }
}

const refreshCartScreen = function () {
    if (carrello.length > 0) {
        linkCarrello.classList = `nav-link dropdown-toggle me-3 text-white`

    } else {
        linkCarrello.classList = `nav-link disabled dropdown-toggle me-3 text-secondary`
        cartRow.classList.remove('show')
    }
    linkCarrello.textContent = `Carrello (€${totalPrice()})`

    cartRow.innerHTML = ``
    let stringaFinale = ``

    let finaleStringa = `<hr class="dropdown-divider"><div class="ps-3"><a href="#" class="btn btn-primary px-2 py-0">€${totalPrice()}</a>
    </div>
    </div>
  </div>`

    for (let index = 0; index < carrello.length; index++) {
        stringaFinale = stringaFinale +
            `<li onclick=linktocard(${carrello[index].asin})><a class="dropdown-item">${carrello[index].title}, €${carrello[index].price}<p class="card-text fs-6">
        <span class="badge p-1 bg-danger" onclick=removeFromCart(${index}) >Rimuovi</span>
        </p></a></li>`
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
    mainRow.classList.add('bg-white')
    mainRow.classList.add('bg-opacity-50')
    mainRow.classList.add('rounded-3')
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
refreshCartScreen()


document.getElementById('btnReset').addEventListener("click", function () {
    localStorage.clear()
})

window.addEventListener('beforeunload', (event) => {
    event.preventDefault()

})
