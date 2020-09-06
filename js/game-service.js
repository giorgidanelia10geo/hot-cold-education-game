var gameService = (function() {
  var checkAnswers = function(answers) {
    var correctAnswers = [1, 2, 2]; // Get from server for security reason;
    var invalidAnswers = [];
    correctAnswers.forEach((element, index) => {
      if (answers[index] !== element) {
        invalidAnswers.push(index);
      }
    });
    return invalidAnswers;
  };

  return {
    checkAnswers: checkAnswers
  };
})();
