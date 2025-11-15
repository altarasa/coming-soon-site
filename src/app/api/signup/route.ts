import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    const gender = typeof body.gender === "string" ? body.gender.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    // Validate required fields
    if (!firstName || !lastName || !gender || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    const gasUrl = process.env.GAS_WEBHOOK_URL;
    if (!gasUrl) {
      return NextResponse.json({ error: "GAS_WEBHOOK_URL not configured on server" }, { status: 500 });
    }
    
    // Forward payload to Google Apps Script Web App
    // Sending both new format and legacy format for compatibility
    const res = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        firstName, 
        lastName, 
        gender, 
        email,
        // Legacy format for backward compatibility
        name: `${firstName} ${lastName}`.trim(),
        message: `Gender: ${gender}`
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json({ error: "GAS responded with an error", details: text }, { status: 502 });
    }

    return NextResponse.json({ ok: true, result: text });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
