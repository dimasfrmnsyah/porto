"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { PixelButton } from "../PixelButton";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = {
      name: formData.name ? "" : "Name is required.",
      email: emailPattern.test(formData.email) ? "" : "Email is invalid.",
      message: formData.message ? "" : "Message is required.",
    };

    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    setToast("Message sent. I will reply soon.");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-base md:text-lg text-retro-brick tracking-[0.12em]">
        CONTACT
      </h1>

      <div className="space-y-2">
        <div>
          <p className="text-[9px] md:text-[10px] text-retro-ink/70 mb-1">
            EMAIL
          </p>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="text-[9px] md:text-[10px] text-retro-teal underline"
          >
            {portfolioData.contact.email}
          </a>
        </div>

        <div>
          <p className="text-[9px] md:text-[10px] text-retro-ink/70 mb-1">
            SOCIAL
          </p>
          <div className="flex gap-3 text-[9px] md:text-[10px]">
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-retro-brick underline"
            >
              GitHub
            </a>
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-retro-brick underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 mt-2">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className={`w-full px-2 py-1 text-[9px] md:text-[10px] border-2 bg-retro-paper text-retro-ink ${
              errors.name ? "border-retro-brick" : "border-retro-ink"
            }`}
          />
          {errors.name && (
            <p className="text-[8px] text-retro-brick mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className={`w-full px-2 py-1 text-[9px] md:text-[10px] border-2 bg-retro-paper text-retro-ink ${
              errors.email ? "border-retro-brick" : "border-retro-ink"
            }`}
          />
          {errors.email && (
            <p className="text-[8px] text-retro-brick mt-1">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className={`w-full px-2 py-1 text-[9px] md:text-[10px] border-2 bg-retro-paper text-retro-ink resize-none h-16 ${
              errors.message ? "border-retro-brick" : "border-retro-ink"
            }`}
          />
          {errors.message && (
            <p className="text-[8px] text-retro-brick mt-1">
              {errors.message}
            </p>
          )}
        </div>
        <PixelButton variant="primary" type="submit">
          SEND
        </PixelButton>
      </form>

      {toast && (
        <div
          className="text-[9px] md:text-[10px] text-retro-ink text-center p-2 bg-retro-gold border-2 border-retro-ink"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
