$(document).ready(function () {
  let imgArray = [];
  let imgIndex = 0;
  let currSquare = '';
  let easyBoard = [];
  let mediumBoard = [];
  let hardBoard = [];
  let difficultySelected;
  let optionSelected = false;
  let currBoard = [];
  let setTheme = false;
  let setDifficulty = false;
  let arrayIDsNotToChange = [];
  let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  let interactiveMode = 0;
  let lastValidRestorePoints = [];
  let invalidEntriesMasterList = [];

  // function for getting giphy images URL and store it in an array
  function getPix(topic) {
    let giphyAPIkey = 'rrQWLPsJMZUYbQXyP8iY5m23dAYvfmKO';
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${giphyAPIkey}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
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
    let numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for (let x = 0; x < arr[0].length; x++) {
      let col = arr[0][x];
      for (let y = 0; y < 9; y++) {
        if (x === 0) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        }
        else if (x === 1) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        }
        else if (x === 2) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        }
        else if (x === 3) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 4) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 5) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 6) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              if (interactiveMode === 0) {
                $(`#${alphaArr[y]}${x}`).html('');
                $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
              }
              else {
                $(`#${alphaArr[y]}${x}`).html('');
                var thisHTML = $(`#${alphaArr[y]}${x}`).html();
                thisHTML = thisHTML + "<div> ";
                for (var im = 0; im < 3; im++) {
                  thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                  for (var imn = 0; imn < 3; imn++) {
                    if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                      thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                    }
                    else {
                      thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                    }
                  }
                  thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
                }
                thisHTML = thisHTML + " </div>";
                $(`#${alphaArr[y]}${x}`).html(thisHTML);
              }
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 7) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        } else if (x === 8) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode === 0) {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML = $(`#${alphaArr[y]}${x}`).html();
              thisHTML = thisHTML + "<div> ";
              for (var im = 0; im < 3; im++) {
                thisHTML = thisHTML + `<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                for (var imn = 0; imn < 3; imn++) {
                  if (col[y].toString().includes((3 * im + imn + 1).toString())) {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3 * im + imn + 1).toString()}</p> </div> `;
                  }
                  else {
                    thisHTML = thisHTML + `<div class="grid-y cell subSquare subsubbox${Math.floor(imn / 3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                }
                thisHTML = thisHTML + '<div class="cell auto"></div> </div>';
              }
              thisHTML = thisHTML + " </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        };
      };
    };
  };

  // function to colorize the square for invalid entries
  function colorizeInvalidEntries(invalidEntriesIDEntries) {
    var getAllInvalid = document.getElementsByClassName('invalidEntry');
    if (typeof (invalidEntriesIDEntries) === 'object') {
      for (var i = 0; i < invalidEntriesIDEntries.length; i++) {
        if (getAllInvalid.length > 0) {
          if (!getAllInvalid.includes(invalidEntriesIDEntries[i])) {
            $(`#${invalidEntriesIDEntries[i]}`).addClass('invalidEntry');
          }
        }
        else {
          $(`#${invalidEntriesIDEntries[i]}`).addClass('invalidEntry');
        }
      }
      if (getAllInvalid.length > 0) {
        for (var i = 0; i < getAllInvalid.length; i++) {
          if (!invalidEntriesIDEntries.includes(getAllInvalid[i])) {
            $(`#${getAllInvalid[i]}`).removeClass('invalidEntry');
          }
        }
      }
    }
    else {
      if (getAllInvalid.length > 0) {
        if (!getAllInvalid.includes(invalidEntriesIDEntries)) {
          // 
          $(`#${invalidEntriesIDEntries}`).addClass('invalidEntry');

        }
      }
      else {
        // 
        $(`#${invalidEntriesIDEntries}`).addClass('invalidEntry');
      }
    }
  };

  // function to get the value from the playing squared and add the value to the index & setting current board to local storage to recall game state in future release
  function getStateComparable(currBoard, pressedID, valueToChange) {
    localStorage.setItem("currentBoard", JSON.stringify(currBoard[0]));
    let currBoardExtract = currBoard[0];
    let sudokuBoardAllInitial = initializeAllOptions(currBoardExtract);
    let sBAFPResults = sBATrySolver(sudokuBoardAllInitial);
    let sudokuBoardAll = sBAFPResults[3];
    let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let split = pressedID.split("");
    let colValue = split[0];
    let colToBeChanged = alphaArr.indexOf(colValue);
    let rowToBeChanged = parseInt(split[1]);
    let getValidEntryOptions = sudokuBoardAll[rowToBeChanged][colToBeChanged];
    let validEntryOptionsList = [];
    let valueToChangeIncludedValid = 0;
    let thisPermissibleString = getValidEntryOptions.toString();
    for (let i = 0; i < thisPermissibleString.length; i++) {
      validEntryOptionsList.push(parseInt(thisPermissibleString[i]));
      if (parseInt(thisPermissibleString[i]) === valueToChange) {
        valueToChangeIncludedValid = 1;
      }
    }
    if (valueToChangeIncludedValid === 1) {
      currBoardExtract[rowToBeChanged][colToBeChanged] = valueToChange;
      var emptyReturn = [valueToChangeIncludedValid, []];
      return emptyReturn;
    }
    else {
      modal.style.display = "block";
      if (interactiveMode === 0) {
      }
      else {
      }
      let emptyReturn = [valueToChangeIncludedValid, []];
      return emptyReturn;
    }
  };

  // function to get initial solved squares and to run solver for each board while user makes their selection
  function initialState() {
    getGameBoard('easy');
    getGameBoard('medium');
    getGameBoard('hard');
  };

  function cleansudokuBoardForRendering(sudokuBoardAll) {
    let sudokuBoardAllForRender = [];
    for (var i = 0; i < 9; i++) {
      var tempoBArr = [];
      for (var j = 0; j < 9; j++) {
        if (sudokuBoardAll[i][j] <= 9) {
          tempoBArr.push(sudokuBoardAll[i][j]);
        }
        else {
          tempoBArr.push(0);
        }
      }
      sudokuBoardAllForRender.push(tempoBArr);
    }
    var emptyForRender = [];
    emptyForRender.push(sudokuBoardAllForRender);
    return emptyForRender;
  }

  function solverState() {
    var thisBoard = currBoard[0];
    var numAttemptsSingleConfig = 0;
    var maxNumAttemptsSingleConfig = 2;
    var sBAFPResults = sBATrySolver(thisBoard);
    var sudokuBoardAll = sBAFPResults[3];
    renderBoard(sudokuBoardAll);
  };

  // these are the events for each interaction
  $(".square").click(function () {
    currSquare = $(this).attr('id');
    $(this).css('background-image', 'none');
  });

  $(".fieldBtn").click(function () {
    if (!arrayIDsNotToChange.includes(currSquare)) {
      $(`#${currSquare}`).html($(this).val());
      var getStateChecked = getStateComparable(currBoard, currSquare, parseInt($(this).val()));
      var valueToChangeIncludedValid = getStateChecked[0];
      var IDValidInvalidInfo = getStateChecked[1];
      if (interactiveMode === 0) {
        renderBoard(currBoard);
      }
      else {
        var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
        var emptyArrForRenderII = [];
        emptyArrForRenderII.push(sudokuBoardAllInitial);
        renderBoard(emptyArrForRenderII);
      }
      if (valueToChangeIncludedValid === 1) {
        lastValidRestorePoints.push(currBoard);
      }
      else {
        invalidEntriesMasterList.push(IDValidInvalidInfo);
        colorizeInvalidEntries(IDValidInvalidInfo[0]);
      }
    }
  });

  $('body').keypress(function (e) {
    let charCode = e.which;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    } else {
      $(`#${currSquare}`).html(e.key);
      var getStateChecked = getStateComparable(currBoard, currSquare, parseInt(e.key));
      var valueToChangeIncludedValid = getStateChecked[0];
      var IDValidInvalidInfo = getStateChecked[1];
      if (interactiveMode === 0) {
        renderBoard(currBoard);
      }
      else {
        var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
        var emptyArrForRenderII = [];
        emptyArrForRenderII.push(sudokuBoardAllInitial);
        renderBoard(emptyArrForRenderII);
      }
      if (valueToChangeIncludedValid === 1) {
        lastValidRestorePoints.push(currBoard);
      }
      else {
        invalidEntriesMasterList.push(IDValidInvalidInfo);
        colorizeInvalidEntries(IDValidInvalidInfo[0]);
      }
    }
  });

  $('.theme').on('click', function () {
    let currentTheme = $(this).attr('data-theme');
    if (currentTheme === "") {
      $('#option1').removeClass('hide');
      $('#option2').removeClass('hide');
    };
    $('.theme').hide();
    $('.theme-head').hide();
    getPix(currentTheme);
    setTheme = true;
  });

  $('.difficulty').on('click', function () {
    difficultySelected = $(this).attr('data-lvl');
    $('.difficulty').hide();
    $('.diff-head').hide();
    if (difficultySelected === 'easy') {
      currBoard.push(easyBoard[0]);
      var thisBoard = currBoard[0];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (thisBoard[i][j] !== 0) {
            arrayIDsNotToChange.push(`${alphaArr[j]}${i}`);
          }
        }
      }
    }
    if (difficultySelected === 'medium') {
      currBoard.push(mediumBoard[0]);
      var thisBoard = currBoard[0];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (thisBoard[i][j] !== 0) {
            arrayIDsNotToChange.push(`${alphaArr[j]}${i}`);
          }
        }
      }
    }
    if (difficultySelected === 'hard') {
      currBoard.push(hardBoard[0]);
      var thisBoard = currBoard[0];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (thisBoard[i][j] !== 0) {
            arrayIDsNotToChange.push(`${alphaArr[j]}${i}`);
          }
        }
      }
    }
    setDifficulty = true;

    if (setTheme === true && setDifficulty === true) {
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');

      var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
      var sBAFPResults = sBATrySolver(sudokuBoardAllInitial);
      var sudokuBoardAll = sBAFPResults[3];
      var emptyArrForRender = [];
      emptyArrForRender.push(sudokuBoardAll);
      if (interactiveMode === 0) {
        renderBoard(currBoard);
      }
      else {
        var emptyArrForRenderII = [];
        emptyArrForRenderII.push(sudokuBoardAllInitial);
        renderBoard(emptyArrForRenderII);
      }

      lastValidRestorePoints.push(emptyArrForRender);
    }
  });

  // Mode button functionality
  $('.mode').on('click', function () {
    modeSelected = $(this).attr('data-mode');
    if (modeSelected === 'interactive') {
    } else {
    };
    $('.mode').hide();
    $('.mode-head').hide();
    if (setTheme === true && setDifficulty === true) {
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');
      $('#checkBtn').removeClass('hide');
      $('#hintBtn').removeClass('hide');
    }
  });

  $('#reset').on('click', function () {
    location.reload();
  });

  $("#checkBtn").on('click', function () {
    var checkThisBoard = testIsSolutionTheSequel(currBoard[0]);
    if (checkThisBoard === 1) {
      $("#checkBtn").addClass('green');
      window.open('./assets/fireworks/fireworks.html', '_blank');
    }
    else if (checkThisBoard === 0) {
      $("#checkBtn").addClass('blue');
    }
    else {
      $("#checkBtn").addClass('red');
    }
  });

  $("#hintBtn").on('click', function () {
    var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
    sBATrySolverForHint(sudokuBoardAllInitial);
    if ($("#interactiveDiv").hasClass('hide')) {
      $("#interactiveDiv").removeClass('hide');
      $('#stepsH4').removeClass('hide');
    }
  });

  $("#interactiveBtn").on('click', function () {
    interactiveMode = 1;
    var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
    var emptyArrForRenderII = [];
    emptyArrForRenderII.push(sudokuBoardAllInitial);
    renderBoard(emptyArrForRenderII);
    $("#interactiveDiv").removeClass('hide');
    $('#stepsH4').removeClass('hide');
  });

  $("#normalBtn").on('click', function () {
    interactiveMode = 0;
    renderBoard(currBoard);
  });

  // Modal constructed using https://www.w3schools.com/howto/howto_css_modals.asp

  var modal = document.getElementById("invalidDigitModal");
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  initialState();
});