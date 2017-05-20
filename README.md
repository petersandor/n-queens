# n-queens

> Calculates possible placements of N queens on NxN board. More details about the problem https://developers.google.com/optimization/puzzles/queens

## :warning: WARNING
Algorithm used in this solution is not fully optimised (also, it's JS :). Running this for boards with size >10 can take some time. A lot of it. Process runs on single CPU only.

## Prerequisites
- Git (for cloning the repository, you can always just download and unzip)
- Node & npm - latest version recommended

## Clone the repository

```
$ git clone https://github.com/petersandor/n-queens.git && cd n-queens
```

## Usage

```
$ ./queens.js

  Usage: queens [options]

  Calculates possible placements of N queens on NxN board

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -n, --number <n>  Number of queens and board size
    -p, --print-all   Print all solutions found (n > 8 has hundreds)

  Example usage:

    $ ./queens.js -n 5 -p
    
    
    |Q|_|_|_|_|
    |_|_|Q|_|_|
    |_|_|_|_|Q|
    |_|Q|_|_|_|
    |_|_|_|Q|_|

    |Q|_|_|_|_|
    |_|_|_|Q|_|
    |_|Q|_|_|_|
    |_|_|_|_|Q|
    |_|_|Q|_|_|

    |_|Q|_|_|_|
    |_|_|_|Q|_|
    |Q|_|_|_|_|
    |_|_|Q|_|_|
    |_|_|_|_|Q|

    |_|Q|_|_|_|
    |_|_|_|_|Q|
    |_|_|Q|_|_|
    |Q|_|_|_|_|
    |_|_|_|Q|_|

    function calls: 462
    solutions: 10
    time: 24.208ms
```

## License

MIT © [Peter Sandor](http://petersandor.name)
