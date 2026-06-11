"use client";

import { useEffect, useState } from "react";

const HEADING = "Find Your Dream Job Today";
const SUBTITLE =
  "HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.";

export default function TypewriterHero() {
  const [headingText, setHeadingText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [headingDone, setHeadingDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  /* ── Type heading first ── */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setHeadingText(HEADING.slice(0, i + 1));
      i++;
      if (i === HEADING.length) {
        clearInterval(interval);
        // small pause before subtitle starts
        setTimeout(() => setHeadingDone(true), 300);
      }
    }, 55); // heading speed — ms per character

    return () => clearInterval(interval);
  }, []);

  /* ── Type subtitle after heading finishes ── */
  useEffect(() => {
    if (!headingDone) return;
    let i = 0;
    const interval = setInterval(() => {
      setSubtitleText(SUBTITLE.slice(0, i + 1));
      i++;
      if (i === SUBTITLE.length) {
        clearInterval(interval);
        // hide cursor when fully done
        setTimeout(() => setShowCursor(false), 800);
      }
    }, 18); // subtitle speed — faster since it's longer

    return () => clearInterval(interval);
  }, [headingDone]);

  /* ── Blinking cursor ── */
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <>
      {/* Heading */}
      <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
        {headingText}
        {/* Cursor shows on heading until heading is done */}
        {!headingDone && (
          <span
            className={`inline-block w-[3px] h-[0.9em] ml-1 rounded-sm bg-violet-400 align-middle transition-opacity duration-100 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </h1>

      {/* Subtitle */}
      <p className="max-w-[480px] text-sm leading-relaxed text-slate-300 sm:text-base">
        {subtitleText}
        {/* Cursor moves to subtitle after heading done */}
        {headingDone && showCursor && (
          <span
            className={`inline-block w-[2px] h-[1em] ml-0.5 rounded-sm bg-violet-400 align-middle transition-opacity duration-100 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </p>
    </>
  );
}
