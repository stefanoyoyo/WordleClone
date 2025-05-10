const fs = require('fs');
const path = require('path');

// Funzione principale
function filterFiveLetterWords(filePath) {
  const absolutePath = path.resolve(filePath);
  const dir = path.dirname(absolutePath);
  const baseName = path.basename(filePath, '.json');
  const outputPath = path.join(dir, `${baseName}_5letters.json`);

  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    const words = JSON.parse(data);

    if (!Array.isArray(words)) {
      throw new Error('Il file JSON non contiene un array.');
    }

    const filtered = words.filter(word => typeof word === 'string' && word.length === 5);

    fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2), 'utf8');
    console.log(`✅ File creato con successo: ${outputPath}`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
  }
}

// Esegui se chiamato da terminale
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('❗ Specificare il path del file JSON come argomento.');
    process.exit(1);
  }
  filterFiveLetterWords(filePath);
}
