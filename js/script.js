// const ringButtons = document.querySelectorAll(".ring-button");

// for (let i = 0; i < ringButtons.length; i++) {
//   const ringBtn = ringButtons[i];
//   ringBtn.addEventListener("click", function (event) {
//     const color = event.target.id.replace("-color", "");

//     for (let j = 0; j < ringButtons.length; j++) {
//       ringButtons[j].classList.remove("border-purple-600");
//       ringButtons[j].classList.add("border-gray-300");
//     }
//     //color add kortesi
//     event.target.classList.add("border-purple-600");
//     event.target.classList.remove("border-gray-300");

//     const productImage = document.getElementById("product-image");
//     // productImage.src = "../images/gray.png";
//     productImage.src = "../images/" + color + ".png";
//   });
// }


//Color Buttons 
const ringButtons = document.querySelectorAll(".ring-button");
let productImageBase = "../images/"
for (let i = 0; i < ringButtons.length; i++){
  const ringBtn = ringButtons[i];
  ringBtn.addEventListener('click', function (event) {

    const color = event.target.id.replace('-color', '');

    for (let j = 0; j < ringButtons.length; j++){
      ringButtons[j].classList.remove('border-purple-600');
      ringButtons[j].classList.add('border-gray-600');
    }

    event.target.classList.remove('border-gray-600');
    event.target.classList.add('border-purple-600');

    const productImage = document.getElementById('product-image');
    productImage.src = productImageBase + color + ".png";
  })
}

//Wrist Size 
function selectWristSize(size) {
  const sizes = ['S', 'M', 'L', 'XL'];
  
  for (let i = 0; i < sizes.length; i++){
    const button = document.getElementById('size-' + sizes[i]);
    const element = sizes[i];
    if (element === size) {
    button.classList.add('border-purple-600');
    }
    else {
      button.classList.remove('border-purple-600');
    }
  }
}

// Quantity Button
const quantityElements = document.querySelectorAll('.quantity-button');

for (let btn of quantityElements) {
  btn.addEventListener('click', function (event) {
    const amount = event.target.innerText === '+' ? 1 : -1;
    const quantity = document.getElementById('quantity');
    const currentQuantity = parseInt(quantity.innerText);

    const newQuantity = Math.max(0, currentQuantity + amount);
    quantity.innerText = newQuantity;
  })
}

// ADD to Cart
let cartCount = 0;
let cartItems = [];
document.getElementById('add-to-cart').addEventListener('click', function (event){
  
  const quantity = parseInt(document.getElementById('quantity').innerText);
  
  if (quantity > 0) {
    const checkoutContainer = document.getElementById('checkout-container');
    checkoutContainer.classList.remove('hidden');
    checkoutContainer.classList.add('flex');

    cartCount = cartCount + quantity;

    document.getElementById('cart-count').innerText = cartCount;

    // Color
    const selectedColorButton = document.querySelector('button.border-purple-600.w-6');

    const selectedColor = selectedColorButton.id.split('-')[0];

    // Size
    const selectedSizeButtons = document.querySelector("button.border-purple-600:not(.w-6)");

    const selectedSize = selectedSizeButtons.innerText.split(' ')[0];
    
    // Price
    const selectedPrice = selectedSizeButtons.innerText.split(' ')[1].split('$')[1];

    // image
    const productImage = document.getElementById('product-image')

    cartItems.push({
      image: selectedColor + ".png",
      title: "Classy Modern Smart Watch",
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: quantity * parseInt(selectedPrice),
    })
  }

  else {
    alert("Please select a quantity...")
  }
  
});


document.getElementById('checkout-btn').addEventListener('click', function () {
  
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.remove('hidden');
  cartModal.classList.add('flex');

  const cartContainer = document.getElementById('cart-items');
  let finalPrice = 0;
  let finalQuantity = 0;

  for (let i = 0; i < cartItems.length; i++){
    const item = cartItems[i];
    const row = document.createElement('tr');
    row.classList.add('border-b');

    row.innerHTML = `
    <td class="py-2 px-4">
    <div class="flex items-center space-x-2">
    <img class="h-12 w-12 object-cover rounded-md" src="${productImageBase}${item.image}">
    <span class="font-semibold">${item.title}</span>
    </div>
    </td>
    <td class="py-2 px-4">${item.color}</td>
    <td class="py-2 px-4">${item.size}</td>
    <td class="py-2 px-4">${item.quantity}</td>
    <td class="py-2 px-4">$${item.price.toFixed(2)}</td>
    `;

    cartContainer.appendChild(row);

    finalQuantity = finalQuantity + item.quantity;
    finalPrice = parseFloat(finalPrice + item.price).toFixed(2);
  }

  const totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.innerText = finalQuantity;

  const totalPrice = document.getElementById('totalPrice');
  totalPrice.innerText = '$'+finalPrice;
})


document.getElementById('continue-shopping').addEventListener('click', function () {
  document.getElementById('cart-modal').classList.remove('flex')
  document.getElementById('cart-modal').classList.add('hidden')
})
document.getElementById('checkout').addEventListener('click', function () {
  alert('Proceeding to checkout...')
})