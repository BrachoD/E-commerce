/*SWEET ALERT*/

function noStockAlert() {
    Swal.fire(
        'Out of Stock!',
        'Unfortunately there are no more units in stock for that item.',
        'error'
    )
}

function placerOrderAlert() {
    Swal.fire(
        'Thanks for shopping with us!',
        'Your order has been placed and should ship soon.',
        'success'
    )
}

function deleteShoppingCarAlert() {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will remove all the items from your shopping cart!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Cart empty!',
                'Your shopping cart has been cleaned!',
                'success'
            )
            cleanCart()
        }
    })
}

function failedToFetch(error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry, there was a problem when fetching the info. Please try again later!',
        footer: `Error: ${error}`
    })
}

/*TOASTIFY*/

function addToCartToast(productName) {
    Toastify({
        text: productName + " added to cart!",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

