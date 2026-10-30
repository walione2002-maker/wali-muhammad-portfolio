'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Mail } from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'walione2002@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-36 pb-20 z-10"
      aria-labelledby="contact-title"
    >
      {/* Section Header */}
      <div className="mb-16 sm:mb-24">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-4">
          06 / Project Inquiries
        </div>
        <h2
          id="contact-title"
          className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          Let&apos;s<br />Talk
        </h2>
        <p className="text-[#B8B8B8] text-base sm:text-xl mt-6 max-w-2xl font-light leading-relaxed">
          Whether you need an authoritative corporate web platform, a high-converting e-commerce store, or an interactive 3D web application, reach out directly.
        </p>
      </div>

      {/* Main Direct Inquiry Box */}
      <div className="border-t border-[#1C1C1C] pt-12">
        <div className="mb-8">
          <span className="text-xs font-mono tracking-widest uppercase text-[#777777] block mb-3">
            Direct Email Inquiries
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
            <a
              href={`mailto:${emailAddress}?subject=Website%20Inquiry%20for%20Wali%20Muhammad`}
              className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#E8E4DE] hover:text-[#FF4D00] transition-colors break-all"
              aria-label={`Send email to ${emailAddress}`}
            >
              {emailAddress}
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#999999] hover:text-[#E8E4DE] border border-[#2A2A2A] hover:border-[#555555] px-4 py-2 transition-colors self-start cursor-pointer touch-manipulation"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Grid & Social Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#1C1C1C]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
              Primary Action
            </span>
            <a
              href={`mailto:${emailAddress}?subject=Website%20Inquiry%20for%20Wali%20Muhammad`}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#E8E4DE] bg-[#E8E4DE] text-[#080808] hover:bg-transparent hover:text-[#E8E4DE] text-xs font-mono tracking-widest uppercase transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me Directly</span>
            </a>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
              Code &amp; Profiles
            </span>
            <div className="flex items-center gap-6 text-sm font-mono">
              <a
                href="https://github.com/walione2002-maker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#E8E4DE] hover:text-[#FF4D00] border-b border-[#333333] hover:border-[#FF4D00] pb-0.5 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/wali-muhammad-2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#E8E4DE] hover:text-[#FF4D00] border-b border-[#333333] hover:border-[#FF4D00] pb-0.5 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
              Availability &amp; Location
            </span>
            <p className="text-sm font-mono text-[#999999] leading-relaxed">
              Based in Karachi, Pakistan (PKT / UTC+5). Open to remote international contracts. Typical response time is under 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
