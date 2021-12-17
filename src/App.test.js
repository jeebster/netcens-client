import { create } from "react-test-renderer";
import App from "./App";

it("renders the application successfully", () => {
  expect(() => {
    create(<App />);
  }).not.toThrow();
});
