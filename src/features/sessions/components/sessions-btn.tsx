import { Button } from '@/shared/components/ui/button'
import { Sparkles } from 'lucide-react'
import React from 'react'

export default function SessionsButton() {
  return (
    <Button className="text-xs font-semibold">
        <span>Sessions</span>
        <Sparkles/>
    </Button>
  )
}
