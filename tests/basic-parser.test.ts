import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const SHAKESPEAR_CSV_PATH = path.join(__dirname, "../data/shakespear.csv");
const ALGORITHMS_CSV_PATH = path.join(__dirname, "../data/algorithms.csv");
const ALLONONELINE_CSV_PATH = path.join(__dirname, "../data/allOnOneLine.csv");
const UNEQUAL_CSV_PATH = path.join(__dirname, "../data/unequal.csv");

const regularSchema = z.tuple([z.string(), z.coerce.number()]);
const manyTypesSchema = z.tuple([z.string(), z.string(), z.number(), z.boolean(), z.email()]);
const ariphmeticSchema = z.tuple([z.number(), z.symbol(), z.number(), z.symbol(), z.number()]);

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV returns correct types:strings", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)

  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]);
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});



test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

/*test("parceCSV inner arrays on return have equal length, or error fires", async () => {
  const results_1 = await parseCSV(SHAKESPEAR_CSV_PATH)
  const results_2 = await parseCSV(ALGORITHMS_CSV_PATH)
  const results_3 = await parseCSV(UNEQUAL_CSV_PATH)
  for (let i = 0; i < results_1.length - 2; i++) {
    expect(results_1[i].length).toEqual(results_1[i + 1].length)
  }
  for (let i = 0; i < results_2.length - 2; i++) {
    expect(results_2[i].length).toEqual(results_2[i + 1].length)
  }
});*/

test("parceCSV will always return correct length", async () => {
  const results_1 = await parseCSV(SHAKESPEAR_CSV_PATH)
  const results_2 = await parseCSV(ALGORITHMS_CSV_PATH)
  const results_3 = await parseCSV(ALLONONELINE_CSV_PATH)
  expect(results_1).toHaveLength(5);
  expect(results_2).toHaveLength(4);
  expect(results_3).toHaveLength(1);
});


/*test("parseCSV returns correct types: number", async () => {
  const results = await parseCSV(ALGORITHMS_CSV_PATH)
  expect(results[1][2] + 3).toEqual(1959);
  expect(results[2][2] + 100).toEqual(2026);
});*/

test("parceCSV will not separate commas in double quotes", async () => {
  const results = await parseCSV(SHAKESPEAR_CSV_PATH)
  expect(results[2]).toEqual(["Julius Ceasar", "“The fault, dear Brutus, is not in our stars, but in ourselves.”", 9114])
  expect(results[4]).toEqual(["The Winter's Tale", "“Exit, pursued by a bear”", 33670])
});




