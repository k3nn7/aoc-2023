function part1(input) {
  const idPattern = /^Game (?<id>\d+):/;
  const max = {
    'red': 12,
    'green': 13,
    'blue': 14
  };
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    const id = parseInt(line.match(idPattern).groups.id);
    const sets = line.split(';');
    let exceeded = false;

    for (const set of sets) {
      const regex = /(?<count>\d+) (?<color>green|red|blue)/g;
      const counts = {'red': 0, 'green': 0, 'blue': 0};

      let result;
      while ((result = regex.exec(set)) !== null) {
        counts[result.groups.color] += parseInt(result.groups.count);
      }

      for (const [color, count] of Object.entries(counts)) {
        if (count > max[color]) exceeded = true;
      }
    }

    if (!exceeded) sum += id;
  }

  return sum;
}

function part2(input) {
  const idPattern = /^Game (?<id>\d+):/;
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    const id = parseInt(line.match(idPattern).groups.id);
    const sets = line.split(';');

    const counts = {
      'red': 0,
      'green': 0, 
      'blue': 0
    };

    for (const set of sets) {
      const regex = /(?<count>\d+) (?<color>green|red|blue)/g;

      let result;
      while ((result = regex.exec(set)) !== null) {
        const color = result.groups.color,
          count = parseInt(result.groups.count);
        
        counts[color] = Math.max(counts[color], count);
      }

    }

    let power = 1;
    for (const count of Object.values(counts)) {
      power *= count;
    }

    sum += power;
  }

  return sum;

}

module.exports = {part1, part2}
