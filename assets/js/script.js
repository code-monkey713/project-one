// A $( document ).ready() block.
$(document).ready(function() {
    console.log("document ready!");

const colArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

// AJAX "Get" from GIPHY API and displaying on HTML page
let queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=rrQWLPsJMZUYbQXyP8iY5m23dAYvfmKO";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    const data = response.data;
    //const img = $('<img>').attr('src', data[i].images.fixed_width_small.url);
    const img = $('<img>').attr('src', data[1].images.fixed_width_small.url);
    colArray.forEach(function() {
        for (let y = 0; y < 9; y++) {
            if (colArray[y] === 'A') {
                $(`#A${y}`).css('background-image', 'url(' + data[0].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'B') {
                $(`#B${y}`).css('background-image', 'url(' + data[1].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'C') {
                $(`#C${y}`).css('background-image', 'url(' + data[2].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'D') {
                $(`#D${y}`).css('background-image', 'url(' + data[3].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'E') {
                $(`#E${y}`).css('background-image', 'url(' + data[4].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'F') {
                $(`#F${y}`).css('background-image', 'url(' + data[5].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'G') {
                $(`#G${y}`).css('background-image', 'url(' + data[6].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'H') {
                $(`#H${y}`).css('background-image', 'url(' + data[7].images.fixed_width_small.url + ')');
            } else if (colArray[y] === 'I') {
                $(`#I${y}`).css('background-image', 'url(' + data[8].images.fixed_width_small.url + ')');
            }
        };
    });
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
                } else if (x === 1) {
                    $(`#B${y}`).html(col[y]);
                } else if (x === 2) {
                    $(`#C${y}`).html(col[y]);
                } else if (x === 3) {
                    $(`#D${y}`).html(col[y]);
                } else if (x === 4) {
                    $(`#E${y}`).html(col[y]);
                } else if (x === 5) {
                    $(`#F${y}`).html(col[y]);
                } else if (x === 6) {
                    $(`#G${y}`).html(col[y]);
                } else if (x === 7) {
                    $(`#H${y}`).html(col[y]);
                } else if (x === 8) {
                    $(`#I${y}`).html(col[y]);
                }
            };
        };
    }
);


});
