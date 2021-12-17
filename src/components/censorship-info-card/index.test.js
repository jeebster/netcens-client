import React from "react";
import CensorshipInfoCard from "./index";
import { render, screen } from "@testing-library/react";

test("CensorshipInfoCard rendering", () => {
  const props = {
    alpha_2: "AU",
    count: 12000,
    name: "Australia",
  };
  const countPropRegex = new RegExp(props.count.toLocaleString(), "i");
  const namePropRegex = new RegExp(props.name, "i");

  render(<CensorshipInfoCard {...props} />);

  const countPropElement = screen.getByText(countPropRegex);
  expect(countPropElement).toBeInTheDocument();

  const namePropElement = screen.getByText(namePropRegex);
  expect(namePropElement).toBeInTheDocument();
});
