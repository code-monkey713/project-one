// A $( document ).ready() block.
$(document).ready(function() {
  let giphyAPIkey = 'rrQWLPsJMZUYbQXyP8iY5m23dAYvfmKO';
  let gifSubject = 'baby+yoda';
  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifSubject}&api_key=${giphyAPIkey}`;

  let imgArray = [];
  let imgIndex = 0;
  let currSquare = '';

// AJAX "Get" from GIPHY API and displaying on HTML page
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    // adding the URL to imgArray to be used outside of the AJAX call
    for (i = 0; i < response.data.length; i++) {
      let newURL = response.data[i].images.fixed_width_small.url;
      imgArray.push(newURL);
    }
    console.log(imgArray);
});


// AJAX Call to get info from the Sudoku API
$.ajax(
    {
        url:'https://sugoku.herokuapp.com/board?difficulty=hard',
        method:'GET'
    }
).then(function (response)
    {
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
                    // $(`#C${y}`).css('background-image', 'url(' + imgArray[2] + ')');
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
                    // $(`#D${y}`).css('background-image', 'url(' + imgArray[3] + ')');
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
                    // $(`#E${y}`).css('background-image', 'url(' + imgArray[4] + ')');
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
                    // $(`#F${y}`).css('background-image', 'url(' + imgArray[5] + ')');
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
                    // $(`#G${y}`).css('background-image', 'url(' + imgArray[6] + ')');
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
                    // $(`#H${y}`).css('background-image', 'url(' + imgArray[7] + ')');
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
                    // $(`#I${y}`).css('background-image', 'url(' + imgArray[8] + ')');
                }
            };
        };
    }
);

$(".square").click(function(){
  // console.log(this);
  $(this).css('background-image', 'none');
  currSquare = $(this).attr('id');
  // console.log(currSquare);
  });

  $(".fieldBtn").click(function(){
    $(`#${currSquare}`).html($(this).val());
    // console.log(currSquare);
    });
});
