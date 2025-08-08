import { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePlants } from "../../Context/PlantsContext";
import "../../styles/form-styles.css";

function AddPlant() {
    const navigate = useNavigate();
    const { addPlant, loading, error, clearError } = usePlants();
    
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        scientificName: "",
        description: "",
        light: "Medium indirect light",
        water: "Weekly",
        toxicity: "Unknown",
        difficulty: "Beginner",
        category: "Indoor Plant",
        notes: ""
    });
    
    const [formErrors, setFormErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear field error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
        
        // Clear global error
        if (error) clearError();
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        
        if (!formData.name.trim()) {
            errors.name = "Plant name is required";
        }
        
        if (formData.name.trim().length > 100) {
            errors.name = "Plant name must be less than 100 characters";
        }
        
        if (formData.description.length > 500) {
            errors.description = "Description must be less than 500 characters";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const result = await addPlant(formData);
            
            if (result.success) {
                setShowSuccess(true);
                // Reset form
                setFormData({
                    name: "",
                    scientificName: "",
                    description: "",
                    light: "Medium indirect light",
                    water: "Weekly",
                    toxicity: "Unknown",
                    difficulty: "Beginner",
                    category: "Indoor Plant",
                    notes: ""
                });
                
                // Redirect after showing success message
                setTimeout(() => {
                    navigate("/myplants");
                }, 2000);
            }
        } catch (err) {
            console.error("Error adding plant:", err);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate("/myplants");
    };

    return (
        <Container fluid className="main-container">
            <div className="form-container">
                <h2 className="form-title">Add New Plant</h2>
                
                {/* Success Alert */}
                {showSuccess && (
                    <Alert variant="success" className="mb-3">
                        <i className="bi bi-check-circle me-2"></i>
                        Plant added successfully! Redirecting to My Plants...
                    </Alert>
                )}
                
                {/* Error Alert */}
                {error && (
                    <Alert variant="danger" className="mb-3" dismissible onClose={clearError}>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    {/* Plant Name */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label required">Plant Name</Form.Label>
                        <Form.Control 
                            className={`form-field ${formErrors.name ? 'error' : ''}`}
                            type="text" 
                            name="name"
                            placeholder="Enter plant name" 
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {formErrors.name && <div className="form-error-message">{formErrors.name}</div>}
                    </Form.Group>

                    {/* Scientific Name */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Scientific Name</Form.Label>
                        <Form.Control 
                            className="form-field"
                            type="text" 
                            name="scientificName"
                            placeholder="Enter scientific name" 
                            value={formData.scientificName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* Light Requirements */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Light Requirements</Form.Label>
                        <Form.Select 
                            className="form-field select"
                            name="light"
                            value={formData.light}
                            onChange={handleInputChange}
                        >
                            <option value="Low light">Low light</option>
                            <option value="Low to bright indirect">Low to bright indirect</option>
                            <option value="Medium indirect light">Medium indirect light</option>
                            <option value="Bright indirect">Bright indirect</option>
                            <option value="Bright direct or indirect">Bright direct or indirect</option>
                            <option value="Direct sunlight">Direct sunlight</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Watering Schedule */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Watering Schedule</Form.Label>
                        <Form.Select 
                            className="form-field select"
                            name="water"
                            value={formData.water}
                            onChange={handleInputChange}
                        >
                            <option value="Daily">Daily</option>
                            <option value="Every 2-3 days">Every 2-3 days</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Every 1–2 weeks">Every 1–2 weeks</option>
                            <option value="Every 2–3 weeks">Every 2–3 weeks</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Keep soil moist">Keep soil moist</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Pet Safety */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Pet Safety</Form.Label>
                        <Form.Select 
                            className="form-field select"
                            name="toxicity"
                            value={formData.toxicity}
                            onChange={handleInputChange}
                        >
                            <option value="Unknown">Unknown</option>
                            <option value="Non-toxic to pets">Non-toxic to pets</option>
                            <option value="Toxic to pets">Toxic to pets</option>
                            <option value="Mildly toxic to pets">Mildly toxic to pets</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Difficulty Level */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Care Difficulty</Form.Label>
                        <Form.Select 
                            className="form-field select"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleInputChange}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Description</Form.Label>
                        <Form.Control 
                            as="textarea"
                            className={`form-field textarea ${formErrors.description ? 'error' : ''}`}
                            name="description"
                            placeholder="Enter plant description and care notes" 
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                        />
                        {formErrors.description && <div className="form-error-message">{formErrors.description}</div>}
                    </Form.Group>

                    {/* Personal Notes */}
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Personal Notes</Form.Label>
                        <Form.Control 
                            as="textarea"
                            className="form-field textarea"
                            name="notes"
                            placeholder="Add your personal notes about this plant" 
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </Form.Group>

                    {/* Form Buttons */}
                    <div className="form-btn-group">
                        <Button 
                            className="form-btn form-btn-primary" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                                    Adding Plant...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add Plant
                                </>
                            )}
                        </Button>
                        <Button 
                            className="form-btn form-btn-secondary" 
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            <i className="bi bi-x-circle me-2"></i>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default AddPlant;