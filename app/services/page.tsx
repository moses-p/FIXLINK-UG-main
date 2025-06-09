"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, MapPin, CheckCircle, ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const serviceProviders = [
    {
      id: 1,
      name: "John Mukasa",
      service: "Plumbing Services",
      rating: 4.8,
      reviews: 127,
      location: "Kampala",
      price: "From 50,000 UGX",
      image: "/placeholder.svg?height=100&width=100",
      category: "Plumbing",
      description: "Expert plumber with 10+ years experience in residential and commercial plumbing.",
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
      category: "Cleaning Services",
      description: "Professional cleaning services for homes and offices. Eco-friendly products used.",
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
      category: "Electrical Work",
      description: "Licensed electrician specializing in installations, repairs, and maintenance.",
      verified: true,
    },
    {
      id: 4,
      name: "Grace Atim",
      service: "Garden Maintenance",
      rating: 4.6,
      reviews: 73,
      location: "Kampala",
      price: "From 40,000 UGX",
      image: "/placeholder.svg?height=100&width=100",
      category: "Gardening",
      description: "Professional gardener offering landscaping, maintenance, and plant care services.",
      verified: true,
    },
    {
      id: 5,
      name: "Michael Ssebunya",
      service: "Security Services",
      rating: 4.8,
      reviews: 94,
      location: "Mbarara",
      price: "From 60,000 UGX",
      image: "/placeholder.svg?height=100&width=100",
      category: "Security Services",
      description: "Licensed security professional providing personal and property protection.",
      verified: true,
    },
    {
      id: 6,
      name: "Agnes Nakimuli",
      service: "Catering Services",
      rating: 4.9,
      reviews: 112,
      location: "Entebbe",
      price: "From 80,000 UGX",
      image: "/placeholder.svg?height=100&width=100",
      category: "Catering",
      description: "Professional catering for events, parties, and corporate functions.",
      verified: true,
    },
  ]

  const categories = [
    "All Categories",
    "Home Maintenance",
    "Cleaning Services",
    "Electrical Work",
    "Plumbing",
    "Gardening",
    "Security Services",
    "Catering",
    "Transportation",
    "Beauty & Wellness",
    "IT Services",
  ]

  const locations = [
    "All Locations",
    "Kampala",
    "Entebbe",
    "Jinja",
    "Mbarara",
    "Gulu",
    "Lira",
    "Mbale",
    "Kasese",
    "Soroti",
    "Arua",
  ]

  const priceRanges = [
    "All Prices",
    "Under 50,000 UGX",
    "50,000 - 100,000 UGX",
    "100,000 - 200,000 UGX",
    "Above 200,000 UGX",
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
              <Link href="/services" className="text-blue-600 font-medium">
                Browse Services
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Browse Service Providers</h1>
          </div>
          <p className="text-xl text-gray-600">Find trusted professionals for all your service needs</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for services or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-lg text-gray-600">
              Showing <span className="font-semibold">{serviceProviders.length}</span> service providers
            </p>
            <p className="text-sm text-gray-500">All providers are verified and background-checked</p>
          </div>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48 border-2 border-gray-200 rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Providers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceProviders.map((provider) => (
            <Card
              key={provider.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                    />
                    {provider.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <Badge variant="default" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                        Verified
                      </Badge>
                    </div>
                    <CardDescription className="font-medium text-blue-600">{provider.service}</CardDescription>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({provider.reviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">{provider.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span className="ml-1 text-sm">{provider.location}</span>
                  </div>
                  <span className="text-lg font-semibold text-green-600">{provider.price}</span>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/provider/${provider.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group-hover:shadow-lg transition-all">
                      View Profile
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="border-2 border-blue-200 hover:bg-blue-50">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 px-8 py-3"
          >
            Load More Providers
          </Button>
        </div>
      </div>
    </div>
  )
}
