"use client";

import { useEffect, useState } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 18;
const PREVIEW_SIZE = 4;
const LINE_SCORES = [0, 120, 320, 560, 900] as const;
const WALL_KICKS = [0, -1, 1, -2, 2] as const;
const INITIAL_ACTIVE_PIECE: PieceId = 6;
const INITIAL_NEXT_PIECE: PieceId = 5;

type PieceId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type CellValue = 0 | PieceId;
type Board = CellValue[][];
type ControlAction =
  | "left"
  | "right"
  | "down"
  | "hard-drop"
  | "rotate-left"
  | "rotate-right"
  | "restart"
  | "tick";

type RotationCell = {
  x: number;
  y: number;
};

type FallingPiece = {
  id: PieceId;
  rotation: number;
  x: number;
  y: number;
};

type GameState = {
  board: Board;
  active: FallingPiece;
  next: PieceId;
  score: number;
  lines: number;
  level: number;
  status: "running" | "over";
};

const PIECES: Record<PieceId, { rotations: RotationCell[][] }> = {
  1: {
    rotations: [
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
      [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
      ],
      [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ],
    ],
  },
  2: {
    rotations: [
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
    ],
  },
  3: {
    rotations: [
      [
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  },
  4: {
    rotations: [
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
    ],
  },
  5: {
    rotations: [
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ],
      [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  },
  6: {
    rotations: [
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ],
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  },
  7: {
    rotations: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],
    ],
  },
};

function createEmptyRow(): CellValue[] {
  return Array.from({ length: BOARD_WIDTH }, () => 0 as CellValue);
}

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () => createEmptyRow());
}

function createPreviewBoard(pieceId: PieceId): Board {
  const preview = Array.from({ length: PREVIEW_SIZE }, () =>
    Array.from({ length: PREVIEW_SIZE }, () => 0 as CellValue),
  );

  for (const cell of PIECES[pieceId].rotations[0]) {
    if (cell.y < PREVIEW_SIZE && cell.x < PREVIEW_SIZE) {
      preview[cell.y][cell.x] = pieceId;
    }
  }

  return preview;
}

function randomPieceId(): PieceId {
  return (Math.floor(Math.random() * 7) + 1) as PieceId;
}

function createPiece(id: PieceId): FallingPiece {
  return {
    id,
    rotation: 0,
    x: 3,
    y: -1,
  };
}

function createGameState(activeId = randomPieceId(), nextId = randomPieceId()): GameState {
  return {
    board: createEmptyBoard(),
    active: createPiece(activeId),
    next: nextId,
    score: 0,
    lines: 0,
    level: 1,
    status: "running",
  };
}

function getDropDelay(level: number): number {
  return Math.max(120, 760 - (level - 1) * 55);
}

function getCells(piece: FallingPiece): RotationCell[] {
  return PIECES[piece.id].rotations[piece.rotation];
}

function isValidPlacement(board: Board, piece: FallingPiece): boolean {
  return getCells(piece).every((cell) => {
    const x = piece.x + cell.x;
    const y = piece.y + cell.y;

    if (x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT) {
      return false;
    }

    if (y < 0) {
      return true;
    }

    return board[y][x] === 0;
  });
}

function tryMove(piece: FallingPiece, board: Board, deltaX: number, deltaY: number) {
  const candidate = {
    ...piece,
    x: piece.x + deltaX,
    y: piece.y + deltaY,
  };

  return isValidPlacement(board, candidate) ? candidate : null;
}

function rotatePiece(piece: FallingPiece, board: Board, direction: -1 | 1): FallingPiece {
  const rotation = (piece.rotation + direction + 4) % 4;

  for (const kick of WALL_KICKS) {
    const candidate = {
      ...piece,
      rotation,
      x: piece.x + kick,
    };

    if (isValidPlacement(board, candidate)) {
      return candidate;
    }
  }

  return piece;
}

function lockPiece(board: Board, piece: FallingPiece): Board {
  const nextBoard = board.map((row) => [...row]);

  for (const cell of getCells(piece)) {
    const x = piece.x + cell.x;
    const y = piece.y + cell.y;

    if (y >= 0) {
      nextBoard[y][x] = piece.id;
    }
  }

  return nextBoard;
}

function clearLines(board: Board) {
  const remaining = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = BOARD_HEIGHT - remaining.length;
  const padding = Array.from({ length: cleared }, () => createEmptyRow());

  return {
    board: [...padding, ...remaining.map((row) => [...row])],
    cleared,
  };
}

function settlePiece(state: GameState, piece: FallingPiece, scoreBonus = 0): GameState {
  const lockedBoard = lockPiece(state.board, piece);
  const { board, cleared } = clearLines(lockedBoard);
  const lines = state.lines + cleared;
  const level = Math.min(12, Math.floor(lines / 6) + 1);
  const nextActive = createPiece(state.next);
  const next = randomPieceId();

  return {
    board,
    active: nextActive,
    next,
    score: state.score + scoreBonus + LINE_SCORES[cleared] * level,
    lines,
    level,
    status: isValidPlacement(board, nextActive) ? "running" : "over",
  };
}

function softDrop(state: GameState, withBonus: boolean): GameState {
  const moved = tryMove(state.active, state.board, 0, 1);

  if (moved) {
    return {
      ...state,
      active: moved,
      score: withBonus ? state.score + 1 : state.score,
    };
  }

  return settlePiece(state, state.active);
}

function hardDrop(state: GameState): GameState {
  let nextPiece = state.active;
  let distance = 0;

  while (true) {
    const moved = tryMove(nextPiece, state.board, 0, 1);

    if (!moved) {
      break;
    }

    nextPiece = moved;
    distance += 1;
  }

  return settlePiece(state, nextPiece, distance * 2);
}

function buildDisplayBoard(board: Board, active: FallingPiece): Board {
  const display = board.map((row) => [...row]);

  for (const cell of getCells(active)) {
    const x = active.x + cell.x;
    const y = active.y + cell.y;

    if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
      display[y][x] = active.id;
    }
  }

  return display;
}

function applyAction(state: GameState, action: ControlAction): GameState {
  if (action === "restart") {
    return createGameState();
  }

  if (state.status === "over") {
    return state;
  }

  switch (action) {
    case "left": {
      const moved = tryMove(state.active, state.board, -1, 0);
      return moved ? { ...state, active: moved } : state;
    }
    case "right": {
      const moved = tryMove(state.active, state.board, 1, 0);
      return moved ? { ...state, active: moved } : state;
    }
    case "down":
      return softDrop(state, true);
    case "tick":
      return softDrop(state, false);
    case "hard-drop":
      return hardDrop(state);
    case "rotate-left":
      return {
        ...state,
        active: rotatePiece(state.active, state.board, -1),
      };
    case "rotate-right":
      return {
        ...state,
        active: rotatePiece(state.active, state.board, 1),
      };
    default:
      return state;
  }
}

export function NotFoundTetris() {
  const [game, setGame] = useState<GameState>(() =>
    createGameState(INITIAL_ACTIVE_PIECE, INITIAL_NEXT_PIECE),
  );

  useEffect(() => {
    if (game.status !== "running") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setGame((current) => applyAction(current, "tick"));
    }, getDropDelay(game.level));

    return () => window.clearInterval(timer);
  }, [game.level, game.status]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName)
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          setGame((current) => applyAction(current, "left"));
          break;
        case "ArrowRight":
          event.preventDefault();
          setGame((current) => applyAction(current, "right"));
          break;
        case "ArrowDown":
          event.preventDefault();
          setGame((current) => applyAction(current, "down"));
          break;
        case "ArrowUp":
        case "x":
        case "X":
          event.preventDefault();
          setGame((current) => applyAction(current, "rotate-right"));
          break;
        case "z":
        case "Z":
          event.preventDefault();
          setGame((current) => applyAction(current, "rotate-left"));
          break;
        case " ":
          event.preventDefault();
          setGame((current) => applyAction(current, "hard-drop"));
          break;
        case "r":
        case "R":
          event.preventDefault();
          setGame((current) => applyAction(current, "restart"));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const displayBoard = buildDisplayBoard(game.board, game.active);
  const previewBoard = createPreviewBoard(game.next);

  return (
    <section className="not-found-console" aria-labelledby="not-found-console-title">
      <div className="not-found-console__shell">
        <div className="not-found-console__header">
          <div className="not-found-console__header-copy">
            <p className="not-found-console__eyebrow">Recovery display</p>
            <p className="not-found-console__model" id="not-found-console-title">
              FC-404 signal board
            </p>
          </div>
          <span
            className={`not-found-console__live${
              game.status === "over" ? " not-found-console__live--offline" : ""
            }`}
          >
            {game.status === "running" ? "active" : "offline"}
          </span>
        </div>

        <div className="not-found-console__screen-wrap">
          <div className="not-found-console__hud">
            <div className="not-found-console__metric">
              <span>score</span>
              <strong>{game.score}</strong>
            </div>
            <div className="not-found-console__metric">
              <span>lines</span>
              <strong>{game.lines}</strong>
            </div>
            <div className="not-found-console__metric">
              <span>level</span>
              <strong>{game.level}</strong>
            </div>
          </div>
          <div className="not-found-console__screen">
            <div className="not-found-console__screen-noise" aria-hidden="true" />
            <div className="not-found-console__playfield">
              <div
                className="not-found-console__board"
                aria-label={`Tetris board. Score ${game.score}. Lines ${game.lines}. Level ${game.level}.`}
                role="img"
              >
                {displayBoard.map((row, rowIndex) =>
                  row.map((cell, cellIndex) => (
                    <span
                      aria-hidden="true"
                      className={`not-found-console__cell${
                        cell === 0
                          ? ""
                          : ` not-found-console__cell--filled not-found-console__cell--${cell}`
                      }`}
                      key={`${rowIndex}-${cellIndex}`}
                    />
                  )),
                )}
              </div>

              <div className="not-found-console__sidebar">
                <div className="not-found-console__panel">
                  <span className="not-found-console__panel-label">next</span>
                  <div className="not-found-console__preview" aria-hidden="true">
                    {previewBoard.map((row, rowIndex) =>
                      row.map((cell, cellIndex) => (
                        <span
                          className={`not-found-console__preview-cell${
                            cell === 0
                              ? ""
                              : ` not-found-console__preview-cell--filled not-found-console__cell--${cell}`
                          }`}
                          key={`preview-${rowIndex}-${cellIndex}`}
                        />
                      )),
                    )}
                  </div>
                </div>

                <div className="not-found-console__panel">
                  <span className="not-found-console__panel-label">status</span>
                  <p className="not-found-console__status" aria-live="polite">
                    {game.status === "running"
                      ? "Route recovery stable. Keep the lane open."
                      : "Signal lost. Reset and bring the route back."}
                  </p>
                </div>

                <div className="not-found-console__panel">
                  <span className="not-found-console__panel-label">controls</span>
                  <p className="not-found-console__status">arrows, z/x, space, r</p>
                </div>
              </div>

              {game.status === "over" ? (
                <div className="not-found-console__overlay">
                  <p className="not-found-console__overlay-title">game over</p>
                  <p className="not-found-console__overlay-copy">
                    The stack won that round.
                  </p>
                  <button
                    className="not-found-console__overlay-button"
                    onClick={() => setGame((current) => applyAction(current, "restart"))}
                    type="button"
                  >
                    Restart
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="not-found-console__controls" aria-label="Tetris controls">
          <div className="not-found-console__cluster" role="group" aria-label="Movement controls">
            <button
              className="not-found-console__control-button not-found-console__control-button--secondary"
              onClick={() => setGame((current) => applyAction(current, "rotate-left"))}
              type="button"
            >
              ⟲
            </button>
            <button
              className="not-found-console__control-button not-found-console__control-button--secondary"
              onClick={() => setGame((current) => applyAction(current, "left"))}
              type="button"
            >
              ◀
            </button>
            <button
              className="not-found-console__control-button not-found-console__control-button--secondary"
              onClick={() => setGame((current) => applyAction(current, "down"))}
              type="button"
            >
              ▼
            </button>
            <button
              className="not-found-console__control-button not-found-console__control-button--secondary"
              onClick={() => setGame((current) => applyAction(current, "right"))}
              type="button"
            >
              ▶
            </button>
          </div>

          <div className="not-found-console__action-cluster" role="group" aria-label="Action buttons">
            <button
              className="not-found-console__control-button not-found-console__control-button--primary"
              onClick={() => setGame((current) => applyAction(current, "rotate-right"))}
              type="button"
            >
              ⟳
            </button>
            <button
              className="not-found-console__control-button not-found-console__control-button--primary not-found-console__control-button--wide"
              onClick={() => setGame((current) => applyAction(current, "hard-drop"))}
              type="button"
            >
              Drop
            </button>
            <button
              className="not-found-console__control-pill"
              onClick={() => setGame((current) => applyAction(current, "restart"))}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}