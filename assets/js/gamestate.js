// This file solves a sudoku array and returns the solved sudoku array (or, arrays)
// Note: Due to the author's familiarity with MATLAB, the algorithms herein were first computed there and will be translated into JavScript in the coming days

function initializeAllOptions (sudokuBoard)
{
    //Initializes an array that fully captures all possible options for the initial configuration of the Sudoku board

    return sudokuBoardAll;
}

function sBATrySolver (sudokuBoardAll)
{
    //Computes and returns four variables 
    //rowSolved - A vector with a boolean for each row describing whether the row contains only the integers from 1-9, once each
    //colSolved - A vector with a boolean for each column describing whether the column contains only the integers from 1-9, once each
    //boxSolved - A vector with a boolean for each subBox describing whether the subBox contains only the integers from 1-9, once each. subBoxes are counted in row-major order (e.g. down then right)
    //sudokuBoardAll - An array of integers (that may have entries greater than 9), holding the remaining possible configurations after trying the first-pass solver on the initial (input) sudokuBoardAll
    
    return rowSolved,colSolved,boxSolved,sudokuBoardAll;
}

function testIsSolution(rowSolved,colSolved,boxSolved,sudokuBoardAll)
{
    //Computes and returns the boolean variable boardSolved
    //If each row is solved, and each column is solved, and each subBox is solved, then the board is solved!
    //Otherwise, board not solved. :(

    return boardSolved;
}

function hailMaryUnsolvedBoards(boardSolved,sudokuBoardAll)
{
    //Computes and returns three variables
    //storeBoards - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to an initially unsolved configuration of the initial input baord
    //storeBoardsSolvedMaybe - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to either a solved or unsolved configuration of the initial input baord, corresponding to the second-pass solver applied to the corresponding entry in storeBoards
    //storeBoardsSolvedVars - An Object containing potentially multiple nested vectors, with the terminal node on each branch corresponding to a boolean, indicating whether the corresponding entry of storeBoardsSolvedMaybe is solved (the terminal node has a value of 1), or unsolved (the terminal node has a value of 0)

    return storeBoards,storeBoardsSolvedMaybe,storeBoardsSolvedVars;
}