
import { BaseCell, generateGameboard } from './index'

export type Player = 'X' | 'O'
export type CellState = ' ' | Player
export interface TicTacToeCell extends BaseCell {
  state: CellState
}
export interface TicTacToeOptions {
  seed?: string,
  startingPlayer?: Player
}

export const TicTacToe = ({
  seed = 'TicTacToe',
  startingPlayer = 'X',
}: TicTacToeOptions) => {
  const board = generateGameboard({
    seed,
    cols: 3,
    rows: 3,
    cell: (baseCell): TicTacToeCell => ({ ...baseCell, state: ' ' }),
  })
  let currentPlayer: Player = startingPlayer
  let winner: CellState = ' '
  const togglePlayer = () => currentPlayer = currentPlayer === 'O' ? 'X' : 'O'

  // ┌──┬──┐  ╔══╦══╗ ╒══╤══╕ ╓──╥──╖
  // │  │  │  ║  ║  ║ │  │  │ ║  ║  ║
  // ├──┼──┤  ╠══╬══╣ ╞══╪══╡ ╟──╫──╢
  // │  │  │  ║  ║  ║ │  │  │ ║  ║  ║
  // └──┴──┘  ╚══╩══╝ ╘══╧══╛ ╙──╨──╜

  const drawBoard = () => {
    const content = board.rows.map(row => {
      const content = row.map(cellGetter => {
        const cell = cellGetter()
        return cell.state
      }).join(' | ')
      return `║ ${content} ║`
    }).join('\n╟───┼───┼───╢\n')
    return `╔═══╦═══╦═══╗\n${content}\n╚═══╧═══╧═══╝`
  }

  const checkCells = (state: CellState) => ([a, b, c]: TicTacToeCell[]) =>
    a.state === state && a.state === b.state && b.state === c.state

  const checkWinner = (player: Player) => {
    const checker = checkCells(player)

    // check the rows
    if(checker(board.row(0))
    || checker(board.row(1))
    || checker(board.row(2))
    ) return true

    // check the cols
    if(checker(board.col(0))
    || checker(board.col(1))
    || checker(board.col(2))
    ) return true

    // check diagonals
    const center = board.get(1, 1)
    if(checker([board.get(0, 0), center, board.get(2, 2)])
    || checker([board.get(2, 0), center, board.get(0, 2)])
    ) return true

    return false
  }

  const place = (x: number, y: number) => {
    const cell = board.get(x, y)
    if(winner !== ' ')
      throw new Error('Game is over')
    if(cell.state !== ' ')
      throw new Error('Field occupied')
    cell.state = currentPlayer
    if(checkWinner(currentPlayer))
      return winner = currentPlayer
    togglePlayer()
  }
  return { drawBoard, place, winner: () => winner }
}
