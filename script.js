let cart = [];

function addItem(item, price) {
    cart.push({ item, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.item}: $${item.price}`;
        cartList.appendChild(listItem);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
    } else {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Заказ оформлен! Сумма заказа: $${total}`);
        cart = [];
        updateCart();
    }
}
