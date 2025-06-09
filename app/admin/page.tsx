"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = {
    totalUsers: 1247,
    activeProviders: 89,
    pendingApprovals: 12,
    totalRevenue: "15,750,000",
    monthlyRevenue: "2,450,000",
  }

  const pendingProviders = [
    {
      id: 1,
      name: "Michael Ssebunya",
      email: "michael@email.com",
      service: "Electrical Work",
      location: "Kampala",
      registrationDate: "2024-01-20",
      documents: ["National ID", "Business License", "Certificates"],
      status: "Pending Review",
    },
    {
      id: 2,
      name: "Agnes Nakimuli",
      email: "agnes@email.com",
      service: "Catering Services",
      location: "Entebbe",
      registrationDate: "2024-01-19",
      documents: ["National ID", "Health Certificate"],
      status: "Pending Review",
    },
    {
      id: 3,
      name: "Robert Ochieng",
      email: "robert@email.com",
      service: "Security Services",
      location: "Jinja",
      registrationDate: "2024-01-18",
      documents: ["National ID", "Security License"],
      status: "Documents Missing",
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      provider: "John Mukasa",
      type: "Registration Fee",
      amount: "50,000 UGX",
      date: "2024-01-22",
      status: "Completed",
    },
    {
      id: 2,
      provider: "Sarah Namuli",
      type: "Monthly Subscription",
      amount: "25,000 UGX",
      date: "2024-01-21",
      status: "Completed",
    },
    {
      id: 3,
      provider: "David Okello",
      type: "Registration Fee",
      amount: "50,000 UGX",
      date: "2024-01-20",
      status: "Pending",
    },
  ]

  const handleApproveProvider = (providerId: number) => {
    console.log("Approving provider:", providerId)
  }

  const handleRejectProvider = (providerId: number) => {
    console.log("Rejecting provider:", providerId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link href="/admin/alerts">
                <Button variant="ghost" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Alerts ({stats.pendingApprovals})
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="ghost" size="sm">
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProviders}</div>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyRevenue} UGX</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue} UGX</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Pending Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Approval Queue</CardTitle>
                <CardDescription>Review and approve new service provider registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div key={provider.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.email}</p>
                          <p className="text-sm text-gray-500">
                            {provider.service} • {provider.location}
                          </p>
                          <p className="text-xs text-gray-400">Registered: {provider.registrationDate}</p>
                        </div>
                        <Badge variant={provider.status === "Pending Review" ? "secondary" : "destructive"}>
                          {provider.status}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Submitted Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {provider.documents.map((doc, index) => (
                            <Badge key={index} variant="outline">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveProvider(provider.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectProvider(provider.id)}>
                          <UserX className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                        <Link href={`/admin/provider/${provider.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all platform users and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users by name, email, or service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Type</span>
                    <span>Status</span>
                    <span>Joined</span>
                    <span>Actions</span>
                  </div>

                  {/* Sample user data */}
                  {[
                    {
                      name: "John Mukasa",
                      email: "john@email.com",
                      type: "Provider",
                      status: "Active",
                      joined: "2024-01-15",
                    },
                    {
                      name: "Mary Nakato",
                      email: "mary@email.com",
                      type: "Client",
                      status: "Active",
                      joined: "2024-01-18",
                    },
                    {
                      name: "Sarah Namuli",
                      email: "sarah@email.com",
                      type: "Provider",
                      status: "Active",
                      joined: "2024-01-12",
                    },
                  ].map((user, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 text-sm py-3 border-b">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-gray-600">{user.email}</span>
                      <Badge variant={user.type === "Provider" ? "default" : "secondary"}>{user.type}</Badge>
                      <Badge variant="default">{user.status}</Badge>
                      <span className="text-gray-500">{user.joined}</span>
                      <div className="flex space-x-1">
                        <Link href={`/admin/user/${user.email}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                        <Link href={`/admin/user/${user.email}/edit`}>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Monitoring Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Monitoring</CardTitle>
                <CardDescription>Track all platform payments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.provider}</p>
                        <p className="text-sm text-gray-600">{transaction.type}</p>
                        <p className="text-xs text-gray-400">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount}</p>
                        <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
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
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>User registration and activity trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">New Users This Month</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">New Providers This Month</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Users</span>
                      <span className="font-medium">892</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Financial performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Registration Fees</span>
                      <span className="font-medium">600,000 UGX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Subscription Revenue</span>
                      <span className="font-medium">1,850,000 UGX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Growth Rate</span>
                      <span className="font-medium text-green-600">+8.2%</span>
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
