import type { CellConfig, CellState } from "@/types/word-formation"

export function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, "") // Remove hyphens and spaces
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
}

export function validateAnswer(userAnswer: string, cellConfig?: CellConfig): CellState {
  if (!cellConfig || !userAnswer.trim()) return "empty"

  const normalized = normalizeAnswer(userAnswer)

  // Check correct answers
  const correctAnswers = cellConfig.answers.map(normalizeAnswer)
  if (correctAnswers.includes(normalized)) {
    return "correct"
  }

  // Check alternative acceptable answers
  if (cellConfig.altAccept) {
    const altAnswers = cellConfig.altAccept.map(normalizeAnswer)
    if (altAnswers.includes(normalized)) {
      return "alternative"
    }
  }

  return "incorrect"
}

export function getCellStateColor(state: CellState): string {
  switch (state) {
    case "correct":
      return "bg-green-100 border-green-500 text-green-800"
    case "alternative":
      return "bg-amber-100 border-amber-500 text-amber-800"
    case "incorrect":
      return "bg-red-100 border-red-500 text-red-800"
    default:
      return ""
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function exportToCSV(data: any[], filename: string) {
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => `"${row[header]}"`).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToJSON(data: any[], filename: string) {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
