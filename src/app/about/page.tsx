"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Amal Perera",
      role: "Founder & Lead Developer",
      bio: "Machine learning enthusiast with 8+ years of experience building educational platforms and neural network applications.",
      image: "/team/founder.svg", // Placeholder - can be updated with actual images
    },
    {
      name: "Samanthi Fernando",
      role: "Lead Educational Content Designer",
      bio: "PhD in Computer Science with a focus on making complex neural network concepts accessible to learners of all levels.",
      image: "/team/education-lead.svg",
    },
    {
      name: "Dinesh Kumar",
      role: "Full-Stack Developer",
      bio: "Specializes in creating interactive visualizations and building responsive web applications with modern frameworks.",
      image: "/team/developer.svg",
    },
    {
      name: "Dilum Randira",
      role: "Undergraduate at SLIIT",
      bio: "Passionate student developer contributing to frontend development and helping make neural networks accessible to other students.",
      image: "/team/student.svg",
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          About <span className="text-blue-600 dark:text-blue-400">Neural Network Explorer</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Empowering the next generation of AI innovators through interactive education
        </p>
      </div>

      {/* Mission Statement */}
      <div className="mb-20">
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              At Neural Network Explorer, we believe that understanding artificial intelligence and neural networks should be accessible to everyone, regardless of their technical background.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Our mission is to demystify complex concepts through interactive visualizations, hands-on learning experiences, and a supportive community environment.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Founded in Sri Lanka in 2023, we've grown to reach learners in over 40 countries, helping them build the skills needed for the AI-driven future.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Accessibility",
              description: "We create content that breaks down complex topics into understandable pieces, making neural networks accessible to learners at all levels.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
            },
            {
              title: "Innovation",
              description: "We constantly push the boundaries of educational technology, creating new ways to visualize and interact with neural networks.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
            },
            {
              title: "Community",
              description: "We foster a supportive community where learners can collaborate, share insights, and grow together in their AI journey.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
            },
          ].map((value, index) => (
            <Card key={index} className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 flex flex-col items-center text-center overflow-hidden">
              <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 mb-4 overflow-hidden flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Our Story</h2>
        <div className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <p>
            Neural Network Explorer began as a passion project in a small apartment in Colombo, Sri Lanka. Our founder, Amal Perera, was frustrated by how difficult it was to visualize and truly understand neural networks during his own learning journey.
          </p>
          <p>
            What started as a simple visualization tool quickly grew as educators and students alike discovered its value. Within a year, we expanded our offerings to include comprehensive courses, tutorials, and interactive games - all designed with the same mission of making neural networks more intuitive and accessible.
          </p>
          <p>
            Today, Neural Network Explorer has evolved into a full-fledged learning platform with a dedicated team of developers, designers, and educators. We're proud of our Sri Lankan roots and the global community we've built, connecting AI enthusiasts from around the world.
          </p>
          <p>
            As we look to the future, we remain committed to our original vision: demystifying artificial intelligence and empowering the next generation of innovators with the knowledge and tools they need to succeed.
          </p>
        </div>
      </div>

      {/* Contact and Connect */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Connect With Us</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">Address</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      42 Innovation Drive<br />
                      Colombo 04<br />
                      Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">info@neuralnetworkexplorer.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Stay updated with our latest courses, tutorials, and AI developments on our social media channels.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                  { name: "LinkedIn", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                  { name: "GitHub", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    aria-label={social.name}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Join Our Community</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Start your journey into the fascinating world of neural networks and artificial intelligence today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Explore Courses
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-3 bg-white text-gray-800 dark:bg-gray-800 dark:text-white text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md border border-gray-200 dark:border-gray-700"
          >
            Sign Up - It's Free
          </Link>
        </div>
      </div>
    </div>
  );
}