import clsx from "clsx";
import { useMemo } from "react";
import { limit } from "./config";
import { TextCounterProps } from "./types";

export default function TextCounter({ editor, characterCount }: TextCounterProps) {
  const percentage = useMemo(
    () => Math.round((100 / limit) * characterCount),
    [characterCount],
  );

  return (
    <div
      className={clsx("character-count", {
        "character-count--warning": characterCount === limit,
      })}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      {editor?.storage.characterCount.characters()} / {limit} characters
      <br />
      {editor?.storage.characterCount.words()} words
    </div>
  );
}
