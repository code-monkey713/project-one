// This file solves a sudoku array and returns the solved sudoku array (or, arrays)
// Note: Due to the author's familiarity with MATLAB, the algorithms herein were first computed there and will be translated into JavScript in the coming days

function initializeAllOptions (sudokuBoard)
  {
    //Initializes an array that fully captures all possible options for the initial configuration of the Sudoku board from the input sudokuBoard array
    var sudokuBoardAll = [];
    for (var i=0;i<9;i++)
    {
      var thiszFillArr=[0,0,0,0,0,0,0,0,0];
      sudokuBoardAll.push(thiszFillArr);
    }

    //Order 3x3 boxes by most filled values
    var BoxFilledPos=[];

    // console.log('Works so far');
    for (var i=0;i<9;i++)
    {
        //Get subBox i from sudokuBoard
        var subBox=[];
        var boxUsedValues=[];
        var numbers1to9=[1,2,3,4,5,6,7,8,9];
        var correspondingRows=[3*(Math.floor(i/3)), 1+3*(Math.floor(i/3)), 2+3*(Math.floor(i/3))];
        // console.log(correspondingRows);
        var correspondingCols=[3*(i-3*Math.floor((i)/3)), 1+3*(i-3*Math.floor((i)/3)), 2+3*(i-3*Math.floor((i)/3))];
        // console.log(correspondingCols);
        for (var j=3*(Math.floor(i/3)); j<3+3*(Math.floor(i/3));j++)
        {
            var tempsBArr=[];
            for (var k=3*(i-3*Math.floor((i)/3));k<3+3*(i-3*Math.floor(i/3));k++)
            {
                if (sudokuBoard[j][k]!==0)
                {
                    tempsBArr.push(sudokuBoard[j][k]);
                    BoxFilledPos=BoxFilledPos+1;
                    boxUsedValues.push(sudokuBoard[j][k]);
                }
                else
                {
                  tempsBArr.push(0);
                }
            
            
            }
            subBox.push(tempsBArr);
        }
      // console.log(subBox);
      
      // console.log(subBox.filter(entry => entry >0));
    
      var numsLeftToPick=setdiff(numbers1to9,boxUsedValues);
      // console.log(numsLeftToPick);
      
      // posOptions=arrayfun(@(c) intersect(intersect(setdiff(1:9,sudokuBoard(correspondingRows(1)-1+nlr(c),:)),setdiff(1:9,sudokuBoard(:,correspondingCols(1)-1+nlc(c)))),numsLeftToPick),1:length(numsLeftToPick),'UniformOutput',false);
      var subBoxCopy=[];
      // console.log(subBox);
      
      for (var j=0;j<3;j++)
      {
        // console.log(j);
        for (var k=0;k<3;k++)
        {
          // debugger;
          // console.log(k);
          var tempsBArrII=[];
          if (subBox[j][k]==0)
          {
            // console.log('e');
            // if (i===7)
            // {
            // console.log(boxUsedValues);
            // console.log('Allowed Row Values: ');
            // console.log(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]));
            // console.log('Allowed Column Values: ');
            // console.log(setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k])));
            // console.log('Allowed subBox Values: ');
            // console.log(numsLeftToPick);
            // }
            
            // console.log(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick));
            //1 console.log(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick).toString());
            //1 
            // subBox[j][k]=parseInt(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick).toString());
            // console.log(subBox[j][k]);
            // sudokuBoardAll[correspondingRows[j]][correspondingCols[k]]=parseInt(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick).toString());
            sudokuBoardAll[correspondingRows[j]][correspondingCols[k]]=parseInt(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick).join(""));
            // console.log(parseInt(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick).toString()));
            // tempsBArrII.push(parseInt(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick).toString()));
            // console.log(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick));
            // console.log(intersect(intersect(setdiff(numbers1to9,subBox[j]),setdiff(numbers1to9,getCol(subBox,k))),numsLeftToPick));
          }
          else
          {
            sudokuBoardAll[correspondingRows[j]][correspondingCols[k]]=subBox[j][k];
            // tempsBArrII.push(subBox[j][k]);
          }
          
          
          // subBoxCopy[j][k]=
        }
        
        // sudokuBoardAll.push(tempsBArrII);
      }
      // console.log('sudokuBoardAll: ')
      // console.log(sudokuBoardAll);
      // console.log(subBox);  
      // console.log(sudokuBoardAll);
      // debugger;
    }
    // debugger;

    // console.log(sudokuBoardAll);

    return sudokuBoardAll;
  }

  function sBATrySolver (sudokuBoardAll)
  {
      //Computes and returns four variables 
      //rowSolved - A vector with a boolean for each row describing whether the row contains only the integers from 1-9, once each
      //colSolved - A vector with a boolean for each column describing whether the column contains only the integers from 1-9, once each
      //boxSolved - A vector with a boolean for each subBox describing whether the subBox contains only the integers from 1-9, once each. subBoxes are counted in row-major order (e.g. right then down)
      //sudokuBoardAll - An array of integers (that may have entries greater than 9), holding the remaining possible configurations after trying the first-pass solver on the initial (input) sudokuBoardAll
      
      var numLoops=0;
      var numLoopsWithoutChange=0;
      var maxAllowedNumLoopsWithoutChange=10;
      var rowSolved=[0,0,0,0,0,0,0,0,0];
      var colSolved=[0,0,0,0,0,0,0,0,0];
      var boxSolved=[0,0,0,0,0,0,0,0,0];
      var currentMax=100;
      var numbers1to9=[1,2,3,4,5,6,7,8,9];
      var maxLoopsExceeded=0;
      let alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      while (currentMax>9 && maxLoopsExceeded!==1)
      {
        var sudokuBoardAllOld=[];
        for (var i=0;i<9;i++)
        {
          sudokuBoardAllOld.push(sudokuBoardAll[i]);
        }

        //Row-Wise Simplification
        for (var i=0;i<9;i++)
        {
          console.log(i);
          console.log(`Original Row ${i}: `);
          console.log(sudokuBoardAll[i]);
          var RowTakens=setdiff(numbers1to9,setdiff(numbers1to9,sudokuBoardAll[i]));
          // console.log(RowTakens);
          //Remove from possibles in each Row
          //  If only two 2-values in the rpw, remove both values from other
          //  locations in row
          var found2Values=[];
          var indicesGreaterThan9=[];
          for (var j=0;j<9;j++)
          {
            // console.log(sudokuBoardAll[i][j]);
            if (sudokuBoardAll[i][j]>9)
            {

              indicesGreaterThan9.push(j);
              if (sudokuBoardAll[i][j]<100)
              {
                found2Values.push(j);
              }
            }
          }
          // console.log('found2Values: ');
          // console.log(found2Values);
          // debugger;
          // console.log(found2Values);
          // console.log(sudokuBoardAll[i].find(element => element>9 & element<100));
          var found2ValuesRemoveFromPermissiveIndices=[];
          var found2ValuesTable=[];
          var found2ValuesTableVals=[];
          var found2ValuesTableValsCount=[];
          if (found2Values!==undefined)
          {
            // console.log('b');
            // console.log(found2Values);
            // console.log(found2Values.length);
            for (var j=0;j<found2Values.length;j++)
            {
              if (!found2ValuesTableVals.includes(sudokuBoardAll[i][found2Values[j]]))
              {
                // console.log(j); 
                // console.log(sudokuBoardAll[i][found2Values[j]]);  
                // console.log(sudokuBoardAll[i].filter(element => element===sudokuBoardAll[i][found2Values[j]]).length);
                found2ValuesTable.push([sudokuBoardAll[i][found2Values[j]],sudokuBoardAll[i].filter(element => element===sudokuBoardAll[i][found2Values[j]]).length]);
                found2ValuesTableVals.push(sudokuBoardAll[i][found2Values[j]]);
                found2ValuesTableValsCount.push(sudokuBoardAll[i].filter(element => element===sudokuBoardAll[i][found2Values[j]]).length);
              }
              
            }
            // console.log(found2ValuesTable);
            // console.log('e');
            var found2ValuesTable2PresentFind=[];
            var found2ValuesTable2PresentVals=[];
            var found2ValuesTable2PresentValsCount=[];
            for (var j=0;j<found2ValuesTableValsCount.length;j++)
            {
              if (found2ValuesTableValsCount[j]===2)
              {
                found2ValuesTable2PresentFind.push(j);
                found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
                found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
              }
              
            }
            // console.log('found2ValuesTable2PresentFind: ');
            // console.log(found2ValuesTable2PresentFind);


            if (found2ValuesTable2PresentVals!==undefined)
            {
              for (var f2vi=0;f2vi<found2ValuesTable2PresentVals.length;f2vi++)
              {
                var thisPermissiveString=found2ValuesTable2PresentVals.toString();
                // console.log('thisPermissiveString: ')
                // console.log(thisPermissiveString);
                RowTakens.push(parseInt(thisPermissiveString[0])); RowTakens.push(parseInt(thisPermissiveString[1])); 
                for (var j=0; j<9;j++)
                {
                  if(sudokuBoardAll[i][j]===found2ValuesTable2PresentVals[f2vi])
                  {
                    found2ValuesRemoveFromPermissiveIndices.push(j);
                  }
                }
                console.log(`Remove ${parseInt(thisPermissiveString[0])} and ${parseInt(thisPermissiveString[1])} from all entries in row ${i} except ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length-2]]}${i} and ${alphaArr[found2ValuesRemoveFromPermissiveIndices[found2ValuesRemoveFromPermissiveIndices.length-1]]}${i}`);
                // debugger;
                // found2ValuesRemoveFromPermissiveIndices.push(sudokuBoardAll[i].findIndex(element => element===found2ValuesTable2PresentVals[f2vi]));
              }
            }
            
            
          }
          
          // debugger;
          // console.log(found2ValuesRemoveFromPermissiveIndices);
          var RowPermissiveIndices=setdiff(indicesGreaterThan9,found2ValuesRemoveFromPermissiveIndices);

          //If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
          var individualNumberAppearances=[];
          for (var j=0;j<RowPermissiveIndices.length;j++)
          {
            individualNumberAppearances.push([0,0,0,0,0,0,0,0,0]);
          }
          for (var iNA=0;iNA<RowPermissiveIndices.length;iNA++)
          {
            // console.log(sudokuBoardAll[i][RowPermissiveIndices[iNA]].toString());
            var thisPermissiveString=sudokuBoardAll[i][RowPermissiveIndices[iNA]].toString();
            for (var iNAk=0;iNAk<thisPermissiveString.length;iNAk++)
            {
              individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])-1]=individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])-1]+1;
              
            }
          }
          // console.log(individualNumberAppearances);
          var individualNumberAppearancesSum=[];
          var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues=[];
          for (var lmo=0;lmo<9;lmo++)
          {
            individualNumberAppearancesSum[lmo]=sumArray(getCol(individualNumberAppearances,lmo));
            if (individualNumberAppearancesSum[lmo]===1)
            {
              individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues.push(lmo+1);
            }
            
          }
          // console.log(individualNumberAppearancesSum);
          // console.log(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues);
          var individualNumberAppearancesSumOnlyAppearedOnce=setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues,RowTakens);
          // console.log(individualNumberAppearancesSumOnlyAppearedOnce);
          if (individualNumberAppearancesSumOnlyAppearedOnce!==undefined)
          {
            var RPIToRemove=[];
            for (var iNASOAO=0;iNASOAO<individualNumberAppearancesSumOnlyAppearedOnce.length;iNASOAO++)
            {
              var ensureAppearOnlyOnceNotIn2Vals=found2ValuesTable2PresentVals.join('');
              // console.log(found2ValuesTable2PresentVals);
              // console.log(ensureAppearOnlyOnceNotIn2Vals);
              if (found2ValuesTable2PresentVals!==undefined)
              {
                if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString())===-1)
                {
                  RowTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
                //Note to self: Should be able to use findIndex(), because there should be only one(?)
                // console.log(getCol(individualNumberAppearances,individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]-1));
                // console.log(getCol(individualNumberAppearances,individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]-1).findIndex(element => element===1));
                // console.log(RowPermissiveIndices[getCol(individualNumberAppearances,individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]-1).findIndex(element => element===1)]);
                RPIToRemove.push(RowPermissiveIndices[getCol(individualNumberAppearances,individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]-1).findIndex(element => element===1)]);
                sudokuBoardAll[i][RPIToRemove[RPIToRemove.length-1]]=individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
                console.log(`Since ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]} only appears once in this row, entry ${alphaArr[RPIToRemove[RPIToRemove.length-1]]}${i} must be ${individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]}.`);
                }
              }
              
              
              
            }
            // console.log(RPIToRemove);
            RowPermissiveIndices=setdiff(RowPermissiveIndices,RPIToRemove);
            // console.log(RowPermissiveIndices);
            
          }

          for (var j=0;j<RowPermissiveIndices.length;j++)
          {
            var tempStr="";
            var thisPermissiveString=sudokuBoardAll[i][RowPermissiveIndices[j]].toString();
            for (var k=0;k<thisPermissiveString.length;k++)
            {
              if (!RowTakens.includes(parseInt(thisPermissiveString[k])))
              {
                tempStr=tempStr+thisPermissiveString[k];
              }
            }
            sudokuBoardAll[i][RowPermissiveIndices[j]]=parseInt(tempStr);
          }

          //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
          var tempRow=[];
          for (var m=0;m<9;m++)
          {
            tempRow.push(sudokuBoardAll[i][m]);
          }
          // debugger;
          if (setdiff(numbers1to9,tempRow).length===0 && tempRow.sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
          {
            rowSolved[i]=1;
          }
          // if (setdiff(numbers1to9,sudokuBoardAll[i])===undefined && sudokuBoardAll[i].sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
          // {
          //   rowSolved[i]=1;
          // }
          console.log(`Solved Row ${i}: `);
          console.log(sudokuBoardAll[i]);

          // if isempty(setdiff(1:9,sudokuBoardAll(i,:))) && sum(reshape(sort(sudokuBoardAll(i,:)),1,[])-(1:9))==0
          //       rowSolved(i)=1;
          //   end

          // for j=1:length(RowPermissiveIndices)
          //       tempStr="";
          //       thisPermissiveString=num2str(sudokuBoardAll(i,RowPermissiveIndices(j)));
          //       for k=1:length(thisPermissiveString)
          //           if ~ismember(RowTakens,str2num(thisPermissiveString(k)))
          //               tempStr=tempStr+thisPermissiveString(k);
          //           end
          //       end
          //       sudokuBoardAll(i,RowPermissiveIndices(j))=str2num(tempStr);
          //   end

          // if ~isempty(individualNumberAppearancesSumOnlyAppearedOnce)
          //       RPIToRemove=[];
          //       for iNASOAO=1:length(individualNumberAppearancesSumOnlyAppearedOnce)
          //           RowTakens=[RowTakens individualNumberAppearancesSumOnlyAppearedOnce(iNASOAO)];
          //           RPIToRemove=[RPIToRemove RowPermissiveIndices(find(individualNumberAppearances(:,individualNumberAppearancesSumOnlyAppearedOnce(iNASOAO))==1))];
          //           sudokuBoardAll(i,RPIToRemove(end))=individualNumberAppearancesSumOnlyAppearedOnce(iNASOAO);
          //       end
          //       RowPermissiveIndices=setdiff(RowPermissiveIndices,RPIToRemove);
          //   end
          
          // for iNA=1:length(RowPermissiveIndices)
          //     thisPermissiveString=num2str(sudokuBoardAll(i,RowPermissiveIndices(iNA)));
          //       for iNAk=1:length(thisPermissiveString)
          //           individualNumberAppearances(iNA,str2num(thisPermissiveString(iNAk)))=individualNumberAppearances(iNA,str2num(thisPermissiveString(iNAk)))+1;
          //       end
          //   end
        }
        
        //Column-Wise Simplification
        for (var i=0;i<9;i++)
        {
            console.log(i);
            console.log(`Original Column ${i}: `);
            console.log(getCol(sudokuBoardAll,i));
            var ColTakens=setdiff(numbers1to9,setdiff(numbers1to9,getCol(sudokuBoardAll,i)));
            // console.log(ColTakens);
            //Remove from possibles in each Col
            //  If only two 2-values in the column, remove both values from other
            //  locations in column
            var found2Values=[];
            var indicesGreaterThan9=[];
            for (var j=0;j<9;j++)
            {
            if (sudokuBoardAll[j][i]>9)
            {

                indicesGreaterThan9.push(j);
                if (sudokuBoardAll[j][i]<100)
                {
                found2Values.push(j);
                }
            }
            }

            var found2ValuesRemoveFromPermissiveIndices=[];
            var found2ValuesTable=[];
            var found2ValuesTableVals=[];
            var found2ValuesTableValsCount=[];
            if (found2Values!==undefined)
            {
            // console.log('b');
            // console.log(found2Values);
            // console.log(found2Values.length);
            for (var j=0;j<found2Values.length;j++)
            {
                if (!found2ValuesTableVals.includes(sudokuBoardAll[found2Values[j]][i]))
                {
                // console.log(j); 
                // console.log(sudokuBoardAll[found2Values[j]][i]);  
                // console.log(getCol(sudokuBoardAll,i).filter(element => element===sudokuBoardAll[found2Values[j]][i]).length);
                found2ValuesTable.push([sudokuBoardAll[found2Values[j]][i],getCol(sudokuBoardAll,i).filter(element => element===sudokuBoardAll[found2Values[j]][i]).length]);
                found2ValuesTableVals.push(sudokuBoardAll[found2Values[j]][i]);
                found2ValuesTableValsCount.push(getCol(sudokuBoardAll,i).filter(element => element===sudokuBoardAll[found2Values[j]][i]).length);
                }
                
            }

        //   console.log(found2ValuesTable);
            // console.log('e');
            var found2ValuesTable2PresentFind=[];
            var found2ValuesTable2PresentVals=[];
            var found2ValuesTable2PresentValsCount=[];
            for (var j=0;j<found2ValuesTableValsCount.length;j++)
            {
                if (found2ValuesTableValsCount[j]===2)
                {
                found2ValuesTable2PresentFind.push(j);
                found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
                found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
                }
                
            }
            // console.log('found2ValuesTable2PresentFind: ');
            // console.log(found2ValuesTable2PresentFind);


            if (found2ValuesTable2PresentVals!==undefined)
            {
                for (var f2vi=0;f2vi<found2ValuesTable2PresentVals.length;f2vi++)
                {
                var thisPermissiveString=found2ValuesTable2PresentVals.toString();
                // console.log('thisPermissiveString: ')
                // console.log(thisPermissiveString);
                ColTakens.push(parseInt(thisPermissiveString[0])); ColTakens.push(parseInt(thisPermissiveString[1])); 
                for (var j=0; j<9;j++)
                {
                    //Note to self: j and i are switched because we are traversing column by rows, instead of row by columns for row-wise simplification
                    if(sudokuBoardAll[j][i]===found2ValuesTable2PresentVals[f2vi])
                    {
                    found2ValuesRemoveFromPermissiveIndices.push(j);
                    }
                }
                // found2ValuesRemoveFromPermissiveIndices.push(sudokuBoardAll[i].findIndex(element => element===found2ValuesTable2PresentVals[f2vi]));
                }
            }
            }

            // debugger;
        //   console.log(found2ValuesRemoveFromPermissiveIndices);
            var ColPermissiveIndices=setdiff(indicesGreaterThan9,found2ValuesRemoveFromPermissiveIndices);

            //If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
            var individualNumberAppearances=[];
            for (var j=0;j<ColPermissiveIndices.length;j++)
            {
            individualNumberAppearances.push([0,0,0,0,0,0,0,0,0]);
            }
            for (var iNA=0;iNA<ColPermissiveIndices.length;iNA++)
            {
            var thisPermissiveString=sudokuBoardAll[ColPermissiveIndices[iNA]][i].toString();
            for (var iNAk=0;iNAk<thisPermissiveString.length;iNAk++)
            {
                individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])-1]=individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])-1]+1;
                
            }
            }

            var individualNumberAppearancesSum=[];
            var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues=[];
            for (var lmo=0;lmo<9;lmo++)
            {
            individualNumberAppearancesSum[lmo]=sumArray(getCol(individualNumberAppearances,lmo));
            if (individualNumberAppearancesSum[lmo]==1)
            {
                individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues.push(lmo+1);
            }
            
            }

            var individualNumberAppearancesSumOnlyAppearedOnce=setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeColTakenValues,ColTakens);
            if (individualNumberAppearancesSumOnlyAppearedOnce!==undefined)
            {
            var CPIToRemove=[];
            for (var iNASOAO=0;iNASOAO<individualNumberAppearancesSumOnlyAppearedOnce.length;iNASOAO++)
            {
                var ensureAppearOnlyOnceNotIn2Vals=found2ValuesTable2PresentVals.join('');
                // console.log(found2ValuesTable2PresentVals);
                // console.log(ensureAppearOnlyOnceNotIn2Vals);
                if (found2ValuesTable2PresentVals!==undefined)
                {
                    if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString())===-1)
                    {
                        ColTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
                        //Note to self: Should be able to use findIndex(), because there should be only one(?)
                        CPIToRemove.push(ColPermissiveIndices[getCol(individualNumberAppearances,individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]-1).findIndex(element => element===1)]);
                        sudokuBoardAll[CPIToRemove[CPIToRemove.length-1]][i]=individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
                    }
                }
            //   ColTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
            //   //Note to self: Should be able to use findIndex(), because there should be only one(?)
            //   CPIToRemove.push(ColPermissiveIndices[getCol(individualNumberAppearancesSumOnlyAppearedOnce,iNASOAO).findIndex(element => element===1)]);
            //   sudokuBoardAll[CPIToRemove[CPIToRemove.length-1]][i]=individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
            }
            // console.log(CPIToRemove);
            ColPermissiveIndices=setdiff(ColPermissiveIndices,CPIToRemove);
            // console.log(ColPermissiveIndices);
            }

            for (var j=0;j<ColPermissiveIndices.length;j++)
            {
            var tempStr="";
            var getColi=getCol(sudokuBoardAll,i);
            var thisPermissiveString=getColi[ColPermissiveIndices[j]].toString();
            for (var k=0;k<thisPermissiveString.length;k++)
            {
                if (!ColTakens.includes(parseInt(thisPermissiveString[k])))
                {
                tempStr=tempStr+thisPermissiveString[k];
                }
            }
            sudokuBoardAll[ColPermissiveIndices[j]][i]=parseInt(tempStr);
            }

            var tempCol=[];
            for (var m=0;m<9;m++)
            {
              tempRow.push(sudokuBoardAll[m][i]);
            }
            //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
            if (setdiff(numbers1to9,tempCol).length===0 && tempCol.sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
            {
              colSolved[i]=1;
            }
            // if (setdiff(numbers1to9,getCol(sudokuBoardAll,i))===undefined && getCol(sudokuBoardAll,i).sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
            // {
            // colSolved[i]=1;
            // }
            console.log(`Solved Column ${i}: `);
            console.log(getCol(sudokuBoardAll,i));
        }

        //Box-Wise Simplification
        for (var i=0;i<9;i++)
        {
            
            console.log(i);
            var subBox=[];
            for (var j=3*(Math.floor(i/3)); j<3+3*(Math.floor(i/3));j++)
            {
                var tempsBArr=[];
                for (var k=3*(i-3*Math.floor((i)/3));k<3+3*(i-3*Math.floor(i/3));k++)
                {
                    if (sudokuBoardAll[j][k]!==0)
                    {
                        tempsBArr.push(sudokuBoardAll[j][k]);
                        // BoxFilledPos=BoxFilledPos+1;
                        // boxUsedValues.push(sudokuBoardAll[j][k]);
                    }
                    else
                    {
                    tempsBArr.push(0);
                    }
                
                
                }
                subBox.push(tempsBArr);
            }
            console.log(`Original subBox ${i}: `);
            console.log(subBox);

            var BoxTakens=setdiff(numbers1to9,setdiff(numbers1to9,subBoxToArray(subBox)));
        //   console.log(BoxTakens);
            //Remove from possibles in each subBox
            //  If only two 2-values in the subBox, remove both values from other
            //  locations in subBox
            var found2Values=[];
            var indicesGreaterThan9=[];
            for (var j=0;j<9;j++)
            {
            if (getSubBoxLinearIndexValue(subBox,j)>9)
            {

                indicesGreaterThan9.push(j);
                if (getSubBoxLinearIndexValue(subBox,j)<100)
                {
                found2Values.push(j);
                }
            }
            }

            var found2ValuesRemoveFromPermissiveIndices=[];
            var found2ValuesTable=[];
            var found2ValuesTableVals=[];
            var found2ValuesTableValsCount=[];
            if (found2Values!==undefined)
            {
            // console.log('b');
            // console.log(found2Values);
            // console.log(found2Values.length);
            for (var j=0;j<found2Values.length;j++)
            {
                if (!found2ValuesTableVals.includes(getSubBoxLinearIndexValue(subBox,found2Values[j])))
                {
                // console.log(j); 
                // console.log(sudokuBoardAll[i][found2Values[j]]);  
                // console.log(sudokuBoardAll[i].filter(element => element===sudokuBoardAll[i][found2Values[j]]).length);
                found2ValuesTable.push([getSubBoxLinearIndexValue(subBox,found2Values[j]),subBoxToArray(subBox).filter(element => element===getSubBoxLinearIndexValue(subBox,found2Values[j])).length]);
                found2ValuesTableVals.push(getSubBoxLinearIndexValue(subBox,found2Values[j]));
                found2ValuesTableValsCount.push(subBoxToArray(subBox).filter(element => element===getSubBoxLinearIndexValue(subBox,found2Values[j])).length);
                }
                
            }
            // console.log(found2ValuesTable);
            // console.log('e');
            var found2ValuesTable2PresentFind=[];
            var found2ValuesTable2PresentVals=[];
            var found2ValuesTable2PresentValsCount=[];
            for (var j=0;j<found2ValuesTableValsCount.length;j++)
            {
                if (found2ValuesTableValsCount[j]===2)
                {
                found2ValuesTable2PresentFind.push(j);
                found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
                found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
                }
                
            }
            // console.log('found2ValuesTable2PresentFind: ');
            // console.log(found2ValuesTable2PresentFind);

            if (found2ValuesTable2PresentVals!==undefined)
            {
                for (var f2vi=0;f2vi<found2ValuesTable2PresentVals.length;f2vi++)
                {
                var thisPermissiveString=found2ValuesTable2PresentVals.toString();
                // console.log('thisPermissiveString: ')
                // console.log(thisPermissiveString);
                BoxTakens.push(parseInt(thisPermissiveString[0])); BoxTakens.push(parseInt(thisPermissiveString[1])); 
                for (var j=0; j<9;j++)
                {
                    if(getSubBoxLinearIndexValue(subBox,j)===found2ValuesTable2PresentVals[f2vi])
                    {
                    found2ValuesRemoveFromPermissiveIndices.push(j);
                    }
                }
                // found2ValuesRemoveFromPermissiveIndices.push(sudokuBoardAll[i].findIndex(element => element===found2ValuesTable2PresentVals[f2vi]));
                }
            }

        }

            // debugger;
        //   console.log(found2ValuesRemoveFromPermissiveIndices);
            var BoxPermissiveIndices=setdiff(indicesGreaterThan9,found2ValuesRemoveFromPermissiveIndices);


            //If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
            var individualNumberAppearances=[];
            for (var j=0;j<BoxPermissiveIndices.length;j++)
            {
            individualNumberAppearances.push([0,0,0,0,0,0,0,0,0]);
            }
            for (var iNA=0;iNA<BoxPermissiveIndices.length;iNA++)
            {
            var thisPermissiveString=getSubBoxLinearIndexValue(subBox,BoxPermissiveIndices[iNA]).toString();
            for (var iNAk=0;iNAk<thisPermissiveString.length;iNAk++)
            {
                individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])-1]=individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])-1]+1;
                
            }
            }

            var individualNumberAppearancesSum=[];
            var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues=[];
            for (var lmo=0;lmo<9;lmo++)
            {
            individualNumberAppearancesSum[lmo]=sumArray(getCol(individualNumberAppearances,lmo));
            if (individualNumberAppearancesSum[lmo]==1)
            {
                individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues.push(lmo+1);
            }
            
            }

            var individualNumberAppearancesSumOnlyAppearedOnce=setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeBoxTakenValues,BoxTakens);
            if (individualNumberAppearancesSumOnlyAppearedOnce!==undefined)
            {
            var BPIToRemove=[];
            for (var iNASOAO=0;iNASOAO<individualNumberAppearancesSumOnlyAppearedOnce.length;iNASOAO++)
            {
                var ensureAppearOnlyOnceNotIn2Vals=found2ValuesTable2PresentVals.join('');
                // console.log(found2ValuesTable2PresentVals);
                // console.log(ensureAppearOnlyOnceNotIn2Vals);
                if (found2ValuesTable2PresentVals!==undefined)
                {
                    if (ensureAppearOnlyOnceNotIn2Vals.indexOf(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO].toString())===-1)
                    {
                        BoxTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
                        //Note to self: Should be able to use findIndex(), because there should be only one(?)
                        BPIToRemove.push(BoxPermissiveIndices[getCol(individualNumberAppearances,individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]-1).findIndex(element => element===1)]);
                        subBox=assignLinearIndexSubBoxValue(subBox,BPIToRemove[BPIToRemove.length-1],individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
                    }
                }
            //   BoxTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
            //   //Note to self: Should be able to use findIndex(), because there should be only one(?)
            //   BPIToRemove.push(BoxPermissiveIndices[getCol(individualNumberAppearancesSumOnlyAppearedOnce,iNASOAO).findIndex(element => element===1)]);
            //   subBox=assignLinearIndexSubBoxValue(subBox,BPIToRemove[BPIToRemove.length-1],individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
            }
            BoxPermissiveIndices=setdiff(BoxPermissiveIndices,BPIToRemove);
            
            }

            for (var j=0;j<BoxPermissiveIndices.length;j++)
            {
            var tempStr="";
            var thisPermissiveString=getSubBoxLinearIndexValue(subBox,BoxPermissiveIndices[j]).toString();
            for (var k=0;k<thisPermissiveString.length;k++)
            {
                if (!BoxTakens.includes(parseInt(thisPermissiveString[k])))
                {
                tempStr=tempStr+thisPermissiveString[k];
                }
            }
            subBox=assignLinearIndexSubBoxValue(subBox,BoxPermissiveIndices[j],parseInt(tempStr));
            
            }

            //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
            if (setdiff(numbers1to9,subBoxToArray(subBox))===undefined && subBoxToArray(subBox).sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
            {
              boxSolved[i]=1;
            }
            console.log(`Solved subBox ${i}: `);
            console.log(subBox);
        }

        currentMax=0;
        for (var i=0;i<9;i++)
        {
          currentMax=Math.max(currentMax,Math.max(...sudokuBoardAll[i]));
        }

        //Check if no change
        var noChange=1;
        for (var i=0;i<9;i++)
        {
          for (var j=0;j<9;j++)
          {
            if (sudokuBoardAllOld[i][j]!==sudokuBoardAll[i][j])
            {
              noChange=0;
            }
          }
        }
        console.log('noChange: ');
        console.log(noChange);

        //If noChange add to loops without change
        if (noChange===1)
        {
          numLoopsWithoutChange=numLoopsWithoutChange+1;
        }
        else
        {
          numLoopsWithoutChange=0;
        }

        if (numLoopsWithoutChange>maxAllowedNumLoopsWithoutChange)
        {
          maxLoopsExceeded=1;
        }
        // currentMax=5;
        numLoops=numLoops+1;
      }
      console.log(numLoops);
      

      // //To Do Still
      // if sum(sum(sudokuBoardAllOld-sudokuBoardAll))==0
      //     numLoopsWithoutChange=numLoopsWithoutChange+1;
      // else
      //     %             recordedBoards{end+1}=sudokuBoardAll;
      // end
      // if (numLoopsWithoutChange>maxAllowedNumLoopsWithoutChange)
      //     break;
      // end

      // return null;
      // debugger;
      return [rowSolved,colSolved,boxSolved,sudokuBoardAll];
  }

function testIsSolution(rowSolved,colSolved,boxSolved,sudokuBoardAll)
{
    //Computes and returns the boolean variable boardSolved
    //If each row is solved, and each column is solved, and each subBox is solved, then the board is solved!
    //Otherwise, board not solved. :(
    var maxsudokuBoardAll=0;
    var boardSolved=0;
    var numbers1to9=[1,2,3,4,5,6,7,8,9];
    for (var i=0;i<9;i++)
    {
      maxsudokuBoardAll=Math.max(maxsudokuBoardAll,Math.max(...sudokuBoardAll[i]));
    }

    if (maxsudokuBoardAll===9)
    {
      var allRise=1;
      for (var i=0;i<9;i++)
      {
        //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
        if (setdiff(numbers1to9,sudokuBoardAll[i])===undefined && sudokuBoardAll[i].sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
        {
          rowSolved[i]=1;
          
        }
        else
        {
          allRise=0;
        }

        //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
        if (setdiff(numbers1to9,getCol(sudokuBoardAll,i))===undefined && getCol(sudokuBoardAll,i).sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
        {
          colSolved[i]=1;
        }
        else
        {
          allRise=0;
        }

        var subBox=[];
        for (var j=3*(Math.floor(i/3)); j<3+3*(Math.floor(i/3));j++)
        {
            var tempsBArr=[];
            for (var k=3*(i-3*Math.floor((i)/3));k<3+3*(i-3*Math.floor(i/3));k++)
            {
                if (sudokuBoardAll[j][k]!==0)
                {
                    tempsBArr.push(sudokuBoardAll[j][k]);
                    // BoxFilledPos=BoxFilledPos+1;
                    // boxUsedValues.push(sudokuBoardAll[j][k]);
                }
                else
                {
                tempsBArr.push(0);
                }
            
            
            }
            subBox.push(tempsBArr);
        }

        //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
        if (setdiff(numbers1to9,subBox)===undefined && subBoxToArray(subBox).sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
        {
          boxSolved[i]=1;
        }
        else
        {
          allRise=0;
        }

        


      }

      if (allRise===1)
        {
          boardSolved=1;
        }
        else
        {
          boardSolved=0;
        }
    }
    else
    {
      boardSolved=0;
    }
    

    return boardSolved;
}

function testIsSolutionRevamped(sudokuBoardAll)
{
    //Computes and returns the boolean variable boardSolved
    //If each row is solved, and each column is solved, and each subBox is solved, then the board is solved!
    //Otherwise, board not solved. :(
    // debugger;
    var maxsudokuBoardAll=0;
    var boardSolved=false;
    var numbers1to9=[1,2,3,4,5,6,7,8,9];
    for (var i=0;i<9;i++)
    {
      try
      {
        maxsudokuBoardAll=Math.max(maxsudokuBoardAll,Math.max(...sudokuBoardAll[i]));
      }
      catch
      {
        debugger;
      }
      
    }

    if (maxsudokuBoardAll===9)
    {
      var allRise=1;
      for (var i=0;i<9;i++)
      {
        //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
        if (setdiff(numbers1to9,sudokuBoardAll[i])===undefined && sudokuBoardAll[i].sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
        {
          rowSolved[i]=1;
          
        }
        else
        {
          allRise=0;
        }

        //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
        if (setdiff(numbers1to9,getCol(sudokuBoardAll,i))===undefined && getCol(sudokuBoardAll,i).sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
        {
          colSolved[i]=1;
        }
        else
        {
          allRise=0;
        }

        var subBox=[];
        for (var j=3*(Math.floor(i/3)); j<3+3*(Math.floor(i/3));j++)
        {
            var tempsBArr=[];
            for (var k=3*(i-3*Math.floor((i)/3));k<3+3*(i-3*Math.floor(i/3));k++)
            {
                if (sudokuBoardAll[j][k]!==0)
                {
                    tempsBArr.push(sudokuBoardAll[j][k]);
                    // BoxFilledPos=BoxFilledPos+1;
                    // boxUsedValues.push(sudokuBoardAll[j][k]);
                }
                else
                {
                tempsBArr.push(0);
                }
            
            
            }
            subBox.push(tempsBArr);
        }

        //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
        if (setdiff(numbers1to9,subBox)===undefined && subBoxToArray(subBox).sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
        {
          boxSolved[i]=1;
        }
        else
        {
          allRise=0;
        }

        


      }

      if (allRise===1)
        {
          boardSolved=true;
        }
        else
        {
          boardSolved=false;
        }
    }
    else
    {
      boardSolved=false;
    }
    

    return boardSolved;
}

function hailMaryUnsolvedBoards(boardSolved,sudokuBoardAll)
{
    //Computes and returns three variables
    //storeBoards - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to an initially unsolved configuration of the initial input baord
    //storeBoardsSolvedMaybe - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to either a solved or unsolved configuration of the initial input baord, corresponding to the second-pass solver applied to the corresponding entry in storeBoards
    //storeBoardsSolvedVars - An Object containing potentially multiple nested vectors, with the terminal node on each branch corresponding to a boolean, indicating whether the corresponding entry of storeBoardsSolvedMaybe is solved (the terminal node has a value of 1), or unsolved (the terminal node has a value of 0)
    var storeBoards=[];
    var storeBoardsSolvedMaybe=[];
    var storeBoardsSolvedVars=[];
    if (boardSolved===0)
    {
      var nlr=[];
      var nlc=[];
      for (var i=0;i<9;i++)
      {
        for (var j=0;j<9;j++)
        {
          if (sudokuBoardAll[i][j]>9)
          {
            nlr.push(i);
            nlc.push(j);
          }
        }
      }

      var selectPosToDecideIndex=Math.floor(nlr.length*Math.rand());
      var thisPermissiveString=sudokuBoardAll[nlr[selectPosToDecideIndex]][nlc[selectPosToDecideIndex]].toString();
      for (var k=0;k<thisPermissiveString.length;k++)
      {
        var thisSudokuBoardAllCopy=[];
        for (var m=0;m<9;m++)
        {
          var tempsBAC=[];
          for (var n=0;n<9;n++)
          {
            tempsBAC.push(sudokuBoardAll[m][n]);
          }
          thisSudokuBoardAllCopy.push(tempsBAC);
        }

        [rowSolved,colSolved,boxSolved,thisSudokuBoardAllCopyII] = sBATrySolver(thisSudokuBoardAllCopy);
        thisSudokuBoardAllCopy=thisSudokuBoardAllCopyII;

        boardSolvedII=testIsSolution(rowSolved,colSolved,boxSolved,thisSudokuBoardAllCopy);

        var maxsudokuBoardAllCopy=0;
        for (var i=0;i<9;i++)
        {
          maxsudokuBoardAllCopy=Math.max(maxsudokuBoardAllCopy,Math.max(...maxsudokuBoardAllCopy[i]));
        }


        if (boardSolvedII===1)
        {
            storeBoards.push(thisSudokuBoardAllCopy);
            storeBoardsSolvedMaybe.push(thisSudokuBoardAllCopy);
            storeBoardsSolvedVars.push(boardSolvedII);
        }
        else if (boardSolvedII===0 && maxsudokuBoardAllCopy===9)
        {
            storeBoards.push(thisSudokuBoardAllCopy);
            storeBoardsSolvedMaybe.push(thisSudokuBoardAllCopy);
            storeBoardsSolvedVars.push(boardSolvedII);
        }
        else
        {
          [storeBoardsII,storeBoardsSolvedMaybeII,storeBoardsSolvedVarsII]=hailMaryUnsolvedBoards(boardSolvedII,thisSudokuBoardAllCopy);
          storeBoards.push(storeBoardsII);
          storeBoardsSolvedMaybe.push(storeBoardsSolvedMaybeII);
          storeBoardsSolvedVars.push(storeBoardsSolvedVarsII);
        }
      }

    }
    else
    {
      storeBoards.push(sudokuBoardAll);
      storeBoardsSolvedMaybe.push(sudokuBoardAll);
      storeBoardsSolvedMaybe.push(boardSolved);
    }

    return storeBoards,storeBoardsSolvedMaybe,storeBoardsSolvedVars;
}

//The commented code below is the flow of calls to the functions above copied from my MATLAB script, and will be translated subsequently to completion of the functions
// sudokuBoardAll = initializeAllOptions(sudokuBoard);
// sudokuBoardAllInitial=sudokuBoardAll;

// [rowSolved,colSolved,boxSolved,sudokuBoardAllII] = sBATrySolver(sudokuBoardAll);
// sudokuBoardAll=sudokuBoardAllII;

// boardSolved = testIsSolution(rowSolved,colSolved,boxSolved,sudokuBoardAll);

// [storeBoards,storeBoardsSolvedMaybe,storeBoardsSolvedVars]=hailMaryUnsolvedBoards(boardSolved,sudokuBoardAll);

function setdiff(a,b)
{
    var c=[];

    for (var i=0;i<a.length;i++)
    {
        if (!b.includes(a[i]))
        {
            c.push(a[i]);
        }
    }

    return c;
}

function intersect(a,b)
{
    var c=[];

    for (var i=0;i<b.length;i++)
    {
        if (a.includes(b[i]))
        {
            c.push(b[i]);
        }
    }

    return c;
}

function getCol(a,colToGet)
{
    var colGot=[];
    for (var i=0;i<a.length;i++)
    {
        colGot.push(a[i][colToGet]);
    }

    return colGot;
}


  function sumArray(array)
  {
    var summed=0;
    for (var i=0;i<array.length;i++)
    {
      summed=summed+array[i];
    }
    return summed;
  }

  function compareNumbers(a,b)
  {
    //Learned from user:Paul Dixon @ https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
    return a-b;
  }

  function subBoxToArray(subBox)
  {
    var subBoxArray=[];
    for (var i=0;i<3;i++)
    {
      for (var j=0;j<3;j++)
      {
          subBoxArray.push(subBox[j][i]);
      }
    }
      
    return subBoxArray;
  }

  function getSubBoxLinearIndexValue(subBox,linearIndex)
  {
    return subBox[Math.floor(linearIndex/3)][linearIndex-3*Math.floor(linearIndex/3)];
  }

  function assignLinearIndexSubBoxValue(subBox,linearIndex,sBValue)
  {
    var subBoxCopy=[];
    var targetI=Math.floor(linearIndex/3);
    var targetJ=linearIndex-3*Math.floor(linearIndex/3);
    for (var i=0;i<3;i++)
    {
      var tempsBArr=[];
      for (var j=0;j<3;j++)
      {
        if (i===targetI && j===targetJ)
        {
          tempsBArr.push(sBValue);
        }
        else
        {
          tempsBArr.push(subBox[i][j]);
        }
        
      }
      subBoxCopy.push(tempsBArr);
    }

    return subBoxCopy;
  }