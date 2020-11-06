window.addEventListener(("DOMContentLoaded"), () => {
   let player = 'player 1'
   let player1
   let player2
   const boardSquares = document.querySelectorAll("board-squares")
   const button = document.getElementById('new-game')
   const board = document.getElementById('board-holder')
   const vsDiv = document.createElement('h1')
    const clickTargets = document.getElementById('click-targets')
   board.className = 'is-invisible'
   button.disabled = false
   document.querySelectorAll('.click-target').forEach((el) => {
      el.className = 'click-target red'
   })

   button.addEventListener(('click'), () => {
      board.removeAttribute('class')
      button.disabled = true
      player1 = document.getElementById("player-1-name").value
      player2 = document.getElementById("player-2-name").value

      //onmouseover - mouse event that does bubble (prevent??)
      const gameName = document.getElementById('game-name')
      vsDiv.innerText = `${player1} VS. ${player2}`
      vsDiv.setAttribute('id', 'title')
      gameName.appendChild(vsDiv)

      const changePlayer = () => {
         const clickTarget = document.querySelectorAll('.click-target')
         if (player === 'player 1') {
            clickTarget.forEach((el) => {
               el.className = 'click-target black'
            })
            player = 'player 2'
         } else if (player === 'player 2') {
            player = 'player 1'
            clickTarget.forEach((target) => {
               target.className = 'click-target red'
            })
         }
      }


      const placeTile = () => {

         clickTargets.addEventListener(('click'), (event) => {
            let square = event.target.id
            let indexNum = square.slice(square.length - 1)
            let tilesInColumn = 0
            for (let i = 5; i >= 0; i--) {
               const tile = document.querySelector(`#square-${i}-${indexNum}`)
               // console.log(tile, `#square-${i}-${indexNum}`)
               if (tile.firstChild) {
                  tilesInColumn++
               } else {
                  if (player === 'player 1') {
                     const div = document.createElement('div')
                     div.className = "token red"
                     tile.appendChild(div)
                  } else {
                     const div = document.createElement('div')
                     div.className = "token black"
                     tile.appendChild(div)
                  }
                  changePlayer()
                  if (tilesInColumn === 5) {
                     event.target.className = "click-target full"
                  }
                  checkForWinVertical()
                  checkForWinHorizontal()
                  checkForWinDiagonal(i, indexNum) //takes an arg
                  checkTie()
                  break;
               }
               //check class to include red or black.
               //fill tile change player
            }
         })
      }
      placeTile()

      const checkTie = () => {
         const click = document.querySelectorAll(".full")
         // console.log(click)
         if (click.length === 7) {
            vsDiv.innerText = `${player1} ties with ${player2}`
            board.disabled = true
         }
      }
      const checkForWinVertical = () => {
         const columns = document.querySelectorAll(".click-target")
         //   console.log(columns)
         //   console.log("In Vert Win")
         Array.from(columns).forEach((column) => {
            let indexNum = column.id.slice(column.id.length - 1)
            let countDownPlayer1 = 4
            let countDownPlayer2 = 4
            //  console.log("In for Each")
            for (let i = 0; i < 6; i++) {
               const tile = document.querySelector(`#square-${i}-${indexNum}`)

               if (tile.firstChild === null) {
                  countDownPlayer1 = 4
                  countDownPlayer2 = 4
               } else if (tile.firstChild.className === "token red") {
                  countDownPlayer1--
                  countDownPlayer2 = 4
               } else if (tile.firstChild.className === "token black") {
                  countDownPlayer2--
                  countDownPlayer1 = 4
               }
               if (countDownPlayer1 === 0) {
                  vsDiv.innerText = `${player1} wins!!!`
                  clickTargets.disabled = true
               }
               if (countDownPlayer2 === 0) {
                  vsDiv.innerText = `${player2} wins!!!`
                  clickTargets.disabled = true
               }
               // console.log("Player 1", countDownPlayer1)
               // console.log("Player 2", countDownPlayer2)
            }
         })
      }
      const checkForWinHorizontal = () => {
         for (let i = 0; i < 6; i++) {
            let countDownPlayer1 = 4
            let countDownPlayer2 = 4
            for (let j = 0; j <= 6; j++) {
               const tile = document.querySelector(`#square-${i}-${j}`)
               // console.log( i, j)

               if (!tile.firstChild) {
                  countDownPlayer1 = 4
                  countDownPlayer2 = 4
               } else if (tile.firstChild.className === "token red") {
                  countDownPlayer1--
                  countDownPlayer2 = 4
               } else if (tile.firstChild.className === "token black") {
                  countDownPlayer2--
                  countDownPlayer1 = 4
               }
               if (countDownPlayer1 === 0) {
                   vsDiv.innerText = `${player1} wins!!!`
                   board.disabled = true
               }
               if (countDownPlayer2 === 0) {
                   vsDiv.innerText = `${player2} wins!!!`
                   board.disabled = true
               }
            }
         }
      }
      //[row, colum]
      //[5,6] [4,5] [3,4] [2,3]


      const checkForWinDiagonal = (rowIndex, columIndex) => {
         const movesUp = []
         const movesDown = []

         let nextRow = rowIndex
         let nextColumn = columIndex

         const tile = document.querySelector(`#square-${nextRow}-${nextColumn}`)
         movesUp.push(tile)
         movesDown.push(tile)


         while (document.querySelector(`#square-${++nextRow}-${++nextColumn}`)) {
            movesUp.push(document.querySelector(`#square-${nextRow}-${nextColumn}`))
         }

         nextRow = rowIndex
         nextColumn = columIndex

         while (document.querySelector(`#square-${--nextRow}-${--nextColumn}`)) {
            movesUp.unshift(document.querySelector(`#square-${nextRow}-${nextColumn}`))
         }

         nextRow = rowIndex
         nextColumn = columIndex

         while (document.querySelector(`#square-${++nextRow}-${--nextColumn}`)) {
            movesDown.push(document.querySelector(`#square-${nextRow}-${nextColumn}`))
         }

         nextRow = rowIndex
         nextColumn = columIndex

         while (document.querySelector(`#square-${--nextRow}-${++nextColumn}`)) {
            movesDown.unshift(document.querySelector(`#square-${nextRow}-${nextColumn}`))
         }
         let countDownPlayer1 = 4
         let countDownPlayer2 = 4
         movesUp.forEach((tile) => {
            if (!tile.firstChild) {
               countDownPlayer1 = 4
               countDownPlayer2 = 4
            } else if (tile.firstChild.className === "token red") {
               countDownPlayer1--
               countDownPlayer2 = 4
            } else if (tile.firstChild.className === "token black") {
               countDownPlayer2--
               countDownPlayer1 = 4
            }
            if (countDownPlayer1 === 0) {
                vsDiv.innerText = `${player1} wins!!!`
                board.disabled = true
            }
            if (countDownPlayer2 === 0) {
                 vsDiv.innerText = `${player2} wins!!!`
                 board.disabled = true
            }
         })
         countDownPlayer1 = 4
         countDownPlayer2 = 4
         movesDown.forEach((tile) => {
            if (!tile.firstChild) {
               countDownPlayer1 = 4
               countDownPlayer2 = 4
            } else if (tile.firstChild.className === "token red") {
               countDownPlayer1--
               countDownPlayer2 = 4
            } else if (tile.firstChild.className === "token black") {
               countDownPlayer2--
               countDownPlayer1 = 4
            }
            if (countDownPlayer1 === 0) {
                vsDiv.innerText = `${player1} wins!!!`
                board.disabled = true
            }
            if (countDownPlayer2 === 0) {
                vsDiv.innerText = `${player2} wins!!!`
                board.disabled = true //! notice still on function
            }
         })


         //while querySelector gives an element
         //add the element it returns into the corresponding array
         //move diagonally

      }

   })
})


//Disable board after victory
//Store board state
//Animate token drop
