package chess.domain.exceptions;

public class UnableCrossException extends IllegalArgumentException {

    public UnableCrossException() {
        super("해당 말은 뛰어넘기가 불가합니다.");
    }
}