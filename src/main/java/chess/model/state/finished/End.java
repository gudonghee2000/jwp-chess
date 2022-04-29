package chess.model.state.finished;

import chess.model.Team;
import chess.model.board.Board;
import java.util.Map;

public final class End extends Finished {

    public End(Board board) {
        super(board);
    }

    @Override
    public Map<String, Double> getScores() {
        throw new IllegalArgumentException("[ERROR] 게임이 종료되어 점수를 확인 할 수 없습니다.");
    }

    @Override
    public String getWinner() {
        throw new IllegalArgumentException("[ERROR] 게임이 종료되어 승자를 확인 할 수 없습니다.");
    }

    @Override
    public String getSymbol() {
        return "END";
    }
}
