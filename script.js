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
const arrowPrev = document.getElementById("left-arrow");
const arrowNext = document.getElementById("right-arrow");

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
document.addEventListener("DOMContentLoaded", function () {
  const showSlide = (index) => {
    count = index < 0 ? slidesLength - 1 : index >= slidesLength ? 0 : index;
    const desktopVersion = () => {
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[count].classList.add("active");
    };
    const mobileVersion = () => {
      slider.style.transform = `translateX(${-count * 100}%)`;
    };

    const changes = (event) => {
      if (event.matches) {
        mobileVersion();
      } else {
        slider.style.transform = "translateX(0)";
        desktopVersion();
      }
    };

    changes(mediaQuery);
    mediaQuery.addListener(changes);
  };

  showSlide(0);

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

  arrowNext.addEventListener("click", () => showSlide(count - 1));
  arrowPrev.addEventListener("click", () => showSlide(count + 1));
  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);

  createRadioButtons();
  startAutoPlay();
});
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

function headerOpacity(header) {
  const currentPosition = window.pageYOffset;
  if (currentPosition > 100) {
    header.style.opacity = "0.95";
  } else {
    header.style.opacity = "1";
  }
}

function scrolling() {
  headerOpacity(header);
}

function handleViewportChange(event) {
  if (event.matches) {
    window.addEventListener("scroll", scrolling);
    headerOpacity(header);
  } else {
    window.removeEventListener("scroll", scrolling);
    headerOpacity(header);
    header.style.opacity = "1";
  }
}

handleViewportChange(mediaQuery);
mediaQuery.addListener(handleViewportChange);
