package chess.controller.chessgame;

import chess.chessgame.domain.room.game.board.piece.attribute.Color;

class MoveResponseDto {
    private final boolean end;
    private final String nextColor;

    public MoveResponseDto(boolean end, Color nextColor) {
        this.end = end;
        this.nextColor = nextColor.name();
    }

    public boolean isEnd() {
        return end;
    }

    public String getNextColor() {
        return nextColor;
    }
}