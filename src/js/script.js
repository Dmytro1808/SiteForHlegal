$(document).ready(function () {
  $("#slick").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    adaptiveHeight: true,
    dots: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $(".burger ").click(function () {
    $(this).toggleClass("active");
    $(".nav-link").toggleClass("active");
    $(".none").toggleClass("active");
    if ($("body").css("overflow") === "hidden") {
      $("body").css("overflow", "");
    } else {
      $("body").css("overflow", "hidden");
    }
  });
});
function scrollToElem(elem) {
  event.preventDefault();
  const target = document.querySelector(elem.hash);
  window.scrollTo({
    top: target.offsetTop,
    behavior: "smooth",
  });
}
$(document).ready(function () {
  $("#slick-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
document.getElementById("open").addEventListener("click", function () {
  document.getElementById("my-modal").classList.add("open");
});
document.getElementById("close").addEventListener("click", function (event) {
  if (this === event.target)
    document.getElementById("my-modal").classList.remove("open");
});
document.getElementById("my-modal").addEventListener("click", function (event) {
  if (this === event.target)
    document.getElementById("my-modal").classList.remove("open");
});

const form = document.getElementById("form");
const nameInput = document.getElementById("fname");
const messageInput = document.getElementById("message");
const telInput = document.getElementById("tel");
const emailInput = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: nameInput.value,
    message: messageInput.value,
    tel: telInput.value,
    email: emailInput.value,
  };

  // We set a unique key for each data array
  const uniqueKey = Date.now().toString();

  let formDataArray = [];

  const savedData = localStorage.getItem(uniqueKey);

  if (savedData) {
    formDataArray = JSON.parse(savedData);
  }

  formDataArray.push(formData); // Adding new data to the array
  localStorage.setItem(uniqueKey, JSON.stringify(formDataArray));

  // Clearing form fields
  nameInput.value = "";
  messageInput.value = "";
  telInput.value = "";
  emailInput.value = "";

  document.getElementById("my-modal").classList.remove("open");
});

function submitFormSend() {
  let nameInput = document.getElementById("fname");
  let messageInput = document.getElementById("message");
  let telInput = document.getElementById("tel");
  let emailInput = document.getElementById("email");

  let name = nameInput.value;
  let message = messageInput.value;
  let tel = telInput.value;
  let email = emailInput.value;

  let formData = {
    name: name,
    message: message,
    tel: tel,
    email: email,
  };

  // We set a unique key for each data array
  const uniqueKey = Date.now().toString();

  let formDataArray = [];

  const savedData = localStorage.getItem(uniqueKey);

  if (savedData) {
    formDataArray = JSON.parse(savedData);
  }

  formDataArray.push(formData);

  localStorage.setItem(uniqueKey, JSON.stringify(formDataArray));

  // Clearing form fields
  document.getElementById("fname").value = "";
  document.getElementById("message").value = "";
  document.getElementById("tel").value = "";
  document.getElementById("email").value = "";
}
