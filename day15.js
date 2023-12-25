function part1(input) {
    const strings = parseInput(input);
    let result = 0;
    for (const s of strings) {
        result += getHash(s);
    }

    return result;
}

function part2(input) {
  const commands = parsePart2(input);

  const boxes = [];
  for (let i = 0; i < 256; i++) {
    boxes.push(makeBox());
  }

  for (let cmd of commands) {
    const hash = getHash(cmd[0]);

    if (cmd.length === 1) {
      boxes[hash].del(cmd[0]);
    } else {
      boxes[hash].set(cmd[0], cmd[1]);
    }
  }

  let result = 0;
  for (let box = 0; box < boxes.length; box++) {
    let boxResult = 0;
    const slots = boxes[box].toArray();
    for (let slot = 0; slot < slots.length; slot++) {
      boxResult += (box + 1) * (slot + 1) * slots[slot].len;
    }
    result += boxResult;
  }

  return result;
}

function parseInput(input) {
    return input.split(',');
}

function parsePart2(input) {
  const pattern = /^(\w+)(=(\d+)|-)$/;
  return input
    .split(',')
    .map((cmd) => {
      const match = cmd.match(pattern);
      if (match[2] === '-') {
        return [match[1]];
      }

      return [match[1], parseInt(match[3])];
    });
}

function getHash(s) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        result += c;
        result *= 17;
        result %= 256;
    }

    return result;
}

function makeBox() {
  return {
    head: null,
    tail: null,
    index: {},

    set: function (name, len) {
      if (name in this.index) {
        this.index[name].len = len;
      } else {
        this.index[name] = {
          name,
          len,
          next: null,
          prev: null
        };

        if (this.head === null) {
          this.head = this.index[name];
          this.tail = this.index[name];
        } else {
          this.tail.next = this.index[name];
          this.index[name].prev = this.tail;
          this.tail = this.index[name];
        }
      }
    },
    del: function (name) {
      if (name in this.index) {
        if (this.index[name].prev !== null) this.index[name].prev.next = this.index[name].next;
        else this.head = this.head.next;
        if (this.index[name].next !== null) this.index[name].next.prev = this.index[name].prev;
        else this.tail = this.tail.prev;
        delete this.index[name];
      }
    },
    toArray: function () {
      const result = [];
      for (let current = this.head; current !== null; current = current.next) {
        result.push({
          len: current.len,
          name: current.name
        });
      }

      return result;
    }
  };
}

module.exports = {part1, part2};
