const checkInput = require("../src/client/js/inputChecker");

test("test that valid data returns true", () => {
  expect(checkInput("Paris", "2025-02-17", "2025-02-21")).toBe(true);
});

test("test that invalid data returns false", () => {
  expect(checkInput("Paris", "2025-02-17", "2025-02-12")).toBe(false);
});

test("test that no data returns false", () => {
  expect(checkInput("", "", "")).toBe(false);
});
