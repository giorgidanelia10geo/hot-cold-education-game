var game = (function() {
  reset = undefined;
  complete = undefined;
  blue = undefined;
  orange = undefined;
  container = undefined;
  dragging = undefined;
  draggingAnswer = undefined;
  selectedAnswers = [];
  answerPlaceholders = [];
  coldAnswer = 1;
  hotAnswer = 2;

  init = function() {
    // get element for reset button
    reset = document.querySelector(".reset__btn");

    // get element for complete button
    complete = document.querySelector(".completed__btn");

    // get element for blue button
    blue = document.querySelector(".cold__btn");

    // get element for orange button
    orange = document.querySelector(".hot__btn");

    // get root conainer element
    container = document.querySelector(".container");

    //get all question dots
    answerPlaceholders = Array.from(document.querySelectorAll(".question__dot"));

    //bind to reset click event
    reset.addEventListener("click", resetClick);
    //bind to complete click event
    complete.addEventListener("click", completeClick);

    // setup dragging event handers
    setupOnmouseDown(blue, coldAnswer);
    // setup dragging event handers
    setupOnmouseDown(orange, hotAnswer);
  };

  setupOnmouseDown = function(element, answerType) {
    element.onmousedown = function(e) {
      element = e.target;
      //clone element from original button and appent to container to drag
      let clone = element.cloneNode(true);
      clone.style.top = "0px";
      clone.style.left = "0px";
      clone.style.bottom = "unset";
      clone.style.right = "unset";
      clone.style.transform = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
      container.appendChild(clone);
      dragging = clone;
      draggingAnswer = answerType;
      //move event
      document.onmousemove = mouseMove;
      //mouse up event, movement stoped and check position
      document.onmouseup = mouseUp;
    };
  };

  mouseMove = function(e) {
    e.preventDefault();
    dragging.style.transform = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
  };

  mouseUp = function(e) {
    document.onmousemove = null;
    document.onmouseup = null;

    answerPlaceholders.forEach((element, index) => {
      if (elementsOverlap(element, dragging)) {
        selectedAnswers[index] = draggingAnswer;
        console.log(selectedAnswers);
        if (draggingAnswer == coldAnswer) {
          element.classList.remove("hot-selected");
          element.classList.add("cold-selected");
        } else if (draggingAnswer == hotAnswer) {
          element.classList.add("hot-selected");
          element.classList.remove("cold-selected");
        }
      }
    });
    dragging.remove();
  };

  //checks if 2 elements are overlapping
  elementsOverlap = function(el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    // create bigger rectangle
    let left1 = rect1.x - rect1.width;
    let right1 = rect1.x + rect1.width;
    let top1 = rect1.y - rect1.height;
    let bottom1 = rect1.y + rect1.height;

    //check if inside
    return rect2.x >= left1 && rect2.x <= right1 && rect2.y >= top1 && rect2.y <= bottom1;
  };

  //reset game
  resetClick = function() {
    selectedAnswers = [];
    answerPlaceholders.forEach(element => {
      element.classList.remove("hot-selected");
      element.classList.remove("incorrect");
      element.classList.remove("cold-selected");
    });
  };

  completeClick = function() {
    //validate answers
    results = gameService.checkAnswers(selectedAnswers);

    if (results.length > 0) {
      // if invalid results display them
      results.forEach(invalidIndex => {
        answerPlaceholders[invalidIndex].classList.add("incorrect");
      });
    } else {
      congratulateUser();
    }
  };

  congratulateUser = function() {
    document.querySelectorAll(".should_dissapear_on_correct").forEach(element => {
      element.style.display = "none";
    });
    document.querySelector(".success").style.display = "block";
  };

  return {
    init: init
  };
})();

game.init(); // initialize game
