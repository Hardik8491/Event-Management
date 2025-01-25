'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MailIcon, Loader2 } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useActivationMutation } from "@/redux-toolkit/features/auth/authApi"


type VerifyNumber = {
  "0": string
  "1": string
  "2": string
  "3": string
}

export default function Verification() {
  const router = useRouter()
  const { token } = useSelector((state: any) => state.auth)
  const [activation, { isSuccess, error, isLoading }] = useActivationMutation()
  const [invalidError, setInvalidError] = useState<boolean>(false)
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  })
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully")
      router.push("/auth/login")
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
        setInvalidError(true)
      } else {
        console.error("An error occurred:", error)
      }
    }
  }, [error, isSuccess, router])

  const verificationHandle = async () => {
    const verificationNumber = Object.values(verifyNumber).join("")
    if (verificationNumber.length !== 4) {
      setInvalidError(true)
      return
    }
    await activation({
      activationToken: token,
      activationCode: verificationNumber,
    })
  }

  const handleInputChange = (index: number, value: string) => {
    if (isNaN(Number(value))) {
      setInvalidError(true)
      return
    }
    setInvalidError(false)

    const newVerifyNumber = { ...verifyNumber, [index]: value }
    setVerifyNumber(newVerifyNumber)
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus()
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          <MailIcon className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Verify Your Email
        </h1>
        <p className="text-muted-foreground">
          Verification code was sent to hardikbhammar808@gmail.com. Check your
          spam folder if you can&apos;t find the email.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div>
            <Label htmlFor="otp" className="sr-only">
              Verification Code
            </Label>
            <div className="flex items-center justify-center gap-3">
              {Object.keys(verifyNumber).map((key, index) => (
                <Input
                  key={key}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  className={`w-14 h-14 text-center text-2xl font-bold ${
                    invalidError
                      ? "border-red-500 animate-shake"
                      : "border-input"
                  }`}
                  value={verifyNumber[key as keyof VerifyNumber]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          onClick={verificationHandle}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Verify
        </Button>
        <Button variant="outline" className="w-full">
          Resend Code
        </Button>
      </CardFooter>
    </Card>
  )
}