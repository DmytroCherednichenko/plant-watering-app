import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button, Spinner, Alert } from 'react-bootstrap';
import './collection.css';

const Collection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Your Trefle API token
    const TREFLE_TOKEN = 'QXbcIa0Xl4HgMikVOEbMUeZuyrziALiqc2DoIjrpVaU';

    // Debounced search effect
    useEffect(() => {
        if (!searchQuery.trim()) {
            setPlants([]);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        const timer = setTimeout(() => {
            searchPlants(searchQuery, 1);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const searchPlants = async (query, page = 1) => {
        try {
            setLoading(true);
            
            // Use the proxy path instead of direct Trefle URL
            const response = await fetch(
                `/api/trefle/plants?token=${TREFLE_TOKEN}&q=${encodeURIComponent(query)}&page=${page}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            setPlants(data.data || []);
            setCurrentPage(page);
            setTotalPages(Math.ceil((data.meta?.total || 0) / 20));
            
        } catch (error) {
            console.error('Search failed:', error);
            setError('Failed to search plants. Please try again.');
            setPlants([]);
        } finally {
            setLoading(false);
        }
    };

    const loadInitialPlants = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/trefle/plants?token=${TREFLE_TOKEN}&page=1`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setPlants(data.data || []);
            setTotalPages(Math.ceil((data.meta?.total || 0) / 20));
        } catch (error) {
            console.error('Failed to load plants:', error);
            setError('Failed to load plants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load initial plants on component mount
    useEffect(() => {
        loadInitialPlants();
    }, []);

    const handlePageChange = (newPage) => {
        if (searchQuery.trim()) {
            searchPlants(searchQuery, newPage);
        } else {
            loadInitialPlants();
        }
    };

    const handleAddToGarden = (plant) => {
        // This would open a modal or navigate to add plant form
        console.log('Adding plant to garden:', plant);
        // You could use your existing AddPlant logic here
    };

    return (
        <Container fluid className="main-container">
            <div className="plant-library-header">
                <h1 className="library-title">
                    <i className="bi bi-book"></i>
                    Plant Library
                </h1>
                <p className="library-subtitle">
                    Discover and learn about thousands of plant species
                </p>
            </div>

            {/* Search Bar */}
            <Row className="search-section">
                <Col lg={8} className="mx-auto">
                    <Form.Group className="search-form">
                        <div className="search-input-wrapper">
                            <i className="bi bi-search search-icon"></i>
                            <Form.Control
                                type="text"
                                placeholder="Search for plants... (e.g., snake plant, monstera, fern)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            {searchQuery && (
                                <Button
                                    variant="link"
                                    className="clear-search"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <i className="bi bi-x-circle"></i>
                                </Button>
                            )}
                        </div>
                    </Form.Group>
                </Col>
            </Row>

            {/* Error Message */}
            {error && (
                <Row>
                    <Col lg={8} className="mx-auto">
                        <Alert variant="danger" className="error-alert">
                            <i className="bi bi-exclamation-triangle"></i>
                            {error}
                        </Alert>
                    </Col>
                </Row>
            )}

            {/* Loading Spinner */}
            {loading && (
                <div className="loading-container">
                    <Spinner animation="grow" variant="success" />
                    <p>Searching plants...</p>
                </div>
            )}

            {/* Results */}
            {!loading && plants.length > 0 && (
                <>
                    <div className="results-header">
                        <p>Found {plants.length} plants {searchQuery && `for "${searchQuery}"`}</p>
                    </div>

                    <Row className="plants-grid">
                        {plants.map((plant) => (
                            <Col key={plant.id} lg={3} md={4} sm={6} className="mb-4">
                                <Card className="plant-card h-100">
                                    {plant.image_url && (
                                        <Card.Img
                                            variant="top"
                                            src={plant.image_url}
                                            alt={plant.common_name || plant.scientific_name}
                                            className="plant-image"
                                        />
                                    )}
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="plant-name">
                                            {plant.common_name || 'Unknown'}
                                        </Card.Title>
                                        <Card.Subtitle className="plant-scientific-name mb-2">
                                            <em>{plant.scientific_name}</em>
                                        </Card.Subtitle>
                                        
                                        {plant.family_common_name && (
                                            <p className="plant-family">
                                                <strong>Family:</strong> {plant.family_common_name}
                                            </p>
                                        )}
                                        
                                        <div className="mt-auto">
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleAddToGarden(plant)}
                                                className="add-to-garden-btn"
                                            >
                                                <i className="bi bi-plus-circle"></i>
                                                Add to Garden
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination-container">
                            <Button
                                variant="outline-primary"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <i className="bi bi-chevron-left"></i>
                                Previous
                            </Button>
                            <span className="page-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline-primary"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                                <i className="bi bi-chevron-right"></i>
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* No Results */}
            {!loading && searchQuery && plants.length === 0 && !error && (
                <div className="no-results">
                    <i className="bi bi-search"></i>
                    <h3>No plants found</h3>
                    <p>Try searching for different terms like "succulent", "fern", or "flowering"</p>
                </div>
            )}
        </Container>
    );
};

export default Collection;