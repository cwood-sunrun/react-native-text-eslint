import { readFileSync } from "fs";
import * as vitest from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { rule } from "./src/text-only-strings";

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

ruleTester.run("my-rule", rule, {
  invalid: [
    {
      code: readFileSync("./react-native-text.tsx", "utf8"),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: 1,
    },

    // you can enable JSX parsing by passing parserOptions.ecmaFeatures.jsx = true
    // {
    //   code: "const z = <div />;",
    //   parserOptions: {
    //     ecmaFeatures: {
    //       jsx: true,
    //     },
    //   },
    // },
  ],
  valid: [
    // invalid tests must always be an object
    // {
    //   code: "const a = 1;",
    //   // invalid tests must always specify the expected errors
    //   errors: [
    //     {
    //       messageId: "ruleMessage",
    //       // If applicable - it's recommended that you also assert the data in
    //       // addition to the messageId so that you can ensure the correct message
    //       // is generated
    //       data: {
    //         placeholder1: "a",
    //       },
    //     },
    //   ],
    // },
    //
    // // fixers can be tested using the output parameter
    // {
    //   code: "const b = 1;",
    //   output: "const c = 1;",
    //   errors: [
    //     /* ... */
    //   ],
    // },
    // passing `output = null` will enforce the code is NOT changed
    // {
    //   code: "const c = 1;",
    //   output: null,
    //   errors: [
    //     /* ... */
    //   ],
    // },
    //
    // // suggestions can be tested via errors
    // {
    //   code: "const d = 1;",
    //   output: null,
    //   errors: [
    //     {
    //       messageId: "suggestionError",
    //       suggestions: [
    //         {
    //           messageId: "suggestionOne",
    //           output: "const e = 1;",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // // passing `suggestions = null` will enforce there are NO suggestions
    // {
    //   code: "const d = 1;",
    //   output: null,
    //   errors: [
    //     {
    //       messageId: "noSuggestionError",
    //       suggestions: null,
    //     },
    //   ],
    // },
  ],
});
