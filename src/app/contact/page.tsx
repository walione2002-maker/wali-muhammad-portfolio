import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, MessageSquare, Mail, Github, Linkedin, Clock, MapPin, Send } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact & Commercial Project Inquiries | Wali Muhammad',
  description:
    'Start a project inquiry with Wali Muhammad — Web Developer & Digital Product Engineer in Karachi, Pakistan. WhatsApp, direct email, consultation bookings, and response within 24 hours.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact & Commercial Project Inquiries | Wali Muhammad',
    description:
      'Start a project inquiry with Wali Muhammad — Web Developer & Digital Product Engineer in Karachi, Pakistan. WhatsApp, direct email, consultation bookings, and response within 24 hours.',
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="min-h-screen bg-[#080808] text-[#E8E4DE] selection:bg-[#FF4D00] selection:text-[#080808]">
        {/* Navigation Header */}
        <header className="border-b border-[#1C1C1C] bg-[#080808]/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#E8E4DE] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/"
              className="font-display font-extrabold text-sm sm:text-base text-[#E8E4DE] tracking-tight hover:text-[#FF4D00] transition-colors"
            >
              WALI MUHAMMAD
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-[#666666] flex items-center gap-2">
            <Link href="/" className="hover:text-[#E8E4DE]">Home</Link>
            <span>/</span>
            <span className="text-[#FF4D00]">Contact</span>
          </nav>

          {/* Heading */}
          <div className="mb-16 border-b border-[#1C1C1C] pb-10">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3">
              Direct Inquiry Channel
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#E8E4DE] tracking-tight uppercase leading-[0.95] mb-6">
              Start a Project Conversation
            </h1>
            <p className="text-lg sm:text-2xl text-[#B0B0B0] font-light leading-relaxed max-w-2xl">
              Currently accepting commercial projects, Next.js web application engagements, and custom 3D web contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left: Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              <a
                href="https://wa.me/923141151656?text=Hi%20Wali,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] hover:border-[#10B981] transition-all block group"
              >
                <div className="flex items-center gap-3 mb-2 text-[#10B981]">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Direct WhatsApp (Fastest)
                  </span>
                </div>
                <div className="font-display font-bold text-lg text-[#E8E4DE] group-hover:text-[#10B981] transition-colors">
                  +92 314 1151656
                </div>
                <p className="text-xs font-mono text-[#777777] mt-1">
                  Instant mobile messaging · Same-day consultation
                </p>
              </a>

              <a
                href="mailto:walimuhammad2002@gmail.com"
                className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] hover:border-[#FF4D00] transition-all block group"
              >
                <div className="flex items-center gap-3 mb-2 text-[#FF4D00]">
                  <Mail className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Official Email
                  </span>
                </div>
                <div className="font-display font-bold text-lg text-[#E8E4DE] group-hover:text-[#FF4D00] transition-colors">
                  walimuhammad2002@gmail.com
                </div>
                <p className="text-xs font-mono text-[#777777] mt-1">
                  Guaranteed response within 24 hours
                </p>
              </a>

              <div className="p-6 bg-[#0B0B0B] border border-[#1A1A1A] space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
                  <Clock className="w-4 h-4 text-[#FF4D00]" />
                  <span>Karachi, Pakistan (UTC+5)</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
                  <MapPin className="w-4 h-4 text-[#38BDF8]" />
                  <span>Available globally for remote contracts</span>
                </div>
              </div>
            </div>

            {/* Right: Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-[#0E0E0E] p-8 sm:p-10 border border-[#1C1C1C]">
              <h2 className="font-display font-bold text-2xl text-[#E8E4DE] uppercase tracking-tight mb-2">
                Project Scope Inquiry
              </h2>
              <p className="text-xs font-mono text-[#888888] mb-8">
                Fill out the form below or message directly via WhatsApp.
              </p>

              <form
                action="https://formspree.io/f/mqaeedpl"
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-[#A0A0A0] mb-2">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins · Acme Studio"
                    className="w-full px-4 py-3 bg-[#141414] border border-[#262626] text-[#E8E4DE] placeholder-[#555555] text-sm focus:outline-none focus:border-[#FF4D00] transition-colors font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#A0A0A0] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="sarah@example.com"
                    className="w-full px-4 py-3 bg-[#141414] border border-[#262626] text-[#E8E4DE] placeholder-[#555555] text-sm focus:outline-none focus:border-[#FF4D00] transition-colors font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs font-mono uppercase tracking-wider text-[#A0A0A0] mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="w-full px-4 py-3 bg-[#141414] border border-[#262626] text-[#E8E4DE] text-sm focus:outline-none focus:border-[#FF4D00] transition-colors font-mono"
                  >
                    <option value="Commercial Website">Commercial &amp; Brand Website</option>
                    <option value="E-Commerce Storefront">E-Commerce &amp; Checkout System</option>
                    <option value="Web Application">Custom Web Application</option>
                    <option value="Interactive 3D / WebGL">Interactive 3D / Three.js Experience</option>
                    <option value="Other">Other / Advisory</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[#A0A0A0] mb-2">
                    Project Brief &amp; Goals
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your product requirements, desired timeline, and existing website URL..."
                    className="w-full px-4 py-3 bg-[#141414] border border-[#262626] text-[#E8E4DE] placeholder-[#555555] text-sm focus:outline-none focus:border-[#FF4D00] transition-colors font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF4D00] text-[#080808] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E8E4DE] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Inquiry Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
