"use client";

import { useEffect, useState } from "react";
import { faFeeds } from "../data/fa-feeds";

declare global {
  interface Window {
    lrcode?: string;
  }
}

export function FAFullTimeFeeds() {
  const [status, setStatus] = useState("preview");

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return undefined;

    const scripts: HTMLScriptElement[] = [];
    let cancelled = false;

    function loadFeed(index: number) {
      if (cancelled || index >= faFeeds.length) return;
      const feed = faFeeds[index];
      const script = document.createElement("script");
      script.src = "https://fulltime.thefa.com/client/api/cs1.js";
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-fa-feed", feed.code);
      window.lrcode = feed.code;
      script.onload = () => {
        setStatus("loaded");
        window.setTimeout(() => loadFeed(index + 1), 350);
      };
      script.onerror = () => {
        setStatus("blocked");
        window.setTimeout(() => loadFeed(index + 1), 350);
      };
      scripts.push(script);
      document.body.appendChild(script);
    }

    loadFeed(0);

    return () => {
      cancelled = true;
      scripts.forEach((script) => {
        if (script.parentNode) script.parentNode.removeChild(script);
      });
    };
  }, []);

  return (
    <div>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        {faFeeds.map((feed) => (
          <div key={feed.code} className="rounded-3xl bg-white p-5 text-slate-950 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950">{feed.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{feed.description}</p>
              </div>
              <a className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-sky-700" href="https://fulltime.thefa.com" target="_blank" rel="noreferrer">Full-Time</a>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div id={feed.containerId} style={{ width: "350px", maxWidth: "100%" }}>
                Data loading...
                <br />
                <br />
                <a className="font-bold text-sky-700 underline" href="https://www.thefa.com/FULL-TIME" target="_blank" rel="noreferrer">FULL-TIME Home</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {status === "blocked" ? (
        <div className="mx-auto mt-6 max-w-5xl rounded-2xl bg-amber-50 p-4 text-center text-sm font-bold text-amber-800">
          The FA Full-Time script may be blocked in some preview environments. Test the feeds again after deployment.
        </div>
      ) : null}
    </div>
  );
}
