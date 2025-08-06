import { Container } from 'react-bootstrap'
import './plantcard-styles.css'


function PlantCard(props) {
  console.log(props.plant.image);
  return (
    <Container className='plant-card-main'>
      <div className='plantcard-img-container'><img src={props.plant.image} alt="" /></div>
      <div className="plantcard-description">
        <h5 className="plantcard-name">{props.plant.name}</h5>
        <p className="plantcard-latin-name">{props.plant.scientificName}</p>
        <p className="plantcard-light"><span className="plantcard-light-icon plantcard-icon"></span>{props.plant.light}</p>
        <p className="plantcard-water"><span className="plantcard-water-icon plantcard-icon"></span>{props.plant.water}</p>
        <p className="plantcard-toxicity"><span className="plantcard-toxicity-icon plantcard-icon"></span>{props.plant.toxicity}</p>
      </div>
      <div className="water-button-container">
        <button className="watered-button"><i className="bi bi-droplet-half"></i></button>
      </div>

    </Container>
  )
}

export default PlantCard