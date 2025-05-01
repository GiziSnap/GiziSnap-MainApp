'use client';

import { PageContainer, SectionContainer } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import Link from 'next/link'; // Gunakan Link dari Next.js
import { Eye, EyeOff } from 'lucide-react';

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for handling registration
    console.log('Registering:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer title="Register" isDashboard={false} withHeader withFooter>
      <SectionContainer
        container
        className="flex min-h-screen items-center justify-center"
      >
        <Card className="w-full max-w-xl p-6">
          <CardHeader>
            <h2 className="text-center text-xl font-semibold">Register</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="mb-2 block">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button className="w-full" type="submit">
                Register
              </Button>
            </form>
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-blue-500 hover:underline"
              >
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};
