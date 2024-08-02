import { readFileSync } from "fs";
import * as vitest from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { rule } from "./src/enforce-string-in-text";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run("enforce-string-in-text", rule, {
  invalid: [
    {
      code: readFileSync("./tests/render-number-primitive.tsx", "utf8"),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: 1,
    },
    {
      code: readFileSync("./tests/render-object.tsx", "utf8"),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: 1,
    },
    {
      code: readFileSync("./tests/render-function-call.tsx", "utf8"),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: 1,
    },
    {
      code: readFileSync("./tests/render-union-type.tsx", "utf8"),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: 1,
    },
  ],
  valid: [],
});
