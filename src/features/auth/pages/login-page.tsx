'use client';

import { PageContainer, SectionContainer } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react'; // Gunakan icons dari lucide-react
import Link from 'next/link';
import React, { useState } from 'react';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
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
    // Logic for handling login
    console.log('Logging in:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer title="Login" isDashboard={false} withHeader withFooter>
      <SectionContainer
        container
        className="flex min-h-screen items-center justify-center"
      >
        <Card className="w-full max-w-lg p-6">
          <CardHeader>
            <h2 className="text-center text-xl font-semibold">Login</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/register"
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};

export default LoginPage;
