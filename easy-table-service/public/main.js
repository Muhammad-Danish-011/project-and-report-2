document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const addToBasketButtons = document.querySelectorAll('.add-to-basket');

    addToBasketButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            fetch('/add-to-basket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: productId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    basketCount.textContent = data.basket.length;
                } else {
                    alert('Failed to add product to basket');
                }
            });
        });
    });
});
