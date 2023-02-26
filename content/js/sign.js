const PassBtn = document.querySelector("#passBtn");
if (PassBtn) {
  PassBtn.addEventListener("click", () => {
    let input = document.querySelector(".passInput");
    input.getAttribute("type") === "password"
      ? input.setAttribute("type", "text")
      : input.setAttribute("type", "password");

    if (input.getAttribute("type") === "text") {
      PassBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
    } else {
      PassBtn.innerHTML = '<i class="fa fa-eye fa-fw" aria-hidden="true"></i>';
    }
  });
}

//
const PassBtn2 = document.querySelector("#passBtn2");
if (PassBtn2) {
  PassBtn2.addEventListener("click", () => {
    let input2 = document.querySelector(".passInput2");
    input2.getAttribute("type") === "password"
      ? input2.setAttribute("type", "text")
      : input2.setAttribute("type", "password");

    if (input2.getAttribute("type") === "text") {
      PassBtn2.innerHTML = '<i class="fa fa-eye-slash"></i>';
    } else {
      PassBtn2.innerHTML = '<i class="fa fa-eye fa-fw" aria-hidden="true"></i>';
    }
  });
}
const subBtn = document.querySelector(".sub-btn");

if (subBtn) {
  subBtn.onclick = (e) => {
    e.preventDefault();
    let fName = document.getElementById("fname").value;
    let lName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let pass = document.getElementById("pass").value;
    let rpass = document.getElementById("rpass").value;

    // set data on localstorage
    localStorage.setItem("firstName", fName);
    localStorage.setItem("secondName", lName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", pass);
    localStorage.setItem("rPassword", rpass);
    localStorage.setItem("user", username);

    if (
      fName === "" &&
      lName === "" &&
      email === "" &&
      username === "" &&
      pass === "" &&
      rpass === ""
    ) {
      swal("Opps..!", "Input field must be fill", "error");
    } else {
      if (fName === "") {
        swal("Opps..!", "Input field must be fill", "error");
      }
      if (pass !== rpass) {
        swal("Opps..!", "Passwords not matching", "error");
      } else {
        swal("Good job!", "Registration successful", "success");
        window.location.href = "index.html";
      }
    }
  };
}

signform = document.querySelector(".signform");
logform = document.querySelector(".logform");
toSign = document.querySelector(".tosign");
tolog = document.querySelector(".tolog");
loginbtn = document.querySelector(".login");

let logusername = document.querySelector("#logusername");
let logpass = document.querySelector("#logpass");

if (toSign) {
  toSign.onclick = (e) => {
    e.preventDefault();
    logform.style.display = "none";
    signform.style.display = "block";
  };
}

if (tolog) {
  tolog.onclick = (e) => {
    e.preventDefault();
    logform.style.display = "block";
    signform.style.display = "none";
  };
}
if (loginbtn) {
  loginbtn.onclick = (e) => {
    e.preventDefault();
    if (
      logusername.value == localStorage.getItem("user") &&
      logpass.value == localStorage.getItem("password")
    ) {
      swal("successful log", "Welcome", "success");
      window.location.href = "index.html";
    } else {
      swal("Opps..!", "Wrong password or userName", "error");
    }
  };
}
// for sign up
