import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../../styles/form-styles.css"; // Import the styles

function AddPlant() {
    const [name, setName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [description, setDescription] = useState("");
    
    return (
        <Container fluid className="page-main-container">
            <div className="form-container">
                <h2 className="form-title">Add New Plant</h2>
                <Form>
                    <Form.Group className="form-group">
                        <Form.Label className="form-label required">Name</Form.Label>
                        <Form.Control 
                            className="form-field" 
                            type="text" 
                            placeholder="Enter plant name" 
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Scientific Name</Form.Label>
                        <Form.Control 
                            className="form-field" 
                            type="text" 
                            placeholder="Enter scientific name" 
                            onChange={(e)=>setScientificName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Description</Form.Label>
                        <Form.Control 
                            as="textarea"
                            className="form-field textarea" 
                            placeholder="Enter plant description" 
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <div className="form-btn-group">
                        <Button className="form-btn form-btn-primary" type="submit">
                            Add Plant
                        </Button>
                        <Button className="form-btn form-btn-secondary" type="button">
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default AddPlant;