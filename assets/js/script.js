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
  let arrayIDsNotToChange=[];
  let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  var interactiveMode = 0;
  let lastValidRestorePoints=[];
  let invalidEntriesMasterList=[];

  // function for getting giphy images URL and store it in an array
  function getPix(topic) {
    let giphyAPIkey = 'rrQWLPsJMZUYbQXyP8iY5m23dAYvfmKO';
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${giphyAPIkey}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) 
    {
      console.log(response);
      imgArray = [];
      for (i = 0; i < response.data.length; i++) 
      {
        let newURL = response.data[i].images.fixed_width_small.url;
        imgArray.push(newURL);
      }
    });
  };

  // function for getting initial solved squares and storing it in an array for solver
  function getGameBoard(mode) 
  {
    let queryURL = `https://sugoku.herokuapp.com/board?difficulty=${mode}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) 
    {
      if (mode === 'easy') 
      {
        easyBoard = [];
        easyBoard.push(response.board);
      }
      if (mode === 'medium') 
      {
        mediumBoard = [];
        mediumBoard.push(response.board);
      }
      if (mode === 'hard') 
      {
        hardBoard = [];
        hardBoard.push(response.board);
      };
    });
  };

  // function to render the board from array of numbers passed to
  function renderBoard(arr) {
    console.log(arr);
    var numbers1to9=[1,2,3,4,5,6,7,8,9];
    let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for (let x = 0; x < arr[0].length; x++) {
      let col = arr[0][x];
      for (let y = 0; y < 9; y++) {
        if (x === 0) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
              
            }
            
            // var subsubBox=$("<div>");
            // var h6Test=$("<h6>");
            // h6Test.html('LOL');
            // subsubBox.add(h6Test);
            // // $(`#${alphaArr[y]}${x}`).add(subsubBox);
            // $(`#${alphaArr[y]}${x}`).html('<div> <h1> LOL </h1> </div>');
            // debugger;
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        }
        else if (x === 1) {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
              
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        }
        else if (x === 2) 
        {
          $(`#${alphaArr[y]}${x}`).html(col[y]);
          if (!numbers1to9.includes(col[y])) {
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
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
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
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
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
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
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
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
            if (interactiveMode===0)
            {
              if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
              
            }
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
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
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
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
            if (interactiveMode===0)
            {
              $(`#${alphaArr[y]}${x}`).html('');
              $(`#${alphaArr[y]}${x}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
            }
            else
            {
              $(`#${alphaArr[y]}${x}`).html('');
              var thisHTML=$(`#${alphaArr[y]}${x}`).html();
              
            
              //Add div
              thisHTML=thisHTML+"<div> ";
              //  For loop add row div
              for (var im=0;im<3;im++)
              {
                //    For loop add col div
                thisHTML=thisHTML+`<div class="grid-x subrow${im}"> <div class="cell auto subrow${im}"></div> `;
                
                for (var imn=0;imn<3;imn++)
                {
                  console.log(col[y].toString());
                  console.log('For the subsubBox');
                  console.log((3*im+imn+1).toString());
                  // 
                  if (col[y].toString().includes((3*im+imn+1).toString()))
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;">${(3*im+imn+1).toString()}</p> </div> `;
                  }
                  else
                  {
                    thisHTML=thisHTML+`<div class="grid-y cell subSquare subsubbox${Math.floor(imn/3)} " id="${alphaArr[y]}${x}_${im}${imn}"> <p style="font-size: 0.1rem; margin-top:3rem; margin-bottom:3rem;"></p> </div> `;
                  }
                  //    Add ids and classes
                  //    Close col div
                }
                //  Close row div
                thisHTML=thisHTML+'<div class="cell auto"></div> </div>';
              }
              //Close div
              thisHTML=thisHTML+" </div>";
              $(`#${alphaArr[y]}${x}`).html(thisHTML);
              
            }
            imgIndex++;
            if (imgIndex > 49) {
              imgIndex = 0;
            }
          }
        // if (x === 0) {
        //   $(`#A${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#A${y}`).html('');
        //     $(`#A${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // }
        // } else if (x === 1) {
        //   $(`#B${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#B${y}`).html('');
        //     $(`#B${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // } else if (x === 2) {
        //   $(`#C${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#C${y}`).html('');
        //     $(`#C${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // } else if (x === 3) {
        //   $(`#D${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#D${y}`).html('');
        //     $(`#D${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // } else if (x === 4) {
        //   $(`#E${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#E${y}`).html('');
        //     $(`#E${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // } else if (x === 5) {
        //   $(`#F${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#F${y}`).html('');
        //     $(`#F${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // } else if (x === 6) {
        //   $(`#G${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#G${y}`).html('');
        //     $(`#G${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // } else if (x === 7) {
        //   $(`#H${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#H${y}`).html('');
        //     $(`#H${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // } else if (x === 8) {
        //   $(`#I${y}`).html(col[y]);
        //   if (!numbers1to9.includes(col[y])) {
        //     $(`#I${y}`).html('');
        //     $(`#I${y}`).css('background-image', 'url(' + imgArray[imgIndex] + ')');
        //     imgIndex++;
        //     if (imgIndex > 49) {
        //       imgIndex = 0;
        //     }
        //   }
        // }
      };
    };
  };
};

  function colorizeInvalidEntries(invalidEntriesIDEntries)
  {
    var getAllInvalid=document.getElementsByClassName('invalidEntry');
    // debugger;
    //Colorize invalid entries
    if (typeof(invalidEntriesIDEntries)==='object')
    {
      for (var i=0;i<invalidEntriesIDEntries.length;i++)
      {
        if (getAllInvalid.length>0)
        {
          if (!getAllInvalid.includes(invalidEntriesIDEntries[i]))
          {
            debugger;
            $(`#${invalidEntriesIDEntries[i]}`).addClass('invalidEntry');
          }
        }
        else
        {
          // debugger;
          $(`#${invalidEntriesIDEntries[i]}`).addClass('invalidEntry');
        }
          
      }

      if (getAllInvalid.length>0)
      {
        for (var i=0;i<getAllInvalid.length;i++)
        {
            if (!invalidEntriesIDEntries.includes(getAllInvalid[i]))
            {
              $(`#${getAllInvalid[i]}`).removeClass('invalidEntry');
            }
        }
      }
    }
    else
    {
      if (getAllInvalid.length>0)
      {
        if (!getAllInvalid.includes(invalidEntriesIDEntries))
        {
          // debugger;
          $(`#${invalidEntriesIDEntries}`).addClass('invalidEntry');
          
        }
      }
      else
      {
        // debugger;
        $(`#${invalidEntriesIDEntries}`).addClass('invalidEntry');
      }

      // if (getAllInvalid.length>0)
      // {
      //   if (getAllInvalid[i]!==invalidEntriesIDEntries.includes())
      //   {
      //     $(`#${getAllInvalid[i]}`).removeClass('invalidEntry');
      //   }
      // }

    }

    //Make sure valid entries that were previously invalid are not still marked as invalid
    
  };

  // function to get the value from the playing squared and add the value to the index
  function getState(currBoard, pressedID, valueToChange) {
    console.log(currBoard);
    localStorage.setItem("currentBoard", JSON.stringify(currBoard[0]));
    let currBoardExtract = currBoard[0];
    let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let split = pressedID.split("");
    let colValue = split[0];
    let colToBeChanged = alphaArr.indexOf(colValue);
    let rowToBeChanged = parseInt(split[1]);
    currBoardExtract[rowToBeChanged][colToBeChanged] = valueToChange;
  };

    // function to get the value from the playing squared and add the value to the index
    function getStateComparable(currBoard, pressedID, valueToChange) {
      console.log(currBoard);
      
      let currBoardExtract = currBoard[0];

      var sudokuBoardAllInitial = initializeAllOptions(currBoardExtract);
      var sBAFPResults=sBATrySolver(sudokuBoardAllInitial);
      var sudokuBoardAll=sBAFPResults[3];

      let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      let split = pressedID.split("");
      let colValue = split[0];
      let colToBeChanged = alphaArr.indexOf(colValue);
      let rowToBeChanged = parseInt(split[1]);

      let getValidEntryOptions = sudokuBoardAll[rowToBeChanged][colToBeChanged];
      let validEntryOptionsList=[];
      var valueToChangeIncludedValid=0;
      // let invalidEntry=[];
      var thisPermissibleString=getValidEntryOptions.toString();
      
      for (var i=0;i<thisPermissibleString.length;i++)
      {
        validEntryOptionsList.push(parseInt(thisPermissibleString[i]));
        if (parseInt(thisPermissibleString[i])===valueToChange)
        {
          valueToChangeIncludedValid=1;
        }
      }
      
      // lastValidRestorePoints.push(currBoardExtract);
      // debugger;
      if (valueToChangeIncludedValid===1)
      {
        currBoardExtract[rowToBeChanged][colToBeChanged] = valueToChange;
        var emptyReturn=[valueToChangeIncludedValid,[]];
        return emptyReturn;
      }
      else
      {
        // currBoardExtract[rowToBeChanged][colToBeChanged] = valueToChange;
        // alert('You have entered an invalid digit, please try again');
        modal.style.display = "block";
        if (interactiveMode===0)
        {

        }
        else
        {
          //Explain why
        }
        // invalidEntry.push(pressedID);
        // debugger;
        var emptyReturn=[valueToChangeIncludedValid,[]];
        return emptyReturn;
        // return [valueToChangeIncludedValid,[pressedID,validEntryOptionsList,valueToChange]];
      }

      
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

  function cleansudokuBoardForRendering(sudokuBoardAll)
  {
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
        }
        sudokuBoardAllForRender.push(tempoBArr);
      }


      var emptyForRender = [];
      emptyForRender.push(sudokuBoardAllForRender);

      // console.log('sudokuBoardAllForRender: ');
      // console.log(sudokuBoardAllForRender);
      // renderBoard(emptyForRender);
      return emptyForRender;
  }

  function solverState() {
    var thisBoard = currBoard[0];
    var numAttemptsSingleConfig = 0;
    var maxNumAttemptsSingleConfig = 2;
    var sBAFPResults = sBATrySolver(thisBoard); 
    var sudokuBoardAll = sBAFPResults[3];
    renderBoard(sudokuBoardAll);


    // while (testIsSolutionRevamped(thisBoard) === false && numAttemptsSingleConfig < maxNumAttemptsSingleConfig) 
    // {
    //   var oldBoard = [];
    //   for (var i = 0; i < 9; i++) {
    //     var tempoBArr = [];
    //     for (var j = 0; j < 9; j++) {
    //       // tempoBArr.push(thisBoard[i][j]);
    //     }
    //     oldBoard.push(tempoBArr);
    //   }

    //   var sBAFPResults = sBATrySolver(thisBoard);  
    //   // var rowSolved=sBAFPResults[0];
    //   // var colSolved=sBAFPResults[1];
    //   // var boxSolved=sBAFPResults[2];
    //   var sudokuBoardAll = sBAFPResults[3];

    //   var sudokuBoardAllForRender = [];
    //   for (var i = 0; i < 9; i++) {
    //     var tempoBArr = [];
    //     for (var j = 0; j < 9; j++) {
    //       if (sudokuBoardAll[i][j] <= 9) {
    //         tempoBArr.push(sudokuBoardAll[i][j]);
    //       }
    //       else {
    //         tempoBArr.push(0);
    //       }
    //       tempoBArr.push(sudokuBoardAll[i][j]);
    //     }
    //     sudokuBoardAllForRender.push(tempoBArr);
    //   }


    //   var emptyForRender = [];
    //   emptyForRender.push(sudokuBoardAllForRender);

    //   var AllTheSame = true;
    //   for (var i = 0; i < 9; i++) {
    //     for (var j = 0; j < 9; j++) {
    //       if (oldBoard[i][j] !== sudokuBoardAllForRender[i][j]) {
    //         AllTheSame = false;
    //       }
    //     }
    //   }

    //   renderBoard(emptyForRender);
    //   if (AllTheSame === true) {
    //     numAttemptsSingleConfig = numAttemptsSingleConfig + 1;
    //   }
    //   else {
    //     numAttemptsSingleConfig = 0;
    //     currBoard[0] = sudokuBoardAllForRender;
    //     // Update currBoard
    //   }
    // }
  };

  $(".square").click(function () {
    currSquare = $(this).attr('id');
    $(this).css('background-image', 'none');
    console.log(currSquare);
    // console.log(currSquare);
  });

  $(".fieldBtn").click(function () {
    if (!arrayIDsNotToChange.includes(currSquare))
    {
      $(`#${currSquare}`).html($(this).val());
      // getState(currBoard, currSquare, parseInt($(this).val()));
        var getStateChecked=getStateComparable(currBoard, currSquare, parseInt($(this).val()));
        var valueToChangeIncludedValid=getStateChecked[0];
        var IDValidInvalidInfo=getStateChecked[1];
        // var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
        // var sBAFPResults=sBATrySolver(sudokuBoardAllInitial);
        // var sudokuBoardAll=sBAFPResults[3];
        //renderBoard(cleansudokuBoardForRendering(sudokuBoardAll));

        if (interactiveMode===0)
        {
          renderBoard(currBoard);
        }
        else
        {
          var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
          var emptyArrForRenderII=[];
          emptyArrForRenderII.push(sudokuBoardAllInitial);
          renderBoard(emptyArrForRenderII);

        }
        
        // console.log(testIsSolutionTheSequel(currBoard[0]));
        // debugger;
        if (valueToChangeIncludedValid===1)
        {
          lastValidRestorePoints.push(currBoard);
        }
        else
        {
          invalidEntriesMasterList.push(IDValidInvalidInfo);
          colorizeInvalidEntries(IDValidInvalidInfo[0]);

        }
        
        // console.log(sudokuBoardAll);

      // var emptyArrForRender = [];
      // emptyArrForRender.push(sudokuBoardAll);
      // renderBoard(emptyArrForRender);
      // console.log(sudokuBoardAll);

    }
  });

  $('body').keypress(function (e) {
    let charCode = e.which;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('You must enter a number!');
    } else {
      $(`#${currSquare}`).html(e.key);
      getState(currBoard, currSquare, parseInt(e.key));
    }
  });

  $('.theme').on('click', function () {
    let currentTheme = $(this).attr('data-theme');
    console.log(currentTheme);
    if (currentTheme === "") {
      $('#option1').removeClass('hide');
      $('#option2').removeClass('hide');
    };
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
      var thisBoard=currBoard[0];

      for (var i=0;i<9;i++)
      {
        for (var j=0;j<9;j++)
        {
          if (thisBoard[i][j]!==0)
          {
            arrayIDsNotToChange.push(`${alphaArr[j]}${i}`);
          }
        }
      }
    }
    if (difficultySelected === 'medium') {
      currBoard.push(mediumBoard[0]);

      var thisBoard=currBoard[0];

      for (var i=0;i<9;i++)
      {
        for (var j=0;j<9;j++)
        {
          if (thisBoard[i][j]!==0)
          {
            arrayIDsNotToChange.push(`${alphaArr[j]}${i}`);
          }
        }
      }
    }
    if (difficultySelected === 'hard') {
      currBoard.push(hardBoard[0]);

      var thisBoard=currBoard[0];

      for (var i=0;i<9;i++)
      {
        for (var j=0;j<9;j++)
        {
          if (thisBoard[i][j]!==0)
          {
            arrayIDsNotToChange.push(`${alphaArr[j]}${i}`);
          }
        }
      }
    }
    setDifficulty = true;
    console.log(currBoard[0]);
    // renderBoard(currBoard);

    if (setTheme === true && setDifficulty === true) {
      $('#reset').removeClass('hide');
      $('#gameBoard').removeClass('hide');
  
      var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
      var sBAFPResults=sBATrySolver(sudokuBoardAllInitial);
      var sudokuBoardAll=sBAFPResults[3];
      // renderBoard(cleansudokuBoardForRendering(sudokuBoardAll));
      var emptyArrForRender=[];
      emptyArrForRender.push(sudokuBoardAll);
      // renderBoard(emptyArrForRender);
      // currBoard=emptyArrForRender;
      if (interactiveMode===0)
      {
        renderBoard(currBoard);
      }
      else
      {
        var emptyArrForRenderII=[];
        emptyArrForRenderII.push(sudokuBoardAllInitial);
        renderBoard(emptyArrForRenderII);
      }
      
      // console.log(testIsSolutionTheSequel(currBoard[0]));
      // debugger;
      lastValidRestorePoints.push(emptyArrForRender);
      // var sBAFPResults = sBATrySolver(sudokuBoardAll); 
      // var sudokuBoardAll = sBAFPResults[3];
      // console.log('sudokuBoardAll 3: '); 
      console.log(sudokuBoardAll);
      // testIsSolutionRevamped(currBoard[0]);
    }
    // if (setTheme === true && setDifficulty === true) {
    //   $('#reset').removeClass('hide');
    //   $('#gameBoard').removeClass('hide');
    //   // testIsSolutionRevamped(currBoard[0]);
    // }
  });

  // Mode button functionality
  $('.mode').on('click', function() {
    modeSelected = $(this).attr('data-mode');
    // console.log(modeSelected);
    if (modeSelected === 'interactive') {
      // run interactive mode
    } else {
      // run normal mode
    };
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
  });

  $("#checkBtn").on('click', function()
{
  // debugger;
  var checkThisBoard=testIsSolutionTheSequel(currBoard[0]);
  debugger;
    if (checkThisBoard===1)
    {
      $("#checkBtn").addClass('green');
    }
    else if (checkThisBoard===0)
    {
      $("#checkBtn").addClass('blue');
    }
    else
    {
      $("#checkBtn").addClass('red');
      // console.log(checkThisBoard);
    }
});

$("#hintBtn").on('click', function()
{
  var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
  sBATrySolverForHint(sudokuBoardAllInitial);
  if ($("#interactiveDiv").hasClass('hide'))
  {
    $("#interactiveDiv").removeClass('hide');
    $('#stepsH4').removeClass('hide');
  }
  // renderBoard(cleansudokuBoardForRendering(sudokuBoardAll));
});

$("#interactiveBtn").on('click', function()
{
  interactiveMode=1;
  var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
  // var sBAFPResults=sBATrySolver(sudokuBoardAllInitial);
  // var sudokuBoardAll=sBAFPResults[3];
  // renderBoard(cleansudokuBoardForRendering(sudokuBoardAll));
  var emptyArrForRenderII=[];
  emptyArrForRenderII.push(sudokuBoardAllInitial);
  renderBoard(emptyArrForRenderII);
  $("#interactiveDiv").removeClass('hide');
  $('#stepsH4').removeClass('hide');
});

$("#normalBtn").on('click', function()
{
  interactiveMode=0;
  renderBoard(currBoard);
  // var sudokuBoardAllInitial = initializeAllOptions(currBoard[0]);
  // sBATrySolverForHint(sudokuBoardAllInitial);
  // renderBoard(cleansudokuBoardForRendering(sudokuBoardAll));
});

//Modal constructed using https://www.w3schools.com/howto/howto_css_modals.asp

// Get the modal
var modal = document.getElementById("invalidDigitModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


  
  initialState();
  
});