import { Container } from "react-bootstrap"
import "./myplants-styles.css"
import PlantCard from "../../components/plant-card/PlantCard"
import plants from "../../assets/sample-data.js"
import Masonry from 'react-masonry-css';


const MyPlants = () => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 2,
        700: 1
    };
    return (
        <Container fluid className="page-main-container" >
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {
                    plants.map((plant, i) => <PlantCard plant={plant} key={i}></PlantCard>)
                }
            </Masonry>

        </Container>
    )
}

export default MyPlants