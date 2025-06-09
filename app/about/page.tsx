import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Heart, ArrowLeft, CheckCircle, Star, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { number: "1,200+", label: "Active Users", icon: Users },
    { number: "89", label: "Verified Providers", icon: Shield },
    { number: "4.8", label: "Average Rating", icon: Star },
    { number: "2,450+", label: "Jobs Completed", icon: CheckCircle },
  ]

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To connect Ugandans with trusted, verified service providers, making it easier to find reliable professionals for every need.",
    },
    {
      icon: Heart,
      title: "Our Vision",
      description:
        "To become Uganda's leading service marketplace, empowering both service providers and clients through technology.",
    },
    {
      icon: Award,
      title: "Our Values",
      description:
        "Trust, quality, transparency, and community. We believe in building lasting relationships through excellent service.",
    },
  ]

  const team = [
    {
      name: "David Mukasa",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=150&width=150",
      description: "10+ years experience in tech and business development in Uganda.",
    },
    {
      name: "Sarah Namuli",
      role: "Head of Operations",
      image: "/placeholder.svg?height=150&width=150",
      description: "Expert in service quality management and customer relations.",
    },
    {
      name: "James Okello",
      role: "Technical Lead",
      image: "/placeholder.svg?height=150&width=150",
      description: "Full-stack developer with expertise in scalable web applications.",
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
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/about" className="text-blue-600 font-medium">
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
              About FixLinkUg
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building Uganda's most trusted marketplace for service providers, connecting communities with skilled
            professionals across the country.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded in 2024, FixLinkUg was born from the need to bridge the gap between service providers
              and clients across Uganda.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind FixLinkUg</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              >
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Story */}
        <div className="mb-20">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Journey</h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    FixLinkUg started with a simple observation: finding reliable service providers in
                    Uganda was often a challenge filled with uncertainty and risk. Whether you needed a plumber, an
                    electrician, or a house cleaner, the process of finding someone trustworthy was time-consuming and
                    stressful.
                  </p>
                  <p>
                    Our founders, having experienced these challenges firsthand, decided to create a solution that would
                    benefit both service providers and clients. We envisioned a platform where skilled professionals
                    could showcase their expertise and build their businesses, while clients could easily find and hire
                    trusted service providers with confidence.
                  </p>
                  <p>
                    Today, FixLinkUg is proud to be Uganda's growing marketplace for professional services.
                    We've helped thousands of clients find the right service providers for their needs, while empowering
                    hundreds of professionals to grow their businesses and reach new customers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-xl text-blue-100 mb-8">
                Whether you're looking for services or want to offer your skills, we'd love to have you on board.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href="/services" className="flex-1">
                  <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                    Browse Services
                  </Button>
                </Link>
                <Link href="/register/provider" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-white border-white hover:bg-white hover:text-blue-600 font-semibold"
                  >
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
