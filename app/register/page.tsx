import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, UserCheck, ArrowLeft, CheckCircle, Star, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-blue-600 mb-6">
            <Image src="/fixlinkug-logo.jpeg" alt="FixLinkUg Logo" width={40} height={40} />
            <span>FixLinkUg</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Join Our Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you want to get started and become part of Uganda's leading service marketplace
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Client Registration */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-3xl mb-2">I'm a Client</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Looking for trusted service providers for your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900">What you get:</h4>
                <div className="space-y-3">
                  {[
                    "Access to verified service providers",
                    "Secure payment options",
                    "Review and rating system",
                    "24/7 customer support",
                    "Free account creation",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium text-blue-900">Trusted by 1,200+ clients</span>
                </div>
                <p className="text-sm text-blue-700">
                  Join thousands of satisfied customers who found their perfect service provider
                </p>
              </div>

              <Link href="/register/client" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg py-3 text-lg">
                  Register as Client
                </Button>
              </Link>
              <p className="text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Provider Registration */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 border-l-4 border-l-green-500">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-3xl mb-2">I'm a Service Provider</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Ready to offer your services and grow your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900">What you get:</h4>
                <div className="space-y-3">
                  {[
                    "Professional profile showcase",
                    "Direct client connections",
                    "Secure payment processing",
                    "Business analytics dashboard",
                    "Marketing support",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-900">Investment Required:</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-800">Registration Fee:</span>
                    <span className="font-semibold text-green-900">50,000 UGX (one-time)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Monthly Subscription:</span>
                    <span className="font-semibold text-green-900">25,000 UGX</span>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg mt-2">
                    <p className="text-green-800 font-medium text-center">🎉 First month FREE!</p>
                  </div>
                </div>
              </div>

              <Link href="/register/provider" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg py-3 text-lg">
                  Register as Provider
                </Button>
              </Link>
              <p className="text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Access */}
        <div className="text-center mb-8">
          <Card className="max-w-md mx-auto border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <UserCheck className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-lg">Platform Administrator</CardTitle>
              <CardDescription>Administrative access for platform management</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                  Admin Access
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
