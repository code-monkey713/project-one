// This file solves a sudoku array and returns the solved sudoku array (or, arrays)

function initializeAllOptions(sudokuBoard) {
  var sudokuBoardAll = [];
  for (var i = 0; i < 9; i++) {
    var thiszFillArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    sudokuBoardAll.push(thiszFillArr);
  }

  // Order 3x3 boxes by most filled values
  var BoxFilledPos = [];
  for (var i = 0; i < 9; i++) {
    var subBox = [];
    var boxUsedValues = [];
    var numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var correspondingRows = [3 * (Math.floor(i / 3)), 1 + 3 * (Math.floor(i / 3)), 2 + 3 * (Math.floor(i / 3))];
    var correspondingCols = [3 * (i - 3 * Math.floor((i) / 3)), 1 + 3 * (i - 3 * Math.floor((i) / 3)), 2 + 3 * (i - 3 * Math.floor((i) / 3))];
    for (var j = 3 * (Math.floor(i / 3)); j < 3 + 3 * (Math.floor(i / 3)); j++) {
      var tempsBArr = [];
      for (var k = 3 * (i - 3 * Math.floor((i) / 3)); k < 3 + 3 * (i - 3 * Math.floor(i / 3)); k++) {
        if (sudokuBoard[j][k] !== 0) {
          tempsBArr.push(sudokuBoard[j][k]);
          BoxFilledPos = BoxFilledPos + 1;
          boxUsedValues.push(sudokuBoard[j][k]);
        }
        else {
          tempsBArr.push(0);
        }
      }
      subBox.push(tempsBArr);
    }
    var numsLeftToPick = setdiff(numbers1to9, boxUsedValues);
    var subBoxCopy = [];
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 3; k++) {
        var tempsBArrII = [];
        if (subBox[j][k] == 0) {
          sudokuBoardAll[correspondingRows[j]][correspondingCols[k]] = parseInt(intersect(intersect(setdiff(numbers1to9, sudokuBoard[correspondingRows[j]]), setdiff(numbers1to9, getCol(sudokuBoard, correspondingCols[k]))), numsLeftToPick).join(""));
        }
        else {
          sudokuBoardAll[correspondingRows[j]][correspondingCols[k]] = subBox[j][k];
        }
      }
    }
  }
  return sudokuBoardAll;
}

function sBATrySolver(sudokuBoardAll) {
  var numLoops = 0;
  var numLoopsWithoutChange = 0;
  var maxAllowedNumLoopsWithoutChange = 10;
  var rowSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var colSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var boxSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var currentMax = 100;
  var numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var maxLoopsExceeded = 0;
  let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  while (currentMax > 9 && maxLoopsExceeded !== 1) {
    var sudokuBoardAllOld = [];
    for (var i = 0; i < 9; i++) {
      sudokuBoardAllOld.push(sudokuBoardAll[i]);
    }
    // Row-Wise Simplification
    for (var i = 0; i < 9; i++) {
      var RowTakens = setdiff(numbers1to9, setdiff(numbers1to9, sudokuBoardAll[i]));
      var found2Values = [];
      var indicesGreaterThan9 = [];
      for (var j = 0; j < 9; j++) {
        if (sudokuBoardAll[i][j] > 9) {
          indicesGreaterThan9.push(j);
          if (sudokuBoardAll[i][j] < 100) {
            found2Values.push(j);
          }
        }
      }
      var found2ValuesRemoveFromPermissiveIndices = [];
      var found2ValuesTable = [];
      var found2ValuesTableVals = [];
      var found2ValuesTableValsCount = [];
      if (found2Values !== undefined) {
        for (var j = 0; j < found2Values.length; j++) {
          if (!found2ValuesTableVals.includes(sudokuBoardAll[i][found2Values[j]])) {
            found2ValuesTable.push([sudokuBoardAll[i][found2Values[j]], sudokuBoardAll[i].filter(element => element === sudokuBoardAll[i][found2Values[j]]).length]);
            found2ValuesTableVals.push(sudokuBoardAll[i][found2Values[j]]);
            found2ValuesTableValsCount.push(sudokuBoardAll[i].filter(element => element === sudokuBoardAll[i][found2Values[j]]).length);
          }
        }
        var found2ValuesTable2PresentFind = [];
        var found2ValuesTable2PresentVals = [];
        var found2ValuesTable2PresentValsCount = [];
        for (var j = 0; j < found2ValuesTableValsCount.length; j++) {
          if (found2ValuesTableValsCount[j] === 2) {
            found2ValuesTable2PresentFind.push(j);
            found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
            found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
          }
        }
        if (found2ValuesTable2PresentVals !== undefined) {
          for (var f2vi = 0; f2vi < found2ValuesTable2PresentVals.length; f2vi++) {
            var thisPermissiveString = found2ValuesTable2PresentVals.toString();
            RowTakens.push(parseInt(thisPermissiveString[0])); RowTakens.push(parseInt(thisPermissiveString[1]));
            for (var j = 0; j < 9; j++) {
              if (sudokuBoardAll[i][j] === found2ValuesTable2PresentVals[f2vi]) {
                found2ValuesRemoveFromPermissiveIndices.push(j);
              }
            }
            var tempDiv = $("<div>");
            tempDiv.addClass("card-section");
            var tempP = $("<p>");
            tempP.text(`Remove ${parseInt(thisPermissiveString[0])} and ${parseInt(thisPermissiveString[1])} from all entries in row ${i} except ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length - 2]]}${i} and ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length - 1]]}${i}`);
            tempDiv.append(tempP);
          }
        }
      }
      var RowPermissiveIndices = setdiff(indicesGreaterThan9, found2ValuesRemoveFromPermissiveIndices);
      var individualNumberAppearances = [];
      for (var j = 0; j < RowPermissiveIndices.length; j++) {
        individualNumberAppearances.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
      for (var iNA = 0; iNA < RowPermissiveIndices.length; iNA++) {
        var thisPermissiveString = sudokuBoardAll[i][RowPermissiveIndices[iNA]].toString();
        for (var iNAk = 0; iNAk < thisPermissiveString.length; iNAk++) {
          individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] = individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] + 1;
        }
      }
      var individualNumberAppearancesSum = [];
      var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues = [];
      for (var lmo = 0; lmo < 9; lmo++) {
        individualNumberAppearancesSum[lmo] = sumArray(getCol(individualNumberAppearances, lmo));
        if (individualNumberAppearancesSum[lmo] === 1) {
          individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues.push(lmo + 1);
        }
      }
      var individualNumberAppearancesSumOnlyAppearedOnce = setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues, RowTakens);
      if (individualNumberAppearancesSumOnlyAppearedOnce !== undefined) {
        var RPIToRemove = [];
        for (var iNASOAO = 0; iNASOAO < individualNumberAppearancesSumOnlyAppearedOnce.length; iNASOAO++) {
          var ensureAppearOnlyOnceNotIn2Vals = found2ValuesTable2PresentVals.join('');
          if (found2ValuesTable2PresentVals !== undefined) {
            if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString()) === -1) {
              RowTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
              RPIToRemove.push(RowPermissiveIndices[getCol(individualNumberAppearances, individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO] - 1).findIndex(element => element === 1)]);
              sudokuBoardAll[i][RPIToRemove[RPIToRemove.length - 1]] = individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
              var tempDiv = $("<div>");
              tempDiv.addClass("card-section");
              var tempP = $("<p>");
              tempP.text(`Since ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]} only appears once in this row, entry ${alphaArr[RPIToRemove[RPIToRemove.length - 1]]}${i} must be ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]}.`);
              tempDiv.append(tempP);
            }
          }
        }
        RowPermissiveIndices = setdiff(RowPermissiveIndices, RPIToRemove);
      }
      for (var j = 0; j < RowPermissiveIndices.length; j++) {
        var tempStr = "";
        var thisPermissiveString = sudokuBoardAll[i][RowPermissiveIndices[j]].toString();
        for (var k = 0; k < thisPermissiveString.length; k++) {
          if (!RowTakens.includes(parseInt(thisPermissiveString[k]))) {
            tempStr = tempStr + thisPermissiveString[k];
          }
        }
        sudokuBoardAll[i][RowPermissiveIndices[j]] = parseInt(tempStr);
      }
      var tempRow = [];
      for (var m = 0; m < 9; m++) {
        tempRow.push(sudokuBoardAll[i][m]);
      }
      if (setdiff(numbers1to9, tempRow).length === 0 && tempRow.sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        rowSolved[i] = 1;
      }
    }

    // Column-Wise Simplification
    for (var i = 0; i < 9; i++) {
      var ColTakens = setdiff(numbers1to9, setdiff(numbers1to9, getCol(sudokuBoardAll, i)));
      var found2Values = [];
      var indicesGreaterThan9 = [];
      for (var j = 0; j < 9; j++) {
        if (sudokuBoardAll[j][i] > 9) {
          indicesGreaterThan9.push(j);
          if (sudokuBoardAll[j][i] < 100) {
            found2Values.push(j);
          }
        }
      }
      var found2ValuesRemoveFromPermissiveIndices = [];
      var found2ValuesTable = [];
      var found2ValuesTableVals = [];
      var found2ValuesTableValsCount = [];
      if (found2Values !== undefined) {
        for (var j = 0; j < found2Values.length; j++) {
          if (!found2ValuesTableVals.includes(sudokuBoardAll[found2Values[j]][i])) {
            found2ValuesTable.push([sudokuBoardAll[found2Values[j]][i], getCol(sudokuBoardAll, i).filter(element => element === sudokuBoardAll[found2Values[j]][i]).length]);
            found2ValuesTableVals.push(sudokuBoardAll[found2Values[j]][i]);
            found2ValuesTableValsCount.push(getCol(sudokuBoardAll, i).filter(element => element === sudokuBoardAll[found2Values[j]][i]).length);
          }
        }
        var found2ValuesTable2PresentFind = [];
        var found2ValuesTable2PresentVals = [];
        var found2ValuesTable2PresentValsCount = [];
        for (var j = 0; j < found2ValuesTableValsCount.length; j++) {
          if (found2ValuesTableValsCount[j] === 2) {
            found2ValuesTable2PresentFind.push(j);
            found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
            found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
          }
        }
        if (found2ValuesTable2PresentVals !== undefined) {
          for (var f2vi = 0; f2vi < found2ValuesTable2PresentVals.length; f2vi++) {
            var thisPermissiveString = found2ValuesTable2PresentVals.toString();
            ColTakens.push(parseInt(thisPermissiveString[0])); ColTakens.push(parseInt(thisPermissiveString[1]));
            for (var j = 0; j < 9; j++) {
              if (sudokuBoardAll[j][i] === found2ValuesTable2PresentVals[f2vi]) {
                found2ValuesRemoveFromPermissiveIndices.push(j);
              }
            }
          }
        }
      }
      var ColPermissiveIndices = setdiff(indicesGreaterThan9, found2ValuesRemoveFromPermissiveIndices);

      // If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
      var individualNumberAppearances = [];
      for (var j = 0; j < ColPermissiveIndices.length; j++) {
        individualNumberAppearances.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
      for (var iNA = 0; iNA < ColPermissiveIndices.length; iNA++) {
        var thisPermissiveString = sudokuBoardAll[ColPermissiveIndices[iNA]][i].toString();
        for (var iNAk = 0; iNAk < thisPermissiveString.length; iNAk++) {
          individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] = individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] + 1;
        }
      }
      var individualNumberAppearancesSum = [];
      var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues = [];
      for (var lmo = 0; lmo < 9; lmo++) {
        individualNumberAppearancesSum[lmo] = sumArray(getCol(individualNumberAppearances, lmo));
        if (individualNumberAppearancesSum[lmo] == 1) {
          individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues.push(lmo + 1);
        }
      }
      var individualNumberAppearancesSumOnlyAppearedOnce = setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues, ColTakens);
      if (individualNumberAppearancesSumOnlyAppearedOnce !== undefined) {
        var CPIToRemove = [];
        for (var iNASOAO = 0; iNASOAO < individualNumberAppearancesSumOnlyAppearedOnce.length; iNASOAO++) {
          var ensureAppearOnlyOnceNotIn2Vals = found2ValuesTable2PresentVals.join('');
          if (found2ValuesTable2PresentVals !== undefined) {
            if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString()) === -1) {
              ColTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
              CPIToRemove.push(ColPermissiveIndices[getCol(individualNumberAppearances, individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO] - 1).findIndex(element => element === 1)]);
              sudokuBoardAll[CPIToRemove[CPIToRemove.length - 1]][i] = individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
            }
          }
        }
        ColPermissiveIndices = setdiff(ColPermissiveIndices, CPIToRemove);
      }

      for (var j = 0; j < ColPermissiveIndices.length; j++) {
        var tempStr = "";
        var getColi = getCol(sudokuBoardAll, i);
        var thisPermissiveString = getColi[ColPermissiveIndices[j]].toString();
        for (var k = 0; k < thisPermissiveString.length; k++) {
          if (!ColTakens.includes(parseInt(thisPermissiveString[k]))) {
            tempStr = tempStr + thisPermissiveString[k];
          }
        }
        sudokuBoardAll[ColPermissiveIndices[j]][i] = parseInt(tempStr);
      }

      var tempCol = [];
      for (var m = 0; m < 9; m++) {
        tempRow.push(sudokuBoardAll[m][i]);
      }
      if (setdiff(numbers1to9, tempCol).length === 0 && tempCol.sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        colSolved[i] = 1;
      }
    }

    // Box-Wise Simplification
    for (var i = 0; i < 9; i++) {
      var subBox = [];
      for (var j = 3 * (Math.floor(i / 3)); j < 3 + 3 * (Math.floor(i / 3)); j++) {
        var tempsBArr = [];
        for (var k = 3 * (i - 3 * Math.floor((i) / 3)); k < 3 + 3 * (i - 3 * Math.floor(i / 3)); k++) {
          if (sudokuBoardAll[j][k] !== 0) {
            tempsBArr.push(sudokuBoardAll[j][k]);
          }
          else {
            tempsBArr.push(0);
          }
        }
        subBox.push(tempsBArr);
      }

      var BoxTakens = setdiff(numbers1to9, setdiff(numbers1to9, subBoxToArray(subBox)));
      var found2Values = [];
      var indicesGreaterThan9 = [];
      for (var j = 0; j < 9; j++) {
        if (getSubBoxLinearIndexValue(subBox, j) > 9) {
          indicesGreaterThan9.push(j);
          if (getSubBoxLinearIndexValue(subBox, j) < 100) {
            found2Values.push(j);
          }
        }
      }

      var found2ValuesRemoveFromPermissiveIndices = [];
      var found2ValuesTable = [];
      var found2ValuesTableVals = [];
      var found2ValuesTableValsCount = [];
      if (found2Values !== undefined) {
        for (var j = 0; j < found2Values.length; j++) {
          if (!found2ValuesTableVals.includes(getSubBoxLinearIndexValue(subBox, found2Values[j]))) {
            found2ValuesTable.push([getSubBoxLinearIndexValue(subBox, found2Values[j]), subBoxToArray(subBox).filter(element => element === getSubBoxLinearIndexValue(subBox, found2Values[j])).length]);
            found2ValuesTableVals.push(getSubBoxLinearIndexValue(subBox, found2Values[j]));
            found2ValuesTableValsCount.push(subBoxToArray(subBox).filter(element => element === getSubBoxLinearIndexValue(subBox, found2Values[j])).length);
          }
        }
        var found2ValuesTable2PresentFind = [];
        var found2ValuesTable2PresentVals = [];
        var found2ValuesTable2PresentValsCount = [];
        for (var j = 0; j < found2ValuesTableValsCount.length; j++) {
          if (found2ValuesTableValsCount[j] === 2) {
            found2ValuesTable2PresentFind.push(j);
            found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
            found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
          }
        }

        if (found2ValuesTable2PresentVals !== undefined) {
          for (var f2vi = 0; f2vi < found2ValuesTable2PresentVals.length; f2vi++) {
            var thisPermissiveString = found2ValuesTable2PresentVals.toString();
            BoxTakens.push(parseInt(thisPermissiveString[0])); BoxTakens.push(parseInt(thisPermissiveString[1]));
            for (var j = 0; j < 9; j++) {
              if (getSubBoxLinearIndexValue(subBox, j) === found2ValuesTable2PresentVals[f2vi]) {
                found2ValuesRemoveFromPermissiveIndices.push(j);
              }
            }
          }
        }
      }
      var BoxPermissiveIndices = setdiff(indicesGreaterThan9, found2ValuesRemoveFromPermissiveIndices);

      // If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
      var individualNumberAppearances = [];
      for (var j = 0; j < BoxPermissiveIndices.length; j++) {
        individualNumberAppearances.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
      for (var iNA = 0; iNA < BoxPermissiveIndices.length; iNA++) {
        var thisPermissiveString = getSubBoxLinearIndexValue(subBox, BoxPermissiveIndices[iNA]).toString();
        for (var iNAk = 0; iNAk < thisPermissiveString.length; iNAk++) {
          individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] = individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] + 1;
        }
      }
      var individualNumberAppearancesSum = [];
      var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues = [];
      for (var lmo = 0; lmo < 9; lmo++) {
        individualNumberAppearancesSum[lmo] = sumArray(getCol(individualNumberAppearances, lmo));
        if (individualNumberAppearancesSum[lmo] == 1) {
          individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues.push(lmo + 1);
        }
      }

      var individualNumberAppearancesSumOnlyAppearedOnce = setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues, BoxTakens);
      if (individualNumberAppearancesSumOnlyAppearedOnce !== undefined) {
        var BPIToRemove = [];
        for (var iNASOAO = 0; iNASOAO < individualNumberAppearancesSumOnlyAppearedOnce.length; iNASOAO++) {
          var ensureAppearOnlyOnceNotIn2Vals = found2ValuesTable2PresentVals.join('');
          if (found2ValuesTable2PresentVals !== undefined) {
            if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString()) === -1) {
              BoxTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
              BPIToRemove.push(BoxPermissiveIndices[getCol(individualNumberAppearances, individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO] - 1).findIndex(element => element === 1)]);
              subBox = assignLinearIndexSubBoxValue(subBox, BPIToRemove[BPIToRemove.length - 1], individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
            }
          }
        }
        BoxPermissiveIndices = setdiff(BoxPermissiveIndices, BPIToRemove);
      }

      for (var j = 0; j < BoxPermissiveIndices.length; j++) {
        var tempStr = "";
        var thisPermissiveString = getSubBoxLinearIndexValue(subBox, BoxPermissiveIndices[j]).toString();
        for (var k = 0; k < thisPermissiveString.length; k++) {
          if (!BoxTakens.includes(parseInt(thisPermissiveString[k]))) {
            tempStr = tempStr + thisPermissiveString[k];
          }
        }
        subBox = assignLinearIndexSubBoxValue(subBox, BoxPermissiveIndices[j], parseInt(tempStr));
      }
      if (setdiff(numbers1to9, subBoxToArray(subBox)) === undefined && subBoxToArray(subBox).sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        boxSolved[i] = 1;
      }
    }

    currentMax = 0;
    for (var i = 0; i < 9; i++) {
      currentMax = Math.max(currentMax, Math.max(...sudokuBoardAll[i]));
    }

    // Check if no change
    var noChange = 1;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudokuBoardAllOld[i][j] !== sudokuBoardAll[i][j]) {
          noChange = 0;
        }
      }
    }

    // If no change add to loops without change
    if (noChange === 1) {
      numLoopsWithoutChange = numLoopsWithoutChange + 1;
    }
    else {
      numLoopsWithoutChange = 0;
    }

    if (numLoopsWithoutChange > maxAllowedNumLoopsWithoutChange) {
      maxLoopsExceeded = 1;
    }
    numLoops = numLoops + 1;
  }
  return [rowSolved, colSolved, boxSolved, sudokuBoardAll];
}

function sBATrySolverForHint(sudokuBoardAll) {
  var numLoops = 0;
  var numLoopsWithoutChange = 0;
  var maxAllowedNumLoopsWithoutChange = 10;
  var rowSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var colSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var boxSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var currentMax = 100;
  var numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var maxLoopsExceeded = 0;
  let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  try {
    while (currentMax > 9 && maxLoopsExceeded !== 1) {
      var sudokuBoardAllOld = [];
      for (var i = 0; i < 9; i++) {
        sudokuBoardAllOld.push(sudokuBoardAll[i]);
      }

      //Row-Wise Simplification
      for (var i = 0; i < 9; i++) {
        var RowTakens = setdiff(numbers1to9, setdiff(numbers1to9, sudokuBoardAll[i]));
        var found2Values = [];
        var indicesGreaterThan9 = [];
        for (var j = 0; j < 9; j++) {
          if (sudokuBoardAll[i][j] > 9) {
            indicesGreaterThan9.push(j);
            if (sudokuBoardAll[i][j] < 100) {
              found2Values.push(j);
            }
          }
        }
        var found2ValuesRemoveFromPermissiveIndices = [];
        var found2ValuesTable = [];
        var found2ValuesTableVals = [];
        var found2ValuesTableValsCount = [];
        if (found2Values !== undefined) {
          for (var j = 0; j < found2Values.length; j++) {
            if (!found2ValuesTableVals.includes(sudokuBoardAll[i][found2Values[j]])) {
              found2ValuesTable.push([sudokuBoardAll[i][found2Values[j]], sudokuBoardAll[i].filter(element => element === sudokuBoardAll[i][found2Values[j]]).length]);
              found2ValuesTableVals.push(sudokuBoardAll[i][found2Values[j]]);
              found2ValuesTableValsCount.push(sudokuBoardAll[i].filter(element => element === sudokuBoardAll[i][found2Values[j]]).length);
            }
          }
          var found2ValuesTable2PresentFind = [];
          var found2ValuesTable2PresentVals = [];
          var found2ValuesTable2PresentValsCount = [];
          for (var j = 0; j < found2ValuesTableValsCount.length; j++) {
            if (found2ValuesTableValsCount[j] === 2) {
              found2ValuesTable2PresentFind.push(j);
              found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
              found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
            }
          }

          if (found2ValuesTable2PresentVals !== undefined) {
            for (var f2vi = 0; f2vi < found2ValuesTable2PresentVals.length; f2vi++) {
              var thisPermissiveString = found2ValuesTable2PresentVals.toString();
              RowTakens.push(parseInt(thisPermissiveString[0])); RowTakens.push(parseInt(thisPermissiveString[1]));
              for (var j = 0; j < 9; j++) {
                if (sudokuBoardAll[i][j] === found2ValuesTable2PresentVals[f2vi]) {
                  found2ValuesRemoveFromPermissiveIndices.push(j);
                }
              }
              console.log(`Remove ${parseInt(thisPermissiveString[0])} and ${parseInt(thisPermissiveString[1])} from all entries in row ${i} except ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length - 2]]}${i} and ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length - 1]]}${i}`);
              var tempDiv = $("<div>");
              tempDiv.addClass("card-section");
              var tempP = $("<p>");
              tempP.text(`Remove ${parseInt(thisPermissiveString[0])} and ${parseInt(thisPermissiveString[1])} from all entries in row ${i} except ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length - 2]]}${i} and ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length - 1]]}${i}`);
              tempDiv.append(tempP);
              $('#interactiveDivCard').append(tempDiv);
              i = j = 100; maxLoopsExceeded = 1;
              break;
            }
          }
        }
        var RowPermissiveIndices = setdiff(indicesGreaterThan9, found2ValuesRemoveFromPermissiveIndices);

        // If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
        var individualNumberAppearances = [];
        for (var j = 0; j < RowPermissiveIndices.length; j++) {
          individualNumberAppearances.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        for (var iNA = 0; iNA < RowPermissiveIndices.length; iNA++) {
          var thisPermissiveString = sudokuBoardAll[i][RowPermissiveIndices[iNA]].toString();
          for (var iNAk = 0; iNAk < thisPermissiveString.length; iNAk++) {
            individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] = individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] + 1;
          }
        }
        var individualNumberAppearancesSum = [];
        var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues = [];
        for (var lmo = 0; lmo < 9; lmo++) {
          individualNumberAppearancesSum[lmo] = sumArray(getCol(individualNumberAppearances, lmo));
          if (individualNumberAppearancesSum[lmo] === 1) {
            individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues.push(lmo + 1);
          }
        }
        var individualNumberAppearancesSumOnlyAppearedOnce = setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues, RowTakens);
        if (individualNumberAppearancesSumOnlyAppearedOnce !== undefined) {
          var RPIToRemove = [];
          for (var iNASOAO = 0; iNASOAO < individualNumberAppearancesSumOnlyAppearedOnce.length; iNASOAO++) {
            var ensureAppearOnlyOnceNotIn2Vals = found2ValuesTable2PresentVals.join('');
            if (found2ValuesTable2PresentVals !== undefined) {
              if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString()) === -1) {
                RowTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
                RPIToRemove.push(RowPermissiveIndices[getCol(individualNumberAppearances, individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO] - 1).findIndex(element => element === 1)]);
                sudokuBoardAll[i][RPIToRemove[RPIToRemove.length - 1]] = individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
                console.log(`Since ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]} only appears once in this row, entry ${alphaArr[RPIToRemove[RPIToRemove.length - 1]]}${i} must be ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]}.`);
                var tempDiv = $("<div>");
                tempDiv.addClass("card-section");
                var tempP = $("<p>");
                tempP.text(`Since ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]} only appears once in this row, entry ${alphaArr[RPIToRemove[RPIToRemove.length - 1]]}${i} must be ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]}.`);
                tempDiv.append(tempP);
                $('#interactiveDivCard').append(tempDiv);
                i = j = 100; maxLoopsExceeded = 1;
                break;
              }
            }
          }
          RowPermissiveIndices = setdiff(RowPermissiveIndices, RPIToRemove);
        }

        for (var j = 0; j < RowPermissiveIndices.length; j++) {
          var tempStr = "";
          var thisPermissiveString = sudokuBoardAll[i][RowPermissiveIndices[j]].toString();
          for (var k = 0; k < thisPermissiveString.length; k++) {
            if (!RowTakens.includes(parseInt(thisPermissiveString[k]))) {
              tempStr = tempStr + thisPermissiveString[k];
            }
          }
          sudokuBoardAll[i][RowPermissiveIndices[j]] = parseInt(tempStr);
        }

        var tempRow = [];
        for (var m = 0; m < 9; m++) {
          tempRow.push(sudokuBoardAll[i][m]);
        }
        if (setdiff(numbers1to9, tempRow).length === 0 && tempRow.sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
          rowSolved[i] = 1;
        }
      }

      for (var i = 0; i < 9; i++) {

        var ColTakens = setdiff(numbers1to9, setdiff(numbers1to9, getCol(sudokuBoardAll, i)));
        // console.log(ColTakens);
        //Remove from possibles in each Col
        //  If only two 2-values in the column, remove both values from other
        //  locations in column
        var found2Values = [];
        var indicesGreaterThan9 = [];
        for (var j = 0; j < 9; j++) {
          if (sudokuBoardAll[j][i] > 9) {
            indicesGreaterThan9.push(j);
            if (sudokuBoardAll[j][i] < 100) {
              found2Values.push(j);
            }
          }
        }
        var found2ValuesRemoveFromPermissiveIndices = [];
        var found2ValuesTable = [];
        var found2ValuesTableVals = [];
        var found2ValuesTableValsCount = [];
        if (found2Values !== undefined) {
          for (var j = 0; j < found2Values.length; j++) {
            if (!found2ValuesTableVals.includes(sudokuBoardAll[found2Values[j]][i])) {
              found2ValuesTable.push([sudokuBoardAll[found2Values[j]][i], getCol(sudokuBoardAll, i).filter(element => element === sudokuBoardAll[found2Values[j]][i]).length]);
              found2ValuesTableVals.push(sudokuBoardAll[found2Values[j]][i]);
              found2ValuesTableValsCount.push(getCol(sudokuBoardAll, i).filter(element => element === sudokuBoardAll[found2Values[j]][i]).length);
            }
          }

          var found2ValuesTable2PresentFind = [];
          var found2ValuesTable2PresentVals = [];
          var found2ValuesTable2PresentValsCount = [];
          for (var j = 0; j < found2ValuesTableValsCount.length; j++) {
            if (found2ValuesTableValsCount[j] === 2) {
              found2ValuesTable2PresentFind.push(j);
              found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
              found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
            }
          }

          if (found2ValuesTable2PresentVals !== undefined) {
            for (var f2vi = 0; f2vi < found2ValuesTable2PresentVals.length; f2vi++) {
              var thisPermissiveString = found2ValuesTable2PresentVals.toString();
              ColTakens.push(parseInt(thisPermissiveString[0])); ColTakens.push(parseInt(thisPermissiveString[1]));
              for (var j = 0; j < 9; j++) {
                if (sudokuBoardAll[j][i] === found2ValuesTable2PresentVals[f2vi]) {
                  found2ValuesRemoveFromPermissiveIndices.push(j);
                }
              }
            }
          }
        }

        var ColPermissiveIndices = setdiff(indicesGreaterThan9, found2ValuesRemoveFromPermissiveIndices);

        // If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
        var individualNumberAppearances = [];
        for (var j = 0; j < ColPermissiveIndices.length; j++) {
          individualNumberAppearances.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        for (var iNA = 0; iNA < ColPermissiveIndices.length; iNA++) {
          var thisPermissiveString = sudokuBoardAll[ColPermissiveIndices[iNA]][i].toString();
          for (var iNAk = 0; iNAk < thisPermissiveString.length; iNAk++) {
            individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] = individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] + 1;
          }
        }

        var individualNumberAppearancesSum = [];
        var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues = [];
        for (var lmo = 0; lmo < 9; lmo++) {
          individualNumberAppearancesSum[lmo] = sumArray(getCol(individualNumberAppearances, lmo));
          if (individualNumberAppearancesSum[lmo] == 1) {
            individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues.push(lmo + 1);
          }
        }

        var individualNumberAppearancesSumOnlyAppearedOnce = setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues, ColTakens);
        if (individualNumberAppearancesSumOnlyAppearedOnce !== undefined) {
          var CPIToRemove = [];
          for (var iNASOAO = 0; iNASOAO < individualNumberAppearancesSumOnlyAppearedOnce.length; iNASOAO++) {
            var ensureAppearOnlyOnceNotIn2Vals = found2ValuesTable2PresentVals.join('');
            if (found2ValuesTable2PresentVals !== undefined) {
              if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString()) === -1) {
                ColTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
                CPIToRemove.push(ColPermissiveIndices[getCol(individualNumberAppearances, individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO] - 1).findIndex(element => element === 1)]);
                sudokuBoardAll[CPIToRemove[CPIToRemove.length - 1]][i] = individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
              }
            }
          }
          ColPermissiveIndices = setdiff(ColPermissiveIndices, CPIToRemove);
        }

        for (var j = 0; j < ColPermissiveIndices.length; j++) {
          var tempStr = "";
          var getColi = getCol(sudokuBoardAll, i);
          var thisPermissiveString = getColi[ColPermissiveIndices[j]].toString();
          for (var k = 0; k < thisPermissiveString.length; k++) {
            if (!ColTakens.includes(parseInt(thisPermissiveString[k]))) {
              tempStr = tempStr + thisPermissiveString[k];
            }
          }
          sudokuBoardAll[ColPermissiveIndices[j]][i] = parseInt(tempStr);
        }

        var tempCol = [];
        for (var m = 0; m < 9; m++) {
          tempRow.push(sudokuBoardAll[m][i]);
        }
        if (setdiff(numbers1to9, tempCol).length === 0 && tempCol.sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
          colSolved[i] = 1;
        }
      }

      //Box-Wise Simplification
      for (var i = 0; i < 9; i++) {
        var subBox = [];
        for (var j = 3 * (Math.floor(i / 3)); j < 3 + 3 * (Math.floor(i / 3)); j++) {
          var tempsBArr = [];
          for (var k = 3 * (i - 3 * Math.floor((i) / 3)); k < 3 + 3 * (i - 3 * Math.floor(i / 3)); k++) {
            if (sudokuBoardAll[j][k] !== 0) {
              tempsBArr.push(sudokuBoardAll[j][k]);
            }
            else {
              tempsBArr.push(0);
            }
          }
          subBox.push(tempsBArr);
        }

        var BoxTakens = setdiff(numbers1to9, setdiff(numbers1to9, subBoxToArray(subBox)));
        var found2Values = [];
        var indicesGreaterThan9 = [];
        for (var j = 0; j < 9; j++) {
          if (getSubBoxLinearIndexValue(subBox, j) > 9) {
            indicesGreaterThan9.push(j);
            if (getSubBoxLinearIndexValue(subBox, j) < 100) {
              found2Values.push(j);
            }
          }
        }

        var found2ValuesRemoveFromPermissiveIndices = [];
        var found2ValuesTable = [];
        var found2ValuesTableVals = [];
        var found2ValuesTableValsCount = [];
        if (found2Values !== undefined) {
          for (var j = 0; j < found2Values.length; j++) {
            if (!found2ValuesTableVals.includes(getSubBoxLinearIndexValue(subBox, found2Values[j]))) {
              found2ValuesTable.push([getSubBoxLinearIndexValue(subBox, found2Values[j]), subBoxToArray(subBox).filter(element => element === getSubBoxLinearIndexValue(subBox, found2Values[j])).length]);
              found2ValuesTableVals.push(getSubBoxLinearIndexValue(subBox, found2Values[j]));
              found2ValuesTableValsCount.push(subBoxToArray(subBox).filter(element => element === getSubBoxLinearIndexValue(subBox, found2Values[j])).length);
            }
          }

          var found2ValuesTable2PresentFind = [];
          var found2ValuesTable2PresentVals = [];
          var found2ValuesTable2PresentValsCount = [];
          for (var j = 0; j < found2ValuesTableValsCount.length; j++) {
            if (found2ValuesTableValsCount[j] === 2) {
              found2ValuesTable2PresentFind.push(j);
              found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
              found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
            }
          }
          if (found2ValuesTable2PresentVals !== undefined) {
            for (var f2vi = 0; f2vi < found2ValuesTable2PresentVals.length; f2vi++) {
              var thisPermissiveString = found2ValuesTable2PresentVals.toString();
              BoxTakens.push(parseInt(thisPermissiveString[0])); BoxTakens.push(parseInt(thisPermissiveString[1]));
              for (var j = 0; j < 9; j++) {
                if (getSubBoxLinearIndexValue(subBox, j) === found2ValuesTable2PresentVals[f2vi]) {
                  found2ValuesRemoveFromPermissiveIndices.push(j);
                }
              }
            }
          }
        }
        var BoxPermissiveIndices = setdiff(indicesGreaterThan9, found2ValuesRemoveFromPermissiveIndices);

        // If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
        var individualNumberAppearances = [];
        for (var j = 0; j < BoxPermissiveIndices.length; j++) {
          individualNumberAppearances.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        for (var iNA = 0; iNA < BoxPermissiveIndices.length; iNA++) {
          var thisPermissiveString = getSubBoxLinearIndexValue(subBox, BoxPermissiveIndices[iNA]).toString();
          for (var iNAk = 0; iNAk < thisPermissiveString.length; iNAk++) {
            individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] = individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk]) - 1] + 1;
          }
        }

        var individualNumberAppearancesSum = [];
        var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues = [];
        for (var lmo = 0; lmo < 9; lmo++) {
          individualNumberAppearancesSum[lmo] = sumArray(getCol(individualNumberAppearances, lmo));
          if (individualNumberAppearancesSum[lmo] == 1) {
            individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues.push(lmo + 1);
          }
        }

        var individualNumberAppearancesSumOnlyAppearedOnce = setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues, BoxTakens);
        if (individualNumberAppearancesSumOnlyAppearedOnce !== undefined) {
          var BPIToRemove = [];
          for (var iNASOAO = 0; iNASOAO < individualNumberAppearancesSumOnlyAppearedOnce.length; iNASOAO++) {
            var ensureAppearOnlyOnceNotIn2Vals = found2ValuesTable2PresentVals.join('');
            if (found2ValuesTable2PresentVals !== undefined) {
              if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString()) === -1) {
                BoxTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
                BPIToRemove.push(BoxPermissiveIndices[getCol(individualNumberAppearances, individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO] - 1).findIndex(element => element === 1)]);
                subBox = assignLinearIndexSubBoxValue(subBox, BPIToRemove[BPIToRemove.length - 1], individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
              }
            }
          }
          BoxPermissiveIndices = setdiff(BoxPermissiveIndices, BPIToRemove);
        }

        for (var j = 0; j < BoxPermissiveIndices.length; j++) {
          var tempStr = "";
          var thisPermissiveString = getSubBoxLinearIndexValue(subBox, BoxPermissiveIndices[j]).toString();
          for (var k = 0; k < thisPermissiveString.length; k++) {
            if (!BoxTakens.includes(parseInt(thisPermissiveString[k]))) {
              tempStr = tempStr + thisPermissiveString[k];
            }
          }
          subBox = assignLinearIndexSubBoxValue(subBox, BoxPermissiveIndices[j], parseInt(tempStr));
        }
        if (setdiff(numbers1to9, subBoxToArray(subBox)) === undefined && subBoxToArray(subBox).sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
          boxSolved[i] = 1;
        }
      }

      currentMax = 0;
      for (var i = 0; i < 9; i++) {
        currentMax = Math.max(currentMax, Math.max(...sudokuBoardAll[i]));
      }

      // Check if no change
      var noChange = 1;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (sudokuBoardAllOld[i][j] !== sudokuBoardAll[i][j]) {
            noChange = 0;
          }
        }
      }

      // If noChange add to loops without change
      if (noChange === 1) {
        numLoopsWithoutChange = numLoopsWithoutChange + 1;
      }
      else {
        numLoopsWithoutChange = 0;
      }

      if (numLoopsWithoutChange > maxAllowedNumLoopsWithoutChange) {
        maxLoopsExceeded = 1;
      }
      numLoops = numLoops + 1;
    }
  }
  catch {
  }
  return [rowSolved, colSolved, boxSolved, sudokuBoardAll];
}

function testIsSolution(rowSolved, colSolved, boxSolved, sudokuBoardAll) {
  // Computes and returns the boolean variable boardSolved
  var maxsudokuBoardAll = 0;
  var boardSolved = 0;
  var numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 0; i < 9; i++) {
    maxsudokuBoardAll = Math.max(maxsudokuBoardAll, Math.max(...sudokuBoardAll[i]));
  }
  if (maxsudokuBoardAll === 9) {
    var allRise = 1;
    for (var i = 0; i < 9; i++) {
      if (setdiff(numbers1to9, sudokuBoardAll[i]) === undefined && sudokuBoardAll[i].sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        rowSolved[i] = 1;
      }
      else {
        allRise = 0;
      }

      //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
      if (setdiff(numbers1to9, getCol(sudokuBoardAll, i)) === undefined && getCol(sudokuBoardAll, i).sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        colSolved[i] = 1;
      }
      else {
        allRise = 0;
      }

      var subBox = [];
      for (var j = 3 * (Math.floor(i / 3)); j < 3 + 3 * (Math.floor(i / 3)); j++) {
        var tempsBArr = [];
        for (var k = 3 * (i - 3 * Math.floor((i) / 3)); k < 3 + 3 * (i - 3 * Math.floor(i / 3)); k++) {
          if (sudokuBoardAll[j][k] !== 0) {
            tempsBArr.push(sudokuBoardAll[j][k]);
          }
          else {
            tempsBArr.push(0);
          }
        }
        subBox.push(tempsBArr);
      }

      //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
      if (setdiff(numbers1to9, subBox) === undefined && subBoxToArray(subBox).sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        boxSolved[i] = 1;
      }
      else {
        allRise = 0;
      }
    }
    if (allRise === 1) {
      boardSolved = 1;
    }
    else {
      boardSolved = 0;
    }
  }
  else {
    boardSolved = 0;
  }
  return boardSolved;
}

function testIsSolutionTheSequel(sudokuBoardAll) {
  var numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  var rowCounts = [];
  var colCounts = [];
  var subBoxCounts = [];
  var rowSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var colSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var boxSolved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var maxsudokuBoardAll = 0;
  for (var i = 0; i < 9; i++) {
    rowCounts.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    colCounts.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    subBoxCounts.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  var maxOccurrencesInRCsBUnit = 0;

  for (var i = 0; i < 9; i++) {
    var rowI = sudokuBoardAll[i];
    for (var j = 0; j < 9; j++) {
      if (rowI[j] <= 9 && rowI[j] > 0) {
        rowCounts[i][parseInt(rowI[j]) - 1] = rowCounts[i][parseInt(rowI[j]) - 1] + 1;
        maxOccurrencesInRCsBUnit = Math.max(maxOccurrencesInRCsBUnit, rowCounts[i][parseInt(rowI[j]) - 1]);
      }
    }
    var colI = getCol(sudokuBoardAll, i);
    for (var j = 0; j < 9; j++) {
      if (colI[j] <= 9 && colI[j] > 0) {
        colCounts[i][parseInt(colI[j]) - 1] = colCounts[i][parseInt(colI[j]) - 1] + 1;
        maxOccurrencesInRCsBUnit = Math.max(maxOccurrencesInRCsBUnit, colCounts[i][parseInt(colI[j]) - 1]);
      }
    }
    var subBoxI = [];
    var numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var correspondingRows = [3 * (Math.floor(i / 3)), 1 + 3 * (Math.floor(i / 3)), 2 + 3 * (Math.floor(i / 3))];
    var correspondingCols = [3 * (i - 3 * Math.floor((i) / 3)), 1 + 3 * (i - 3 * Math.floor((i) / 3)), 2 + 3 * (i - 3 * Math.floor((i) / 3))];
    for (var j = 3 * (Math.floor(i / 3)); j < 3 + 3 * (Math.floor(i / 3)); j++) {
      var tempsBArr = [];
      for (var k = 3 * (i - 3 * Math.floor((i) / 3)); k < 3 + 3 * (i - 3 * Math.floor(i / 3)); k++) {
        if (sudokuBoardAll[j][k] !== 0 && sudokuBoardAll[j][k] <= 9) {
          tempsBArr.push(sudokuBoardAll[j][k]);
          subBoxCounts[i][parseInt(sudokuBoardAll[j][k]) - 1] = subBoxCounts[i][parseInt(sudokuBoardAll[j][k]) - 1] + 1;
          maxOccurrencesInRCsBUnit = Math.max(maxOccurrencesInRCsBUnit, subBoxCounts[i][parseInt(sudokuBoardAll[j][k]) - 1]);
        }
        else {
          tempsBArr.push(0);
        }
      }
      subBoxI.push(tempsBArr);
    }
  }


  // Check if all rowSolved, colSolved,subBoxSolved
  for (var i = 0; i < 9; i++) {
    maxsudokuBoardAll = Math.max(maxsudokuBoardAll, Math.max(...sudokuBoardAll[i]));
  }

  if (maxsudokuBoardAll === 9) {
    var allRise = 1;
    for (var i = 0; i < 9; i++) {
      var rowI = [];
      for (var j = 0; j < 9; j++) {
        rowI.push(sudokuBoardAll[i][j]);
      }
      if ((setdiff(numbers1to9, rowI) === undefined || setdiff(numbers1to9, rowI).length === 0) && rowI.sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        rowSolved[i] = 1;
      }
      else {
        allRise = 0;
      }

      var colI = [];
      for (var j = 0; j < 9; j++) {
        colI.push(sudokuBoardAll[j][i]);
      }
      if ((setdiff(numbers1to9, colI) === undefined || setdiff(numbers1to9, colI).length === 0) && colI.sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        colSolved[i] = 1;
      }
      else {
        allRise = 0;
      }

      var subBox = [];
      for (var j = 3 * (Math.floor(i / 3)); j < 3 + 3 * (Math.floor(i / 3)); j++) {
        var tempsBArr = [];
        for (var k = 3 * (i - 3 * Math.floor((i) / 3)); k < 3 + 3 * (i - 3 * Math.floor(i / 3)); k++) {
          if (sudokuBoardAll[j][k] !== 0) {
            tempsBArr.push(sudokuBoardAll[j][k]);
          }
          else {
            tempsBArr.push(0);
          }
        }
        subBox.push(tempsBArr);
      }

      //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
      if ((setdiff(numbers1to9, subBoxToArray(subBox)) === undefined || setdiff(numbers1to9, subBoxToArray(subBox)).length === 0) && subBoxToArray(subBox).sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        boxSolved[i] = 1;
      }
      else {
        allRise = 0;
      }
    }
    if (maxOccurrencesInRCsBUnit > 1) {
      return -1;
    }
    if (allRise === 1) {
      boardSolved = 1;
      return boardSolved;
    }
    else {
      boardSolved = 0;
      return boardSolved;
    }
  }
  else {
    boardSolved = 0;
    return boardSolved;
  }
  var duplicateEntry = [];
}

function testIsSolutionRevamped(sudokuBoardAll) {
  //Computes and returns the boolean variable boardSolved
  //If each row is solved, and each column is solved, and each subBox is solved, then the board is solved!
  var maxsudokuBoardAll = 0;
  var boardSolved = false;
  var numbers1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 0; i < 9; i++) {
    try {
      maxsudokuBoardAll = Math.max(maxsudokuBoardAll, Math.max(...sudokuBoardAll[i]));
    }
    catch
    {
    }
  }

  if (maxsudokuBoardAll === 9) {
    var allRise = 1;
    for (var i = 0; i < 9; i++) {
      if ((setdiff(numbers1to9, sudokuBoardAll[i]) === undefined || setdiff(numbers1to9, sudokuBoardAll[i]).length === 0) && sudokuBoardAll[i].sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        rowSolved[i] = 1;
      }
      else {
        allRise = 0;
      }
      if ((setdiff(numbers1to9, getCol(sudokuBoardAll, i)) === undefined || setdiff(numbers1to9, getCol(sudokuBoardAll, i)).length === 0) && getCol(sudokuBoardAll, i).sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        colSolved[i] = 1;
      }
      else {
        allRise = 0;
      }

      var subBox = [];
      for (var j = 3 * (Math.floor(i / 3)); j < 3 + 3 * (Math.floor(i / 3)); j++) {
        var tempsBArr = [];
        for (var k = 3 * (i - 3 * Math.floor((i) / 3)); k < 3 + 3 * (i - 3 * Math.floor(i / 3)); k++) {
          if (sudokuBoardAll[j][k] !== 0) {
            tempsBArr.push(sudokuBoardAll[j][k]);
          }
          else {
            tempsBArr.push(0);
          }
        }
        subBox.push(tempsBArr);
      }

      // JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
      if ((setdiff(numbers1to9, subBoxToArray(subBox)) === undefined || setdiff(numbers1to9, subBoxToArray(subBox)).length === 0) && subBoxToArray(subBox).sort(compareNumbers).toString() == numbers1to9.sort(compareNumbers).toString()) {
        boxSolved[i] = 1;
      }
      else {
        allRise = 0;
      }
    }
    if (allRise === 1) {
      boardSolved = true;
    }
    else {
      boardSolved = false;
    }
  }
  else {
    boardSolved = false;
  }
  return boardSolved;
}

function hailMaryUnsolvedBoards(boardSolved, sudokuBoardAll) {
  //Computes and returns three variables
  //storeBoards - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to an initially unsolved configuration of the initial input baord
  //storeBoardsSolvedMaybe - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to either a solved or unsolved configuration of the initial input baord, corresponding to the second-pass solver applied to the corresponding entry in storeBoards
  //storeBoardsSolvedVars - An Object containing potentially multiple nested vectors, with the terminal node on each branch corresponding to a boolean, indicating whether the corresponding entry of storeBoardsSolvedMaybe is solved (the terminal node has a value of 1), or unsolved (the terminal node has a value of 0)

  var storeBoards = [];
  var storeBoardsSolvedMaybe = [];
  var storeBoardsSolvedVars = [];
  if (boardSolved === 0) {
    var nlr = [];
    var nlc = [];
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudokuBoardAll[i][j] > 9) {
          nlr.push(i);
          nlc.push(j);
        }
      }
    }

    var selectPosToDecideIndex = Math.floor(nlr.length * Math.rand());
    var thisPermissiveString = sudokuBoardAll[nlr[selectPosToDecideIndex]][nlc[selectPosToDecideIndex]].toString();
    for (var k = 0; k < thisPermissiveString.length; k++) {
      var thisSudokuBoardAllCopy = [];
      for (var m = 0; m < 9; m++) {
        var tempsBAC = [];
        for (var n = 0; n < 9; n++) {
          tempsBAC.push(sudokuBoardAll[m][n]);
        }
        thisSudokuBoardAllCopy.push(tempsBAC);
      }
      [rowSolved, colSolved, boxSolved, thisSudokuBoardAllCopyII] = sBATrySolver(thisSudokuBoardAllCopy);
      thisSudokuBoardAllCopy = thisSudokuBoardAllCopyII;
      boardSolvedII = testIsSolution(rowSolved, colSolved, boxSolved, thisSudokuBoardAllCopy);

      var maxsudokuBoardAllCopy = 0;
      for (var i = 0; i < 9; i++) {
        maxsudokuBoardAllCopy = Math.max(maxsudokuBoardAllCopy, Math.max(...maxsudokuBoardAllCopy[i]));
      }
      if (boardSolvedII === 1) {
        storeBoards.push(thisSudokuBoardAllCopy);
        storeBoardsSolvedMaybe.push(thisSudokuBoardAllCopy);
        storeBoardsSolvedVars.push(boardSolvedII);
      }
      else if (boardSolvedII === 0 && maxsudokuBoardAllCopy === 9) {
        storeBoards.push(thisSudokuBoardAllCopy);
        storeBoardsSolvedMaybe.push(thisSudokuBoardAllCopy);
        storeBoardsSolvedVars.push(boardSolvedII);
      }
      else {
        [storeBoardsII, storeBoardsSolvedMaybeII, storeBoardsSolvedVarsII] = hailMaryUnsolvedBoards(boardSolvedII, thisSudokuBoardAllCopy);
        storeBoards.push(storeBoardsII);
        storeBoardsSolvedMaybe.push(storeBoardsSolvedMaybeII);
        storeBoardsSolvedVars.push(storeBoardsSolvedVarsII);
      }
    }
  }
  else {
    storeBoards.push(sudokuBoardAll);
    storeBoardsSolvedMaybe.push(sudokuBoardAll);
    storeBoardsSolvedMaybe.push(boardSolved);
  }
  return storeBoards, storeBoardsSolvedMaybe, storeBoardsSolvedVars;
}

// function to compare arrays if value is present on one and not the other
function setdiff(a, b) {
  var c = [];
  for (var i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) {
      c.push(a[i]);
    }
  }
  return c;
}

function intersect(a, b) {
  var c = [];
  for (var i = 0; i < b.length; i++) {
    if (a.includes(b[i])) {
      c.push(b[i]);
    }
  }
  return c;
}

function getCol(a, colToGet) {
  var colGot = [];
  for (var i = 0; i < a.length; i++) {
    colGot.push(a[i][colToGet]);
  }
  return colGot;
}

function sumArray(array) {
  var summed = 0;
  for (var i = 0; i < array.length; i++) {
    summed = summed + array[i];
  }
  return summed;
}

function compareNumbers(a, b) {
  return a - b;
}

function subBoxToArray(subBox) {
  var subBoxArray = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      subBoxArray.push(subBox[j][i]);
    }
  }
  return subBoxArray;
}

function getSubBoxLinearIndexValue(subBox, linearIndex) {
  return subBox[Math.floor(linearIndex / 3)][linearIndex - 3 * Math.floor(linearIndex / 3)];
}

function assignLinearIndexSubBoxValue(subBox, linearIndex, sBValue) {
  var subBoxCopy = [];
  var targetI = Math.floor(linearIndex / 3);
  var targetJ = linearIndex - 3 * Math.floor(linearIndex / 3);
  for (var i = 0; i < 3; i++) {
    var tempsBArr = [];
    for (var j = 0; j < 3; j++) {
      if (i === targetI && j === targetJ) {
        tempsBArr.push(sBValue);
      }
      else {
        tempsBArr.push(subBox[i][j]);
      }
    }
    subBoxCopy.push(tempsBArr);
  }
  return subBoxCopy;
}