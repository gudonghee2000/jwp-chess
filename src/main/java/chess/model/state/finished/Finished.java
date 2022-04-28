package chess.model.state.finished;

import chess.dto.MoveDto;
import chess.model.board.Board;
import chess.model.piece.Piece;
import chess.model.position.Position;
import chess.model.state.State;
import java.util.Map;

public abstract class Finished implements State {

    protected final Board board;

    protected Finished(Board board) {
        this.board = board;
    }

    @Override
    public State proceed(final MoveDto moveDto) {
        throw new IllegalArgumentException("[ERROR] 게임을 재시작 하기위한 명령어를 입력해주세요.");
    }

    @Override
    public Map<Position, Piece> getBoard() {
        return board.getBoard();
    }
}
