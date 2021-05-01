package chess.chessgame.domain.room.game.statistics;

import chess.chessgame.domain.room.game.board.Board;
import chess.chessgame.domain.room.game.board.Square;
import chess.chessgame.domain.room.game.board.TestBoardInitializer;
import chess.chessgame.domain.room.game.board.piece.Bishop;
import chess.chessgame.domain.room.game.board.piece.Knight;
import chess.chessgame.domain.room.game.board.piece.Pawn;
import chess.chessgame.domain.room.game.board.piece.Queen;
import chess.chessgame.domain.room.game.board.piece.Rook;
import chess.chessgame.domain.room.game.board.piece.attribute.Color;
import chess.chessgame.domain.room.game.board.position.Position;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class ChessGameDtoManagerStatisticsTest {
    @DisplayName("기본 점수 38점이 잘 계산되는지 확인")
    @Test
    void defaultScoreTest() {
        Map<Color, Double> colorsScore = ChessGameStatistics.createNotStartGameResult().getColorsScore();
        assertThat(colorsScore.get(Color.BLACK)).isEqualTo(38.0);
        assertThat(colorsScore.get(Color.WHITE)).isEqualTo(38.0);
    }

    @DisplayName("말 갯수에 따라 점수계산이 잘 되는지 확인")
    @Test
    void calculateTest() {
        List<Square> squares = Arrays.asList(
                new Square(Position.of("a1"), new Queen(Color.WHITE)), // 9
                new Square(Position.of("a2"), new Rook(Color.WHITE)), // 5
                new Square(Position.of("a3"), new Pawn(Color.WHITE)), // 1
                new Square(Position.of("a4"), new Bishop(Color.WHITE)), // 3


                new Square(Position.of("b1"), new Pawn(Color.BLACK)), // 0.5
                new Square(Position.of("b2"), new Pawn(Color.BLACK)), // 0.5
                new Square(Position.of("b3"), new Pawn(Color.BLACK)), // 0.5
                new Square(Position.of("b4"), new Pawn(Color.BLACK)), // 0.5
                new Square(Position.of("c4"), new Pawn(Color.BLACK)), // 1
                new Square(Position.of("b5"), new Knight(Color.BLACK)) // 2.5
        );
        Board board = TestBoardInitializer.createTestBoard(squares);
        assertThat(board.getScoreMap().get(Color.WHITE)).isEqualTo(1 + 3 + 5 + 9);
        assertThat(board.getScoreMap().get(Color.BLACK)).isEqualTo((0.5 * 4) + 1 + 2.5);
    }
}