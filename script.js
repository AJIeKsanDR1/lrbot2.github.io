document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.parentElement;
            const productName = product.querySelector('h2').innerText;
            const productPriceText = product.querySelectorAll('p')[1].innerText; // Исправление для получения текста цены
            const productPrice = parseInt(productPriceText.split(':')[1].trim().split(' ')[0]);
            
            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const itemElement = document.createElement('li');
            itemElement.innerText = `${item.name} - ${item.price} ₸`;

            const removeButton = document.createElement('button');
            removeButton.innerText = 'Удалить';
            removeButton.onclick = function() {
                removeFromCart(index);
            };

            itemElement.appendChild(removeButton);
            cartItems.appendChild(itemElement);
        });

        cartTotal.innerText = total;
    }

    function removeFromCart(itemIndex) {
        cart.splice(itemIndex, 1);
        updateCart();
    }
});
