const manualExamples = [
    {
      description: "Correct word (already exists in dictionary)",
      dictionary: ["casa", "cama", "carro", "gato", "pato"],
      word: "casa",
      expectedResult: "casa"
    },
    {
      description: "Letter substitution (distance = 1)",
      dictionary: ["casa", "cama", "carro", "gato", "pato"],
      word: "caso",
      expectedResult: "casa"
    },
    {
      description: "Letter removal (distance = 1)",
      dictionary: ["casa", "cama", "carro", "gato", "pato"],
      word: "cas",
      expectedResult: "casa"
    },
    {
      description: "Letter addition (distance = 1)",
      dictionary: ["casa", "cama", "carro", "gato", "pato"],
      word: "casaa",
      expectedResult: "casa"
    },
    {
      description: "Two changes (distance = 2)",
      dictionary: ["casa", "cama", "carro", "gato", "pato"],
      word: "cati",
      expectedResult: "gato"
    },
    {
      description: "Distance > 2 (no suggestion)",
      dictionary: ["casa", "cama", "carro", "gato", "pato"],
      word: "barco",
      expectedResult: null
    },
    {
      description: "Word with same distance to multiple options",
      dictionary: ["casa", "cosa", "caso", "fase", "vaso"],
      word: "casu",
      expectedResult: "casa" // In this case, the first one found by the algorithm
    },
    {
      description: "Long word with error in the middle",
      dictionary: ["sistema", "problema", "programa", "empresa", "governo"],
      word: "sistuma",
      expectedResult: "sistema"
    },
    {
      description: "Checking uppercase vs lowercase",
      dictionary: ["casa", "cama", "carro", "gato", "pato"],
      word: "CASA",
      expectedResult: null // Case sensitive
    }
  ];
  
  function runManualTests() {
    const Autocorrector = require('./autocorrector');
    const autocorrector = new Autocorrector();
    
    console.log("Running manual tests:");
    console.log("==========================\n");
    
    for (const example of manualExamples) {
      const result = autocorrector.correctWord(example.dictionary, example.word);
      const success = (result === example.expectedResult) ||
                    (result === null && example.expectedResult === null);
      
      console.log(`Test: ${example.description}`);
      console.log(`Word: "${example.word}"`);
      console.log(`Result: "${result === null ? 'NULL' : result}"`);
      console.log(`Expected: "${example.expectedResult === null ? 'NULL' : example.expectedResult}"`);
      console.log(`Status: ${success ? 'PASSED ✓' : 'FAILED ✗'}`);
      console.log("---------------------------\n");
    }
  }
  
  module.exports = {
    manualExamples,
    runManualTests
  };
  
  if (require.main === module) {
    runManualTests();
  }