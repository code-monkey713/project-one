$(document).ready(function () {
  // let gifTheme = 'baby+yoda';
  let imgArray = [];
  let imgIndex = 0;
  let currSquare = '';
  let difficulty = 'easy';
  let easyBoard = [];
  let mediumBoard = [];
  let hardBoard = [];
  let currBoard = [];
  let setTheme = false;
  let setDifficulty = false;

  function getDifficulty(diff) {
    // AJAX Call to get info from the Sudoku API
    $.ajax(
      {
        url: 'https://sugoku.herokuapp.com/board?difficulty=' + diff,
        method: 'GET'
      }
    ).then(function (response) {
      console.log(response);
      // console.log(response.board[0][0]);
      // console.log(response.board[0].length);

      for (let x = 0; x < response.board.length; x++) {
        // console.log(response.board[colIndex]);
        let col = response.board[x];
        // console.log(col);

        for (let y = 0; y < 9; y++) {

          // console.log(response.board[x][y]);
          if (x === 0) {
            $(`#A${y}`).html(col[y]);
            // console.log(`filled for A${y}`);
            if (col[y] === 0) {
              // $(`#A${y}`).css('opacity', 0.0);
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
    }
    )
  };

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
      // console.log(imgArray);
    });
  };

  // function for getting all three difficulty initial boards and storing it in an array
  function getGameBoard(mode) {
    let queryURL = `https://sugoku.herokuapp.com/board?difficulty=${mode}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      if (mode === 'easy') {
        easyBoard.push(response.board);
        console.log(easyBoard);
        console.log(easyBoard[0].length);
        renderBoard(easyBoard);
        // easyBoard = response.map((x) => x);
        // response.map(easyBoard);
        // easyBoard.map(response);
        // let copyResponse = [...response];
        // let copyResponse = response.splice();
        // console.log(copyResponse);
      }
      if (mode === 'medium') {
        mediumBoard.push(response.board);
        console.log(mediumBoard);
      }
      if (mode === 'hard') {
        hardBoard.push(response.board);
        console.log(hardBoard);
      };
    });
  };

  // function to render the board from array of numbers
  function renderBoard(arr) {
    console.log(arr);
    // console.log('What is the length of arr?');
    // let userSelect = easyBoard;
    // console.log(easyBoard);
    // console.log('calling the render board function');
    for (let x = 0; x < arr[0].length; x++) {
      // console.log(response.board[colIndex]);
      // console.log("I'm inside the loop!");
      let col = arr[0][x];
      // console.log(col);

      for (let y = 0; y < 9; y++) {

        // console.log(response.board[x][y]);
        if (x === 0) {
          $(`#A${y}`).html(col[y]);
          if (col[y] === 0) {
            // $(`#A${y}`).css('opacity', 0.0);
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

  // function to get all the values from the playing board and convert to array *** WIP ***
  function getState() {
    console.log('called on function to get current state of board and store to array');
    // newArr = $(".square").arr.map(function() {
    //   return $(this).text();
    //   console.log('array map function called');
    // }).get();

    // console.log('function to store current board state to array');
  };

  // function to get initial screen up with initial board ready to play
  function initialState() {
    // getPix('epic+fail');
    // getGameBoard('easy');
    // getGameBoard('medium');
    // getGameBoard('hard');
    // console.log(easyBoard[0].length);
    // renderBoard(easyBoard);
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
    // getState();
  });

  $('body').keydown(function (e) {
    $(`#${currSquare}`).html(e.key);
    getState(currBoard);
  });

  $('.theme').on('click', function () {
    let currentTheme = $(this).attr('data-theme');
    $('.theme').hide();
    $('.theme-head').hide();
    // getTheme(currentTheme);
    getPix(currentTheme);
    setTheme = true;
    if (setTheme === true && setDifficulty === true) {
      // console.log('theme and difficulty is set');
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');
    }
  });

  $('.difficulty').on('click', function () {
    let diff = $(this).attr('data-lvl');
    console.log(diff);
    $('.difficulty').hide();
    $('.diff-head').hide();
    getDifficulty(diff);
    setDifficulty = true;
    if (setTheme === true && setDifficulty === true) {
      // console.log('theme and difficulty is set');
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');
    }
  });

  $('#reset').on('click', function () {
    location.reload();
  })

  initialState();
});