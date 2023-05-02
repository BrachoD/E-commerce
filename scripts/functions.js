/*Fetch Stock*/

async function fetchStock() {
    await fetch('../stock.json')
        .then((res) => res.json())
        .then((data) => {

            data.forEach((product) => {
                productToAppend = new Product(product.id, product.productName, product.img, product.category, product.stock, product.price, product.available)
                productList.push(productToAppend)

            })
            drawProducts(productList)
        })
        .catch((error) => {
            failedToFetch(error)
        })
}

/*Render products function*/
function drawProducts(productsArray) {

    let productListContainer = document.getElementById("productList")
    productListContainer.innerHTML = ""

    productsArray.forEach(product => {
        let productCard = document.createElement("div")
        productCard.className = "card"
        productCard.innerHTML = `
    <img src=${product.img} class="card-img-list card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.productName}</h5>
                    <p class="card-text">Category: ${product.category}</p>
                    <p class="card-text">Units in stock: ${product.stock} units</p>
                    <h6 class="card-title"><strong>Price: $${product.price}</strong></h6>

                    <a id="${product.id}" class="btn btn-primary">Add to cart</a>
                </div>
    `
        productListContainer.appendChild(productCard)
        let button = document.getElementById(product.id)
        button.addEventListener("click", addToCart)

    })

}

/*Filtering function*/
function filterProducts(e) {
    let filteredArray = productList.filter(product => product.productName.toLowerCase().includes(searchBar.value.toLowerCase()))
    drawProducts(filteredArray)
}

/*Add to cart function*/
function addToCart(e) {
    let productFound = productList.find(product => product.id === Number(e.target.id))
    if (productFound.available) {

        if (shoppingCart.some(({ id }) => id == productFound.id)) {
            let pos = shoppingCart.findIndex(product => product.id == productFound.id)
            shoppingCart[pos].quantity++
            shoppingCart[pos].subtotal = shoppingCart[pos].price * shoppingCart[pos].quantity
        } else {

            shoppingCart.push({
                id: productFound.id,
                productName: productFound.productName,
                category: productFound.category,
                img: productFound.img,
                price: productFound.price,
                quantity: 1,
            })
        }
        productFound.sell()
        addToCartToast(productFound.productName)
        drawProducts(productList)
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        localStorage.setItem("productListBackup", JSON.stringify(productList))
        drawShoppingCart(shoppingCart)
    }
    else {
        noStockAlert()
    }
}

/*Clean cart function*/
function cleanCart() {
    shoppingCart.forEach(productInCart => {
        let productToDelete = productList.find(product => product.id === productInCart.id)
        for (let i = 0; i < productInCart.quantity; i++) {
            productToDelete.returnItem()
        }
    })
    shoppingCart = []
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    localStorage.setItem("productListBackup", JSON.stringify(productList))
    drawShoppingCart(shoppingCart)
    drawProducts(productList)
}

/*Render shopping cart function*/
function drawShoppingCart(productsArray) {
    shoppingCartDOM.innerHTML = ""
    let subtotal = 0
    let total = 0

    if (productsArray.length == 0) {
        shoppingCartDOM.innerHTML = `
        <h1>Your cart is empty!</h1>
        <h5>Keep looking until you find something you like!☺</h5>
        `
    }
    else {
        productsArray.forEach(product => {

            shoppingCartDOM.innerHTML += `
                <div class="card card-cart" style="width: 80%;">
        
                                    <img src="${product.img}" class="card-img-cart card-img-top" alt="...">
                                    <div class="card-body">
                                        <div>
                                            <h5 class="card-title">${product.productName}</h5>
                                            <p class="card-text">Category: ${product.category}</p>
                                            <h6 class="card-title"><strong>Price per unit: $${product.price}</strong></h6>
                                        </div>
                                        <div>
                                            <h6 class="card-title"><strong>Quantity:</strong></h6>
                                            <p class="card-text">${product.quantity} units</p>
                                        </div>
                                        <div>
                                            <h6 class="card-title"><strong>Sub-total: $${product.quantity * product.price}</strong></h6>
                                            <h6 class="card-title"><strong>Total(+tax): $${(product.quantity * product.price * 1.07).toFixed(2)}</strong></h6>
                                        </div>
                                    </div>
        
                                </div>
                `
            subtotal += product.quantity * product.price
            total += product.quantity * product.price * 1.07
        })

        shoppingCartDOM.innerHTML += `
                        <div class="card" style="width: 80%;">
                        <div class="card-body">
                            <div>
                                <h6 class="card-title"><strong>Sub-total:</strong></h6>
                                <p class="card-text">$${subtotal.toFixed(2)}</p>
                            </div>
                            <div>
                                <h6 class="card-title"><strong>Total(+tax):</strong></h6>
                                <p class="card-text">$${total.toFixed(2)}</p>
                            </div>
                        </div>
                        <a id="clean-cart" class="btn btn-danger">Delete shopping cart!</a>
                        <a id="place-order" class="btn btn-success">Place order!</a>
                    </div> 
            `

        let button = document.getElementById("place-order")
        button.addEventListener("click", placeOrder)

        button = document.getElementById("clean-cart")
        button.addEventListener("click", deleteShoppingCarAlert)
    }

}

/*Placer order function*/
function placeOrder(e) {
    placerOrderAlert()
    shoppingCart = []
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    localStorage.setItem("productListBackup", JSON.stringify(productList))
    drawShoppingCart(shoppingCart)
    drawProducts(productList)

}

/*Sorting functions*/
function sortMinToMax() {
    productList.sort(function (a, b) {
        return a.price - b.price
    })
    drawProducts(productList)
}

function sortMaxToMin() {
    productList.sort(function (a, b) {
        return b.price - a.price
    })
    drawProducts(productList)
}

function sortAz() {
    productList.sort(function (a, b) {
        if (a.productName < b.productName) {
            return -1
        }
        if (a.productName > b.productName) {
            return 1
        }
        return 0
    })
    drawProducts(productList)
}

function resetSort() {
    productList.sort(function (a, b) {
        return a.id - b.id
    })
    drawProducts(productList)
}