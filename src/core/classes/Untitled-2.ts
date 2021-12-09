export module unamed {
  function allArray<T>(specimen: T[]) {
    return specimen.every(item => Array.isArray(item));
  }

  // I want to think by myself of a structure to map at a specific level of nested arrays (the lowermost or the innermost)...

  // `// arbitrary chose to go down inside nested arrays and up outside`

  // goIn or getOut can be called an infinite amount of time and at the topmost level or lowermost level will always return the same value indefinitely
  class NestedArrays {
    public goIn() {}
    public getOut() {}
  }

  [
    [[], [], []],
    [[], []],
    [[], [], [], [], [], []],
    [[], [], []],
  ];

  ['foo', 'bare', 'bazes', 'fi', 'bolo', 'bollo', 'ball', 'balls'];

  const upperMostArray = [
    'Lorem',
    'Ipsum is',
    'simply dummy text',
    'of the printing and',
    'typesetting industry.',
    'Lorem Ipsum',
    "has been the industry's",
    'standard dummy text ever',
    'since the 1500s',
    'when an unknown printer',
    'took a galley of type and',
    'scrambled it to make a type specimen book',
    'It has survived not only five centuries',
    'but also the leap into electronic typesetting',
    'remaining essentially unchanged.',
  ];

  const space = ' ';
  (list: string[]) => list.map(str => str.split(space));

  (item: string) => item.length;

  void allArray;
  void NestedArrays;
  void upperMostArray;
}
