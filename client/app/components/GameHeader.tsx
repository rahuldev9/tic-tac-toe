type Props = {
  gameStarted: boolean;
  gameOver: boolean;
};

export default function GameHeader({ gameStarted, gameOver }: Props) {
  return (
    <h1 className="text-center text-2xl font-bold">
      {gameOver
        ? "Game Over"
        : gameStarted
        ? "Game Started"
        : "Play With Friend"}
    </h1>
  );
}
