const theGame = () => {
  const board = document.querySelector('.board');
  const bookmarksLeft = document.querySelector('.bookmarksLeft');
  const result = document.querySelector('.result');
  const boardWidth = 10;
  const allCells = [];
  const minesNum = 2;
  let isGameOver = false;
  const boardArea = boardWidth ** 2;
  let bookmarks = 0;

  console.log(minesNum);

  (function () {
    const mines = Array(minesNum).fill('mine');
    const safe = Array(boardArea - minesNum).fill('safe');
    const shuffledArr = mines.concat(safe).sort(() => Math.random() - 0.5);

    for (let i = 0; i < boardArea; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add(shuffledArr[i]);
      cell.setAttribute('id', i);
      board.append(cell);
      allCells.push(cell);

      cell.addEventListener('click', (e) => {
        clickMe(cell);
      });

      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        addBookmark(cell);
      });
    }

    for (let i = 0; i < allCells.length; i++) {
      let total = 0;
      const isLeftEdge = i % boardWidth === 0;
      const isRightEdge = i % boardWidth === boardWidth - 1;
      const isTop = i < boardWidth;
      const isBottom = i >= boardArea - boardWidth;
      if (allCells[i].classList.contains('safe')) {
        if (i > 0 && !isLeftEdge && allCells[i - 1].classList.contains('mine'))
          total++;
        if (!isRightEdge && allCells[i + 1].classList.contains('mine')) total++;
        if (!isTop && allCells[i - boardWidth].classList.contains('mine'))
          total++;
        if (!isBottom && allCells[i + boardWidth].classList.contains('mine'))
          total++;
        if (
          i > boardWidth &&
          !isLeftEdge &&
          allCells[i - 1 - boardWidth].classList.contains('mine')
        )
          total++;
        if (
          i > boardWidth - 1 &&
          !isRightEdge &&
          allCells[i + 1 - boardWidth].classList.contains('mine')
        )
          total++;
        if (
          i < boardArea - boardWidth &&
          !isLeftEdge &&
          allCells[i - 1 + boardWidth].classList.contains('mine')
        )
          total++;
        if (
          !isBottom &&
          !isRightEdge &&
          allCells[i + 1 + boardWidth].classList.contains('mine')
        )
          total++;
        allCells[i].setAttribute('data', total);
      }
    }
  })();

  function clickMe(cell) {
    const id = parseInt(cell.id);
    if (
      isGameOver ||
      cell.classList.contains('checked') ||
      cell.classList.contains('bookmark')
    )
      return;
    if (cell.classList.contains('mine')) {
      cell.classList.add('checked-mine');
      cell.innerHTML = 'f';
      gameOver();
    } else {
      let total = cell.getAttribute('data');
      if (total != 0) {
        cell.classList.add('checked');
        cell.innerHTML = total;
        return;
      }
      spread(id);
    }
    cell.classList.add('checked');
  }

  function spread(id) {
    const isLeftEdge = id % boardWidth === 0;
    const isRightEdge = id % boardWidth === boardWidth - 1;
    const isTop = id < boardWidth;
    const isBottom = id >= boardArea - boardWidth;

    setTimeout(() => {
      if (id < boardArea - 2 && !isRightEdge) {
        const newId = parseInt(id) + 1;
        const newCell = document.getElementById(newId);
        clickMe(newCell);
      }
      if (id > 0 && !isLeftEdge) {
        const newId = parseInt(id) - 1;

        const newCell = document.getElementById(newId);
        clickMe(newCell);
      }
      if (!isTop) {
        const newId = parseInt(id) - boardWidth;
        const newCell = document.getElementById(newId);
        clickMe(newCell);
      }
      if (!isBottom) {
        const newId = parseInt(id) + boardWidth;
        const newCell = document.getElementById(newId);
        clickMe(newCell);
      }
      if (id > boardWidth - 1 && !isRightEdge) {
        const newId = parseInt(id) + 1 - boardWidth;
        const newCell = document.getElementById(newId);
        clickMe(newCell);
      }
      if (id > boardWidth + 1 && !isLeftEdge) {
        const newId = parseInt(id) - 1 - boardWidth;
        const newSquare = document.getElementById(newId);
        clickMe(newSquare);
      }
      if (id < boardArea - boardWidth - 2 && !isRightEdge) {
        const newId = parseInt(id) + 1 + boardWidth;
        const newCell = document.getElementById(newId);
        clickMe(newCell);
      }
      if (id < boardArea - boardWidth && !isLeftEdge) {
        const newId = parseInt(id) - 1 + boardWidth;
        const newSquare = document.getElementById(newId);
        clickMe(newSquare);
      }
    }, 20);
  }

  function gameOver() {
    result.innerHTML = 'We got you Mr hacker!!';
    isGameOver = true;
    console.log('game over');
    for (let cell of allCells) {
      if (cell.classList.contains('mine')) {
        cell.classList.add('checked-mine');
        cell.innerHTML = 'f';
      }
    }
  }

  function addBookmark(cell) {
    if (isGameOver) return;
    if (!cell.classList.contains('checked')) {
      if (!cell.classList.contains('bookmark')) {
        if (bookmarks < minesNum) {
          cell.classList.add('bookmark');
          bookmarks++;
          cell.innerHTML = '💾';
          bookmarksLeft.innerHTML = `💾 left = ${minesNum - bookmarks}`;
          checkWinner();
        }
      } else {
        console.log('activated');
        cell.classList.remove('bookmark');
        bookmarks--;
        cell.innerHTML = '';
        bookmarksLeft.innerHTML = `💾 left = ${minesNum - bookmarks}`;
      }
      console.log(cell);
    }
  }

  function checkWinner() {
    let matches = 0;

    for (let cell of allCells) {
      if (
        cell.classList.contains('mine') &&
        cell.classList.contains('bookmark')
      ) {
        matches++;
      }
      if (matches === minesNum) {
        result.innerHTML = 'You won!!';
        isGameOver = true;
      }
    }
  }
};
