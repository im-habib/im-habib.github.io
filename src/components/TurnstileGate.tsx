"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "turnstile_verified";

export default function TurnstileGate() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [verified, setVerified] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setVerified(true);
      return;
    }

    (window as any).onTurnstileSuccess = () => {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setVerified(true);
    };

    (window as any).onTurnstileError = () => {
      setVerified(false);
    };

    (window as any).onTurnstileExpired = () => {
      setVerified(false);
    };

    setReady(true);

    return () => {
      delete (window as any).onTurnstileSuccess;
      delete (window as any).onTurnstileError;
      delete (window as any).onTurnstileExpired;
    };
  }, []);

  if (verified) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          width: "min(420px, 100%)",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
          Human verification
        </div>

        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 16 }}>
          Please verify to continue
        </div>

        {ready ? (
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-theme="auto"
            data-size="normal"
            data-callback="onTurnstileSuccess"
            data-error-callback="onTurnstileError"
            data-expired-callback="onTurnstileExpired"
          />
        ) : (
          <div style={{ fontSize: 13, opacity: 0.6 }}>Loading…</div>
        )}
      </div>
    </div>
  );
}
