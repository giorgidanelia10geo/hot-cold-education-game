/// Buuton to click
const soundOn = document.querySelector(".sound-on");
const lang = document.querySelector(".lang");

// Sound icon bg
const onCircle = soundOn.querySelector("circle");
const onIcon = soundOn.querySelector("#Path_1226");


soundOn.addEventListener("click", () => {
  if (onCircle.getAttribute("fill") === "#fff") {
    //change icon gb and path color for sound on
    onCircle.setAttribute("fill", "#7fd1d8");
    onIcon.setAttribute("fill", "#fff");
    //change icon gb and path color for sound on
    // lang.style.background = '#fff'
  } else {
    onCircle.setAttribute("fill", "#fff");
    onIcon.setAttribute("fill", "#7fd1d8");
  }
});


lang.addEventListener('click', () => {
  if (lang.innerHTML == 'eng') {
    lang.innerHTML = 'ქარ'
  } else {
    lang.innerHTML = 'eng'
  }
})