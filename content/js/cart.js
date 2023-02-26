let containerCart = document.querySelector(".cart-items");

let qtn = document.querySelectorAll('.qtn')
let minusBtn = document.querySelectorAll('.minus-btn')
let plusBtn = document.querySelectorAll('.plus-btn')

let units =1

// if (document.readyState == 'loading') {
//    document.addEventListener('DOMContentLoaded', ready)
// } else {
//    ready()
// }

// function ready() {
//    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
//    for (let i = 0; i < removeCartItemButtons.length; i++) {
//       let button = removeCartItemButtons[i]
//       button.addEventListener('click', removeItem)
//    }

//    // let quantityInputs = document.getElementsByClassName('cart-quantity-input')
//    // for (let i = 0; i < plusBtn.length; i++) {
//    //    let input = plusBtn[i]
//    //    input.addEventListener('change', quantityChanged)
//    // }

//    // for (let i = 0; i < minusBtn.length; i++) {
//    //    let input = minusBtn[i]
//    //    input.addEventListener('click', changeUnits)
//    // }

// }

function drawCartProductsUi(allProducts =[]) {
   let products = JSON.parse(localStorage.getItem('productsInCard')) || allProducts;
   
   let productUi = products.map((item,i) => {
      return `
      <div class="cart-row" >
         <div class="cart-item cart-column cart-img-name">
               <img class="cart-item-image" src="${item.image}" width="100" height="100" alt="${item.name}">
               <span class="cart-item-title">${item.brand||""} ${item.name}</span>
         </div>
         <span class="cart-price cart-column">$${item.price}</span>
         <div class="cart-quantity cart-column">

            <div class="buttons d-flex justify-content-center align-items-center gap-2 me-3">
            <div class="plus-btn fw-bold" onclick="changeUnits('plus',${i})">
            <i class="fa-solid fa-plus"></i>
            </div>
            <div class="qtn text-center fw-bold" id="total-units">${units}</div>
            <div class="minus-btn text-center fw-bold fs-5" onclick="changeUnits('minus',${i})">
            <i class="fa-solid fa-minus"></i>
            </div>
         <button class="btn btn-danger remove-item" type="button"onclick="removeItem(${item.id})">REMOVE</button>
         </div>
         </div>
      </div>
         `;
   });
   
   if (document.querySelector(".cart-items")) {
      containerCart.innerHTML= productUi.join("")
   }
}

drawCartProductsUi();
updateCartTotal()

function changeUnits(action , id) {
   totalUnits = document.querySelectorAll('.qtn')
   totalUnits.forEach((element,i) => {
      if (i== id) {
         units = parseInt(totalUnits[i].innerHTML)
         if (action === "minus") {
            if (units <= 1) {
               units=1
               totalUnits[i].innerHTML =units
            }else{
               units -=1;
               totalUnits[i].innerHTML =units
            }
         }else if(action === "plus"){
            units +=1
            totalUnits[i].innerHTML =units
         }
      }
   });
   updateCartTotal(); 
      }




function removeItem(id){
   let productsInCart =localStorage.getItem('productsInCard')
   if (productsInCart) {
      let items = JSON.parse(productsInCart)
      let filteredItems = items.filter((item) => item.id !== id);
      units=1
      localStorage.setItem('productsInCard', JSON.stringify(filteredItems))

      drawCartProductsUi(filteredItems);
   }
   updateCartTotal()
}




function updateCartTotal() {
   if (document.querySelector(".cart-items")) {
      let cartRows = containerCart.getElementsByClassName('cart-row')
      total = 0
      for (let i = 0; i < cartRows.length; i++) {
         let cartRow = cartRows[i]
         let priceElement = cartRow.getElementsByClassName('cart-price')[0]
         let price = parseFloat(priceElement.innerText.replace('$', ''))
         let totalUnits = document.querySelectorAll('.qtn')
         let quantity= +totalUnits[i].innerHTML
         total = total + (price * quantity)
      }
      total = Math.round(total * 100) / 100
      document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
   }

}


function purchaseClicked() {
if (total == 0) {
   swal("Opps..!","you do not have a products here","error");
   let cartItems = document.getElementsByClassName('cart-items')[0]
   while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
   }
}else{
   swal("successful log","Thank you for your purchase", "success");
   containerCart.innerHTML=""
   localStorage.removeItem('productsInCard')
}
updateCartTotal()
}

