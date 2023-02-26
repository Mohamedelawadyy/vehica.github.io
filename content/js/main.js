let logBtn = document.getElementById("log-btn");
let cartIcon = document.querySelector(".cart-icon");
let logOutbtn = document.querySelector(".logoutbtn");

let smallModal = document.querySelector(".small-modal");

if (localStorage.getItem("password") && localStorage.getItem("user")) {
  logBtn.removeAttribute("href");
  cartIcon.style.display = "block";
  logOutbtn.style.display = "block";

  logIcon = document.querySelector(".iconLog");
  logIcon.onclick = (e) => {
    e.preventDefault();
    if (smallModal.classList.contains("d-none")) {
      smallModal.classList.remove("d-none");
      smallModal.classList.add("d-block");
    } else {
      smallModal.classList.remove("d-block");
      smallModal.classList.add("d-none");
    }
  };
  smallModal.innerHTML = `
   <p>Welcome 
   ${localStorage.getItem("user")}</p>
   `;
} else {
  logBtn.setAttribute("href", "form.html");

  cartIcon.style.display = "none";
  logOutbtn.style.display = "none";
}

// about change bg nav
let navBar = document.querySelector(".change-nav");
let navText = document.querySelectorAll("#nav-link");
let logo = document.querySelector(".logo-img");
window.onscroll = () => {
  if (window.scrollY >= 50) {
    navBar.classList.remove("first-bg-nav");
    navBar.classList.add("bg-light");
    logo.setAttribute("src", "content/assets/images/logo/logo-dark.png");

    navText.forEach((el) => {
      el.classList.remove("first-color");
      el.classList.add("color-black");
    });
  } else {
    navBar.classList.add("first-bg-nav");
    navBar.classList.remove("bg-light");
    logo.setAttribute("src", "content/assets/images/logo/logo-white.png");

    navText.forEach((e) => {
      e.classList.add("first-color");
      e.classList.remove("color-black");
    });
  }
};

logOutbtn.onclick = (e) => {
  e.preventDefault();
  window.location.href = "form.html";
};

if (document.querySelector(".discount__date")) {
  let countDownDate = new Date("sep 31, 2023 23:59:59");
  let counter = setInterval(() => {
    // get Date now
    let dateNow = new Date().getTime();
    // the diffrence between now and count date
    let dateDiff = countDownDate - dateNow;
    // get time units
    let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

    document.querySelector(".days").innerHTML = ` ${days}
<p>days</p>`;
    document.querySelector(".hours").innerHTML = ` ${hours}
<p>Hours</p>`;

    document.querySelector(".minutes").innerHTML = ` ${minutes}
<p>Minutes</p>`;

    if (seconds < 10) {
      document.querySelector(".seconds").innerHTML = ` 0${seconds}
   <p>Seconds</p>`;
    } else {
      document.querySelector(".seconds").innerHTML = ` ${seconds}
   <p>Seconds</p>`;
    }

    if (dateDiff < 0) {
      clearInterval(counter);
      document.querySelector(".discount__date").style.display = "none";
    }
  }, 1000);
}

if (document.querySelector(".slide-content")) {
  let swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

// about section increase numbers
let increaseNum = document.querySelectorAll(".num .increase");
let sectionAbout = document.querySelector("#about");
let started = false;
if (document.querySelector("#about")) {
  window.onscroll = function () {
    if (window.scrollY >= sectionAbout.offsetTop) {
      if (!started) {
        increaseNum.forEach((num) => startCount(num));
      }
      started = true;
    }
  };

  function startCount(el) {
    let goal = el.dataset.goal;
    let count = setInterval(() => {
      el.textContent++;
      if (el.textContent == goal) {
        clearInterval(count);
      }
    }, 2000 / goal);
  }
}

///////********** car products ***** */
const productsContainer = document.querySelector(".product-container");
const fillterBrand = document.querySelector("#fillter-brand");
const fillterModel = document.querySelector("#fillter-model");
const fillterPrice = document.querySelector("#fillter-price");
const cartProductDivDom = document.querySelector(".nav-link__cart-product div");
const cartProductList = document.querySelector(".nav-link__cart-product");
const badgeDom = document.querySelector(".font-badge");
const shoppingCartIcon = document.querySelector(".view-cart-list");

if (window.location.pathname === "/index.html") {
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
    if (window.location.pathname == "/index.html") {
      shoppingCartIcon.addEventListener("click", () => {
        window.location = "cart.html";
      });
    }
  }
}

// show product in page
if (document.querySelector(".product-container")) {
  function showProduct(type, word) {
    categoriesArray.forEach((product) => {
      if (type == "null") {
        productsContainer.innerHTML += `
            <div class="grid-col">
            <div class="card-cars mt-3 mb-3">
            
            <div class="grid-col__card-cars__img">
               <img src="${product.image}" class="w-100 card-img" alt="car">
            </div>
            <div class="card-body">
            <div class="card-title fw-bold text-uppercase">brand: ${product.brand}</div>
            <h5 onclick="saveItemData(${product.id})" class="card-title product-title card-model text-uppercase"><b>Model:</b> ${product.name}</h5>
            <hr>
            <p class="card-text"><span class="fw-bold">Describtion</span> :${product.description}</p><hr>
            <p class="card-text fw-bold">Price: ${product.price}$</p><hr>
            <p class="card-text fw-bold">Rating: ${product.rate}*</p>
            <div class="add-to-cart-btn text-center">
            <button class="btn btn-warning shop-item-button" onclick="addToCart(${product.id})">ADD TO CART</button>
            </div>
            </div>
            </div>
            </div>`;
      } else {
        if (Object.values(product)[type].includes(word)) {
          productsContainer.innerHTML += `
               <div class="grid-col">
               <div class="card-cars mt-3 mb-3">
               
               <div class="grid-col__card-cars__img">
               <img src="${product.image}" class="w-100 card-img" alt="car">
               </div>
               <div class="card-body">
               <div class="card-title fw-bold text-uppercase">brand: ${product.brand}</div>
               <h5 onclick="saveItemData(${product.id})" class="card-title product-title card-model text-uppercase"><b>Model:</b> ${product.name}</h5>
               <hr>
               <p class="card-text"><span class="fw-bold">Describtion</span> :${product.description}</p><hr>
               <p class="card-text card-price fw-bold">Price: ${product.price}$</p><hr>
               <p class="card-text fw-bold">Rating: ${product.rate}*</p>
                  <div class="add-to-cart-btn text-center">
                  <button class="btn btn-warning shop-item-button" onclick="addToCart(${product.id})">ADD TO CART</button>
                  </div>
               </div>
               </div>
               </div>
               `;
        }
      }
    });
  }
  showProduct("null");

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

  // add to cart icon
  function addToCart(id) {
    if (localStorage.getItem("user")) {
      let choosenItem = categoriesArray.find((item) => item.id === id);
      //to not dupplicate localstorage
      let isProductInCart = addedToCartIcon.some(
        (i) => i.id === choosenItem.id
      );
      if (isProductInCart) {
        console.log(addedToCartIcon);
        addedToCartIcon = addedToCartIcon.map((product) => {
          if (product.id === choosenItem.id)
            swal("Opps..!", "product was added before", "error");

          return product;
        });
      } else {
        addedToCartIcon.push(choosenItem);
        console.log(addedToCartIcon);
        swal("successful log", "product was added successful", "success");
      }
      cartProductDivDom.innerHTML = "";
      addedToCartIcon.forEach((item) => {
        cartProductDivDom.innerHTML += `<p>${item.name}</p>`;
      });

      // addedToCartIcon = [...addedToCartIcon, choosenItem];

      //save data
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

  //filter products

  fillterBrand.onkeyup = () => {
    productsContainer.innerHTML = "";
    showProduct(2, fillterBrand.value);
  };
  fillterModel.onkeyup = () => {
    productsContainer.innerHTML = "";
    showProduct(3, fillterModel.value);
  };

  fillterPrice.onkeyup = () => {
    productsContainer.innerHTML = "";
    showProduct(5, fillterPrice.value);
  };

  //to set in details products
  function saveItemData(id) {
    localStorage.setItem("productId", id);
    window.location = "details.html";
  }
}

// filter categories
let filteredCategory = document.querySelector("#filtered-category");
if (document.querySelector("#filtered-category")) {
  filteredCategory.addEventListener("change", getProductsFiltered);

  function getProductsFiltered(e) {
    let val = e.target.value;
    let products = JSON.parse(localStorage.getItem("carProducts"));

    if (val === "all") {
      showProduct("null");
    } else {
      products = products.filter((i) => i.category === val);
      productsContainer.innerHTML = "";
      showProduct(1, val);
    }
  }
}

// for filtered in navbar
let filteredNav = document.querySelectorAll(".dropdown-item");

if (productsContainer) {
  for (let i = 0; i < filteredNav.length; i++) {
    let dropDownMenu = filteredNav[i];
    dropDownMenu.addEventListener("click", filteredNavCategory);
    function filteredNavCategory(e) {
      e.preventDefault();

      // console.log(filteredNav[i].innerHTML);
      if (filteredNav[i].innerHTML === "Hatchback") {
        productsContainer.innerHTML = "";
        showProduct(1, filteredNav[i].innerHTML);
      } else if (filteredNav[i].innerHTML === "Sedan") {
        productsContainer.innerHTML = "";
        showProduct(1, filteredNav[i].innerHTML);
      } else if (filteredNav[i].innerHTML === "cabriolet") {
        productsContainer.innerHTML = "";
        showProduct(1, filteredNav[i].innerHTML);
      } else if (filteredNav[i].innerHTML === "SUV") {
        productsContainer.innerHTML = "";
        showProduct(1, filteredNav[i].innerHTML);
      } else if (filteredNav[i].innerHTML === "coupe") {
        productsContainer.innerHTML = "";
        showProduct(1, filteredNav[i].innerHTML);
      } else if (filteredNav[i].innerHTML === "pickup") {
        productsContainer.innerHTML = "";
        showProduct(1, filteredNav[i].innerHTML);
      } else {
        productsContainer.innerHTML = "";
      }
    }
  }
} else {
  filteredNav.onclick,
    () => {
      window.location = "product.html";
    };
}
