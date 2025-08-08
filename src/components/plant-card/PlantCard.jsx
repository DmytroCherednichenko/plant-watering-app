import { Container, Toast } from 'react-bootstrap';
import { useState } from 'react';
import { usePlants } from '../../Context/PlantsContext';
import './plantcard-styles.css';

function PlantCard({ plant }) {
  const { waterPlant, toggleFavorite, deletePlant } = usePlants();
  const [showWaterToast, setShowWaterToast] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle watering
  const handleWaterPlant = async (e) => {
    e.stopPropagation();
    const result = await waterPlant(plant.id);
    if (result.success) {
      setShowWaterToast(true);
      // Auto-hide toast after 3 seconds
      setTimeout(() => setShowWaterToast(false), 3000);
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    await toggleFavorite(plant.id);
  };

  // Handle delete
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (showDeleteConfirm) {
      await deletePlant(plant.id);
    } else {
      setShowDeleteConfirm(true);
      // Reset confirmation after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  // Calculate days since last watered
  const getDaysSinceWatered = () => {
    if (!plant.lastWatered) return null;
    const lastWatered = new Date(plant.lastWatered);
    const now = new Date();
    const diffTime = Math.abs(now - lastWatered);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysSinceWatered = getDaysSinceWatered();
  const needsWater = daysSinceWatered === null || daysSinceWatered > 7;

  return (
    <>
      <Container className='plant-card-main'>
        {/* Favorite Button */}
        <div className="favorite-button-container">
          <button
            className={`favorite-button ${plant.isFavorite ? 'favorited' : ''}`}
            onClick={handleToggleFavorite}
            title={plant.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`bi ${plant.isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
        </div>

        {/* Delete Button */}
        <div className="delete-button-container">
          <button
            className={`delete-button ${showDeleteConfirm ? 'confirm-delete' : ''}`}
            onClick={handleDelete}
            title={showDeleteConfirm ? 'Click again to confirm delete' : 'Delete plant'}
          >
            <i className={`bi ${showDeleteConfirm ? 'bi-exclamation-triangle' : 'bi-trash'}`}></i>
          </button>
        </div>

        {/* Plant Image */}
        <div className='plantcard-img-container'>
          <img src={plant.image} alt={plant.name} />
          {/* Watering Status Indicator */}
          {needsWater && (
            <div className="water-needed-badge">
              <i className="bi bi-droplet"></i>
              {daysSinceWatered ? `${daysSinceWatered}d ago` : 'Never'}
            </div>
          )}
        </div>

        {/* Plant Information */}
        <div className="plantcard-description">
          <h5 className="plantcard-name">{plant.name}</h5>
          <p className="plantcard-latin-name">{plant.scientificName}</p>

          {/* Plant Care Info */}
          <p className="plantcard-light">
            <span className="plantcard-light-icon plantcard-icon"></span>
            {plant.light}
          </p>
          <p className="plantcard-water">
            <span className="plantcard-water-icon plantcard-icon"></span>
            {plant.water}
          </p>
          <p className="plantcard-toxicity">
            <span className="plantcard-toxicity-icon plantcard-icon"></span>
            {plant.toxicity}
          </p>

          {/* Last Watered Info */}
          {plant.lastWatered && (
            <p className="plantcard-last-watered">
              <i className="bi bi-calendar-check me-1"></i>
              Last watered {daysSinceWatered} day{daysSinceWatered !== 1 ? 's' : ''} ago
            </p>
          )}

          {/* Personal Notes */}
          {plant.notes && (
            <p className="plantcard-notes">
              <i className="bi bi-journal-text me-1"></i>
              {plant.notes}
            </p>
          )}
        </div>

        {/* Water Button */}
        <div className="water-button-container">
          <button
            className={`watered-button ${needsWater ? 'needs-water' : ''}`}
            onClick={handleWaterPlant}
            title="Mark as watered"
          >
            <i className="bi bi-droplet-half"></i>
          </button>
        </div>
      </Container>

      {/* Water Success Toast */}
      <Toast
        show={showWaterToast}
        onClose={() => setShowWaterToast(false)}
        className="water-toast"
        delay={3000}
        autohide
      >
        <Toast.Body>
          <i className="bi bi-check-circle-fill text-success me-2"></i>
          {plant.name} has been watered!
        </Toast.Body>
      </Toast>
    </>
  );
}

export default PlantCard;