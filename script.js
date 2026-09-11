/* =====================================================
   KELLY DELICIOUS MEALS
   FOOD ORDERING JAVASCRIPT
===================================================== */


/* =====================================================
   FOOD DATABASE
===================================================== */

const foods = [

    {
        id: 1,
        name: "Bread and Tea",
        category: "Breakfast",
        price: 1000,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        description: "Fresh bread served with a warm cup of tea."
    },

    {
        id: 2,
        name: "Beans and Bread",
        category: "Breakfast",
        price: 1500,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        description: "Delicious beans served with fresh bread."
    },

    {
        id: 3,
        name: "Egg and Toast Bread",
        category: "Breakfast",
        price: 2000,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        description: "Tasty eggs served with crispy toast."
    },

    {
        id: 4,
        name: "Jollof Rice and Chicken",
        category: "Lunch",
        price: 3500,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
        description: "Classic Nigerian jollof rice served with chicken."
    },

    {
        id: 5,
        name: "Fried Rice and Turkey",
        category: "Lunch",
        price: 4000,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
        description: "Fried rice served with delicious turkey."
    },

    {
        id: 6,
        name: "Amala and Ewedu",
        category: "Lunch",
        price: 2500,
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
        description: "Traditional amala served with ewedu soup."
    },

    {
        id: 7,
        name: "Pounded Yam and Egwusi",
        category: "Dinner",
        price: 3500,
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80",
        description: "Soft pounded yam served with rich egusi soup."
    },

    {
        id: 8,
        name: "White Rice and Stew",
        category: "Dinner",
        price: 2800,
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
        description: "White rice served with tasty Nigerian stew."
    },

    {
        id: 9,
        name: "Spaghetti and Chicken",
        category: "Dinner",
        price: 3000,
        image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=800&q=80",
        description: "Tasty spaghetti served with chicken."
    },

    {
        id: 10,
        name: "Water",
        category: "Drinks",
        price: 300,
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
        description: "Cold refreshing bottled water."
    },

    {
        id: 11,
        name: "Malt",
        category: "Drinks",
        price: 700,
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
        description: "Refreshing malt drink."
    },

    {
        id: 12,
        name: "Chivita",
        category: "Drinks",
        price: 1500,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
        description: "Refreshing fruit juice drink."
    }

];


/* =====================================================
   VARIABLES
===================================================== */

let cart = JSON.parse(localStorage.getItem("kellyCart")) || [];

let selectedCategory = "All";


const foodGrid = document.getElementById("foodGrid");

const searchInput = document.getElementById("searchInput");

const categoryButtons =
    document.querySelectorAll(".category");

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");

const successMessage =
    document.getElementById("successMessage");

const successText =
    document.getElementById("successText");

const successButton =
    document.getElementById("successButton");


/* =====================================================
   FORMAT MONEY
===================================================== */

function formatMoney(amount) {

    return "₦" + amount.toLocaleString("en-NG");

}


/* =====================================================
   DISPLAY FOOD
===================================================== */

function displayFoods() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();


    const filteredFoods = foods.filter(food => {

        const matchesCategory =
            selectedCategory === "All" ||
            food.category === selectedCategory;


        const matchesSearch =
            food.name.toLowerCase().includes(searchTerm) ||
            food.category.toLowerCase().includes(searchTerm);


        return matchesCategory && matchesSearch;

    });


    foodGrid.innerHTML = "";


    if (filteredFoods.length === 0) {

        foodGrid.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align:center;
                padding:60px;
            ">
                <h3>No food found</h3>
                <p style="color:#777;">
                    Try searching for another meal.
                </p>
            </div>
        `;

        return;

    }


    filteredFoods.forEach(food => {

        const card = document.createElement("article");

        card.className = "food-card";


        card.innerHTML = `

            <div class="food-image">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    loading="lazy"
                >

                <span class="food-category">
                    ${food.category}
                </span>

            </div>


            <div class="food-info">

                <h3>${food.name}</h3>

                <p>
                    ${food.description}
                </p>


                <div class="food-bottom">

                    <span class="price">
                        ${formatMoney(food.price)}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${food.id})"
                    >
                        + Add
                    </button>

                </div>

            </div>
        `;


        foodGrid.appendChild(card);

    });

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(foodId) {

    const food = foods.find(item => item.id === foodId);

    if (!food) return;


    const existingItem =
        cart.find(item => item.id === foodId);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(foodId) {

    cart =
        cart.filter(item => item.id !== foodId);

    saveCart();

    updateCart();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(foodId, amount) {

    const item =
        cart.find(item => item.id === foodId);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(foodId);

        return;

    }


    saveCart();

    updateCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add some delicious meals to get started.
                </p>

            </div>
        `;

    } else {

        cartItems.innerHTML = "";


        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div>

                    <h4>${item.name}</h4>

                    <div class="cart-item-price">

                        ${formatMoney(item.price * item.quantity)}

                    </div>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>


                        <strong>
                            ${item.quantity}
                        </strong>


                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    const totalItems =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        formatMoney(totalPrice);

    checkoutTotal.textContent =
        formatMoney(totalPrice);

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "kellyCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

    document.body.style.overflow = "";

}


/* =====================================================
   CHECKOUT
===================================================== */

function openCheckout() {

    if (cart.length === 0) {

        alert("Please add a meal to your cart first.");

        return;

    }


    checkoutModal.classList.add("show");

    closeCartSidebar();

}


function closeCheckoutModal() {

    checkoutModal.classList.remove("show");

}


/* =====================================================
   PLACE ORDER
===================================================== */

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }


        const name =
            document.getElementById("customerName").value.trim();


        const phone =
            document.getElementById("customerPhone").value.trim();


        const address =
            document.getElementById("customerAddress").value.trim();


        const payment =
            document.getElementById("paymentMethod").value;


        const total =
            cart.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );


        successText.textContent =
            `Thank you, ${name}! Your order worth ${formatMoney(total)} has been received. We will contact you on ${phone}.`;


        checkoutModal.classList.remove("show");

        successMessage.classList.add("show");


        /*

        IMPORTANT:

        This currently simulates an order.

        To actually send the order to your email,
        WhatsApp, database or payment system,
        you need a backend/API.

        */


        console.log("NEW ORDER");

        console.log({
            customer: name,
            phone: phone,
            address: address,
            payment: payment,
            items: cart,
            total: total
        });


        cart = [];

        saveCart();

        updateCart();

        checkoutForm.reset();

    }
);


/* =====================================================
   EVENT LISTENERS
===================================================== */

cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


checkoutButton.addEventListener(
    "click",
    openCheckout
);


closeCheckout.addEventListener(
    "click",
    closeCheckoutModal
);


searchInput.addEventListener(
    "input",
    displayFoods
);


/* =====================================================
   CATEGORY FILTER
===================================================== */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            this.classList.add("active");


            selectedCategory =
                this.dataset.category;


            displayFoods();

        }
    );

});


/* =====================================================
   SUCCESS BUTTON
===================================================== */

successButton.addEventListener(
    "click",
    function() {

        successMessage.classList.remove("show");

        window.location.href = "#menu";

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCartSidebar();

            closeCheckoutModal();

            successMessage.classList.remove("show");

        }

    }
);


/* =====================================================
   START WEBSITE
===================================================== */

displayFoods();

updateCart();