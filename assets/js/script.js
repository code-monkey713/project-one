// A $( document ).ready() block.
$(document).ready(function() {
  let giphyAPIkey = 'rrQWLPsJMZUYbQXyP8iY5m23dAYvfmKO';
  let gifSubject = 'baby+yoda';
  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifSubject}&api_key=${giphyAPIkey}`;

// const colArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
// let imgValZero = 0;
// let imgValOne = 9;
// let imgValTwo = 18;
// let imgValThree = 27;
// let imgValFour = 36;
let imgArray = [];
let imgIndex = 0;

// AJAX "Get" from GIPHY API and displaying on HTML page
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    // console.log(response.data[0]);
    // const data = response.data;
    // const img = $('<img>').attr('src', data[1].images.fixed_width_small.url);
    // adding the URL to imgArray to be used outside of the AJAX call
    for (i = 0; i < response.data.length; i++) {
      let newURL = response.data[i].images.fixed_width_small.url;
      imgArray.push(newURL);
    }
    console.log(imgArray);

    // colArray.forEach(function() {
    //     for (let y = 0; y < 9; y++) {
    //         if (colArray[y] === 'A') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#A${yy}`).css('background-image', 'url(' + data[imgValZero].images.fixed_width_small.url + ')');
    //                 imgValZero++;
    //             };
    //         } else if (colArray[y] === 'B') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValZero].images.fixed_width_small.url + ')');
    //                 imgValZero++;
    //         };
    //         } else if (colArray[y] === 'C') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValZero].images.fixed_width_small.url + ')');
    //                 imgValZero++;
    //         };
    //         } else if (colArray[y] === 'D') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValThree].images.fixed_width_small.url + ')');
    //                 imgValThree++;
    //         };
    //         } else if (colArray[y] === 'E') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValFour].images.fixed_width_small.url + ')');
    //                 imgValFour++;
    //         };
    //         } else if (colArray[y] === 'F') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValZero].images.fixed_width_small.url + ')');
    //                 imgValZero++;
    //         };
    //         } else if (colArray[y] === 'G') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValOne].images.fixed_width_small.url + ')');
    //                 imgValOne++;
    //         };
    //         } else if (colArray[y] === 'H') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValTwo].images.fixed_width_small.url + ')');
    //                 imgValTwo++;
    //         };
    //         } else if (colArray[y] === 'I') {
    //             for (let yy = 0; yy < 9; yy++) {
    //                 $(`#B${yy}`).css('background-image', 'url(' + data[imgValThree].images.fixed_width_small.url + ')');
    //                 imgValThree++;
    //         };
    //         }
    //     };
    // });
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
                      $(`#A${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                } else if (x === 1) {
                    $(`#B${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#B${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                } else if (x === 2) {
                    $(`#C${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#C${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                    // $(`#C${y}`).css('background-image', 'url(' + imgArray[2] + ')');
                } else if (x === 3) {
                    $(`#D${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#D${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                    // $(`#D${y}`).css('background-image', 'url(' + imgArray[3] + ')');
                } else if (x === 4) {
                    $(`#E${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#E${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                    // $(`#E${y}`).css('background-image', 'url(' + imgArray[4] + ')');
                } else if (x === 5) {
                    $(`#F${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#F${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                    // $(`#F${y}`).css('background-image', 'url(' + imgArray[5] + ')');
                } else if (x === 6) {
                    $(`#G${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#G${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                    // $(`#G${y}`).css('background-image', 'url(' + imgArray[6] + ')');
                } else if (x === 7) {
                    $(`#H${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#H${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                    // $(`#H${y}`).css('background-image', 'url(' + imgArray[7] + ')');
                } else if (x === 8) {
                    $(`#I${y}`).html(col[y]);
                    if (col[y] === 0) {
                      $(`#I${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
                      imgIndex++;
                    }
                    // $(`#I${y}`).css('background-image', 'url(' + imgArray[8] + ')');
                }
            };
        };
    }
);


});
