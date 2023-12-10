import { test, vi, describe, beforeEach, afterEach, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewDoc from "./ViewDoc";
import { BrowserRouter as Router } from "react-router-dom";
import { getDoc } from "../../../Api/Service/doc.service";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

vi.mock("../../../Api/Service/doc.service");

describe("ViewDoc", () => {
  beforeEach(() => {
    getDoc.mockImplementation((path) => {
      if (path === "")
        return Promise.resolve({
          data: {
            content: [
              { id: "1", name: "Document 1", latestVersion: "1.0" },
              { id: "2", name: "Document 2", latestVersion: "1.0" },
            ],
          },
        });
      if (path.includes("/latest"))
        return Promise.resolve({ data: { versionList: ["1.0", "1.1"] } });
      return Promise.resolve({
        data: { documentVersion: { version: path.split("/")[1] } },
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the document version", async () => {
    render(
      <Router>
        <ViewDoc />
      </Router>
    );

    // Wait for the documents to be loaded
    await waitFor(() => screen.getByText("Select a document"));

    // Check the document list
    fireEvent.mouseDown(screen.getByText("Select a document"));
    fireEvent.click(screen.getByText("Document 1"));

    // Check the version list
    await waitFor(() => expect(screen.getByText("1.0")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("1.1")).toBeInTheDocument());
  });
});