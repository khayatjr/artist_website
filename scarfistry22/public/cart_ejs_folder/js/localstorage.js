var addToCartButtons = document.getElementsByClassName('add-to-cart')
for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    
    var imageSrc = shopItem.getElementsByClassName('selected')[0].src
    // addItemToCart(title, price, imageSrc)
    // updateCartTotal()
    localStorage.setItem("name", "title");
}