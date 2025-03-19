const fs = require('fs');

function generateDictionaryDataset() {
  const commonWords = [
    // Substantivos
    "casa", "tempo", "ano", "dia", "vida", "homem", "mundo", "mão", "coisa", "trabalho",
    "pessoa", "lugar", "mulher", "caso", "país", "ponto", "governo", "problema", "grupo", "parte",
    "cidade", "empresa", "noite", "água", "forma", "momento", "sistema", "caminho", "nome", "número",
    "estado", "fato", "família", "dinheiro", "poder", "livro", "exemplo", "amigo", "história", "ideia",
    "carro", "cabeça", "casa", "palavra", "terra", "jogo", "filho", "mãe", "lei", "efeito",
    "porta", "rua", "questão", "olho", "amor", "arte", "corpo", "papel", "razão", "vez",
    "tipo", "mês", "chão", "pé", "campo", "medo", "mesa", "braço", "início", "guerra",
    
    // Verbos comuns
    "ser", "ter", "fazer", "estar", "poder", "dizer", "ir", "ver", "dar", "saber",
    "querer", "dever", "falar", "encontrar", "deixar", "passar", "ficar", "sentir", "parecer", "trazer",
    "criar", "mostrar", "começar", "levar", "precisar", "esperar", "entender", "colocar", "pensar", "conhecer",
    "viver", "tornar", "buscar", "permitir", "pedir", "usar", "conseguir", "chamar", "existir", "gostar",
    
    // Adjetivos
    "novo", "bom", "grande", "alto", "pequeno", "próprio", "último", "velho", "certo", "único",
    "melhor", "longo", "maior", "forte", "preciso", "possível", "político", "público", "importante", "nacional",
    "simples", "difícil", "social", "especial", "rápido", "claro", "fácil", "comum", "capaz", "feliz",
    "necessário", "seguinte", "principal", "internacional", "diferente", "econômico", "vivo", "próximo", "igual", "final",
    "presente", "jovem", "legal", "bonito", "futuro", "real", "pronto", "local", "popular", "livre"
  ];
  
  const derivatives = commonWords.flatMap(word => {
    const derivations = [];
    
    if (word.length > 4) {
      derivations.push(word + "mente");
      derivations.push(word + "ção");
      derivations.push(word + "dade");
      derivations.push(word + "ista");
      derivations.push(word + "oso");
      derivations.push(word + "al");
    }
    
    derivations.push("re" + word);
    derivations.push("des" + word);
    derivations.push("in" + word);
    derivations.push("super" + word);
    
    return derivations;
  });
  
  const allWords = [...new Set([...commonWords, ...derivatives])];
  
  fs.writeFileSync('complete-dictionary.json', JSON.stringify(allWords, null, 2));
  
  return allWords;
}

function generateTestCases(dictionary) {
  const testCases = [];
  
  // 1. Letter substitution
  for (let i = 0; i < 20; i++) {
    const originalWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    if (originalWord.length >= 4) {
      const position = Math.floor(Math.random() * originalWord.length);
      const substitutionLetters = "abcdefghijklmnopqrstuvwxyz";
      const substitutedLetter = substitutionLetters[Math.floor(Math.random() * substitutionLetters.length)];
      
      let misspelledWord = 
        originalWord.substring(0, position) + 
        substitutedLetter + 
        originalWord.substring(position + 1);
      
      testCases.push({
        type: "Substitution",
        word: originalWord,
        typed: misspelledWord,
        description: `Replaces '${originalWord[position]}' with '${substitutedLetter}' at position ${position}`
      });
    }
  }
  
  // 2. Letter removal
  for (let i = 0; i < 20; i++) {
    const originalWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    if (originalWord.length >= 4) {
      const position = Math.floor(Math.random() * originalWord.length);
      
      let misspelledWord = 
        originalWord.substring(0, position) + 
        originalWord.substring(position + 1);
      
      testCases.push({
        type: "Removal",
        word: originalWord,
        typed: misspelledWord,
        description: `Removes '${originalWord[position]}' at position ${position}`
      });
    }
  }
  
  // 3. Letter insertion
  for (let i = 0; i < 20; i++) {
    const originalWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    const position = Math.floor(Math.random() * (originalWord.length + 1));
    const insertionLetters = "abcdefghijklmnopqrstuvwxyz";
    const insertedLetter = insertionLetters[Math.floor(Math.random() * insertionLetters.length)];
    
    let misspelledWord = 
      originalWord.substring(0, position) + 
      insertedLetter + 
      originalWord.substring(position);
    
    testCases.push({
      type: "Insertion",
      word: originalWord,
      typed: misspelledWord,
      description: `Inserts '${insertedLetter}' at position ${position}`
    });
  }
  
  // 4. Distance 2 cases (combination of errors)
  for (let i = 0; i < 20; i++) {
    const originalWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    if (originalWord.length >= 5) {
      const position1 = Math.floor(Math.random() * originalWord.length);
      let position2 = Math.floor(Math.random() * originalWord.length);
      while (position2 === position1) {
        position2 = Math.floor(Math.random() * originalWord.length);
      }
      
      const substitutionLetters = "abcdefghijklmnopqrstuvwxyz";
      const letter1 = substitutionLetters[Math.floor(Math.random() * substitutionLetters.length)];
      const letter2 = substitutionLetters[Math.floor(Math.random() * substitutionLetters.length)];
      
      let tempWord = 
        originalWord.substring(0, position1) + 
        letter1 + 
        originalWord.substring(position1 + 1);
        
      let misspelledWord = 
        tempWord.substring(0, position2) + 
        letter2 + 
        tempWord.substring(position2 + 1);
      
      testCases.push({
        type: "Distance 2",
        word: originalWord,
        typed: misspelledWord,
        description: `Substitutes characters at positions ${position1} and ${position2}`
      });
    }
  }
  
  // 5. Cases with distance > 2 (outside correction limit)
  for (let i = 0; i < 10; i++) {
    const originalWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    if (originalWord.length >= 6) {
      const positions = [];
      while (positions.length < 3) {
        const pos = Math.floor(Math.random() * originalWord.length);
        if (!positions.includes(pos)) {
          positions.push(pos);
        }
      }
      
      const substitutionLetters = "abcdefghijklmnopqrstuvwxyz";
      let misspelledWord = originalWord;
      
      for (const pos of positions) {
        const letter = substitutionLetters[Math.floor(Math.random() * substitutionLetters.length)];
        misspelledWord = 
          misspelledWord.substring(0, pos) + 
          letter + 
          misspelledWord.substring(pos + 1);
      }
      
      testCases.push({
        type: "Beyond limit",
        word: originalWord,
        typed: misspelledWord,
        description: `Three substitutions (distance > 2)`
      });
    }
  }
  
  fs.writeFileSync('test-cases.json', JSON.stringify(testCases, null, 2));
  
  return testCases;
}

module.exports = {
  generateDictionaryDataset,
  generateTestCases
};

if (require.main === module) {
  console.log("Generating dictionary dataset...");
  const dictionary = generateDictionaryDataset();
  console.log(`Generated dictionary with ${dictionary.length} words.`);
  
  console.log("Generating test cases...");
  const tests = generateTestCases(dictionary);
  console.log(`Generated ${tests.length} test cases.`);
  
  console.log("Files created: complete-dictionary.json and test-cases.json");
}