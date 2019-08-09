
export type CellGetter<Cell extends BaseCell = BaseCell> = () => Cell
export type BiDimensionalArray<Type> = Type[][]

export interface GenerateGameboardProps<Cell extends BaseCell = BaseCell> {
  seed: string
  rows: number
  cols: number
  cell: (cell: BaseCell) => Cell
  [key: string]: any
}

export interface Gameboard<Cell extends BaseCell = BaseCell> {
  rows: BiDimensionalArray<CellGetter<Cell>>
  cols: BiDimensionalArray<CellGetter<Cell>>
  cell: (index: number) => Cell
  cells: () => Cell[]
  get: (x: number, y: number) => Cell | null
  col: (x: number) => Cell[]
  row: (y: number) => Cell[]
}

export interface BaseCell {
  readonly x: number
  readonly y: number
  readonly index: number
  draw: <DrawOptions>(options: DrawOptions) => string
}

const defaultSettings: GenerateGameboardProps = {
  seed: `${Math.random()}`,
  rows: 3,
  cols: 3,
  cell: (cell: BaseCell) => cell,
}

export const range = (startOrLength: number, optionalStart?: number, optionalStep?: number): number[] => {
  /**
   * @param <startOrLength> Return a list integers of zero until <startOrLength> value.
   * @param <optionalStart> Return a list integers of <optionalStart> until <startOrLength> value.
   * @param <optionalStep> ...with steps <optionalStep> value.
   * @return Return a array list
   */

  const start: number = (optionalStart) ? startOrLength : 0
  const stop: number = (optionalStart) ? optionalStart : startOrLength
  const step: number = (optionalStep) ? optionalStep : 1

  const t: number[] = []
  for (let i = start; i < stop; i = i + step) t.push(i)
  return t
}

// removes all dublicates from an array
export const arrayUnique = <T>(array: T[]): T[] => Array.from(new Set(array))
// flattens an array
export const arrayConcat = <T>(array: BiDimensionalArray<T>): T[] => array.flat()
// mapping function that calls the mapped element
export const call = <T>(fn: () => T) => fn()

export const drawBoard = <T>(board: Gameboard, options?: T) => {
  const space = '━━━'
  const centerSpace = '───'
  const header = board.rows.map(() => space).join('━┯━')
  const center = board.rows.map(() => centerSpace).join('─┼─')
  const footer = board.rows.map(() => space).join('━┷━')
  const content = board.rows.map(row => {
    const content = row.map(cellGetter => cellGetter().draw(options)).join(' | ')
    return `┃ ${content} ┃`
  }).join(`\n┠─${center}─┨\n`)
  return `┏━${header}━┓\n${content}\n┗━${footer}━┛`
}

export const generateGameboard = <Cell extends BaseCell = BaseCell>(
  partialLocalSettings?: Partial<GenerateGameboardProps<Cell>>,
): Gameboard<Cell> => {
  const settings: GenerateGameboardProps<Cell> = {
    ...(defaultSettings as GenerateGameboardProps<Cell>),
    ...partialLocalSettings,
  }

  type Getter = CellGetter<Cell>

  const getCell = (index: number) => cells[index]
  const cellGetter = (index: number) => () => getCell(index)

  const rows: BiDimensionalArray<Getter> = range(settings.rows).map(() => [])
  const cols: BiDimensionalArray<Getter> = range(settings.cols).map(() => [])
  const cells = arrayConcat(range(settings.rows).map(y => {
    return range(settings.cols).map(x => {
      const index = y * settings.rows + x
      rows[y].push(cellGetter(index))
      cols[x].push(cellGetter(index))
      return settings.cell({
        x,
        y,
        index,
        draw: () => `${x}:${y}`,
      })
    })
  }))

  return {
    rows,
    cols,
    cell: (index: number) => cells[index],
    cells: () => cells,
    get: (x: number, y: number) => cols[x] && cols[x][y] ? cols[x][y]() : null,
    col: (x: number) => cols[x].map(call),
    row: (y: number) => rows[y].map(call),
  }
}
