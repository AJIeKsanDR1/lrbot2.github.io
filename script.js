// Получение элементов
var modal = document.getElementById("paymentModal");
var btn = document.getElementById("checkout-button");
var span = document.getElementsByClassName("close")[0];

// Открывать модальное окно при нажатии на кнопку
btn.onclick = function() {
    modal.style.display = "block";
}

// Закрыть модальное окно при клике на (x)
span.onclick = function() {
    modal.style.display = "none";
}

// Закрыть модальное окно при клике вне его
window.onclick = function(event) {
    if (event.target == modal) {


document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Собираем данные из формы
    var paymentData = {
        cardNumber: document.getElementById('cardNumber').value,
        cvv: document.getElementById('cvv').value,
        expiryDate: document.getElementById('expiryDate').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        cart: cart // предполагается, что у вас есть массив cart с товарами
    };

    // Отправка данных на сервер
    fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Оплата прошла успешно. Чек отправлен на вашу почту.');
        modal.style.display = "none";
        clearCart(); // очистка корзины после оплаты
    })
    .catch((error) => {
        console.error('Ошибка при оплате:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];


    document.getElementById('clear-cart-button').addEventListener('click', () => {
        clearCart();
    });

    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.parentElement;
            const productName = product.querySelector('h2').innerText;
            const productPriceText = product.querySelectorAll('p')[1].innerText; // Получаем текст с ценой

            // Извлекаем числовое значение из строки цены
            const productPrice = parseInt(productPriceText.replace(/[^0-9]/g, ''));

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

    function clearCart() {
        cart.length = 0; // Очищаем массив корзины
        updateCart(); // Обновляем отображение корзины
    }
});
