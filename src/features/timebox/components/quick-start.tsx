import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import React from 'react'
import CreateTimeblock from './create-timeblock'
import Presets from './presets'

export default function QuickStart() {
  return (
    <Card className="flex flex-col flex-1 bg-white/70 overflow-hidden">
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription className='font-heading font-normal'>Creating a new timeblock</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 overflow-y-auto">
                    <Presets />
                    <Separator className="my-6" />
                    <CreateTimeblock />
                  </CardContent>
                </Card>
  )
}
