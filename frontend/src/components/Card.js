import { StyledCard } from './styles/Card.styled'
import Calendar from './Calendar'

export default function Card() {
  return (
    <StyledCard layout = "column">
      <div>
        <h2>MAP</h2>
        <p>WE ARE GOING TO PUT OUR MAP HERE</p>
      </div>

      <div>
        <img src={`./images/illustration-grow-together.svg`} alt='' />
      </div>
      
    </StyledCard>
  )
}
