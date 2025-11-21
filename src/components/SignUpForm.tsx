"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SignUpFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpForm({ isOpen, onClose }: SignUpFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) dialog.showModal();
    else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      dialog.close();
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (typeof document !== "undefined" && document.activeElement) {
      (document.activeElement as HTMLElement)?.blur(); // Force Safari to zoom out
    }
    setErrorMsg("");

    const formEl = formRef.current;
    if (formEl && !formEl.reportValidity()) {
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setErrorMsg("Please enter a valid email.");
      return;
    }

    try {
      setStatus("loading");
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, gender, email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setGender("");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Failed to send.");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="waitlist-title"
      className="backdrop:bg-black/50 bg-[#DDD6C3] p-0 w-full h-auto min-h-[100dvh] md:min-h-screen max-w-none max-h-none m-0 rounded-none"
    >
      <button
        type="button"
        onClick={onClose}
        className="close-button absolute top-6 right-8 text-brown-dark hover:text-brown-darker text-3xl leading-none cursor-pointer bg-transparent border-0 font-light z-100"
        aria-label="Close dialog"
      >
        <img src="/Closeicon.svg" alt="Close" className="closeicon w-[17px] h-[17px]" />
      </button>

      <main className="relative h-auto min-h-[100svh] md:min-h-dvh w-screen m-0">
        <section className=" h-auto min-h-[100svh] md:min-h-screen flex flex-col items-center justify-between text-center px-6 md:px-10 py-12 relative gap-4 ">
          {/* Logo */}
          <div className="hero-logo ">
            <Image
              src="/logos/AR_Symbol_Terracotta.png"
              alt="AltaRasa"
              width={204}
              height={39}
              className="desktop-logo w-[67px] h-[45px] mt-[131px] object-contain"
            />
            <Image
              src="/logos/AR_Symbol_Terracotta.png"
              alt="AltaRasa"
              width={100}
              height={19}
              className="mobile-logo w-[45px] h-[30px] mt-[5.375rem] object-contain"
            />
          </div>

          {/* Form content */}
          <div className="w-full max-w-[886px] flex flex-col items-center justify-between mt-[2rem]">
            <h2 id="waitlist-title" className="form-headline text-center ">
              Join the waitlist for our upcoming launch.
            </h2>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col h-auto">
              <div className="form-grid-responsive">
                <label className="block">
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-input-underline"
                    placeholder="FIRST NAME *"
                    name="firstName"
                    autoComplete="given-name"
                  />
                </label>

                <label className="block">
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-input-underline"
                    placeholder="LAST NAME *"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </label>

                <label className="block">
                  <select
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-input-underline"
                    name="gender"
                  >
                    <option value="" disabled>
                      GENDER *
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </label>

                <label className="block">
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-underline"
                    placeholder="EMAIL *"
                    type="email"
                    name="email"
                    autoComplete="email"
                    aria-invalid={status === "error" && !!errorMsg ? true : undefined}
                    aria-describedby={status === "error" && !!errorMsg ? "email-error" : undefined}
                  />
                </label>
              </div>
              <p className="consent-text text-center mt-[30px]">
                By submitting your information, you are consenting to be contacted by AltaRasa about our launch and latest updates. You may unsubscribe from these communications at any time.
              </p>
              <div className="flex justify-center mt-[30px]">
                <button type="submit" disabled={status === "loading"} className="btn-signup">
                  {status === "loading" ? "Sending…" : "SIGN UP"}
                </button>
              </div>

              {status === "success" && (
                <p className="consent-text text-center mt-[1rem]">
                  Thanks — we received your submission.
                </p>
              )}
              {status === "error" && (
                <p id="email-error" className="text-red-700 text-sm text-center mt-4">
                  {errorMsg || "Failed to send."}
                </p>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="signup-footer flex flex-col items-center">
            <Link
              href="https://instagram.com/thealtarasa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AltaRasa on Instagram"
            >
              <img
                src="/instagram_terracotta.svg"
                alt="Instagram"
                width={25}
                height={25}
                className="pb-[2.375rem]"
              />
            </Link>

            <p className="copyright text-brown-dark leading-[110%] tracking-[-0.02em] mt-0 mb-[61px]">
              © AltaRasa 2025. All rights reserved.
            </p>
          </div>
        </section>
      </main>
    </dialog>
  );
}