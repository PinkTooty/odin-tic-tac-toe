// refactor when im better at this stuff

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    const cellElements = document.querySelectorAll('.cell')
    let playerTurn = true;
    let moveCounter = 0;

    function reset() {
        board = ['', '', '', '', '', '', '', '', ''];
        moveCounter = 0
    }
    const targetCell = (e) => {
        const cell = e.target
        if (playerTurn) {
            moveCounter++
            let index = cell.dataset.num - 1
            board.splice(index, 1, 'x')
            checkResult()
            playerTurn = false
            cell.textContent = 'x'
            console.log(moveCounter)
            document.querySelector('.player-turn').textContent = `${playerTwo.name}'s turn`
        }
        else if (!playerTurn) {
            moveCounter++
            let index = cell.dataset.num - 1
            board.splice(index, 1, 'o')
            checkResult()
            playerTurn = true
            cell.textContent = 'o'
            document.querySelector('.player-turn').textContent = `${playerOne.name}'s turn`
        }
    }

    const checkResult = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a == b && b == c) {
                console.log(board)
                displayController.win(a)
                break;
            }
            else if (moveCounter == 9) {
                displayController.tie()
                break;
            }
        }
    }
    cellElements.forEach(cell => {
        cell.addEventListener('click', targetCell)
    })
    return {
        board,
        reset,
        cellElements,
        targetCell,
        playerTurn
    }
})()

const displayController = (() => {
    const resetBtn = document.querySelector('button')
    resetBtn.addEventListener('click', () => {
        gameBoard.reset()
        document.querySelector('.result').classList.add('invis')
        document.querySelector('.player-turn').textContent = `${playerOne.name}'s turn`
        gameBoard.cellElements.forEach(cell => {
            cell.addEventListener('click', gameBoard.targetCell)
            cell.classList.remove('disabled')
            cell.textContent = ''
        })
    })
    const win = (player) => {
        if (Object.values(playerOne).indexOf(player) > -1) {
            playerOne.winner()
        }
        else {
            playerTwo.winner()
        }
        gameBoard.cellElements.forEach(cell => {
            cell.removeEventListener('click', gameBoard.targetCell)
            cell.classList.add('disabled')
        })
    }
    const tie = () => {
        gameBoard.cellElements.forEach(cell => {
            cell.removeEventListener('click', gameBoard.targetCell)
            cell.classList.add('disabled')
        })
        document.querySelector('.result').textContent = 'Tie!'
        document.querySelector('.result').classList.remove('invis')
    }
    return {
        win,
        tie
    }
})()

const playerFactory = (name) => {
    const winner = () => {
        document.querySelector('.result').textContent = `${name} wins!`
        document.querySelector('.result').classList.remove('invis')
    }
    return {
        name,
        winner,
    }
}

const playerOne = playerFactory('Player One')
const playerTwo = playerFactory('Player Two')
playerOne.symbol = 'x'
playerTwo.symbol = 'o'