import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import decisions from '@/data/decisions'

type DecisionNode =
  | { question: string; options: { label: string; next: string }[] }
  | { recommendation: string }

const tree = decisions as Record<string, DecisionNode>

export function DecisionEngine() {
  const [currentId, setCurrentId] = useState('root')
  const [history, setHistory] = useState<string[]>([])

  const node = tree[currentId]

  function goTo(nextId: string) {
    setHistory((h) => [...h, currentId])
    setCurrentId(nextId)
  }

  function goBack() {
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setCurrentId(prev)
  }

  function restart() {
    setHistory([])
    setCurrentId('root')
  }

  const isRecommendation = 'recommendation' in node

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              {isRecommendation ? '✨ Here you go' : '💭 Let\'s figure it out'}
            </p>
            <CardTitle className="text-2xl leading-snug">
              {'question' in node ? node.question : node.recommendation}
            </CardTitle>
          </CardHeader>

          {!isRecommendation && (
            <CardContent className="flex flex-col gap-3 pt-2">
              {'options' in node &&
                node.options.map((opt) => (
                  <Button
                    key={opt.next}
                    variant="outline"
                    className="h-auto py-3 px-4 text-left justify-start whitespace-normal leading-snug text-base"
                    onClick={() => goTo(opt.next)}
                  >
                    {opt.label}
                  </Button>
                ))}
            </CardContent>
          )}
        </Card>

        <div className="flex gap-3 mt-4 justify-center">
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={goBack}>
              ← Back
            </Button>
          )}
          {(history.length > 0 || isRecommendation) && (
            <Button variant="ghost" size="sm" onClick={restart}>
              Start over
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
