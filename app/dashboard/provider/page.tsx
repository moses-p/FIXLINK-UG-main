"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Users,
  Star,
  MessageCircle,
  Settings,
  Eye,
  TrendingUp,
  CreditCard,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function ProviderDashboard() {
  const [isAvailable, setIsAvailable] = useState(true)

  const stats = {
    totalEarnings: "2,450,000",
    monthlyEarnings: "450,000",
    totalClients: 28,
    rating: 4.8,
    profileViews: 156,
    completedJobs: 24,
  }

  const recentBookings = [
    {
      id: 1,
      client: "Mary Nakato",
      service: "Bathroom Plumbing Repair",
      date: "2024-01-22",
      amount: "85,000 UGX",
      status: "Pending",
      location: "Kampala",
    },
    {
      id: 2,
      client: "James Okwir",
      service: "Kitchen Sink Installation",
      date: "2024-01-20",
      amount: "120,000 UGX",
      status: "In Progress",
      location: "Entebbe",
    },
    {
      id: 3,
      client: "Grace Atim",
      service: "Pipe Leak Fix",
      date: "2024-01-18",
      amount: "65,000 UGX",
      status: "Completed",
      location: "Kampala",
    },
  ]

  const subscriptionStatus = {
    plan: "Monthly Subscription",
    amount: "25,000 UGX",
    nextBilling: "2024-02-15",
    status: "Active",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Available</span>
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
              <Link href="/messages">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
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
          <p className="text-gray-600">Manage your services and track your business performance</p>
        </div>

        {/* Subscription Alert */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-900">Subscription Active</p>
                <p className="text-sm text-green-700">
                  Your monthly subscription is active. Next billing: {subscriptionStatus.nextBilling}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEarnings} UGX</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyEarnings} UGX</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground">+3 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rating}</div>
              <p className="text-xs text-muted-foreground">Based on {stats.completedJobs} reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Your latest service requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-gray-600">{booking.client}</p>
                          <p className="text-xs text-gray-400">
                            {booking.date} • {booking.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.amount}</p>
                          <Badge
                            variant={
                              booking.status === "Completed"
                                ? "default"
                                : booking.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Performance</CardTitle>
                  <CardDescription>How your profile is performing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile Views</span>
                    <span className="text-sm text-gray-600">{stats.profileViews} this month</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Rate</span>
                    <span className="text-sm text-gray-600">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm text-gray-600">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your service bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{booking.service}</h4>
                          <p className="text-sm text-gray-600">Client: {booking.client}</p>
                          <p className="text-xs text-gray-400">
                            {booking.date} • {booking.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.amount}</p>
                          <Badge
                            variant={
                              booking.status === "Completed"
                                ? "default"
                                : booking.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {booking.status === "Pending" && (
                          <>
                            <Button size="sm">Accept</Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                          </>
                        )}
                        {booking.status === "In Progress" && <Button size="sm">Mark Complete</Button>}
                        <Link href={`/messages/${booking.client.toLowerCase().replace(" ", "-")}`}>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Status</CardTitle>
                <CardDescription>Your profile visibility and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-900">Profile Approved</p>
                      <p className="text-sm text-green-700">Your profile is live and visible to clients</p>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center mb-2">
                      <Eye className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">Profile Views</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.profileViews}</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">Average Rating</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.rating}</p>
                    <p className="text-xs text-gray-500">{stats.completedJobs} reviews</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/profile/edit">
                    <Button className="w-full" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Link href="/profile/preview">
                    <Button className="w-full" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Public Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Subscription Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Status</CardTitle>
                  <CardDescription>Your current subscription plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subscriptionStatus.plan}</span>
                    <Badge variant="default">{subscriptionStatus.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Fee:</span>
                      <span className="font-medium">{subscriptionStatus.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Billing:</span>
                      <span>{subscriptionStatus.nextBilling}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                </CardContent>
              </Card>

              {/* Earnings Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                  <CardDescription>Your payment history and earnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">This Month:</span>
                      <span className="font-medium">{stats.monthlyEarnings} UGX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Earnings:</span>
                      <span className="font-medium">{stats.totalEarnings} UGX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Completed Jobs:</span>
                      <span className="font-medium">{stats.completedJobs}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    View Payment History
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your latest earnings from completed services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings
                    .filter((b) => b.status === "Completed")
                    .map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.service}</p>
                          <p className="text-sm text-gray-600">{payment.client}</p>
                          <p className="text-xs text-gray-400">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{payment.amount}</p>
                          <Badge variant="default">Paid</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Track your business performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Rate</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Job Completion Rate</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Client Satisfaction</span>
                        <span>4.8/5.0</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Your business growth over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Clients</span>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium">+3</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Jobs Completed</span>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium">+8</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Earnings Growth</span>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium">+12%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
