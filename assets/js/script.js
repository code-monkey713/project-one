$(document).ready(function () {
  let imgArray = [];
  let imgIndex = 0;
  let currSquare = '';
  let easyBoard = [];
  let mediumBoard = [];
  let hardBoard = [];
  let difficultySelected; 
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
    for (let x = 0; x < arr[0].length; x++) {
      let col = arr[0][x];

      for (let y = 0; y < 9; y++) {
        if (x === 0) {
          $(`#A${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#A${y}`).html('');
            $(`#A${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 1) {
          $(`#B${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#B${y}`).html('');
            $(`#B${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 2) {
          $(`#C${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#C${y}`).html('');
            $(`#C${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 3) {
          $(`#D${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#D${y}`).html('');
            $(`#D${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 4) {
          $(`#E${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#E${y}`).html('');
            $(`#E${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 5) {
          $(`#F${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#F${y}`).html('');
            $(`#F${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 6) {
          $(`#G${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#G${y}`).html('');
            $(`#G${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 7) {
          $(`#H${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#H${y}`).html('');
            $(`#H${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 8) {
          $(`#I${y}`).html(col[y]);
          if (col[y] === 0) {
            $(`#I${y}`).html('');
            $(`#I${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
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
  function getState(currBoard,pressedID,valueToChange) {
    console.log(currBoard);
    let currBoardExtract = currBoard[0];
    let alphaArr=['A','B','C','D','E','F','G','H','I'];
    let split = pressedID.split("");
    let colValue=split[0];
    let colToBeChanged=alphaArr.indexOf(colValue);
    let rowToBeChanged=parseInt(split[1]);
    currBoardExtract[rowToBeChanged][colToBeChanged]=valueToChange;
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

  $(".square").click(function () {
    // console.log(this);
    // $((this)).addClass('selectedCell');
    currSquare = $(this).attr('id');
    $(this).css('background-image', 'none');
    // console.log(currSquare);
  });

  $(".fieldBtn").click(function () {
    $(`#${currSquare}`).html($(this).val());
    getState(currBoard,currSquare,parseInt($(this).val()));
    // clearBoard();
    // renderBoard(currBoard[0]);
  });

  $('body').keydown(function (e) {
    $(`#${currSquare}`).html(e.key);
    getState(currBoard,currSquare,parseInt(e.key));
    // clearBoard();
    // renderBoard(currBoard[0]);
  });

  $('.theme').on('click', function () {
    let currentTheme = $(this).attr('data-theme');
    $('.theme').hide();
    $('.theme-head').hide();
    getPix(currentTheme);
    setTheme = true;
    if (setTheme === true && setDifficulty === true) {
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');
    }
  });

  $('.difficulty').on('click', function () {
    difficultySelected = $(this).attr('data-lvl');
    $('.difficulty').hide();
    $('.diff-head').hide();
    if(difficultySelected === 'easy'){
      currBoard.push(easyBoard[0]);
    }
    if(difficultySelected === 'medium'){
      currBoard.push(mediumBoard[0]);
    }
    if(difficultySelected === 'hard'){
      currBoard.push(hardBoard[0]);
    }
    // console.log(currBoard);
    renderBoard(currBoard);
    setDifficulty = true;
    if (setTheme === true && setDifficulty === true) {
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');
    }
  });

  $('#reset').on('click', function () {
    location.reload();
  })

  initialState();
});