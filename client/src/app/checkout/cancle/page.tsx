import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="text-3xl font-bold tracking-tighter">Process Cancelled</h1>
          <p className="text-muted-foreground">Your process has been cancelled.</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We&apos;re sorry to see you go. If you have any questions or concerns, please don&apos;t hesitate to contact our support team.
          </p>
          <div className="space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/support">Contact Support</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}