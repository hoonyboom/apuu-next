import Page from "@/app/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

test("Page", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 3, name: "크루" })).toBeDefined();
});

describe("Test", () => {
  it("testing", () => {
    expect(true).toBeTruthy();
  });
});
