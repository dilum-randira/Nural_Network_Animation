"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validations/auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    
    try {
      // Here you would connect with your authentication backend
      // This is a mock implementation for demo purposes
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login credentials
      const userCredentials = [
        { email: "demo@example.com", password: "Password123", role: "user", name: "Demo User" },
        { email: "admin@example.com", password: "Admin123", role: "admin", name: "Admin User" },
        { email: "superadmin@example.com", password: "Super123", role: "superadmin", name: "Super Admin" }
      ];
      
      // Find matching user
      const matchedUser = userCredentials.find(
        user => user.email === data.email && user.password === data.password
      );
      
      if (matchedUser) {
        // Store token and user data in localStorage
        localStorage.setItem("auth-token", "demo-jwt-token");
        localStorage.setItem("user-email", matchedUser.email);
        localStorage.setItem("auth-timestamp", Date.now().toString());
        
        // Store user object with role for admin access
        localStorage.setItem("user", JSON.stringify({
          email: matchedUser.email,
          name: matchedUser.name,
          role: matchedUser.role
        }));
        
        const roleMessage = matchedUser.role !== 'user' 
          ? `You're logged in as ${matchedUser.role}. You can access the admin dashboard.`
          : "Welcome back to Neural Network Explorer";
        
        toast.success("Login successful!", {
          description: roleMessage,
        });
        
        // Dispatch a custom event to notify all components about authentication change
        window.dispatchEvent(new Event('auth-state-changed'));
        
        // Redirect after successful login with delay for better UX
        setTimeout(() => {
          // Forcefully refresh the page to ensure all components update
          if (redirectPath === window.location.pathname) {
            window.location.reload();
          } else {
            router.push(redirectPath);
            router.refresh(); // Force a refresh to update the auth state
          }
        }, 1000);
      } else {
        // Demo failure case
        toast.error("Login failed", {
          description: "Invalid email or password. Try the demo credentials below.",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to sign in to your account
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="example@email.com" 
                    type="email" 
                    disabled={isLoading} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="••••••••" 
                    type="password" 
                    disabled={isLoading} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                {form.formState.isSubmitted && (
                  <div className="text-xs text-gray-500 space-y-1 mt-2">
                    <p><strong>Demo Accounts:</strong></p>
                    <p>User: demo@example.com / Password123</p>
                    <p>Admin: admin@example.com / Admin123</p>
                    <p>Super Admin: superadmin@example.com / Super123</p>
                  </div>
                )}
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link 
                href="/auth/reset-password" 
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
}