import React from "react";
import CensorshipInfoView from "./index";
import countryData from "./countryData.json";
import { act, create } from "react-test-renderer";

// Mock API request - this should be refactored in future iterations to prevent global namespace pollution
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(countryData),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("CensorshipInfoView rendering", () => {
  describe("data fetching", () => {
    it("should set state on fetch success", () => {
      let tree;
      act(() => {
        tree = create(<CensorshipInfoView />);
      });

      const testInstance = tree.root;

      expect(testInstance.state.responseData).toEqual(
        expect.objectContaining(countryData)
      );
    });

    it("should set state on fetch failure", () => {
      fetch.mockImplementationOnce(() => Promise.reject("Error fetching data"));

      let tree;
      act(() => {
        tree = create(<CensorshipInfoView />);
      });

      const testInstance = tree.root;

      expect(testInstance.state.hasError).toEqual(true);
      expect(testInstance.state.responseData).toEqual([]);
    });
  });

  describe("data sorting", () => {
    it.todo("should set state on sort parameter selection change");

    describe("name:asc", () => {
      it.todo("should sort data ascending by object property 'name'");
    });
    describe("name:desc", () => {
      it.todo("should sort data descending by object property 'name'");
    });
    describe("count:asc", () => {
      it.todo("should sort data ascending by object property 'count'");
    });
    describe("count:desc", () => {
      it.todo("should sort data descending by object property 'count'");
    });
  });
});
