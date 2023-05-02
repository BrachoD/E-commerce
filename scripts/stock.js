class Product {
    //Product class with its attributes and properties.
    constructor(id, productName, img, category, stock, price, available) {
        this.id = id
        this.productName = productName
        this.img = img
        this.category = category
        this.stock = stock
        this.price = price
        this.available = available
    }

    //This method decreases the stock by 1 when a product is added to the cart. If the stock reaches 0 it won't let you add it to the cart.
    sell() {
        this.stock--

        if (this.stock == 0) {
            this.available = false
        }
    }

    //This method increases the stock by 1 when the product is returned, this is applied when you clear the cart.
    returnItem() {
        this.stock++

        if (this.stock > 0) {
            this.available = true
        }
    }
}

