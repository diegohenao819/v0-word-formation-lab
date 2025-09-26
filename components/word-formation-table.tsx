"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Eye, EyeOff, Download, RotateCcw, CheckCircle, HelpCircle } from "lucide-react"
import { DATA } from "@/data/word-formation-data"
import type { StudentAnswer, StudentProgress, CellState } from "@/types/word-formation"
import { validateAnswer, getCellStateColor, shuffleArray, exportToCSV, exportToJSON } from "@/utils/word-formation"

const TEACHER_PIN = "0426"

export default function WordFormationTable() {
  const [studentName, setStudentName] = useState("")
  const [answers, setAnswers] = useState<Record<string, StudentAnswer>>({})
  const [cellStates, setCellStates] = useState<Record<string, Record<string, CellState>>>({})
  const [isShuffled, setIsShuffled] = useState(false)
  const [letterFilter, setLetterFilter] = useState("All")
  const [showHint, setShowHint] = useState("")
  const [focusedCell, setFocusedCell] = useState<{ base: string; column: keyof StudentAnswer } | null>(null)
  const [isTeacherMode, setIsTeacherMode] = useState(false)
  const [teacherPin, setTeacherPin] = useState("")
  const [showAnswers, setShowAnswers] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState({
    N: true,
    V: true,
    Adj: true,
  })
  const [isChecked, setIsChecked] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailStudentName, setEmailStudentName] = useState("")

  // Filter and shuffle data
  const filteredData = useMemo(() => {
    let filtered = DATA
    if (letterFilter !== "All") {
      filtered = DATA.filter((row) => row.base.toLowerCase().startsWith(letterFilter.toLowerCase()))
    }
    return isShuffled ? shuffleArray(filtered) : filtered
  }, [letterFilter, isShuffled])

  // Load progress from localStorage
  useEffect(() => {
    if (studentName) {
      const saved = localStorage.getItem(`wflab:${studentName}`)
      if (saved) {
        const progress: StudentProgress = JSON.parse(saved)
        setAnswers(progress.answers)
      }
    }
  }, [studentName])

  // Save progress to localStorage
  useEffect(() => {
    if (studentName && Object.keys(answers).length > 0) {
      const progress: StudentProgress = {
        studentName,
        answers,
        lastUpdated: new Date().toISOString(),
      }
      localStorage.setItem(`wflab:${studentName}`, JSON.stringify(progress))
    }
  }, [studentName, answers])

  const handleAnswerChange = (base: string, column: keyof StudentAnswer, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [base]: {
        ...prev[base],
        [column]: value,
      },
    }))
  }

  const handleFocus = (base: string, column: keyof StudentAnswer) => {
    console.log("[v0] Focus set to:", base, column)
    setFocusedCell({ base, column })
  }

  const handleBlur = () => {
    // The focused cell will be cleared when user clicks on another cell
  }

  const handleKeyDown = (e: React.KeyboardEvent, base: string, column: keyof StudentAnswer) => {
    if (e.key === "Enter") {
      // Validate just this specific cell
      const row = filteredData.find((r) => r.base === base)
      if (!row) return

      const userAnswer = answers[base]?.[column] || ""
      const cellConfig = row[column]
      const cellState = validateAnswer(userAnswer, cellConfig)

      setCellStates((prev) => ({
        ...prev,
        [base]: {
          ...prev[base],
          [column]: cellState,
        },
      }))

      // Mark as checked if any validation has occurred
      setIsChecked(true)
    }
  }

  const checkAnswers = () => {
    const newCellStates: Record<string, Record<string, CellState>> = {}

    filteredData.forEach((row) => {
      newCellStates[row.base] = {}
      const userAnswers = answers[row.base] || { N: "", V: "", Adj: "" }
      ;(["N", "V", "Adj"] as const).forEach((column) => {
        const cellConfig = row[column]
        const userAnswer = userAnswers[column]
        newCellStates[row.base][column] = validateAnswer(userAnswer, cellConfig)
      })
    })

    setCellStates(newCellStates)
    setIsChecked(true)
  }

  const showOneHint = () => {
    console.log("[v0] showOneHint called, focusedCell:", focusedCell)

    if (!focusedCell) {
      setShowHint("Please click on a cell first to get a hint for that word.")
      console.log("[v0] No focused cell, showing generic message")
      return
    }

    const { base, column } = focusedCell
    const row = filteredData.find((r) => r.base === base)
    console.log("[v0] Found row:", row, "for base:", base, "column:", column)

    if (!row || !row[column] || row[column]?.disabled) {
      setShowHint("No hint available for this cell.")
      console.log("[v0] No row or disabled cell")
      return
    }

    const cellConfig = row[column]
    if (!cellConfig?.answers || cellConfig.answers.length === 0) {
      setShowHint("No hint available for this cell.")
      console.log("[v0] No answers available")
      return
    }

    // Get the first correct answer
    const correctAnswer = cellConfig.answers[0]
    const userAnswer = answers[base]?.[column] || ""
    console.log("[v0] Correct answer:", correctAnswer, "User answer:", userAnswer)

    // Find the first letter that the user hasn't typed correctly
    let hintLetter = ""
    let hintPosition = 0

    for (let i = 0; i < correctAnswer.length; i++) {
      if (i >= userAnswer.length || userAnswer[i].toLowerCase() !== correctAnswer[i].toLowerCase()) {
        hintLetter = correctAnswer[i]
        hintPosition = i + 1
        break
      }
    }

    if (hintLetter) {
      const hintMessage = `Letter ${hintPosition}: "${hintLetter}" (for ${base} → ${column})`
      setShowHint(hintMessage)
      console.log("[v0] Setting hint:", hintMessage)
    } else {
      const hintMessage = `You're on the right track! (for ${base} → ${column})`
      setShowHint(hintMessage)
      console.log("[v0] User is correct, showing encouragement:", hintMessage)
    }
  }

  const resetAll = () => {
    setAnswers({})
    setCellStates({})
    setShowHint("")
    setIsChecked(false)
    setFocusedCell(null)
  }

  const calculateScore = () => {
    let correct = 0
    let total = 0

    Object.values(cellStates).forEach((rowStates) => {
      Object.values(rowStates).forEach((state) => {
        if (state !== "empty") {
          total++
          if (state === "correct") correct++
        }
      })
    })

    return { correct, total }
  }

  const exportResults = (format: "csv" | "json") => {
    const results = filteredData.map((row) => {
      const userAnswers = answers[row.base] || { N: "", V: "", Adj: "" }
      const states = cellStates[row.base] || {}

      return {
        base: row.base,
        studentN: userAnswers.N,
        studentV: userAnswers.V,
        studentAdj: userAnswers.Adj,
        stateN: states.N || "empty",
        stateV: states.V || "empty",
        stateAdj: states.Adj || "empty",
      }
    })

    const { correct, total } = calculateScore()
    const exportData = {
      studentName,
      timestamp: new Date().toISOString(),
      score: `${correct}/${total}`,
      results,
    }

    if (format === "csv") {
      exportToCSV([exportData], `word-formation-${studentName}-${Date.now()}.csv`)
    } else {
      exportToJSON([exportData], `word-formation-${studentName}-${Date.now()}.json`)
    }
  }

  const validateTeacherPin = () => {
    if (teacherPin === TEACHER_PIN) {
      setIsTeacherMode(true)
      setTeacherPin("")
    }
  }

  const { correct, total } = calculateScore()

  const isCompleted = total > 0 && correct === total

  const sendProgressEmail = () => {
    const nameToUse = emailStudentName || studentName
    if (!nameToUse.trim()) {
      alert("Please enter your name first.")
      return
    }

    const { correct, total } = calculateScore()
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    const subject = encodeURIComponent(`Word Formation Lab - Progress Report by ${nameToUse}`)
    const body = encodeURIComponent(`Dear Professor,

I am submitting my current progress on the Word Formation Lab activity.

Student Details:
- Name: ${nameToUse}
- Submission Date: ${new Date().toLocaleDateString()}
- Current Score: ${correct}/${total} (${percentage}%)
- Questions Attempted: ${total}
- Questions Correct: ${correct}

${
  total === 0
    ? "I have not started answering questions yet."
    : percentage === 100
      ? "I have completed all attempted questions successfully!"
      : `I have answered ${total} questions with ${correct} correct answers.`
}

Best regards,
${nameToUse}`)

    const mailtoLink = `mailto:dialhenao@utp.edu.co?subject=${subject}&body=${body}`
    window.open(mailtoLink, "_blank")
    setEmailDialogOpen(false)
    setEmailStudentName("")
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">Word Formation Lab</h1>
            <p className="text-lg text-indigo-700">Complete the word forms: Noun (N), Verb (V), Adjective (Adj)</p>
          </div>

          {isCompleted && studentName && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h2 className="text-2xl font-bold text-green-800">Congratulations!</h2>
                  </div>
                  <p className="text-green-700 text-lg">
                    You have successfully completed all word formation exercises with a perfect score of {correct}/
                    {total}!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Toolbar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Student Name</label>
                  <Input
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Filter by initial</label>
                  <Select value={letterFilter} onValueChange={setLetterFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                        <SelectItem key={letter} value={letter}>
                          {letter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch checked={isShuffled} onCheckedChange={setIsShuffled} id="shuffle" />
                  <label htmlFor="shuffle" className="text-sm font-medium">
                    Shuffle rows
                  </label>
                </div>

                {isTeacherMode && (
                  <div className="flex items-center space-x-2">
                    <Switch checked={showAnswers} onCheckedChange={setShowAnswers} id="show-answers" />
                    <label htmlFor="show-answers" className="text-sm font-medium">
                      Show answers
                    </label>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={checkAnswers} className="bg-indigo-600 hover:bg-indigo-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check
                </Button>

                <Button onClick={showOneHint} variant="outline">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Show 1 hint
                </Button>

                <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
                      📧 Send Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Progress Email</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <Input
                          value={emailStudentName || studentName}
                          onChange={(e) => setEmailStudentName(e.target.value)}
                          placeholder="Enter your full name..."
                          className="w-full"
                        />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Current Progress:</h4>
                        <p className="text-sm text-gray-600">
                          Score: {correct}/{total} ({total > 0 ? Math.round((correct / total) * 100) : 0}%)
                        </p>
                        <p className="text-sm text-gray-600">
                          This will send your current progress to dialhenao@utp.edu.co
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={sendProgressEmail} className="flex-1">
                          Send Email
                        </Button>
                        <Button variant="outline" onClick={() => setEmailDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button onClick={resetAll} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>

                <Button onClick={() => exportResults("csv")} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>

                <Button onClick={() => exportResults("json")} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      {isTeacherMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                      Teacher Mode
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Teacher Access</DialogTitle>
                    </DialogHeader>
                    {!isTeacherMode ? (
                      <div className="space-y-4">
                        <Input
                          type="password"
                          value={teacherPin}
                          onChange={(e) => setTeacherPin(e.target.value)}
                          placeholder="Enter PIN"
                        />
                        <Button onClick={validateTeacherPin} className="w-full">
                          Validate
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-green-600">✅ Teacher mode activated</p>
                        <Button onClick={() => setIsTeacherMode(false)} variant="outline" className="w-full">
                          Exit teacher mode
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Score */}
          {isChecked && (
            <div className="mb-4" aria-live="polite">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Score: {correct}/{total}
              </Badge>
            </div>
          )}

          {/* Hint */}
          {showHint && (
            <Card className="mb-4 border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2" aria-live="polite">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-800 font-medium">Hint: {showHint}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-indigo-900 border-b">Base Word</th>
                      {visibleColumns.N && (
                        <th className="px-4 py-3 text-left font-semibold text-indigo-900 border-b">Noun (N)</th>
                      )}
                      {visibleColumns.V && (
                        <th className="px-4 py-3 text-left font-semibold text-indigo-900 border-b">Verb (V)</th>
                      )}
                      {visibleColumns.Adj && (
                        <th className="px-4 py-3 text-left font-semibold text-indigo-900 border-b">Adjective (Adj)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, index) => {
                      const userAnswers = answers[row.base] || { N: "", V: "", Adj: "" }
                      const states = cellStates[row.base] || {}

                      return (
                        <tr key={`${row.base}-${index}`} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{row.base}</td>

                          {visibleColumns.N && (
                            <td className="px-4 py-3">
                              {row.N?.disabled ? (
                                <div className="flex items-center space-x-2">
                                  <Input disabled className="bg-gray-100" />
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="w-4 h-4 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{row.N.note}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              ) : (
                                <Input
                                  value={userAnswers.N}
                                  onChange={(e) => handleAnswerChange(row.base, "N", e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, row.base, "N")}
                                  onFocus={() => handleFocus(row.base, "N")}
                                  onBlur={handleBlur}
                                  placeholder="type here..."
                                  className={`${getCellStateColor(states.N || "empty")}`}
                                  aria-label={`Noun for ${row.base}`}
                                />
                              )}
                              {showAnswers && row.N && (
                                <div className="text-xs text-green-600 mt-1">{row.N.answers.join(", ")}</div>
                              )}
                            </td>
                          )}

                          {visibleColumns.V && (
                            <td className="px-4 py-3">
                              {row.V?.disabled ? (
                                <div className="flex items-center space-x-2">
                                  <Input disabled className="bg-gray-100" />
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="w-4 h-4 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{row.V.note}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              ) : (
                                <Input
                                  value={userAnswers.V}
                                  onChange={(e) => handleAnswerChange(row.base, "V", e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, row.base, "V")}
                                  onFocus={() => handleFocus(row.base, "V")}
                                  onBlur={handleBlur}
                                  placeholder="type here..."
                                  className={`${getCellStateColor(states.V || "empty")}`}
                                  aria-label={`Verb for ${row.base}`}
                                />
                              )}
                              {showAnswers && row.V && (
                                <div className="text-xs text-green-600 mt-1">{row.V.answers.join(", ")}</div>
                              )}
                            </td>
                          )}

                          {visibleColumns.Adj && (
                            <td className="px-4 py-3">
                              {row.Adj?.disabled ? (
                                <div className="flex items-center space-x-2">
                                  <Input disabled className="bg-gray-100" />
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="w-4 h-4 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{row.Adj.note}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              ) : (
                                <Input
                                  value={userAnswers.Adj}
                                  onChange={(e) => handleAnswerChange(row.base, "Adj", e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, row.base, "Adj")}
                                  onFocus={() => handleFocus(row.base, "Adj")}
                                  onBlur={handleBlur}
                                  placeholder="type here..."
                                  className={`${getCellStateColor(states.Adj || "empty")}`}
                                  aria-label={`Adjective for ${row.base}`}
                                />
                              )}
                              {showAnswers && row.Adj && (
                                <div className="text-xs text-green-600 mt-1">{row.Adj.answers.join(", ")}</div>
                              )}
                            </td>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5" />
                <span>Quick rules for negative prefixes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">un- (Anglo-Saxon)</h4>
                  <p>happy → unhappy, fair → unfair, kind → unkind</p>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">in-/im-/il-/ir- (Latin)</h4>
                  <p>possible → impossible, legal → illegal, responsible → irresponsible</p>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">dis-</h4>
                  <p>honest → dishonest, loyal → disloyal, obedient → disobedient</p>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">non-</h4>
                  <p>negotiable → nonnegotiable, public → nonpublic</p>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">-less</h4>
                  <p>care → careless, taste → tasteless, thought → thoughtless</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
