import { Button } from '@/shared/components/ui/button'
import { ScanEye } from 'lucide-react'
import React from 'react'

export default function FocusButton() {
  return (
    <Button className="text-xs font-semibold">
            Focus Mode <ScanEye/>
          </Button>
  )
}
