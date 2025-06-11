"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  MessageCircle,
  Heart,
  Share2,
  Clock,
  Award,
  ArrowLeft,
  Shield,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function ProviderProfile({ params }: { params: { id: string } }) {
  // Mock data - in real app, this would be fetched based on params.id
  const provider = {
    id: params.id,
    name: "John Mukasa",
    service: "Professional Plumbing Services",
    rating: 4.8,
    totalReviews: 127,
    location: "Kampala, Uganda",
    phone: "+256 700 123 456",
    email: "john.mukasa@email.com",
    image: "/placeholder.svg?height=150&width=150",
    verified: true,
    experience: "10+ years",
    completedJobs: 245,
    responseTime: "Within 2 hours",
    availability: "Available",
    pricing: {
      consultation: "Free",
      hourlyRate: "25,000 UGX/hour",
      minimumCharge: "50,000 UGX",
    },
    services: [
      "Pipe Installation & Repair",
      "Bathroom Plumbing",
      "Kitchen Plumbing",
      "Water Heater Services",
      "Drain Cleaning",
      "Emergency Plumbing",
    ],
    description: `Professional plumber with over 10 years of experience serving Kampala and surrounding areas. 
    Specializing in residential and commercial plumbing solutions. Licensed, insured, and committed to 
    providing high-quality workmanship at competitive prices. Available for emergency calls 24/7.`,
    portfolio: [
      {
        title: "Bathroom Renovation - Kololo",
        image: "/placeholder.svg?height=200&width=300",
        description: "Complete bathroom plumbing installation",
      },
      {
        title: "Kitchen Plumbing - Nakasero",
        image: "/placeholder.svg?height=200&width=300",
        description: "Modern kitchen plumbing setup",
      },
      {
        title: "Water System - Bugolobi",
        image: "/placeholder.svg?height=200&width=300",
        description: "Residential water system installation",
      },
    ],
    reviews: [
      {
        id: 1,
        client: "Mary Nakato",
        rating: 5,
        date: "2024-01-15",
        comment: "Excellent work! John fixed our bathroom leak quickly and professionally. Highly recommended!",
      },
      {
        id: 2,
        client: "James Okwir",
        rating: 5,
        date: "2024-01-10",
        comment: "Very reliable and skilled plumber. Completed the kitchen installation on time and within budget.",
      },
      {
        id: 3,
        client: "Grace Atim",
        rating: 4,
        date: "2024-01-05",
        comment: "Good service and fair pricing. Will definitely call again for future plumbing needs.",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span>FixLink Uganda</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/services">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Services
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Header */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                      <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                      <AvatarFallback className="text-xl">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {provider.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h1 className="text-4xl font-bold text-gray-900">{provider.name}</h1>
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      <Badge
                        variant={provider.availability === "Available" ? "default" : "secondary"}
                        className="bg-blue-100 text-blue-800 border-blue-200"
                      >
                        {provider.availability}
                      </Badge>
                    </div>
                    <p className="text-xl text-gray-600 mb-4">{provider.service}</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{provider.rating}</span>
                        <span className="text-gray-500">({provider.totalReviews})</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{provider.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Award className="h-4 w-4" />
                        <span>{provider.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>{provider.completedJobs} jobs</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">About {provider.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-lg">{provider.description}</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{provider.completedJobs}</div>
                        <div className="text-sm text-gray-500">Jobs Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{provider.rating}</div>
                        <div className="text-sm text-gray-500">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{provider.experience}</div>
                        <div className="text-sm text-gray-500">Experience</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Services Offered</CardTitle>
                    <CardDescription className="text-lg">Professional plumbing services available</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {provider.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md transition-shadow"
                        >
                          <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                          <span className="font-medium">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Recent Work</CardTitle>
                    <CardDescription className="text-lg">Examples of completed projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {provider.portfolio.map((project, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                        >
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                            <p className="text-gray-600">{project.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Client Reviews</CardTitle>
                    <CardDescription className="text-lg">
                      {provider.reviews.length} reviews from satisfied clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {provider.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600">
                                  {review.client
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-lg">{review.client}</p>
                                <p className="text-sm text-gray-500">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Contact & Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium">Response: {provider.responseTime}</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium">{provider.phone}</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium">{provider.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-blue-200 hover:bg-blue-50 py-3" size="lg">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-green-200 hover:bg-green-50 py-3"
                    size="lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Consultation:</span>
                    <span className="font-semibold text-green-600">{provider.pricing.consultation}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Hourly Rate:</span>
                    <span className="font-semibold">{provider.pricing.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Minimum Charge:</span>
                    <span className="font-semibold">{provider.pricing.minimumCharge}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Final pricing may vary based on project scope and requirements.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Similar Providers */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Similar Providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Peter Wamala", service: "Plumbing", rating: 4.7 },
                  { name: "Moses Kigozi", service: "Plumbing", rating: 4.6 },
                ].map((similar, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="font-medium">{similar.name}</p>
                      <p className="text-sm text-gray-500">{similar.service}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{similar.rating}</span>
                    </div>
                  </div>
                ))}
                <Link href="/services">
                  <Button variant="outline" size="sm" className="w-full border-2 border-blue-200 hover:bg-blue-50">
                    View All Plumbers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
