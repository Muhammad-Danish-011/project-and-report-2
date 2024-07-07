const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let basket = [];

// Dummy data for products
const products = [
    // Dishes
    { id: 1, name: 'Caprese Salad', price: 8.99, description: 'Fresh mozzarella, tomatoes, basil, olive oil, and balsamic glaze', image: '/images/1.jpg', category: 'dishes' },
    { id: 2, name: 'Bruschetta', price: 7.49, description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil', image: '/images/bruschetta.jpg', category: 'dishes' },
    { id: 3, name: 'Chicken Wings', price: 9.99, description: 'Crispy chicken wings served with your choice of sauce', image: '/images/chicken.jpg', category: 'dishes' },
    { id: 7, name: 'Stuffed Mushrooms', price: 8.99, description: 'Mushrooms stuffed with cheese, garlic, and herbs, baked to perfection', image: '/images/stuffed.jpg', category: 'dishes' },
    { id: 8, name: 'Garlic Bread', price: 4.99, description: 'Toasted bread topped with garlic butter and herbs', image: '/images/chicken.jpg', category: 'dishes' },
    
    // Seafood
    { id: 4, name: 'Grilled Salmon', price: 18.99, description: 'Fresh Atlantic salmon grilled to perfection, served with steamed vegetables', image: '/images/2.avif', category: 'seafood' },
    { id: 9, name: 'Shrimp Scampi', price: 17.99, description: 'Shrimp sautéed in garlic, butter, and white wine, served with linguine', image: '/images/shrimp.jpg', category: 'seafood' },
    { id: 10, name: 'Lobster Bisque', price: 12.99, description: 'Creamy lobster soup with a touch of sherry', image: '/images/666.jpg', category: 'seafood' },
    { id: 11, name: 'Fish Tacos', price: 13.99, description: 'Grilled fish tacos with cabbage slaw, avocado, and lime crema', image: '/images/fish.jpg', category: 'seafood' },
    
    // Meals
    { id: 5, name: 'Chicken Parmesan', price: 16.49, description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella, served with spaghetti', image: '/images/3.jpg', category: 'meals' },
    { id: 12, name: 'Beef Stroganoff', price: 19.99, description: 'Tender beef in a creamy mushroom sauce, served over egg noodles', image: '/images/beef.jpg', category: 'meals' },
    { id: 13, name: 'Lasagna', price: 15.99, description: 'Layers of pasta, meat sauce, ricotta, and mozzarella, baked to perfection', image: '/images/Lasagna.jfif', category: 'meals' },
    { id: 14, name: 'BBQ Ribs', price: 21.99, description: 'Slow-cooked ribs smothered in BBQ sauce, served with coleslaw and fries', image: '/images/BBQ.jfif', category: 'meals' },
    
    // Vegetarian
    { id: 6, name: 'Vegetable Stir-Fry', price: 14.99, description: 'Assorted fresh vegetables stir-fried with tofu in a savory sauce, served over rice', image: '/images/4.jpg', category: 'vegetarian' },
    { id: 15, name: 'Eggplant Parmesan', price: 13.99, description: 'Breaded eggplant slices topped with marinara sauce and mozzarella, served with spaghetti', image: '/images/Eggplant.jfif', category: 'vegetarian' },
    { id: 16, name: 'Stuffed Peppers', price: 12.99, description: 'Bell peppers stuffed with quinoa, black beans, corn, and cheese, baked to perfection', image: '/images/stuffed.jpg', category: 'vegetarian' },
    { id: 17, name: 'Mushroom Risotto', price: 14.99, description: 'Creamy risotto with sautéed mushrooms and Parmesan cheese', image: '/images/stuffed.jpg', category: 'vegetarian' }
];

const category1Products = products.slice(0, 3);
const category2Products = products.slice(3, 6);

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Webshop - Home', products });
});

app.get('/explore', (req, res) => {
    res.render('explore', { title: 'Explore Menu', products });
});


app.get('/products', (req, res) => {
    res.render('products', { title: 'Webshop - Products', products });
});

app.get('/products/:category', (req, res) => {
    const category = req.params.category;
    const categoryProducts = products.filter(product => product.category === category);

    if (categoryProducts.length === 0) {
        res.status(404).send('Category not found');
        return;
    }

    res.render('products', { title: `Webshop - ${category.charAt(0).toUpperCase() + category.slice(1)}`, products: categoryProducts });
});

app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    let product = products.find(prod => prod.id === parseInt(productId));

    if (!product) {
        res.status(404).send('Product not found');
        return;
    }

    res.render('product-detail', { title: `Product ${productId}`, product });
});

app.post('/add-to-basket', (req, res) => {
    const productId = req.body.id;
    let product = products.find(prod => prod.id === parseInt(productId));

    if (product) {
        let basketItem = basket.find(item => item.id === product.id);
        if (basketItem) {
            basketItem.quantity++;
        } else {
            basket.push({ ...product, quantity: 1 });
        }}
   
});






app.get('/checkout', (req, res) => {
    res.render('checkout', { title: 'Webshop - Checkout', basket });
});

app.post('/checkout', (req, res) => {
    basket = []; 
    res.render('confirmation', { title: 'Webshop - Confirmation' });
});

app.get('/basket', (req, res) => {
    res.render('basket', { title: 'Webshop - Basket', basket });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
