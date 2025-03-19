const Autocorrector = require('./autocorrector');

function main() {
  const dicionario = ["casa", "cama", "carro", "gato", "pato"];
  const typedWord = "raposa";
  
  const autocorrector = new Autocorrector();
  
  const result = autocorrector.correctWord(dicionario, typedWord);
  
  console.log(`Input: "${typedWord}"`);
  console.log(`Dicionário: [${dicionario.map(p => `"${p}"`).join(', ')}]`);
  
  if (result) {
    console.log(`Output: "${result}"`);
    
    if (result !== typedWord) {
      const distance = new (require('./levenshtein'))().calculate(result, typedWord);
      
      let explanation = `"${typedWord}" está a uma distância de edição ${distance} de "${result}" (`;
      
      if (result.length > typedWord.length) {
        explanation += `inserir "${result[result.length-1]}"`;
      } else if (result.length < typedWord.length) {
        explanation += `remover "${typedWord[typedWord.length-1]}"`;
      } else {
        for (let i = 0; i < result.length; i++) {
          if (result[i] !== typedWord[i]) {
            explanation += `substituir "${typedWord[i]}" por "${result[i]}"`;
            break;
          }
        }
      }
      
      explanation += ').';
      console.log(explanation);
    }
  } else {
    console.log('Saída: NULL (nenhuma palavra próxima encontrada)');
  }
}

main();

module.exports = {
  LevenshteinCalculator: require('./levenshtein'),
  Autocorrector: require('./autocorrector')
};