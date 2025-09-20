const addtocart = document.querySelectorAll(".add-to-cart");
const foodname = document.querySelectorAll(".info-cart");
const price = document.querySelectorAll(".price");
const imageshopp = document.querySelector("#icon-shopp");
const listsfood = document.querySelector(".list-food");
const infofoodright = document.querySelector("#info-food-right");
const payment = document.querySelector('#payment');
const totalPriceEl = document.querySelector("#total-price");
const cartCountSpan = document.querySelector("#title-food-right span");

// تابع بروزرسانی جمع کل و وضعیت سبد
function updateCart() {
  const items = listsfood.querySelectorAll(".total-price");
  const total = Array.from(items)
    .reduce((sum, el) => sum + parseFloat(el.textContent), 0);
  totalPriceEl.textContent = `Total: ${total}`;

  const totalItems = Array.from(listsfood.querySelectorAll(".count"))
    .reduce((sum, el) => sum + parseInt(el.textContent), 0);
  cartCountSpan.textContent = `(${totalItems})`;

  // اگر سبد خالی شد
  if (listsfood.children.length === 0) {
    imageshopp.style.display = "block";
    infofoodright.style.display = "block";
    payment.style.display = "none";
    totalPriceEl.style.display = "none"; // Total مخفی شود
    cartCountSpan.textContent = "(0)";
  } else {
    totalPriceEl.style.display = "block"; // Total نمایش داده شود اگر آیتم هست
  }
}

addtocart.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    imageshopp.style.display = "none";
    infofoodright.style.display = "none";
    payment.style.display = 'block';

    const name = foodname[index].textContent;
    const priceValue = parseFloat(price[index].textContent.replace(/[^\d.]/g,""));

    // بررسی وجود قبلی آیتم
    let existingItem = Array.from(listsfood.children).find(item => 
      item.querySelector(".title-list").textContent === name
    );

    if (existingItem) {
      // افزایش تعداد
      const countEl = existingItem.querySelector(".count");
      const itemCountEl = existingItem.querySelector(".item-count");
      const totalPriceItemEl = existingItem.querySelector(".total-price");

      let count = parseInt(countEl.textContent) + 1;
      countEl.textContent = count;
      itemCountEl.textContent = count;
      totalPriceItemEl.textContent = priceValue * count;
    } else {
      // ایجاد کارت جدید
      const listfood = document.createElement("div");
      listfood.classList.add("list-item");
      listfood.innerHTML = `
        <h2 class='title-list'>${name}</h2>
        <div class='info-price'>
          <p class='item-count'>1</p>
          <p class='item-price'>${priceValue}</p>
          <p class='total-price'>${priceValue}</p>
          <button class='close-button'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class='number'>
          <button class='minus'>-</button>
          <span class='count'>1</span>
          <button class='plus'>+</button>
        </div>
      `;
      listsfood.appendChild(listfood);
    }

    updateCart();
  });
});

// event delegation برای حذف کارت و کنترل تعداد
listsfood.addEventListener("click", (e) => {
  const card = e.target.closest(".list-item");
  if (!card) return;

  // حذف کارت
  const but = e.target.closest(".close-button");
  if (but) {
    card.remove();
    updateCart();
    return;
  }

  // کنترل تعداد
  const plus = e.target.closest(".plus");
  const minus = e.target.closest(".minus");

  if (plus || minus) {
    const countEl = card.querySelector(".count");
    const itemCountEl = card.querySelector(".item-count");
    const totalPriceItemEl = card.querySelector(".total-price");
    const itemPrice = parseFloat(card.querySelector(".item-price").textContent);

    let count = parseInt(countEl.textContent);
    if (plus) count++;
    if (minus) count--;

    if (count <= 0) {
      card.remove();
    } else {
      countEl.textContent = count;
      itemCountEl.textContent = count;
      totalPriceItemEl.textContent = itemPrice * count;
    }

    updateCart();
  }
});
