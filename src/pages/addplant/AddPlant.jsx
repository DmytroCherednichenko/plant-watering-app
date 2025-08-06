import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function AddPlant() {
    const [name, setName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [description, setDescription] = useState("");
    
    return (
        <Container fluid className="page-main-container">
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control className="form-field" type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Scientific Name</Form.Label>
                    <Form.Control className="form-field" type="text" placeholder="Enter sci name" onChange={(e)=>setScientificName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control className="form-field" type="text" placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Button>

                </Button>
            </Form>
        </Container>
    )
}

export default AddPlant

        // name: "Snake Plant",
        // scientificName: "Sansevieria trifasciata",
        // description: "A hardy plant with upright leaves. Tolerant of low light and infrequent watering.",
        // image: snakePlantImage,
        // light: "Low to bright indirect",
        // water: "Every 2–3 weeks",
        // toxicity: "Toxic to pets"