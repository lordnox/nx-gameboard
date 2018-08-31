
import { TicTacToe } from './tictactoe'

describe('tictactoe', () => {
  it('easy game for X', () => {
    const tictactoe = TicTacToe({})
    // should have no winner
    expect(tictactoe.winner()).toBe(' ')

    tictactoe.place(0, 0)
    expect(() => {
      tictactoe.place(0, 0)
    }).toThrow()
    tictactoe.place(1, 0)
    tictactoe.place(0, 1)
    tictactoe.place(1, 1)
    tictactoe.place(0, 2)
    expect(tictactoe.winner()).toBe('X')

    expect(() => {
      tictactoe.place(2, 2)
    }).toThrow()
  })

  it('X plays stupid', () => {
    const tictactoe = TicTacToe({})
    tictactoe.place(0, 0)
    tictactoe.place(2, 0)
    tictactoe.place(1, 1)
    tictactoe.place(2, 2)
    tictactoe.place(0, 2)
    tictactoe.place(2, 1)
    expect(tictactoe.winner()).toBe('O')
  })

  it('X wins with an /', () => {
    const tictactoe = TicTacToe({})
    tictactoe.place(1, 1)
    tictactoe.place(1, 0)
    tictactoe.place(2, 0)
    tictactoe.place(1, 2)
    tictactoe.place(0, 2)
    expect(tictactoe.winner()).toBe('X')
  })
})
