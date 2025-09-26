export type CellAnswers = string[]

export type CellConfig = {
  answers: CellAnswers
  altAccept?: string[]
  disabled?: boolean
  note?: string
}

export type Row = {
  base: string
  N?: CellConfig
  V?: CellConfig
  Adj?: CellConfig
  hint?: string
  tags?: string[]
}

export type CellState = "correct" | "alternative" | "incorrect" | "empty"

export type StudentAnswer = {
  N: string
  V: string
  Adj: string
}

export type StudentProgress = {
  studentName: string
  answers: Record<string, StudentAnswer>
  lastUpdated: string
}
