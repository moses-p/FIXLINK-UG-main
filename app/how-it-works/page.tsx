import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Users, CreditCard, CheckCircle, ArrowRight, Shield, Clock, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Search & Browse",
      description: "Find service providers by category, location, or specific needs using our advanced search filters.",
      details: [
        "Browse by service category",
        "Filter by location and price range",
        "Read reviews and ratings",
        "View provider profiles and portfolios",
      ],
    },
    {
      number: 2,
      icon: Users,
      title: "Connect & Communicate",
      description: "Contact verified providers directly and discuss your project requirements in detail.",
      details: [
        "Send direct messages to providers",
        "Schedule consultations",
        "Get detailed quotes",
        "Ask questions about services",
      ],
    },
    {
      number: 3,
      icon: CreditCard,
      title: "Pay Securely",
      description: "Make secure payments through our platform using MTN Mobile Money or PayPal.",
      details: ["Secure payment processing", "Multiple payment options", "Payment protection", "Transparent pricing"],
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers undergo thorough background checks and verification processes.",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get connected with available professionals in your area within minutes.",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "Our rating system ensures you always get top-quality service.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              <Image src="/fixlinkug-logo.jpeg" alt="FixLinkUg Logo" width={40} height={40} />
              <span>FixLinkUg</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Browse Services
              </Link>
              <Link href="/how-it-works" className="text-blue-600 font-medium">
                How It Works
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              How FixLinkUg Works
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with FixLinkUg is simple. Follow these three easy steps to find and hire the perfect
            service provider for your needs.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 transform translate-x-4 z-0" />
                )}

                <Card className="relative z-10 border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="text-center pb-6">
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 relative">
                      <step.icon className="h-10 w-10 text-blue-600" />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-3">{step.title}</CardTitle>
                    <CardDescription className="text-lg text-gray-600">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ServiceConnect?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* For Service Providers Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 mb-20 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Service Providers</h2>
            <p className="text-xl text-green-100">Join our platform and grow your business</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">How to Get Started as a Provider:</h3>
              <div className="space-y-4">
                {[
                  "Complete your professional profile",
                  "Upload required documents for verification",
                  "Set your service rates and availability",
                  "Start receiving client requests",
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-green-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6">
                <h4 className="text-xl font-semibold mb-4">Investment Required</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Registration Fee:</span>
                    <span className="font-bold">50,000 UGX</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Subscription:</span>
                    <span className="font-bold">25,000 UGX</span>
                  </div>
                  <div className="bg-yellow-400/20 rounded-lg p-2 mt-4">
                    <span className="font-bold">🎉 First month FREE!</span>
                  </div>
                </div>
              </div>
              <Link href="/register/provider">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                  Become a Provider
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm p-12">
            <CardContent>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of satisfied customers who found their perfect service provider
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href="/services" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Browse Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/register/provider" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full border-2 border-blue-200 hover:bg-blue-50">
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
