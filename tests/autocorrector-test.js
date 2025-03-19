const fs = require('fs');
const Autocorrector = require('../autocorrector');
const { generateDictionaryDataset, generateTestCases } = require('./dictionary_generator');

function runTests() {
  console.log("Loading dictionary and test cases...");
  
  let dictionary, testCases;
  
  if (fs.existsSync('complete-dictionary.json')) {
    dictionary = JSON.parse(fs.readFileSync('complete-dictionary.json', 'utf8'));
  } else {
    dictionary = generateDictionaryDataset();
  }
  
  if (fs.existsSync('test-cases.json')) {
    testCases = JSON.parse(fs.readFileSync('test-cases.json', 'utf8'));
  } else {
    testCases = generateTestCases(dictionary);
  }
  
  console.log(`Loaded dictionary with ${dictionary.length} words`);
  console.log(`Loaded test cases: ${testCases.length}`);
  
  const autocorrector = new Autocorrector();
  
  const results = {
    total: testCases.length,
    corrected: 0,
    notCorrected: 0,
    correctCorrection: 0,
    incorrectCorrection: 0,
    executionTime: 0
  };
  
  const details = [];
  
  console.log("\nRunning tests...");
  const testStart = Date.now();
  
  for (const testCase of testCases) {
    const { type, word, typed, description } = testCase;
    
    const caseStart = Date.now();
    const suggestion = autocorrector.correctWord(dictionary, typed);
    const caseDuration = Date.now() - caseStart;
    
    const result = {
      type,
      originalWord: word,
      typedWord: typed,
      suggestion,
      correct: suggestion === word,
      timeMs: caseDuration,
      description
    };
    
    if (suggestion) {
      results.corrected++;
      if (suggestion === word) {
        results.correctCorrection++;
      } else {
        results.incorrectCorrection++;
      }
    } else {
      results.notCorrected++;
    }
    
    details.push(result);
  }
  
  results.executionTime = Date.now() - testStart;
  
  results.successRate = (results.correctCorrection / results.total * 100).toFixed(2) + '%';
  results.averageTimePerCase = (results.executionTime / results.total).toFixed(2) + 'ms';
  
  fs.writeFileSync('test-results.json', JSON.stringify({
    results,
    details
  }, null, 2));
  
  console.log("\nTest Summary:");
  console.log(`Total test cases: ${results.total}`);
  console.log(`Words corrected: ${results.corrected} (${results.correctCorrection} correct, ${results.incorrectCorrection} incorrect)`);
  console.log(`Words without suggestion: ${results.notCorrected}`);
  console.log(`Success rate: ${results.successRate}`);
  console.log(`Total time: ${results.executionTime}ms`);
  console.log(`Average time per case: ${results.averageTimePerCase}`);
  console.log("\nDetailed results saved in 'test-results.json'");
  
  console.log("\nExamples of successful corrections:");
  const successes = details.filter(d => d.correct).slice(0, 5);
  successes.forEach(s => console.log(`"${s.typedWord}" -> "${s.suggestion}" (${s.description})`));
  
  console.log("\nExamples of incorrect corrections:");
  const errors = details.filter(d => d.suggestion && !d.correct).slice(0, 5);
  errors.forEach(e => console.log(`"${e.typedWord}" -> "${e.suggestion}" (should be "${e.originalWord}")`));
  
  console.log("\nExamples without suggestion:");
  const noSuggestion = details.filter(d => !d.suggestion).slice(0, 5);
  noSuggestion.forEach(s => console.log(`"${s.typedWord}" -> NULL (original: "${s.originalWord}")`));
}

runTests();