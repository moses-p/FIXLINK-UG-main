"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"

export default function ClientRegistration() {
  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = "/login"
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-blue-600 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span>FixLink Uganda</span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Role-Based Authentication</CardTitle>
            <CardDescription className="text-lg">
              FixLink uses role-based authentication for enhanced security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-blue-600" />
                <h3 className="font-semibold text-blue-900">For Clients</h3>
              </div>
              <p className="text-blue-800 mb-4">
                Client accounts are created and managed by our administrators to ensure platform security and quality
                control.
              </p>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Contact our support team to request access</p>
                <p>• Provide verification documents</p>
                <p>• Receive login credentials once approved</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">You will be redirected to the login page in a few seconds...</p>
              <div className="flex flex-col space-y-3">
                <Link href="/login">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Go to Login
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-2 border-blue-200 hover:bg-blue-50">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
