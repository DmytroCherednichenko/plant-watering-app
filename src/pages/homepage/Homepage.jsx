import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './homepage.css';

const Homepage = () => {
    return (
        <div className="homepage">
            {/* Section 1: Welcome */}
            <section className="hero-section section-1">
                <Container fluid className="h-100 d-flex align-items-center justify-content-center">
                    <div className="hero-content text-center">
                        <div className="hero-icon">🌱</div>
                        <h1 className="hero-title">Welcome to PlantCare</h1>
                        <p className="hero-subtitle">
                            Your digital companion for nurturing beautiful, healthy plants
                        </p>
                        <p className="hero-description">
                            Join thousands of plant lovers who trust PlantCare to help them grow thriving gardens
                        </p>
                        <div className="hero-buttons">
                            <Link to="/login">
                                <Button className="hero-btn hero-btn-primary">
                                    Sign Up Free
                                </Button>
                            </Link>
                            <Button className="hero-btn hero-btn-outline">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Section 2: Plant Library */}
            <section className="hero-section section-2">
                <Container fluid className="h-100 d-flex align-items-center justify-content-center">
                    <div className="hero-content text-center">
                        <div className="hero-icon">📚</div>
                        <h1 className="hero-title">Explore Our Plant Library</h1>
                        <p className="hero-subtitle">
                            Discover comprehensive care guides for hundreds of plant species
                        </p>
                        <p className="hero-description">
                            From succulents to tropical plants, find detailed information about watering schedules,
                            lighting requirements, and expert care tips
                        </p>
                        <div className="hero-buttons">
                            <Link to="/plant-library">
                                <Button className="hero-btn hero-btn-secondary">
                                    Browse Library
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Section 3: Manage Garden */}
            <section className="hero-section section-3">
                <Container fluid className="h-100 d-flex align-items-center justify-content-center">
                    <div className="hero-content text-center">
                        <div className="hero-icon">🏡</div>
                        <h1 className="hero-title">Manage Your Garden</h1>
                        <p className="hero-subtitle">
                            Keep track of all your plants in one beautiful, organized space
                        </p>
                        <p className="hero-description">
                            Monitor watering schedules, track growth progress, and get personalized
                            care reminders for each plant in your collection
                        </p>
                        <div className="hero-buttons">
                            <Link to="/myplants">
                                <Button className="hero-btn hero-btn-success">
                                    View My Garden
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Homepage;