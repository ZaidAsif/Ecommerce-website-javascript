const slideImages = [
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTT7TEmiH-X5gSoMYQzrdEpOPSQfdWwTPLFQZ1PuGrExHpL4hnH",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSEcF9DlM3ZFDjjMjovO7Mlv_fgoULqQIqeFNy3GmRx2MGkP5fd",
    "https://pixexid.com/api/download/image/a-burger-with-a-sense-of-wanderlust-backpacks-through-a-food-landscape-with-fry-9hbp0rfh.jpeg",
  ];

function displaySlider() {
    let slidesContainer = document.querySelectorAll(".slides")[0];

    for (let i = 0; i < slideImages.length; i++) {
        let img = `<img src="${slideImages[i]}" alt="slide ${i + 1}" />`
        slidesContainer.innerHTML += img
    }
  }

displaySlider();

const products = [
    {
      id: "502c305a-997e-4534-97b8-f6f7862f3737",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "THE Doppler",
      price: "$10.00",
    },
    {
      id: "67aadbfe-a6d9-4d8d-a436-27c369cff5ff",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "Pentra Loaded",
      price: "$20.00",
    },
    {
      id: "54c3c17e-b3e9-469b-800a-b065d193a6d9",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "Double Cheese",
      price: "$50.00",
    },
    {
      id: "e2085e01-f142-4475-8124-e24722cff1d6",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "Big Bang",
      price: "$40.00",
    },
  ];

function createProductCard() {
    for (let i = 0; i < products.length; i++) {
        let productsContainer = document.querySelectorAll(".product-list")[0];

        let product = products[i]

        let productCard = `
                    <div class="product-item">
            <img src="${product.image}" alt="${product.productName}" />
            <h3>${product.productName}</h3>
            <p>${product.price}</p>
            <button class="btn btn-dark" onclick="addToCart(${i})">Add to Cart</button>
        </div>
        `

        productsContainer.innerHTML += productCard;
    }
}

createProductCard();

let cart = {};

function addToCart(index) {
    let { id } = products[index];

    if (id in cart) {
        cart[id].qty = cart[id].qty + 1;
        cart[id].totalPrice = cart[id].qty * cart[id].price.slice(1);
    }
    else {
        cart[id] = { ...products[index]};
        cart[id].qty = 1;
        // cart[id].totalPrice = cart[id].qty * cart[id].price.slice(1);
    }
    updateCartDisplay();
}

function updateCartDisplay() {
  const cartDropdown = document.querySelectorAll('.cart-dropdown')[0];
  const cartItemsDiv = document.querySelectorAll('.cart-items')[0];
  const cartCountSpan = document.querySelectorAll('.cart-count')[0];
  const totalPriceElement = document.querySelectorAll('.total-price')[0];

  const totalItems = Object.values(cart).reduce((sum, product) => sum + product.qty, 0);
  cartCountSpan.textContent = totalItems;

  cartItemsDiv.innerHTML = '';
  let totalPrice = 0;
  
  Object.values(cart).forEach(product => {
      totalPrice += product.qty * parseFloat(product.price.slice(1));
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
          <div>
              <strong>${product.productName}</strong>
              <p>Qty: ${product.qty}</p>
              <p>Price: $${(product.qty * parseFloat(product.price.slice(1))).toFixed(2)}</p>
          </div>
      `;
      cartItemsDiv.appendChild(cartItem);
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

document.querySelectorAll('.cart-icon')[0].addEventListener('click', () => {
  const cartDropdown = document.querySelectorAll('.cart-dropdown')[0];
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});