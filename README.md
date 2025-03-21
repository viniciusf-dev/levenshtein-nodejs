# Levenshtein Autocorrector Testing Suite

This repository contains scripts designed to test and improve your autocorrector. It provides a solid foundation for generating test cases, running automated tests, and performing manual testing across various scenarios.

---

## Contents

1. **Dictionary and Test Case Generator (`dictionary_generator.js`)**
2. **Autocorrection Test Script (`autocorrection-test.js`)**
3. **Manual Test Examples (`manual-test-examples.js`)**

---

## 1. Dictionary and Test Case Generator (`dictionary-generator.js`)

This script performs the following tasks:

- **Dictionary Generation:** Creates a large dictionary containing over 500 Portuguese words.
- **Test Case Creation:** Generates various test cases that simulate common typing errors, including:
  - **Letter substitution** (edit distance of 1)
  - **Letter removal** (edit distance of 1)
  - **Letter insertion** (edit distance of 1)
  - **Combined errors** (edit distance of 2)
  - **Errors beyond the correction limit** (edit distance > 2)

---

## 2. Autocorrection Test Script (`autocorrection-test.js`)

This script automates the testing process and provides detailed statistical feedback:

- **Test Execution:** Runs all the generated test cases.
- **Metrics Calculation:** Computes metrics such as accuracy rate and execution time.
- **Result Logging:** Saves detailed test results in a JSON file.
- **Output Examples:** Displays examples of successful corrections, incorrect suggestions, and cases where no suggestion was provided.

---

## 3. Manual Test Examples (`manual-test-examples.js`)

This script includes specific examples for manual testing:

- **Scenario Coverage:** Tests different scenarios including correct words, substitutions, insertions, etc.
- **Edge Cases:** Includes examples where multiple options share the same edit distance.
- **Case Sensitivity:** Evaluates behavior with uppercase vs. lowercase letters.

---

## How to Use These Scripts

### Generate Dictionary and Test Cases

```bash
node dictionary_generator.js
```
### Run Automated Tests

```bash
node autocorrection-test.js
```

### Test with Manual Examples

```bash
node manual-test-examples.js
```

### Suggestions for Improving Your Autocorrector
#### Case-Insensitivity

- Enhancement: The current implementation is case-sensitive. Consider modifying the correctWord function to convert words to lowercase before performing comparisons.
- Performance Optimization
- For handling large dictionaries efficiently, consider implementing:
- Prefix/Suffix Indexing: To quickly narrow down potential matches.
- Algorithm Refinements
- Keyboard Proximity: Prioritize substitutions for characters that are closer together on the keyboard.
- Language-Specific Rules: Integrate rules specific to Portuguese to enhance correction accuracy.
- Contextual Correction: Implement context-aware suggestions by considering neighboring words.
  

Happy testing and coding! 🙂
