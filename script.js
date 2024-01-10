<script>
    document.addEventListener('DOMContentLoaded', () => {
        const cart = [];

        document.querySelectorAll('.product button').forEach(button => {
            button.addEventListener('click', (e) => {
                const product = e.target.parentElement;
                const productName = product.querySelector('h2').innerText;
                const productPrice = product.querySelector('p').innerText.split(':')[1].trim().split(' ')[0];
                
                cart.push({ name: productName, price: parseInt(productPrice) });
                updateCart();
            });
        });

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');

            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                total += item.price;
                const itemElement = document.createElement('li');
                itemElement.innerText = `${item.name} - ${item.price} ₸`;
                cartItems.appendChild(itemElement);
            });

            cartTotal.innerText = total;
        }
    });
</script>
