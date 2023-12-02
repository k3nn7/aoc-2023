const {readFile} = require('node:fs/promises');

async function main() {
  const day = process.argv[2]
  const part = process.argv[3];
  const inputPath = `./input${day}`;
  const modulePath = `./day${day}`;

  const {part1, part2} = require(modulePath, {encoding: 'utf8'});
  const input = (await readFile(inputPath)).toString();

  console.log(`Day ${day}, part ${part}`);
  if (part === '1') {
    console.log(part1(input));
  }
  if (part === '2') {
    console.log(part2(input));
  }
}

main()
  .then(() => {})
  .catch((err) => console.log('Error', err));
