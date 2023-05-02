let productList = []

if (JSON.parse(localStorage.getItem("productListBackup"))) {

    
    JSON.parse(localStorage.getItem("productListBackup")).forEach(product => {
        productToAppend = new Product(product.id, product.productName, product.img, product.category, product.stock, product.price, product.available)
        productList.push(productToAppend)
    })

}
else {
    

    fetchStock()
    
}


let shoppingCartDOM = document.getElementById("shopping-cart")
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || []


drawShoppingCart(shoppingCart)
drawProducts(productList)

let searchBar = document.getElementById("searching-bar")
searchBar.addEventListener("input", filterProducts)

let buttonMinMax = document.getElementById("btnMinMax")
buttonMinMax.addEventListener("click", sortMinToMax)

let buttonMaxMin = document.getElementById("btnMaxMin")
buttonMaxMin.addEventListener("click", sortMaxToMin)

let buttonAz = document.getElementById("btnAz")
buttonAz.addEventListener("click", sortAz)

let buttonReset = document.getElementById("btnReset")
buttonReset.addEventListener("click", resetSort)
