import { Search, Star, MapPin, Users, CreditCard, ArrowRight, CheckCircle, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredProviders = [
    {
      id: 1,
      name: "John Mukasa",
      service: "Plumbing Services",
      rating: 4.8,
      reviews: 127,
      location: "Kampala",
      price: "From 50,000 UGX",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
    },
    {
      id: 2,
      name: "Sarah Namuli",
      service: "House Cleaning",
      rating: 4.9,
      reviews: 89,
      location: "Entebbe",
      price: "From 30,000 UGX",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
    },
    {
      id: 3,
      name: "David Okello",
      service: "Electrical Work",
      rating: 4.7,
      reviews: 156,
      location: "Jinja",
      price: "From 75,000 UGX",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
    },
  ]

  const serviceCategories = [
    { name: "Home Maintenance", count: 45 },
    { name: "Cleaning Services", count: 32 },
    { name: "Electrical Work", count: 28 },
    { name: "Plumbing", count: 38 },
    { name: "Gardening", count: 22 },
    { name: "Security Services", count: 15 },
    { name: "Catering", count: 18 },
    { name: "Transportation", count: 25 },
  ]

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers are thoroughly vetted and verified for your safety and peace of mind.",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get connected with available professionals in your area within minutes, not hours.",
    },
    {
      icon: CheckCircle,
      title: "Quality Guaranteed",
      description: "Our rating system ensures you always get top-quality service from trusted providers.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
                <Image src="/fixlinkug-logo.jpeg" alt="FixLinkUg Logo" width={40} height={40} />
                <span>FixLinkUg</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Browse Services
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
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

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
              Find Trusted Service Providers in Uganda
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
              Connect with verified professionals for all your service needs. From home maintenance to business
              solutions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for services (e.g., plumber, cleaner, electrician)"
                  className="pl-12 pr-32 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
                />
                <Link href="/services">
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-6">
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
              {serviceCategories.map((category) => (
                <Link key={category.name} href={`/services?category=${encodeURIComponent(category.name)}`}>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-white/70 hover:bg-white border border-gray-200 hover:border-blue-300 transition-all cursor-pointer hover:shadow-md"
                  >
                    {category.name} ({category.count})
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose FixLinkUg?</h3>
            <p className="text-xl text-gray-600">Experience the difference with our platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service Providers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Service Providers</h3>
            <p className="text-xl text-gray-600">Meet some of our top-rated professionals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <Card
                key={provider.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <img
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.name}
                      className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    {provider.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{provider.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-blue-600">{provider.service}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{provider.rating}</span>
                      <span className="ml-1 text-gray-500 text-sm">({provider.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span className="ml-1 text-sm">{provider.location}</span>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-green-600">{provider.price}</p>
                  <Link href={`/services/provider/${provider.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group-hover:shadow-lg transition-all">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              >
                View All Providers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">How It Works</h3>
            <p className="text-xl text-blue-100">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Search & Browse",
                desc: "Find service providers by category, location, or specific needs.",
              },
              {
                icon: Users,
                title: "Connect & Communicate",
                desc: "Contact verified providers and discuss your requirements.",
              },
              { icon: CreditCard, title: "Pay Securely", desc: "Make secure payments via MTN Mobile Money or PayPal." },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">
                  {index + 1}. {step.title}
                </h4>
                <p className="text-blue-100 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/how-it-works">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-gray-300 mb-12">Join thousands of satisfied customers and service providers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/services" className="flex-1">
              <Button size="lg" className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                Find Services
              </Button>
            </Link>
            <Link href="/register/provider" className="flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-white border-white hover:bg-white hover:text-gray-900 font-semibold"
              >
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
                  <Image src="/fixlinkug-logo.jpeg" alt="FixLinkUg Logo" width={40} height={40} />
                  <span>FixLinkUg</span>
                </Link>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting clients with trusted service providers across Uganda.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Browse Services
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/register/provider" className="hover:text-white transition-colors">
                    Join Platform
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FixLinkUg. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
