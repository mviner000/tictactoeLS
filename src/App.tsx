import "./App.css";

import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";

import useLocalStorageState from "use-local-storage-state";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

type SquareValue = "X" | "O" | null;

function App() {
  const [squares, setSquares] = useLocalStorageState<SquareValue[]>(
    "ticTacToeSquares",
    { defaultValue: Array<SquareValue>(9).fill(null) }
  );
  const [isXNext, setIsXNext] = useLocalStorageState<boolean>(
    "ticTacToeIsXNext",
    { defaultValue: true }
  );

  const handleSquareClick = (index: number) => {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";

    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: number) => {
    const backgroundColor = squares[index] === "X" ? "tomato" : "teal";

    return (
      <Button
        flex="1"
        height="80px"
        fontSize="2xl"
        fontWeight="bold"
        onClick={() => handleSquareClick(index)}
        bg={backgroundColor}
      >
        {squares[index]}
      </Button>
    );
  };

  const renderStatus = () => {
    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.every((square) => square !== null)) {
      return "It's a draw!";
    } else {
      return `Next Player: ${isXNext ? "X" : "O"}`;
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" marginTop={10}>
        <Text fontSize="3xl" fontWeight="bold" marginBottom={5}>
          Tic Tac Toe
        </Text>
        <Container maxWidth="300px" marginBottom={5}>
          <Flex wrap="wrap">
            {squares.map((_, index) => (
              <Box key={index} width="33.33%" padding={1}>
                {renderSquare(index)}
              </Box>
            ))}
          </Flex>
        </Container>
        <Text fontSize="xl" fontWeight="bold" marginBottom={3}>
          {renderStatus()}
        </Text>
        <Button colorScheme="teal" onClick={resetGame}>
          Reset Game
        </Button>
      </Box>
    </ChakraProvider>
  );
}

const calculateWinner = (squares: SquareValue[]): SquareValue | null => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
