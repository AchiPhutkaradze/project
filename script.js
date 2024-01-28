const burgerMenu = document.getElementById("burger-menu");
const overlay = document.getElementById("menu");
const main = document.querySelector("main");
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
let slidesLength = slides.length;
let radioContainer = document.getElementById("radio-container");
let autoPlay;
let count = 0;
const questionBox = document.querySelectorAll(".question-box");
const answers = Array.from(document.getElementsByClassName("answer"));
const arrowDownImg = Array.from(document.getElementsByClassName("arrow-down"));
const footer = document.querySelector("footer");
const body = document.getElementsByTagName("BODY")[0];
const header = document.querySelector("header");
const fullscreen = document.getElementById("fullscreen");
const mediaQuery = window.matchMedia("(max-width: 1024px)");
const prevBtn = document.getElementById("left-arrow");
const nextBtn = document.getElementById("right-arrow");

//menu
function menu() {
  burgerMenu.addEventListener("click", function () {
    const isClosed = burgerMenu.classList.contains("close");

    if (isClosed) {
      burgerMenu.classList.remove("close");
      overlay.classList.remove("overlay");
      main.style.zIndex = "";
      footer.style.zIndex = "";
      body.style.overflow = "";
      fullscreen.style.backgroundColor = "";
      fullscreen.style.opacity = "";
    } else {
      burgerMenu.classList.add("close");
      overlay.classList.add("overlay");
      main.style.zIndex = "-1";
      footer.style.zIndex = "-2";
      body.style.overflow = "hidden";
      fullscreen.style.backgroundColor = "black";
      fullscreen.style.opacity = "0.5";
    }
  });
}
menu();

//slideshow

const showSlide = (index) => {
  const mobileVersion = () => {
    count = index < 0 ? slidesLength - 1 : index >= slidesLength ? 0 : index;
    slider.style.transform = `translateX(${-count * 100}%)`;
  };

  const desktopVersion = () => {
    slides.forEach((slide) => slide.classList.remove("active"));
    count = index < 0 ? slidesLength - 1 : index >= slidesLength ? 0 : index;
    slides[count].classList.add("active");
  };

  const changebi = (event) => {
    if (event.matches) {
      mobileVersion();
    } else {
      desktopVersion();
    }
  };

  changebi(mediaQuery);
  mediaQuery.addListener(changebi);

  changebi();
};

const createRadioButtons = () => {
  const radioContainer = document.querySelector(".radio-container");
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

const updateArrowVisibility = () => {
  prevBtn.style.display = count === 0 ? "" : "block";
  nextBtn.style.display = count === slidesLength - 1 ? "none" : "block";
};

prevBtn.addEventListener("click", () => {
  showSlide(count - 1);
});

nextBtn.addEventListener("click", () => {
  showSlide(count + 1);
});

slider.addEventListener("mouseenter", stopAutoPlay);
slider.addEventListener("mouseleave", startAutoPlay);

createRadioButtons();
startAutoPlay();
updateArrowVisibility();

//fac accordion
for (let i = 0; i < questionBox.length; i++) {
  questionBox[i].addEventListener("click", function () {
    answers[i].classList.toggle("active");
    if (answers[i].classList.contains("active")) {
      arrowDownImg[i].style.transform = "rotate(180deg)";
    } else {
      arrowDownImg[i].style.transform = "rotate(0)";
    }
    for (let j = 0; j < answers.length; j++) {
      if (j !== i) {
        answers[j].classList.remove("active");
        arrowDownImg[j].style.transform = "rotate(0)";
      }
    }
  });
}

//scrolling

let backScrollPos = window.pageYOffset;
function scrolling() {
  const currentPos = window.pageYOffset;
  if (backScrollPos > currentPos) {
    header.style.top = "0";
  } else {
    header.style.top = `-${header.offsetHeight}px`;
  }
  backScrollPos = currentPos;
}

//media query

function handleViewportChange(event) {
  if (event.matches) {
    window.onscroll = scrolling;
  } else {
    window.onscroll = null;
  }
}
handleViewportChange(mediaQuery);
mediaQuery.addListener(handleViewportChange);
