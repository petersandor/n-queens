# n-queens

> Calculates possible placements of N queens on NxN board. More details about the problem https://developers.google.com/optimization/puzzles/queens

## :warning: WARNING
Algorithm used in this solution is not fully optimised (also, it's JS :). Running this for boards with size >10 can take some time. A lot of it. Process runs on single CPU only.

## Prerequisites
- Git (for cloning the repository, you can always just [download a ZIP archive](https://github.com/petersandor/n-queens/archive/master.zip))
- Node & npm - latest version recommended

## Clone the repository and install dependencies

```
$ git clone https://github.com/petersandor/n-queens.git
$ cd n-queens
$ npm install
```

## Windows users
If you are trying this out on Windows, use the script like this:
```
λ node queens -n 5 -p
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
Note: Displays only 4 solutions by default. If you really want to see all of them, use `-p`

## License

MIT © [Peter Sandor](https://petersandor.name)
