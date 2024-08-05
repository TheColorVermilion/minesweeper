import { Game } from './Game'
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
export const HomePage = () => {
  return(
    <>
    <Link to='/Game'><Button label="Start New Game" /></Link>
    </>
  )
}