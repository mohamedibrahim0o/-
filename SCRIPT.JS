// تعريف العناصر الأساسية من HTML
const cartItems = document.getElementById("cart-items"); // قائمة المنتجات في السلة
const totalPriceElement = document.getElementById("total-price"); // الإجمالي
const addToCartButtons = document.querySelectorAll(".add-to-cart"); // أزرار الإضافة للسلة

// السلة (بيانات المنتجات المضافة)
let cart = [];
let totalPrice = 0;

// وظيفة: إضافة منتج للسلة
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productName = button.dataset.name; // اسم المنتج من الزر
    const productPrice = parseInt(button.dataset.price); // سعر المنتج من الزر

    // إضافة المنتج إلى السلة
    cart.push({ name: productName, price: productPrice });
    totalPrice += productPrice;

    // تحديث واجهة السلة
    updateCart();
  });
});

// وظيفة: تحديث السلة
function updateCart() {
  // مسح السلة الحالية في واجهة المستخدم
  cartItems.innerHTML = "";

  // إضافة المنتجات إلى واجهة السلة
  cart.forEach((item, index) => {
    const li = document.createElement("li"); // عنصر قائمة
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = item.name;

    // إضافة السعر بجانب المنتج
    const priceSpan = document.createElement("span");
    priceSpan.textContent = item.price + " جنيه";
    li.appendChild(priceSpan);

    // زر إزالة المنتج
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger btn-sm ms-2";
    removeButton.textContent = "إزالة";
    removeButton.addEventListener("click", () => removeFromCart(index)); // ربط زر الإزالة بالوظيفة
    li.appendChild(removeButton);

    // إضافة المنتج إلى واجهة السلة
    cartItems.appendChild(li);
  });

  // تحديث الإجمالي
  totalPriceElement.textContent = totalPrice;
}

// وظيفة: إزالة منتج من السلة
function removeFromCart(index) {
  totalPrice -= cart[index].price; // خصم سعر المنتج من الإجمالي
  cart.splice(index, 1); // إزالة المنتج من السلة
  updateCart(); // تحديث واجهة السلة
}

// وظيفة: إتمام الشراء
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("السلة فارغة!"); // رسالة تنبيه إذا كانت السلة فارغة
  } else {
    alert("شكراً لشرائك من متجر العقيلي!"); // رسالة شكر
    cart = []; // تفريغ السلة
    totalPrice = 0; // تصفير الإجمالي
    updateCart(); // تحديث واجهة السلة
  }
});