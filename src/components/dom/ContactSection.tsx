'use client';

import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  ArrowUpRight,
  Mail,
  X,
  Send,
  Github,
  Linkedin,
  Sparkles,
} from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const INQUIRY_SERVICES = [
  'Web & E-Commerce',
  'FinTech & Web Apps',
  '3D & Spatial Web',
  'B2B & Digital Suites',
];

const BUDGET_RANGES = [
  '$1,000 — $2,500',
  '$2,500 — $5,000',
  '$5,000 — $10,000+',
  'Consultation / Scope Undecided',
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'walione2002@gmail.com';

  const isProjectModalOpen = usePortfolioStore((s) => s.isProjectModalOpen);
  const setProjectModalOpen = usePortfolioStore((s) => s.setProjectModalOpen);
  const selectedDoorForInquiry = usePortfolioStore((s) => s.selectedDoorForInquiry);

  // Form State
  const [selectedService, setSelectedService] = useState(selectedDoorForInquiry || 'Web & E-Commerce');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_RANGES[0]);
  const [projectMessage, setProjectMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Sync selectedDoorForInquiry from store when modal opens
  useEffect(() => {
    if (selectedDoorForInquiry) {
      setSelectedService(selectedDoorForInquiry);
    }
  }, [selectedDoorForInquiry]);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProjectModalOpen) {
        setProjectModalOpen(false);
      }
    };

    if (isProjectModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProjectModalOpen, setProjectModalOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSeeWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const lineup = document.getElementById('doors-lineup') || document.getElementById('doors-section');
    if (lineup) {
      lineup.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#doors-section';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${selectedService} (${clientName || 'New Client'})`);
    const body = encodeURIComponent(
      `Hi Wali,\n\nName: ${clientName}\nEmail: ${clientEmail}\nService: ${selectedService}\nBudget Range: ${selectedBudget}\n\nProject Overview:\n${projectMessage}\n\nLooking forward to hearing from you!`
    );

    // Open user's default email client with pre-populated payload
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setProjectModalOpen(false);
    }, 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Project Inquiries"
      className="bg-[#0B0D0C] text-[#F4F3EE] border-t border-white/10 pt-24 pb-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* 1. Top Availability Eyebrow (00:10) */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-3 h-3 rounded-[2px] bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-300 font-semibold">
            AVAILABLE FOR NEW WORK
          </span>
        </div>

        {/* 2. Oversized Two-Line Display Headline (00:09 – 00:11) */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] text-[#F4F3EE] mt-6">
          <span className="block">Got a project?</span>
          <span className="block text-zinc-300">Let&apos;s build it together.</span>
        </h2>

        {/* 3. Editorial Subtext */}
        <p className="max-w-xl text-zinc-400 text-base sm:text-lg leading-relaxed mt-6 font-light">
          I&apos;m taking on new freelance work and engineering contracts: commercial websites, FinTech web apps, 3D WebGL interfaces and visual systems. Tell me what you&apos;re building and I&apos;ll get back to you within a day.
        </p>

        {/* 4. CTA Row (00:10) */}
        <div className="mt-10 flex flex-wrap items-center gap-7">
          {/* Primary White Pill Button */}
          <button
            onClick={() => setProjectModalOpen(true, 'Web & E-Commerce')}
            className="bg-[#F4F3EE] text-[#0B0D0C] pl-7 pr-2.5 py-2.5 rounded-full font-semibold flex items-center gap-4 shadow-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
          >
            <span className="text-base">Start a project</span>
            <span className="w-10 h-10 rounded-full bg-[#0B0D0C] text-[#F4F3EE] flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </button>

          {/* Secondary Link */}
          <a
            href="#doors-lineup"
            onClick={handleSeeWork}
            className="text-[#F4F3EE] font-medium text-base underline underline-offset-8 decoration-white/40 hover:decoration-white transition-colors cursor-pointer"
          >
            See my work
          </a>
        </div>

        {/* 5. Direct Email & Channels Grid */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Direct Contact
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${emailAddress}`}
                className="text-lg font-mono text-zinc-200 hover:text-white transition-colors"
              >
                {emailAddress}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                Copied to clipboard!
              </span>
            )}
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Location &amp; Hours
            </span>
            <p className="text-sm font-mono text-zinc-300">
              Karachi, Pakistan (PKT / UTC+5)
            </p>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              Remote availability worldwide · Sub-24h response
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Verified Profiles
            </span>
            <div className="flex items-center gap-4 text-sm font-mono">
              <a
                href="https://github.com/walione2002-maker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white border-b border-white/20 hover:border-white pb-0.5 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/wali-muhammad-2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white border-b border-white/20 hover:border-white pb-0.5 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 6. INTERACTIVE PROJECT INQUIRY MODAL / SLIDE-OVER DRAWER */}
      {isProjectModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-inquiry-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setProjectModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <div className="relative bg-[#111312] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Project Consultation</span>
                </span>
                <h3 id="modal-inquiry-title" className="text-2xl sm:text-3xl font-bold text-[#F4F3EE]">
                  Start a Project
                </h3>
              </div>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Service Chamber Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-medium">
                  Select Production Chamber:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INQUIRY_SERVICES.map((srv) => (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setSelectedService(srv)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono tracking-wider transition-all border text-left truncate ${
                        selectedService === srv
                          ? 'bg-white text-zinc-950 font-bold border-white'
                          : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Your Name:
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F4F3EE] placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 text-sm font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="client-email" className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Your Email:
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alex@brand.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F4F3EE] placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 text-sm font-sans"
                  />
                </div>
              </div>

              {/* Budget / Scope Range */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Estimated Budget / Scope:
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181A19] border border-white/10 text-[#F4F3EE] focus:outline-none focus:border-emerald-400 text-sm font-sans cursor-pointer"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b} className="bg-[#111312] text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Message */}
              <div>
                <label htmlFor="project-message" className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Project Brief or Goal:
                </label>
                <textarea
                  id="project-message"
                  required
                  rows={4}
                  value={projectMessage}
                  onChange={(e) => setProjectMessage(e.target.value)}
                  placeholder="Tell me about what you are looking to build, key timeline requirements, or links to references..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F4F3EE] placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 text-sm font-sans resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSent ? 'Opening Mail Client...' : 'Send Inquiry Message'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto py-3 px-4 rounded-full border border-white/15 hover:border-white/30 text-zinc-300 text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default ContactSection;
