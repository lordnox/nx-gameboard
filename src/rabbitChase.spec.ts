
import { RabbitChaseBoard } from './rabbitChase'

describe('rabbitChase', () => {
  it.skip('should generate a game board', () => {
    const rabbitChase = RabbitChaseBoard({ seed: 'a' })
    rabbitChase.init()
    console.log(rabbitChase.drawBoard())

    // console.log('---------')
    // console.log('---------')
    // return

    const rabbitChase1 = RabbitChaseBoard({ seed: 'Ruth' })
    rabbitChase.init()
    console.log(rabbitChase.drawBoard())

    const rabbitChase2 = RabbitChaseBoard({ seed: 'Tobi' })
    rabbitChase.init()
    console.log(rabbitChase.drawBoard())

    console.log('---------')
    console.log('---------')
  })

  it.skip('should render it to json correctly', () => {
    const rabbitChase = RabbitChaseBoard({})
    rabbitChase.init()
    console.log(rabbitChase.toJSON())
    console.log(rabbitChase.drawBoard())
    console.log(rabbitChase.drawBoard(true))
  })
})
