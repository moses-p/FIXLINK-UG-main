"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, MapPin, Clock, MessageCircle, Heart, CreditCard, User, Settings } from "lucide-react"
import Link from "next/link"

interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  location: string;
  price: string;
  image: string;
}

interface Booking {
  id: number;
  provider: string;
  service: string;
  date: string;
  amount: string;
  status: "Completed" | "In Progress" | "Cancelled";
  rating?: number;
}

export default function ClientDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [savedProviders, setSavedProviders] = useState<Provider[]>([])
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([])
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const recentSearches = ["Plumber in Kampala", "House cleaning services", "Electrician near me"]

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);

    const fetchData = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      if (!API_URL) {
        console.error("NEXT_PUBLIC_API_URL is not defined.");
        return;
      }
      try {
        // Fetch saved providers
        const providersRes = await fetch(`${API_URL}/api/providers/saved`)
        const providersData = await providersRes.json()
        if (providersRes.ok) {
          setSavedProviders(providersData.data)
        } else {
          console.error("Failed to fetch saved providers:", providersData.message)
        }

        // Fetch booking history
        const bookingsRes = await fetch(`${API_URL}/api/bookings/client`)
        const bookingsData = await bookingsRes.json()
        if (bookingsRes.ok) {
          setBookingHistory(bookingsData.data)
        } else {
          console.error("Failed to fetch booking history:", bookingsData.message)
        }

        // Fetch user profile data, including the token
        if (token) {
          const userProfileRes = await fetch(`${API_URL}/api/users/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const userProfileData = await userProfileRes.json();
          if (userProfileRes.ok) {
            console.log("User profile fetched successfully:", userProfileData.data);
            // Update state or display user data as needed
          } else {
            console.error("Failed to fetch user profile:", userProfileData);
          }
        } else {
          console.warn("Access token not found. Cannot fetch user profile.");
        }

      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">ServiceConnect Uganda</h1>
            <div className="flex items-center space-x-4">
              <Link href="/messages">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </Link>
              <Link href="/dashboard/client/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Find and connect with trusted service providers</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for services or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Search</Button>
            </div>
            {recentSearches.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Recent searches:</p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Providers</TabsTrigger>
            <TabsTrigger value="bookings">Booking History</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Providers</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savedProviders.length}</div>
                  <p className="text-xs text-muted-foreground">Providers you've saved</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,250,000 UGX</div>
                  <p className="text-xs text-muted-foreground">This year</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest bookings and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory.slice(0, 3).map((booking: Booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-gray-500">by {booking.provider}</p>
                        <p className="text-xs text-gray-400">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{booking.amount}</p>
                        <Badge variant={booking.status === "Completed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Providers Tab */}
          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Service Providers</CardTitle>
                <CardDescription>Providers you've bookmarked for future reference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {savedProviders.map((provider: Provider) => (
                    <div key={provider.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <img
                          src={provider.image || "/placeholder.svg"}
                          alt={provider.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.service}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{provider.rating}</span>
                            <MapPin className="h-3 w-3 text-gray-400 ml-2" />
                            <span className="ml-1 text-sm text-gray-500">{provider.location}</span>
                          </div>
                          <p className="text-sm font-medium text-green-600 mt-1">{provider.price}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link href={`/provider/${provider.id}`}>
                            <Button size="sm">Contact</Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking History Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
                <CardDescription>All your past and current service bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory.map((booking: Booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{booking.service}</h4>
                          <p className="text-sm text-gray-600">Provider: {booking.provider}</p>
                          <p className="text-xs text-gray-400">Date: {booking.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.amount}</p>
                          <Badge variant={booking.status === "Completed" ? "default" : "secondary"} className="mt-1">
                            {booking.status}
                          </Badge>
                          {booking.rating && (
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < (booking.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        {booking.status === "Completed" && !booking.rating && (
                          <Button size="sm" variant="outline">
                            Rate Service
                          </Button>
                        )}
                        <Link href={`/booking/${booking.id}`}>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </Link>
                        {booking.status === "Completed" && (
                          <Button size="sm" variant="outline">
                            Book Again
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track all your payments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory
                    .filter((b) => b.status === "Completed")
                    .map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.service}</p>
                          <p className="text-sm text-gray-600">{payment.provider}</p>
                          <p className="text-xs text-gray-400">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{payment.amount}</p>
                          <Badge variant="default">Paid</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
