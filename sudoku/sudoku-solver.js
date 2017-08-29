module.exports = {

  findEmptyBoxes(board) {
    var emptyBoxes = [];

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          emptyBoxes.push([i, j]);
        }
      }
    }
    return emptyBoxes;
  },

  checkRowAndColumn(board, box, val) {
    var inRow = false;
    var inColumn = false;

    //check Row
    for (var i = 0; i < 9; i++) {
      if (board[box[0]][i] === val) {
        inRow = true;
        break;
      }
    }

    //checkColumn
    for (var i = 0; i < 9; i++) {
      if (board[i][box[1]] === val) {
        inColumn = true;
        break;
      }
    }
    return {
      inRow,
      inColumn
    }
  },

  checkSquare(board, box, val) {
    // console.log(box);
    var y = Math.floor(box[0] / 3) * 3;
    var x = Math.floor(box[1] / 3) * 3;
    var inBox = false;

    for (var i = y; i < y+3; i++) {
      for (var j = x; j < x+3; j++) {
        if (board[i][j] === val) {
          inBox = true;
          break;
        }
      }
    }

    return inBox;
  },

  findValue(board, box, val) {
    var inRowOrColumn = this.checkRowAndColumn(board, box, val)
      , inRow = inRowOrColumn.inRow
      , inColumn = inRowOrColumn.inColumn
      , inSquare = this.checkSquare(board, box, val)
      ;

      if (inRow || inColumn || inSquare) {
        return true;
      } else {
        return false;
      }
  },

  solvePuzzle(board) {
    var emptyBoxes = this.findEmptyBoxes(board);

    var val;
    for (var i = 0; i < emptyBoxes.length; i++) {
      var coord = emptyBoxes[i]
        , valid = false
        , x = coord[0]
        , y = coord[1]
        ;
      val = board[x][y] + 1;

      while (!valid && val <= 9) {
        if (!this.findValue(board, coord, val)) {
          valid = true;
          board[x][y] = val;
        } else {
          val++;
        }
      }

      if (!valid) {
        board[x][y] = 0;
        i-=2;
      }
    }
    board.forEach(row => {
      row = row.join('|');
      console.log(row);
    })
    return 'solved'
  }
}
