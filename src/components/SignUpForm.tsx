// SignUpForm.tsx
"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
    else dialog.close();
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Trigger native HTML5 validation UI. If invalid, stop here.
    const formEl = formRef.current;
    if (formEl && !formEl.reportValidity()) {
      return;
    }

    // Optional: extra custom checks (e.g., stricter email regex)
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

      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 1500);
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
      className="backdrop:bg-black/50 bg-beige-modal p-0 w-full h-auto min-h-[100svh] md:min-h-screen max-w-none max-h-none m-0 rounded-none"
    >
      <button
        type="button"
        onClick={onClose}
        className="close-button absolute top-6 right-8 text-brown-dark hover:text-brown-darker text-3xl leading-none cursor-pointer bg-transparent border-0 font-light z-10"
        aria-label="Close dialog"
      >
        <img src="/Closeicon.svg" alt="Close" className="w-[17px] h-[17px]" />
      </button>

      <div className="h-auto min-h-[100svh] md:min-h-screen flex flex-col items-center px-4 sm:px-6 py-12 relative">
        <div className="w-full max-w-[920px] flex flex-col items-center text-center px-4 mt-[80px] md:mt-[131px] ">
          <div className="ar-logo pt-10 md:pt-20 flex justify-center">
            <img src="/logos/AR_Symbol_Terracotta.png" alt="logo" className="h-[30px] w-[80px]" />
          </div>
          <h2 id="waitlist-title" className="form-headline text-center mt-[106px] md:mt-[91px]">
            Join the waitlist for our upcoming launch.
          </h2>

          <div className="w-full max-w-[886px] flex flex-col items-center mt-[56px] md:mt-[91px]">
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
                    <option value="" disabled >
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

              <div className="flex justify-center mt-[30px] md:mt-[75px]">
                <button type="submit" disabled={status === "loading"} className="btn-signup">
                  {status === "loading" ? "Sending…" : "SIGN UP"}
                </button>
              </div>

              {status === "success" && (
                <p className="text-green-700 text-sm text-center mt-4">
                  Thanks — we received your submission.
                </p>
              )}
              {status === "error" && (
                <p id="email-error" className="text-red-700 text-sm text-center mt-4">
                  {errorMsg || "Failed to send."}
                </p>
              )}
            </form>

            <p className="consent-text text-center mt-[45px]">
              By submitting your information, you are consenting to be contacted by AltaRasa about our launch and latest updates. You may unsubscribe from these communications at any time.
            </p>
          </div>
        </div>
        <footer className="form-footer text-center w-full max-w-[920px] px-4 mt-[106px] md:mt-[132px]">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link href="https://instagram.com/thealtarasa" target="_blank" rel="noopener noreferrer" aria-label="AltaRasa on Instagram" className="text-brown-dark hover:text-brown-darker transition-colors">
            <img src="/instagram_terracotta.svg" alt="Instagram" width={25} height={25} className="text-[#692C23] pb-[2.375rem]" />
            </Link>
          </div>
          <p className="text-[0.875rem] md:text-[0.625rem] text-brown-dark">© AltaRasa 2025. All rights reserved.</p>
        </footer>
      </div>
    </dialog>
  );
}
