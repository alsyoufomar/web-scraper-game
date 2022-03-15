const board = document.querySelector('.board')
console.log(board)
const boardWidth = 10
const allCells = []
const minesNum = 20

function gameBoard () {
  const mines = Array(minesNum).fill('mine')
  const safe = Array(boardWidth ** 2 - minesNum).fill('safe')
  const shuffledArr = mines.concat(safe).sort(() => Math.random() - 0.5)

  for (let i = 0; i < boardWidth ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.classList.add(shuffledArr[i])
    cell.setAttribute('id', i)
    board.append(cell)
    allCells.push(cell)
  }
  console.log(allCells[0])
  for (let i = 0; i < allCells.length; i++) {
    let total = 0;
    const isLeftEdge = i % boardWidth === 0
    const isRightEdge = i % boardWidth === boardWidth - 1
    const isTop = (i < boardWidth)
    const isBottom = (i > 90)
    if (allCells[i].classList.contains('safe')) {
      if (!isLeftEdge && allCells[i - 1].classList.contains('mine')) total++
      if (!isRightEdge && allCells[i + 1].classList.contains('mine')) total++
      if (!isTop && allCells[i - boardWidth].classList.contains('mine')) total++
      if (!isBottom && allCells[i + boardWidth].classList.contains('mine')) total++
      if (!isTop && !isLeftEdge && allCells[i - 1 - boardWidth].classList.contains('mine')) total++
      if (!isTop && !isRightEdge && allCells[i + 1 - boardWidth].classList.contains('mine')) total++
      if (!isBottom && !isLeftEdge && allCells[i - 1 + boardWidth].classList.contains('mine')) total++
      if (!isBottom && !isRightEdge && allCells[i + 1 + boardWidth].classList.contains('mine')) total++
      allCells[i].setAttribute('data', total)

    }
  }
}
gameBoard()
