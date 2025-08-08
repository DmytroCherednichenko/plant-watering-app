import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="custom-footer">
            <Container>
                {/* Main Footer Content */}
                <Row className="footer-main">
                    {/* Brand Section */}
                    <Col lg={4} md={6} className="footer-section">
                        <div className="footer-brand">
                            <div className="brand-logo-footer">
                                <span className="brand-icon">🌿</span>
                                PlantCare
                            </div>
                            <p className="footer-description">
                                Your digital companion for nurturing beautiful, healthy plants. 
                                Join thousands of plant lovers growing thriving gardens.
                            </p>
                            {/* Social Media Links */}
                            <div className="social-links">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="bi bi-youtube"></i>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={2} md={6} className="footer-section">
                        <h5 className="footer-title">
                            <i className="bi bi-link-45deg"></i>
                            Quick Links
                        </h5>
                        <ul className="footer-links">
                            <li>
                                <Link to="/" className="footer-link">
                                    <i className="bi bi-house-door"></i>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/myplants" className="footer-link">
                                    <i className="bi bi-flower1"></i>
                                    My Plants
                                </Link>
                            </li>
                            <li>
                                <Link to="/plant-library" className="footer-link">
                                    <i className="bi bi-book"></i>
                                    Plant Library
                                </Link>
                            </li>
                            <li>
                                <Link to="/addplant" className="footer-link">
                                    <i className="bi bi-plus-circle"></i>
                                    Add Plant
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Support */}
                    <Col lg={3} md={6} className="footer-section">
                        <h5 className="footer-title">
                            <i className="bi bi-question-circle"></i>
                            Support
                        </h5>
                        <ul className="footer-links">
                            <li>
                                <Link to="/help" className="footer-link">
                                    <i className="bi bi-info-circle"></i>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="footer-link">
                                    <i className="bi bi-envelope"></i>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="footer-link">
                                    <i className="bi bi-patch-question"></i>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:support@plantcare.com" className="footer-link">
                                    <i className="bi bi-chat-dots"></i>
                                    Live Chat
                                </a>
                            </li>
                        </ul>
                    </Col>

                    {/* Legal & Company */}
                    <Col lg={3} md={6} className="footer-section">
                        <h5 className="footer-title">
                            <i className="bi bi-building"></i>
                            Company
                        </h5>
                        <ul className="footer-links">
                            <li>
                                <Link to="/about" className="footer-link">
                                    <i className="bi bi-people"></i>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="footer-link">
                                    <i className="bi bi-shield-check"></i>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="footer-link">
                                    <i className="bi bi-file-text"></i>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="footer-link">
                                    <i className="bi bi-briefcase"></i>
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>

                {/* Newsletter Signup */}
                <Row className="newsletter-section">
                    <Col lg={8} className="mx-auto text-center">
                        <div className="newsletter-content">
                            <h4 className="newsletter-title">
                                <i className="bi bi-envelope-heart"></i>
                                Stay Connected
                            </h4>
                            <p className="newsletter-description">
                                Get plant care tips, seasonal guides, and exclusive content delivered to your inbox.
                            </p>
                            <div className="newsletter-form">
                                <div className="input-group">
                                    <input 
                                        type="email" 
                                        className="newsletter-input" 
                                        placeholder="Enter your email address"
                                    />
                                    <button className="newsletter-btn">
                                        <i className="bi bi-send"></i>
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Bottom Footer */}
                <Row className="footer-bottom">
                    <Col md={6}>
                        <p className="copyright">
                            <i className="bi bi-c-circle"></i>
                            {currentYear} PlantCare. All rights reserved.
                        </p>
                    </Col>
                    <Col md={6}>
                        <div className="footer-badges">
                            <span className="footer-badge">
                                <i className="bi bi-award"></i>
                                Eco-Friendly
                            </span>
                            <span className="footer-badge">
                                <i className="bi bi-heart"></i>
                                Made with Love
                            </span>
                            <span className="footer-badge">
                                <i className="bi bi-globe"></i>
                                Global Community
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;