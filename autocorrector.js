const LevenshteinCalculator = require('./levenshtein');

class Autocorrector {
  constructor() {
    this.levenshtein = new LevenshteinCalculator();
  }

  correctWord(dicionario, typedWord) {
    if (dicionario.includes(typedWord)) {
      return typedWord;
    }
    
    return this.findCloserWord(dicionario, typedWord);
  }
  
  findCloserWord(dicionario, typedWord) {
    const MAXIMUM_DISTANCE = 2;
    
    const distances = dicionario.map(word => ({
      word: word,
      distance: this.levenshtein.calculate(word, typedWord)
    }));
    
    const candidates = distances.filter(item => item.distance <= MAXIMUM_DISTANCE);
    
    if (candidates.length === 0) {
      return null;
    }
    
    const closerWord = candidates
      .sort((a, b) => a.distance - b.distance)[0]
      .word;
      
    return closerWord;
  }
}

module.exports = Autocorrector;