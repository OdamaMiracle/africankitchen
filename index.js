// Menu data for the restaurant catalog
const menuItems = [
  {
    id: 1,
    name: 'Jollof Rice & Chicken',
    price: 13500,
    description: 'Aromatic tomato rice with grilled chicken, peppers, and a rich West African spice blend.',
    category: 'Mains',
    tags: ['classic', 'popular'],
    image:
      'https://media.istockphoto.com/id/2240222437/photo/ghanaian-jollof-rice-with-grilled-chicken-long-grain-rice-cooked-in-a-rich-tomato-and-pepper.jpg?s=612x612&w=0&k=20&c=2bvvSiGLFAjuO3y4_PoA4VcZtbKdHy4v5xCsfZ4O2_o='
  },
  {
    id: 2,
    name: 'Egusi Soup',
    price: 9500,
    description: 'Melon seed soup with spinach, beef, and traditional seasoning served with pounded yam.',
    category: 'Soups',
    tags: ['traditional', 'hearty'],
    image:
      'https://media.istockphoto.com/id/1386522263/photo/pounded-yam-and-garri-eba-served-with-egusi-soup-ready-to-eat.jpg?s=1024x1024&w=is&k=20&c=hnM2s9lvU6EPoPttAr5qP4RUMifqWw7w6CkLT6J-BSA='
  },
  {
    id: 3,
    name: 'Suya Platter',
    price: 11800,
    description: 'Spiced grilled beef skewers with onions, cabbage, and pepper sauce.',
    category: 'Starters',
    tags: ['spicy', 'grilled'],
    image:
      'https://media.istockphoto.com/id/1151916077/photo/nigerian-pepper-beef-suya-on-stakes-at-party.jpg?s=612x612&w=0&k=20&c=S-CTgqlaHwVTfx7SPop2qS00fkMB0-h0h5JtMAsNX40='
  },
  {
    id: 4,
    name: 'Ofada Rice Bowl',
    price: 12000,
    description: 'Native rice served with sauce, assorted fish, and a crunchy vegetable salad.',
    category: 'Mains',
    tags: ['local favorite'],
    image:
      'https://media.istockphoto.com/id/1416974589/photo/egyptian-koshary-dish.jpg?s=1024x1024&w=is&k=20&c=J7Loo6ucXZP9arYWErnoAdP8dl8ZMp733rA6vcQdSrQ='
  },
  {
    id: 5,
    name: 'Plantain & Fish',
    price: 9800,
    description: 'Golden plantain with peppered fish, onions, and a warm tomato relish.',
    category: 'Starters',
    tags: ['crispy', 'seafood'],
    image:
      'https://media.istockphoto.com/id/1219948971/photo/african-national-food-dish-nigerian-grilled-meat-and-chicken-dish.jpg?s=1024x1024&w=is&k=20&c=coQRtVjf9WYRqgwKBDJrP6FJEur6ogVoCjjh4kJbQew='
  },
  {
    id: 6,
    name: 'Yam Porridge',
    price: 8800,
    description: 'Creamy yam porridge with palm oil, crayfish, and tender beef chunks.',
    category: 'Soups',
    tags: ['comfort food'],
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCdNwfjykDTEyP1drgFt1heUuYn7VQNZu2Z4opcixzChhUOluwEpmV7x4&s'
  },
  {
    id: 7,
    name: 'Zobo Cooler',
    price: 3500,
    description: 'Refreshing hibiscus drink with lime, ginger, and a naturally vibrant finish.',
    category: 'Drinks',
    tags: ['refreshing'],
    image:
      'https://media.istockphoto.com/id/1294562780/photo/grape-juice-in-plastic-bottle-in-ice-box-food-market-in-thailand.jpg?s=612x612&w=0&k=20&c=rhQVDP4G8zCCOf8T3W5lWSLOao2Gf93isJz_PZe4pEE='
  },
  {
    id: 8,
    name: 'Moi Moi & Pap',
    price: 7000,
    description: 'Steamed bean pudding with soft cornmeal porridge and pepper sauce.',
    category: 'Breakfast',
    tags: ['traditional', 'light'],
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbG7fBtDD3R24RdjdeLm1GGFGz-qIAcU6uGF7f3mp6MQ&s=10'
  }
];

// Filter categories derived from the menu list
const menuCategories = ['All', ...new Set(menuItems.map((item) => item.category))];
const cart = new Map();
const moneyFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0
});

const menuList = document.getElementById('menuList');
const categoryFilters = document.getElementById('categoryFilters');
const cartItems = document.getElementById('cartItems');
const cartItemCount = document.getElementById('cartItemCount');
const navCartCount = document.getElementById('navCartCount');
const subtotalEl = document.getElementById('subtotal');
const appTotalEl = document.getElementById('appTotal');
const directTotalEl = document.getElementById('directTotal');
const savingsBadge = document.getElementById('savingsBadge');
const cartShortcut = document.getElementById('cartShortcut');

let activeCategory = 'All';

// Currency formatter for Nigerian naira values
function formatMoney(value) {
  return moneyFormatter.format(value);
}

// Render all category filter buttons
function renderCategoryFilters() {
  categoryFilters.innerHTML = menuCategories
    .map(
      (category) => `
        <button
          type="button"
          class="category-btn ${activeCategory === category ? 'is-active' : ''}"
          data-category="${category}"
          aria-pressed="${activeCategory === category}"
        >
          ${category}
        </button>
      `
    )
    .join('');

  categoryFilters.querySelectorAll('.category-btn').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderCategoryFilters();
      renderMenu();
    });
  });
}

// Render the visible menu items based on current category selection
function renderMenu() {
  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  menuList.innerHTML = filteredItems
    .map(
      (item) => `
        <article class="menu-card" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" />
          <div class="menu-details">
            <div class="menu-topline">
              <h4>${item.name}</h4>
              <span class="item-price">${formatMoney(item.price)}</span>
            </div>
            <p class="menu-description">${item.description}</p>
            <div class="item-meta">
              ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
          <button class="add-btn" type="button" data-add-id="${item.id}">Add</button>
        </article>
      `
    )
    .join('');

  menuList.querySelectorAll('[data-add-id]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.addId)));
  });
}

// Add an item to the cart and update totals
function addToCart(itemId) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  if (!item) return;

  const currentItem = cart.get(itemId) || { ...item, quantity: 0 };
  cart.set(itemId, { ...currentItem, quantity: currentItem.quantity + 1 });
  updateCart();
}

function decreaseQuantity(itemId) {
  const item = cart.get(itemId);
  if (!item) return;

  if (item.quantity <= 1) {
    cart.delete(itemId);
  } else {
    cart.set(itemId, { ...item, quantity: item.quantity - 1 });
  }

  updateCart();
}

function removeFromCart(itemId) {
  cart.delete(itemId);
  updateCart();
}

// Recalculate totals and cart display from the current cart state
function updateCart() {
  const cartEntries = [...cart.values()];
  const totalItems = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartEntries.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const appTotal = subtotal * 1.15 + 4.99;
  const directTotal = subtotal;
  const savings = appTotal - directTotal;

  navCartCount.textContent = totalItems;
  cartItemCount.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;
  subtotalEl.textContent = formatMoney(subtotal);
  appTotalEl.textContent = formatMoney(appTotal);
  directTotalEl.textContent = formatMoney(directTotal);
  savingsBadge.textContent = `🎉 You are saving ${formatMoney(savings)} by ordering direct!`;

  if (!cartEntries.length) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <p>Your cart is empty. Start with a favorite from the menu.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cartEntries
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-main">
            <strong>${item.name}</strong>
            <div class="cart-item-meta">
              <span>${formatMoney(item.price)}</span>
              <span>× ${item.quantity}</span>
            </div>
            <div class="qty-controls">
              <button class="qty-btn" type="button" data-qty-decrease="${item.id}" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" type="button" data-qty-increase="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="price-block">
            <strong>${formatMoney(item.price * item.quantity)}</strong>
            <button class="remove-btn" type="button" data-remove-id="${item.id}">Remove</button>
          </div>
        </div>
      `
    )
    .join('');

  cartItems.querySelectorAll('[data-qty-decrease]').forEach((button) => {
    button.addEventListener('click', () => decreaseQuantity(Number(button.dataset.qtyDecrease)));
  });

  cartItems.querySelectorAll('[data-qty-increase]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.qtyIncrease)));
  });

  cartItems.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', () => removeFromCart(Number(button.dataset.removeId)));
  });
}

cartShortcut.addEventListener('click', () => {
  const cartPanel = document.querySelector('.cart-sticky');
  if (cartPanel) {
    cartPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Reservation form handling and validation
const reservationForm = document.getElementById('reservationForm');
const reservationMessage = document.getElementById('reservationMessage');

function showReservationMessage(message, type) {
  reservationMessage.textContent = message;
  reservationMessage.className = `reservation-message ${type}`;
}

reservationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const { name, phone, date, time, guests } = reservationForm.elements;
  const selectedDate = new Date(`${date.value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeValue = time.value;
  const [hours, minutes] = timeValue ? timeValue.split(':').map(Number) : [null, null];
  const timeMinutes = hours === null || minutes === null ? null : hours * 60 + minutes;

  if (!name.value.trim() || !phone.value.trim() || !date.value || !time.value || !guests.value) {
    showReservationMessage('Please complete all reservation details before submitting.', 'error');
    return;
  }

  if (selectedDate < today) {
    showReservationMessage('Please select a reservation date in the future.', 'error');
    return;
  }

  if (timeMinutes === null || timeMinutes < 11 * 60 || timeMinutes > 22 * 60) {
    showReservationMessage('Reservations are available from 11:00 AM to 10:00 PM only.', 'error');
    return;
  }

  showReservationMessage(
    `Thank you, ${name.value.trim()}! Your table for ${guests.value} guests is reserved on ${date.value} at ${time.value}.`,
    'success'
  );

  reservationForm.reset();
});

renderCategoryFilters();
renderMenu();
updateCart();
