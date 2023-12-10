import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterScreen from "./RegisterScreen";
import { BrowserRouter as Router } from "react-router-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

it("Register", () => {
  render(
    <Router>
      <RegisterScreen />
    </Router>
  );

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "superdev@gmail.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "superdev123" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "superdev123" },
  });
  fireEvent.change(screen.getByLabelText("Fullname"), {
    target: { value: "super dev" },
  });
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: "0367458388" },
  });
  fireEvent.click(screen.getByLabelText("DateOfBirth"));
  fireEvent.click(screen.getByText("Today"));
  fireEvent.mouseDown(screen.getByLabelText("Gender"));
  fireEvent.click(screen.getByText("Male"));
  fireEvent.click(screen.getByText("Register"));
  waitFor(() =>
    expect(
      screen.getByText("Register account successfully")
    ).toBeInTheDocument()
  );
});