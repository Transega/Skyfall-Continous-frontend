import { StyledCard } from './styles/Card.styled'

export default function Card() {
  return (
    <StyledCard >
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
