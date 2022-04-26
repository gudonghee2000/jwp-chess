package chess.service;

import chess.dto.BoardDto;
import chess.dto.MoveDto;
import chess.dto.ResultDto;
import chess.model.board.Board;
import chess.model.state.State;
import chess.model.state.finished.Status;
import chess.model.state.running.WhiteTurn;
import chess.repository.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(final GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public BoardDto start() {
        State state = new WhiteTurn(Board.init());
        gameRepository.deleteGameData();
        gameRepository.initGameData(state);
        return BoardDto.from(state.getBoard());
    }

    public BoardDto end() {
        Board board = gameRepository.getBoard();
        gameRepository.deleteGameData();
        return BoardDto.from(board.getBoard());
    }

    public BoardDto move(final MoveDto moveDto) {
        State state = proceed(moveDto);
        return BoardDto.from(state.getBoard());
    }

    private State proceed(final MoveDto moveDto) {
        State nowState = gameRepository.getState();
        State nextState = nowState.proceed(moveDto.getCommand());
        gameRepository.saveGameData(nextState, moveDto);
        return nextState;
    }

    public ResultDto status() {
        Board board = gameRepository.getBoard();
        State status = new Status(board);
        return new ResultDto(status.getScores(), status.getWinner());
    }

    public BoardDto load() {
        Board board = gameRepository.getBoard();
        return BoardDto.from(board.getBoard());
    }
}
