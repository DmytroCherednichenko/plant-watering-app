import { Container, Alert, Spinner, Button } from "react-bootstrap"
import "./myplants-styles.css"
import PlantCard from "../../components/plant-card/PlantCard"
import { usePlants } from "../../Context/PlantsContext";
import Masonry from 'react-masonry-css';

const MyPlants = () => {
    const { 
        plants, 
        loading, 
        error, 
        getPlantStats, 
        getPlantsNeedingWater,
        clearError 
    } = usePlants();

    const breakpointColumnsObj = {
        default: 4,
        1100: 2,
        700: 1
    };

    const stats = getPlantStats();
    const plantsNeedingWater = getPlantsNeedingWater();

    if (loading) {
        return (
            <Container fluid className="main-container">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                    <div className="text-center">
                        <Spinner animation="border" variant="success" />
                        <p className="mt-2">Loading your plants...</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="main-container">
            {/* Error Alert */}
            {error && (
                <Alert variant="danger" className="mx-3 mb-4" dismissible onClose={clearError}>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </Alert>
            )}

            {/* Plant Statistics */}
            {plants.length > 0 && (
                <div className="plants-stats-container mb-4 mx-3">
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <div className="stat-card">
                                <i className="bi bi-flower1 stat-icon"></i>
                                <div>
                                    <h4>{stats.total}</h4>
                                    <p>Total Plants</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="stat-card">
                                <i className="bi bi-heart-fill stat-icon text-danger"></i>
                                <div>
                                    <h4>{stats.favorites}</h4>
                                    <p>Favorites</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="stat-card">
                                <i className="bi bi-droplet-half stat-icon text-primary"></i>
                                <div>
                                    <h4>{stats.needingWater}</h4>
                                    <p>Need Water</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="stat-card">
                                <i className="bi bi-shield-check stat-icon text-success"></i>
                                <div>
                                    <h4>{stats.byToxicity.nonToxic}</h4>
                                    <p>Pet Safe</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Watering Reminder */}
            {plantsNeedingWater.length > 0 && (
                <Alert variant="info" className="mx-3 mb-4">
                    <i className="bi bi-droplet me-2"></i>
                    <strong>{plantsNeedingWater.length} plant{plantsNeedingWater.length > 1 ? 's' : ''} need watering:</strong>
                    <span className="ms-2">
                        {plantsNeedingWater.map((plant, index) => (
                            <span key={plant.id}>
                                {plant.name}
                                {index < plantsNeedingWater.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </span>
                </Alert>
            )}

            {/* Plants Grid */}
            {plants.length > 0 ? (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {plants.map((plant) => (
                        <PlantCard 
                            plant={plant} 
                            key={plant.id}
                        />
                    ))}
                </Masonry>
            ) : (
                <div className="empty-state text-center py-5">
                    <i className="bi bi-flower1" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                    <h3 className="mt-3 text-muted">No Plants Yet</h3>
                    <p className="text-muted mb-4">Start building your plant collection!</p>
                    <Button 
                        variant="success" 
                        size="lg" 
                        onClick={() => window.location.href = '/addplant'}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Your First Plant
                    </Button>
                </div>
            )}
        </Container>
    )
}

export default MyPlants