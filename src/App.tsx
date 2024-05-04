import React from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import Sheet from "@mui/joy/Sheet"
import GameTable from './Containers/GameTable'

const getNextPlayer = (gameState: string) => {
  return [...gameState.matchAll(/x/g)].length > [...gameState.matchAll(/o/g)].length ? "o" : "x"
}

function App() {
  const [gameState, setGameState] = React.useState<string>("---------")
  const selectCell = (index: number) => {
    setGameState(gameState.substring(0, index) + getNextPlayer(gameState) + gameState.substring(index + 1))
  }
  return (
    <CssVarsProvider defaultMode="dark">
      <Sheet variant="outlined" sx={{ height: "100vh", border: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
        <GameTable data={gameState} handleClick={selectCell}/>
      </Sheet>
    </CssVarsProvider>
  );
}

export default App;
