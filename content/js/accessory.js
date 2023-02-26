let container = document.querySelector(".accessories-container");

function drawCartProductsUi(type, word) {
  products = JSON.parse(localStorage.getItem("accessories"));
  let productUi = products.map((item) => {
    if (type == "null") {
      return `
      <div class="grid-col">
      <div class="card-accessory mt-3 mb-3">
      
      <div class="grid-col__card-accessory__img">
      <img src="${item.image}" class="card-img" alt="car">
      </div>
      <div class="card-body">
      <h3 class="card-title product-title  text-uppercase"><b>Model:</b> ${item.name}</h3>
      <hr>
      <p class="card-text"><span class="fw-bold">Describtion</span> :${item.description}</p><hr>
      <p class="card-text card-price fw-bold">Price: ${item.price}$</p><hr>
      <p class="card-text fw-bold">Rating: ${item.rate}*</p>
         <button class="btn btn-warning shop-item-button" onclick="addToCart(${item.id})">ADD TO CART</button>
      </div>
      </div>
      </div>
         `;
    } else {
      if (Object.values(item)[type].includes(word)) {
        return `
         <div class="grid-col">
         <div class="card-accessory mt-3 mb-3">
         
         <div class="grid-col__card-accessory__img">
         <img src="${item.image}" class="card-img" alt="car">
         </div>
         <div class="card-body">
         <h3 class="card-title product-title  text-uppercase"><b>Model:</b> ${item.name}</h3>
         <hr>
         <p class="card-text"><span class="fw-bold">Describtion</span> :${item.description}</p><hr>
         <p class="card-text card-price fw-bold">Price: ${item.price}$</p><hr>
         <p class="card-text fw-bold">Rating: ${item.rate}*</p>
            <button class="btn btn-warning shop-item-button " onclick="addToCart(${item.id})">ADD TO CART</button>
         </div>
         </div>
         </div>
            `;
      }
    }
  });
  container.innerHTML = productUi.join("");
}
drawCartProductsUi("null");
// check if there is item in localstorage
let addedToCartIcon = localStorage.getItem("productsInCard")
  ? JSON.parse(localStorage.getItem("productsInCard"))
  : [];

if (addedToCartIcon) {
  addedToCartIcon.map((item) => {
    cartProductDivDom.innerHTML += `<p>${item.name}</p>`;
  });
  if (cartProductDivDom.innerHTML == "") {
    badgeDom.style.display = "none";
  } else {
    badgeDom.style.display = "block";
  }
  badgeDom.innerHTML += addedToCartIcon.length;
}

// to open div cart List
shoppingCartIcon.addEventListener("click", openCartList);

function openCartList() {
  if (cartProductDivDom.innerHTML != "") {
    if (cartProductList.style.display == "block") {
      cartProductList.style.display = "none";
    } else {
      cartProductList.style.display = "block";
    }
  }
}
//add to cart Icon/////////////
function addToCart(id) {
  if (localStorage.getItem("user")) {
    let choosenItem = JSON.parse(localStorage.getItem("accessories"));
    choosenItem = products.find((item) => item.id === id);
    //to not dupplicate localstorage
    let isProductInCart = addedToCartIcon.some((i) => i.id === choosenItem.id);
    if (isProductInCart) {
      addedToCartIcon = addedToCartIcon.map((product) => {
        if (product.id === choosenItem.id)
          swal("Opps..!", "product was added before", "error");
        return product;
      });
    } else {
      addedToCartIcon.push(choosenItem);
      swal("successful log", "product was added successful", "success");
    }
    cartProductDivDom.innerHTML = "";
    addedToCartIcon.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.name}</p>`;
    });
    ///save data
    localStorage.setItem("productsInCard", JSON.stringify(addedToCartIcon));
    //to get the counter of badge
    let cartProductLength = document.querySelectorAll(
      ".nav-link__cart-product div p"
    );
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductLength.length;
  } else {
    window.location = "form.html";
  }
}

//search function

let inputSearch = document.querySelector("#filter-accessories");
inputSearch.onkeyup = () => {
  container.innerHTML = "";
  drawCartProductsUi(1, inputSearch.value);
};
