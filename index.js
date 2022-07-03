const board = document.querySelector('.board');
console.log(board);
const boardWidth = 10;
const allCells = [];
const minesNum = 5;
let isGameOver = false;
const boardArea = boardWidth ** 2;

function gameBoard() {
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
  }

  for (let i = 0; i < allCells.length; i++) {
    let total = 0;
    const isLeftEdge = i % boardWidth === 0;
    const isRightEdge = i % boardWidth === boardWidth - 1;
    const isTop = i < boardWidth;
    const isBottom = i >= boardArea - boardWidth;
    if (allCells[i].classList.contains('safe')) {
      if (!isLeftEdge && allCells[i - 1].classList.contains('mine')) total++;
      if (!isRightEdge && allCells[i + 1].classList.contains('mine')) total++;
      if (!isTop && allCells[i - boardWidth].classList.contains('mine'))
        total++;
      if (!isBottom && allCells[i + boardWidth].classList.contains('mine'))
        total++;
      if (
        !isTop &&
        !isLeftEdge &&
        allCells[i - 1 - boardWidth].classList.contains('mine')
      )
        total++;
      if (
        !isTop &&
        !isRightEdge &&
        allCells[i + 1 - boardWidth].classList.contains('mine')
      )
        total++;
      if (
        !isBottom &&
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
}
gameBoard();

function clickMe(cell) {
  if (isGameOver) return;
  if (cell.classList.contains('checked') || cell.classList.contains('flag'))
    return;
  if (cell.classList.contains('mine')) {
    cell.classList.add('checked-mine');
    alert('Game over mate');
  } else {
    let total = cell.getAttribute('data');
    if (total != 0) {
      cell.classList.add('checked');
      cell.innerHTML = total;
      return;
    }
    const id = parseInt(cell.getAttribute('id'));
    spread(cell, id);
  }
}

function spread(cell, id) {
  console.log(cell);
  console.log('stage 1');
  if (cell.classList.contains('mine')) return;
  console.log('stage 3');
  const newId = parseInt(cell.getAttribute('id'));
  console.log(newId);
  if (newId === 0 || newId === boardArea - 1) {
    cell.classList.add('checked');
    return;
  }
  cell.classList.add('checked');
  total = cell.getAttribute('data');
  if (total != 0) cell.innerHTML = total;

  if (id <= newId) {
    const test = document.getElementById(String(newId + 1));
    spread(test, id);
  }
  if (id >= newId) {
    const test1 = document.getElementById(String(newId - 1));
    spread(test1, id);
  }
}
