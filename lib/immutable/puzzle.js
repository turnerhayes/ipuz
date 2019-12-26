function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require("immutable"),
    List = _require.List,
    Map = _require.Map,
    OrderedMap = _require.OrderedMap,
    Record = _require.Record,
    is = _require.is,
    Collection = _require.Collection,
    fromJS = _require.fromJS;

var PuzzleMixin = require("../puzzle-mixin");

var infoSchema = {
  title: "",
  author: "",
  publisher: "",
  copyright: "",
  difficulty: "",
  intro: "",
  formatExtra: void 0
};

var PuzzleInfo =
/*#__PURE__*/
function (_Record) {
  _inherits(PuzzleInfo, _Record);

  function PuzzleInfo() {
    _classCallCheck(this, PuzzleInfo);

    return _possibleConstructorReturn(this, _getPrototypeOf(PuzzleInfo).apply(this, arguments));
  }

  return PuzzleInfo;
}(Record(infoSchema, "PuzzleInfo"));

var schema = {
  grid: List(),
  clues: Map({
    across: OrderedMap(),
    down: OrderedMap()
  }),
  userSolution: List(),
  info: new PuzzleInfo(),
  extensions: Map()
};
/**
 * Represents an immutable version of {@link xpuz.Puzzle|Puzzle}.
 *
 * @extends external:Immutable.Record
 * @memberof xpuz
 *
 * @mixes xpuz.PuzzleMixin
 */

var ImmutablePuzzle =
/*#__PURE__*/
function (_Record2) {
  _inherits(ImmutablePuzzle, _Record2);

  /**
   * @param {object} args - the constructor arguments
   * @param {Types.ImmutableGrid|Types.Grid} args.grid - the grid for the puzzle
   * @param {{across: object, down: object}|external:Immutable.Map<{across: external:Immutable.Map, down: external:Immutable.Map}>} args.clues - the
   *	puzzle clues
   * @param {Array<string[]>|external:Immutable.List<external:Immutable.List<string>>} [args.userSolution] - the guesses that the user
   *	has entered for this puzzle, as a two-dimensional array of array of strings with the same dimensions as the `grid` where
   *	each cell is either a string with the user's input or `null` if it corresponds to a block cell in the grid
   * @param {xpuz.PuzzleInfo|object} [args.info] - information about the puzzle
   * @param {object} [args.extensions] - a store of extra, possibly implementation-dependent information about the puzzle (such as timer information)
   */
  function ImmutablePuzzle(_ref) {
    var grid = _ref.grid,
        clues = _ref.clues,
        userSolution = _ref.userSolution,
        info = _ref.info,
        extensions = _ref.extensions;

    _classCallCheck(this, ImmutablePuzzle);

    if (!(info instanceof PuzzleInfo)) {
      info = new PuzzleInfo(info);
    }

    grid = grid ? ImmutablePuzzle.processGrid(fromJS(grid)) : List();
    var args = {
      info: info,
      grid: grid,
      userSolution: userSolution ? fromJS(userSolution) : grid.map(function (row) {
        return row.map(function (cell) {
          return cell.get("isBlockCell") ? null : "";
        });
      })
    };

    if (clues) {
      args.clues = Map.isMap(clues) ? clues : Map(["across", "down"].map(function (direction) {
        return [direction, OrderedMap(Object.keys(clues[direction]).sort(function (a, b) {
          return a - b;
        }).map(function (clueNumber) {
          return [Number(clueNumber), clues[direction][clueNumber]];
        }))];
      }));
    }

    if (extensions) {
      args.extensions = fromJS(extensions);
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(ImmutablePuzzle).call(this, args));
  }
  /**
   * The grid for this puzzle
   *
   * @member {Types.ImmutableGrid} grid
   * @instance
   */


  return ImmutablePuzzle;
}(Record(schema, "ImmutablePuzzle"));

PuzzleMixin({
  constructor: ImmutablePuzzle,
  equalityTest: is,
  getter: function getter(obj, path) {
    return obj.getIn(path);
  },
  setter: function setter(obj, path, value) {
    return obj.setIn(path, value instanceof Collection ? value : fromJS(value));
  },
  sizeOf: function sizeOf(obj) {
    return obj.size;
  }
});
var oldProcessGrid = ImmutablePuzzle.processGrid;

ImmutablePuzzle.processGrid = function processGrid(grid) {
  return grid.withMutations(function (gridWithMutations) {
    return oldProcessGrid(gridWithMutations);
  });
};

exports = module.exports = ImmutablePuzzle;
//# sourceMappingURL=puzzle.js.map