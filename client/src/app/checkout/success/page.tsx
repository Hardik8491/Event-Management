import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-3xl font-bold tracking-tighter">Success!</h1>
          <p className="text-muted-foreground">Your process has been completed successfully.</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Thank you for using our service. Your request has been processed and all necessary actions have been taken.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}