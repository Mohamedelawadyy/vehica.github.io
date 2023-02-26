let products = JSON.parse(localStorage.getItem("carProducts"));
let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".product-details");
let productDetails = products.find((item) => item.id == productId);
if (JSON.parse(localStorage.getItem("carProducts"))) {
  itemDom.innerHTML = `
<div class="container">
      <div class="row align-items-center">
         <div class="col-7">
            <div class="product-details-img">
               <img src="${productDetails.image}" class="w-100" alt="car">
            </div>
         </div>
         <div class="col-5">
            <div class="product-details-content">
               <div class="card-title fw-bold text-uppercase">brand: ${productDetails.brand}</div>
               <h5  class="card-title card-model text-uppercase"><b>Model:</b> ${productDetails.name}</h5>
               <hr>
               <p class="card-text"><span class="fw-bold">Describtion</span> :${productDetails.description}</p><hr>
               <p class="card-text card-price fw-bold">Price: ${productDetails.price}$</p><hr>
               <p class="card-text fw-bold">Rating: ${productDetails.rate}*</p>
            </div>
         </div>
      </div>
   </div>`;
}

let containerAccessories = document.querySelector(".accessories-container");
if (JSON.parse(localStorage.getItem("accessories"))) {
  let productsAccessory = JSON.parse(localStorage.getItem("accessories"));
  let accessoryDetails = productsAccessory.find((item) => item.id == productId);

  itemDom.innerHTML = `
   <div class="container">
         <div class="row align-items-center">
            <div class="col-7">
               <div class="product-details-img">
                  <img src="${accessoryDetails.image}" class="w-100" alt="car">
               </div>
            </div>
            <div class="col-5">
               <div class="product-details-content">
                  <h5  class="card-title card-model text-uppercase"><b>Model:</b> ${accessoryDetails.name}</h5>
                  <hr>
                  <p class="card-text"><span class="fw-bold">Describtion</span> :${accessoryDetails.description}</p><hr>
                  <p class="card-text card-price fw-bold">Price: ${accessoryDetails.price}$</p><hr>
                  <p class="card-text fw-bold">Rating: ${accessoryDetails.rate}*</p>
               </div>
            </div>
         </div>
      </div>`;
}
