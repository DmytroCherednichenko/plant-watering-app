import { Container } from 'react-bootstrap'
import './plantcard-styles.css'

function PlantCard(props) {
  return (
    <Container className='plant-card-main'>
        <h1>{props.plant.scientificName}</h1>
    </Container>
  )
}

export default PlantCard