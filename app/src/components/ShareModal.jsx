import React, { useState } from "react";
import { Copy, Check, X, Share2 } from "lucide-react";

export default function ShareModal({ title, url, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Clipboard write failed", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm p-6 rounded-3xl bg-[#12121a] border border-white/10 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 className="text-white font-bold text-base">Share Combat Card</h3>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed">
          Copy the direct intelligence link to share this profile with your combat sports circle.
        </p>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
          <input
            type="text"
            readOnly
            value={url || window.location.href}
            className="bg-transparent text-xs text-gray-300 w-full outline-none px-2 font-mono truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
