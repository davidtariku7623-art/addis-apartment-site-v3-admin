"use client";
import { useState } from "react";

export default function ContactButtons({ waHref, tgHref, message }: { waHref: string; tgHref: string; message: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      window.prompt("Copy this message and paste it in Telegram:", message);
    }
  }
  return (
    <div className="actions">
      <a className="btn wa" href={waHref} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
      <a className="btn tg" href={tgHref} target="_blank" rel="noopener noreferrer">Ask on Telegram</a>
      <button type="button" className="btn ghost" onClick={copy}>
        {copied ? "Copied! Now paste it in Telegram" : "Copy message for Telegram"}
      </button>
    </div>
  );
}
