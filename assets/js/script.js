$(document).ready(function () {
  let imgArray = [];
  let imgIndex = 0;
  let currSquare = '';
  let easyBoard = [];
  let mediumBoard = [];
  let hardBoard = [];
  let difficultySelected;
  let modeSelected;
  let currBoard = [];
  let setTheme = false;
  let setDifficulty = false;

  // function for getting giphy images URL and store it in an array
  function getPix(topic) {
    let giphyAPIkey = 'rrQWLPsJMZUYbQXyP8iY5m23dAYvfmKO';
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${giphyAPIkey}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      imgArray = [];
      for (i = 0; i < response.data.length; i++) {
        let newURL = response.data[i].images.fixed_width_small.url;
        imgArray.push(newURL);
      }
    });
  };

  // function for getting initial solved squares and storing it in an array for solver
  function getGameBoard(mode) {
    let queryURL = `https://sugoku.herokuapp.com/board?difficulty=${mode}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      if (mode === 'easy') {
        easyBoard = [];
        easyBoard.push(response.board);
      }
      if (mode === 'medium') {
        mediumBoard = [];
        mediumBoard.push(response.board);
      }
      if (mode === 'hard') {
        hardBoard = [];
        hardBoard.push(response.board);
      };
    });
  };

  // function to render the board from array of numbers passed to
  function renderBoard(arr) {
    console.log(arr);
    let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for (let x = 0; x < arr[0].length; x++) {
      let col = arr[0][x];
      for (let y = 0; y < 9; y++) {
        if (x === 0) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        }
        else if (x === 1) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 2) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 3) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 4) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 5) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 6) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 7) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 8) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (col[y] === 0) {
            $(`#${alphaArr[y]}${x}`).html('');
            $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        }
      };
    };
  };

  // function to get the value from the playing squared and add the value to the index
  function getState(currBoard, pressedID, valueToChange) {
    console.log(currBoard);
    let currBoardExtract = currBoard[0];
    let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let split = pressedID.split("");
    let colValue = split[0];
    let colToBeChanged = alphaArr.indexOf(colValue);
    let rowToBeChanged = parseInt(split[1]);
    currBoardExtract[rowToBeChanged][colToBeChanged] = valueToChange;
  };

  // function to erase the square from the playing board and array 
  function eraseSquare() {
    console.log('this the value from the playing field and currBoard array');
  };

  // function to get initial solved squares and to run solver for each board while user makes their selection
  function initialState() {
    getGameBoard('easy');
    getGameBoard('medium');
    getGameBoard('hard');
    // solverFunction(easy);
    // solverFunction(medium);
    // solverFunction(hard);
  };

  function solverState() {
    var thisBoard = currBoard[0];
    var numAttemptsSingleConfig = 0;
    var maxNumAttemptsSingleConfig = 2;

    while (testIsSolutionRevamped(thisBoard) === false && numAttemptsSingleConfig < maxNumAttemptsSingleConfig) {
      var oldBoard = [];
      for (var i = 0; i < 9; i++) {
        var tempoBArr = [];
        for (var j = 0; j < 9; j++) {
          // tempoBArr.push(thisBoard[i][j]);
        }
        oldBoard.push(tempoBArr);
      }

      var sBAFPResults = sBATrySolver(thisBoard);
      // var rowSolved=sBAFPResults[0];
      // var colSolved=sBAFPResults[1];
      // var boxSolved=sBAFPResults[2];
      var sudokuBoardAll = sBAFPResults[3];

      var sudokuBoardAllForRender = [];
      for (var i = 0; i < 9; i++) {
        var tempoBArr = [];
        for (var j = 0; j < 9; j++) {
          if (sudokuBoardAll[i][j] <= 9) {
            tempoBArr.push(sudokuBoardAll[i][j]);
          }
          else {
            tempoBArr.push(0);
          }
          tempoBArr.push(sudokuBoardAll[i][j]);
        }
        sudokuBoardAllForRender.push(tempoBArr);
      }


      var emptyForRender = [];
      emptyForRender.push(sudokuBoardAllForRender);

      var AllTheSame = true;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (oldBoard[i][j] !== sudokuBoardAllForRender[i][j]) {
            AllTheSame = false;
          }
        }
      }

      renderBoard(emptyForRender);
      if (AllTheSame === true) {
        numAttemptsSingleConfig = numAttemptsSingleConfig + 1;
      }
      else {
        numAttemptsSingleConfig = 0;
        currBoard[0] = sudokuBoardAllForRender;
        // Update currBoard
      }
    }
  };

  $(".square").click(function () {
    currSquare = $(this).attr('id');
    $(this).css('background-image', 'none');
  });

  $(".fieldBtn").click(function () {
    $(`#${currSquare}`).html($(this).val());
    getState(currBoard, currSquare, parseInt($(this).val()));
  });

  $('body').keydown(function (e) {
    $(`#${currSquare}`).html(e.key);
    getState(currBoard, currSquare, parseInt(e.key));
  });

  $('.theme').on('click', function () {
    let currentTheme = $(this).attr('data-theme');
    $('.theme').hide();
    $('.theme-head').hide();
    getPix(currentTheme);
    setTheme = true;
    // if (setTheme === true && setDifficulty === true) {
    //   $('#reset').removeClass('hide');
    //   $('#gameBoard').removeClass('hide');
    // }
  });

  $('.difficulty').on('click', function () {
    difficultySelected = $(this).attr('data-lvl');
    $('.difficulty').hide();
    $('.diff-head').hide();
    if (difficultySelected === 'easy') {
      currBoard.push(easyBoard[0]);
    }
    if (difficultySelected === 'medium') {
      currBoard.push(mediumBoard[0]);
    }
    if (difficultySelected === 'hard') {
      currBoard.push(hardBoard[0]);
    }
    setDifficulty = true;
    renderBoard(currBoard);
    // if (setTheme === true && setDifficulty === true) {
    //   $('#reset').removeClass('hide');
    //   $('#gameBoard').removeClass('hide');
    //   // testIsSolutionRevamped(currBoard[0]);
    // }
  });

  // Mode button functionality
  $('.mode').on('click', function() {
    modeSelected = $(this).attr('data-mode');
    $('.mode').hide();
    $('.mode-head').hide();
    if (setTheme === true && setDifficulty === true) {
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');
      $('#checkBtn').removeClass('hide');
      $('#hintBtn').removeClass('hide');
      // renderBoard(currBoard);
      // testIsSolutionRevamped(currBoard[0]);
    }
  });

  $('#reset').on('click', function () {
    location.reload();
  })

  $("#checkBtn").on('click', function () {
    var checkThisBoard = testIsSolutionRevamped(currBoard[0]);
    if (checkThisBoard) {
      $("#checkBtn").addClass('green');
    }
    else {
      $("#checkBtn").addClass('red');
      console.log(checkThisBoard);
    }
  });
  initialState();
  // solverState();
});