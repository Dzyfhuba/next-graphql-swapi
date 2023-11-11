import Footer from "@/components/footer";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Footer", () => {
  test("should render footer", () => {
    render(<Footer />);

    // Copyright © 2023 <a href="https://hafidzubaidillah.com" target='_blank'>Hafidz Ubaidillah</a>
    expect(
      screen.getByText(/© 2023/i)
    ).toBeTruthy();
    expect(
      screen.getByText(/Hafidz Ubaidillah/i)
    ).toBeTruthy();
  })
})