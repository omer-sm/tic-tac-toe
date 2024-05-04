import React from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import Sheet from "@mui/joy/Sheet"
import GameTable from './Containers/GameTable'
import Stack from "@mui/joy/Stack"
import TopBar from './Components/TopBar'
import Typography from "@mui/joy/Typography"
import LinkDisplay from './Components/LinkDisplay'


const getNextPlayer = (gameState: string) => {
  return [...gameState.matchAll(/x/g)].length > [...gameState.matchAll(/o/g)].length ? "o" : "x"
}

const checkForWin = (gameState: string) => {
  for(let i = 0; i < 3; i++) {
    if (gameState.at(i) === gameState.at(i+1) && gameState.at(i) === gameState.at(i+2) && gameState.at(i) !== "-") {
      return true
    }
    if (gameState.at(i) === gameState.at(i+3) && gameState.at(i) === gameState.at(i+6) && gameState.at(i) !== "-") {
      return true
    }
  }
  if (gameState.at(0) === gameState.at(4) && gameState.at(0) === gameState.at(8) && gameState.at(0) !== "-") {
    return true
  }
  if (gameState.at(2) === gameState.at(4) && gameState.at(2) === gameState.at(6) && gameState.at(2) !== "-") {
    return true
  }
  return false
}

const checkForTie = (gameState: string) => {
  return [...gameState.matchAll(/-/g)].length === 0
}

function App() {
  const [gameState, setGameState] = React.useState<string>("")
  const urlParams = new URLSearchParams(window.location.search)
  if (gameState === "") setGameState(atob(urlParams.get('g') || btoa("---------")))

  const [canMakeMove, setCanMakeMove] = React.useState(true)
  const [hasWon, setHasWon] = React.useState(false)
  const selectCell = (index: number) => {
    const newState = gameState.substring(0, index) + getNextPlayer(gameState) + gameState.substring(index + 1)
    setGameState(newState)
    setCanMakeMove(false)
    setHasWon(checkForWin(newState))
  }
  return (
    <CssVarsProvider defaultMode="dark">
      <Sheet variant="outlined" sx={{ height: "100vh", border: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
        <Stack alignItems="center" gap={1}>
          <TopBar/>
          <GameTable data={gameState} handleClick={selectCell} canMakeMove={canMakeMove}/>
          {canMakeMove ? 
          <Typography level="body-lg" color="neutral" >Make your move!</Typography> :
          hasWon ?
          <Typography level="title-lg" color="success" textAlign="center">You have won!
          <br/>Tell your friends they suck 😼</Typography> :
          checkForTie(gameState) ? 
          <Typography level="title-lg" color="warning" textAlign="center">Game over!
          <br/>It's a tie :(</Typography> :
          <LinkDisplay data={gameState}/> }
        </Stack>
      </Sheet>
    </CssVarsProvider>
  );
}

export default App;
