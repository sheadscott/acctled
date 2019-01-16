import { negi } from "../helpers";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

describe("negi()", () => {
  test("Retrieves the expected character", () => {
    expect(negi(alphabet, 3)).toEqual("d");
  });

  test("Counts from the end of the array with a negative index", () => {
    expect(negi(alphabet, -1)).toEqual(alphabet[alphabet.length - 1]);
  });

  test("The index is greater than the number of indices in the Array", () => {
    expect(negi(alphabet, 53)).toEqual("b");
  });

  test("The index is negative and greater than the number of indices in the array", () => {
    expect(negi(alphabet, -79)).toEqual("z");
  });
});
