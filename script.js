const burgerMenu = document.getElementById("burger-menu");
const overlay = document.getElementById("menu");
const main = document.querySelector("main");
console.log(main);
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
let slidesLength = slides.length;
let radioContainer = document.getElementById("radio-container");
let autoPlay;
let count = 0;
//menu
burgerMenu.addEventListener("click", function () {
  const isClosed = burgerMenu.classList.contains("close");

  if (isClosed) {
    burgerMenu.classList.remove("close");
    overlay.classList.remove("overlay");
    overlay.style.position = "";
    main.style.position = "";
  } else {
    burgerMenu.classList.add("close");
    overlay.classList.add("overlay");
    overlay.style.position = "absolute";
    main.style.position = "fixed";
  }
});

//slideshow

const showSlide = (index) => {
  count = index < 0 ? slidesLength - 1 : index >= slidesLength ? 0 : index;
  slider.style.transform = `translateX(${-count * 100}%)`;
};

const createRadioButtons = () => {
  for (let i = 0; i < slidesLength; i++) {
    const radioBtn = document.createElement("div");
    radioBtn.className = "radio-btn";
    radioBtn.innerHTML = `<input type="radio" name="slider-radio" id="radio${i}" />
                          <label for="radio${i}"></label>`;
    radioBtn.addEventListener("click", () => showSlide(i));
    radioContainer.appendChild(radioBtn);
  }
};

const startAutoPlay = () => {
  autoPlay = setInterval(() => {
    showSlide(count + 1);
    updateRadioButtons();
  }, 4000);
};

const stopAutoPlay = () => clearInterval(autoPlay);

const updateRadioButtons = () => {
  const radios = document.querySelectorAll(".radio-btn input");
  radios.forEach((radio, index) => (radio.checked = index === count));
};

createRadioButtons();
startAutoPlay();

slider.addEventListener("mouseenter", stopAutoPlay);
slider.addEventListener("mouseleave", startAutoPlay);
