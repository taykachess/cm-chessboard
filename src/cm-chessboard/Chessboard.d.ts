type Color = "w" | "b";
type PieceInputType =
  | "wp"
  | "wb"
  | "wn"
  | "wr"
  | "wq"
  | "wk"
  | "bp"
  | "bb"
  | "bn"
  | "br"
  | "bq"
  | "bk";

type Square =
  | "a8"
  | "b8"
  | "c8"
  | "d8"
  | "e8"
  | "f8"
  | "g8"
  | "h8"
  | "a7"
  | "b7"
  | "c7"
  | "d7"
  | "e7"
  | "f7"
  | "g7"
  | "h7"
  | "a6"
  | "b6"
  | "c6"
  | "d6"
  | "e6"
  | "f6"
  | "g6"
  | "h6"
  | "a5"
  | "b5"
  | "c5"
  | "d5"
  | "e5"
  | "f5"
  | "g5"
  | "h5"
  | "a4"
  | "b4"
  | "c4"
  | "d4"
  | "e4"
  | "f4"
  | "g4"
  | "h4"
  | "a3"
  | "b3"
  | "c3"
  | "d3"
  | "e3"
  | "f3"
  | "g3"
  | "h3"
  | "a2"
  | "b2"
  | "c2"
  | "d2"
  | "e2"
  | "f2"
  | "g2"
  | "h2"
  | "a1"
  | "b1"
  | "c1"
  | "d1"
  | "e1"
  | "f1"
  | "g1"
  | "h1";
export const COLOR: { white: "w"; black: "b" } = {
  white: "w",
  black: "b",
};

export const INPUT_EVENT_TYPE = {
  moveInputStarted: "moveInputStarted",
  validateMoveInput: "validateMoveInput",
  moveInputCanceled: "moveInputCanceled",
};

export const SQUARE_SELECT_TYPE = {
  primary: "primary",
  secondary: "secondary",
};
export const BORDER_TYPE = {
  none: "none", // no border
  thin: "thin", // thin border
  frame: "frame", // wide border with coordinates in it
};
export const MARKER_TYPE = {
  frame: { class: "marker-frame", slice: "markerFrame" },
  square: { class: "marker-square", slice: "markerSquare" },
  dot: { class: "marker-dot", slice: "markerDot" },
  circle: { class: "marker-circle", slice: "markerCircle" },
};
export const PIECE = {
  wp: "wp",
  wb: "wb",
  wn: "wn",
  wr: "wr",
  wq: "wq",
  wk: "wk",
  bp: "bp",
  bb: "bb",
  bn: "bn",
  br: "br",
  bq: "bq",
  bk: "bk",
};

interface Config {
  position?: string; // set as fen, can use FEN.start or FEN.empty
  orientation?: Color; // white on bottom
  responsive?: boolean; // resize the board automatically to the size of the context element
  animationDuration?: number; // pieces animation duration in milliseconds. Disable all animation with `0`.
  language?: "el" | "de"; // supports "de" and "en" for now, used for pieces naming
  style?: {
    cssClass?: "default" | "green" | "blue" | "chess-club"; // set the css theme of the board, try "green", "blue" or "chess-club"
    showCoordinates?: boolean; // show ranks and files
    borderType?: "none" | "thin" | "frame"; // "thin" thin border, "frame" wide border with coordinates in it, "none" no border
    aspectRatio?: number; // height/width of the board
    moveFromMarker?: any; // the marker used to mark the start square
    moveToMarker?: any; // the marker used to mark the square where the figure is moving to
  };
  sprite?: {
    url: string | "./assets/images/chessboard-sprite.svg"; // pieces and markers are stored in a sprite file
    size: number | 40; // the sprite tiles size, defaults to 40x40px
    cache: boolean; // cache the sprite
  };
  extensions?: any /* {class: ExtensionClass, props: { ... }} */[]; // add extensions here
}

export interface ChessBoardInstance {
  state: {
    moveInputProcess: Promise<any>;
  };
  setPiece(
    square: Square,
    piece: PieceInputType,
    animated?: boolean
  ): Promise<any>;
  getPiece(square: string): Promise<any>;
  movePiece(
    squareFrom: Square,
    squareTo: Square,
    animated?: boolean
  ): Promise<any>;
  setPosition(fen: string, animated?: boolean): Promise<any>;
  getPosition(): string;
  addMarker(type, square): void;
  getMarkers(
    type: undefined | string,
    square: undefined | Square
  ): { square: Square; type: string }[];
  removeMarkers(
    type: undefined | { class: string; slice: string },
    square?: undefined | Square
  );
  setOrientation(color: Color);
  getOrientation(): Color;
  destroy(): void;
  enableMoveInput(eventHandler: (event: any) => any, color?: Color);
  disableMoveInput(): void;
  enableSquareSelect(eventHandler: (event: any) => any);
  disableSquareSelect(): void;
}

export const Chessboard: {
  new (node: HTMLElement, props?: Config): ChessBoardInstance;
};
