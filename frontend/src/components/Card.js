import { StyledCard } from './styles/Card.styled'
import Calendar from './Calendar'
import MapDeck from './Map'

export default function Card() {
  return (
    <StyledCard layout = "column">
      <MapDeck/>
      
    </StyledCard>
  )
}
