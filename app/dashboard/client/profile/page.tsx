"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, User as UserIcon } from 'lucide-react';

interface UserProfile {
  id: number;
  email: string;
  phone: string;
  full_name?: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ClientProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem('accessToken');

      if (!API_URL) {
        setError("API URL is not defined.");
        setLoading(false);
        return;
      }
      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUserProfile(data.data);
        } else {
          setError(data.message || "Failed to fetch user profile");
        }
      } catch (err) {
        setError("Network error or unable to connect to API.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-6 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">My Profile</CardTitle>
          <CardDescription className="text-gray-600">View and manage your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="full-name" className="text-sm font-medium text-gray-700">Full Name</Label>
            <div className="relative mt-1">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input id="full-name" type="text" value={userProfile.full_name || 'N/A'} readOnly className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input id="email" type="email" value={userProfile.email} readOnly className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input id="phone" type="text" value={userProfile.phone} readOnly className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">Role</Label>
            <Input id="role" type="text" value={userProfile.role} readOnly />
          </div>
          <div>
            <Label htmlFor="verified" className="text-sm font-medium text-gray-700">Verified</Label>
            <Input id="verified" type="text" value={userProfile.is_verified ? 'Yes' : 'No'} readOnly />
          </div>
          <Button className="w-full">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
} 