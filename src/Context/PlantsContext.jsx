import { useState, createContext, useContext, useEffect } from "react";
import houseplants from "../assets/sample-data.js";

export const PlantsContext = createContext();

// Custom hook to use PlantsContext
export const usePlants = () => {
    const context = useContext(PlantsContext);
    if (!context) {
        throw new Error('usePlants must be used within a PlantsProvider');
    }
    return context;
};

export const PlantsProvider = ({ children }) => {
    // Initialize with sample data and add unique IDs
    const initializePlantsWithIds = () => {
        return houseplants.map((plant, index) => ({
            ...plant,
            id: `plant_${Date.now()}_${index}`,
            dateAdded: new Date().toISOString(),
            lastWatered: null,
            notes: "",
            isFavorite: false
        }));
    };

    const [plants, setPlantsState] = useState(() => {
        // Try to load from localStorage first, otherwise use sample data
        const savedPlants = localStorage.getItem('userPlants');
        if (savedPlants) {
            try {
                return JSON.parse(savedPlants);
            } catch (error) {
                console.error('Error parsing saved plants:', error);
                return initializePlantsWithIds();
            }
        }
        return initializePlantsWithIds();
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Save to localStorage whenever plants change
    useEffect(() => {
        localStorage.setItem('userPlants', JSON.stringify(plants));
    }, [plants]);

    // Helper function to generate unique ID
    const generateId = () => `plant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // CREATE - Add new plant
    const addPlant = async (plantData) => {
        setLoading(true);
        setError(null);
        
        try {
            // Validate required fields
            if (!plantData.name || !plantData.name.trim()) {
                throw new Error('Plant name is required');
            }

            const newPlant = {
                id: generateId(),
                name: plantData.name.trim(),
                scientificName: plantData.scientificName?.trim() || "",
                description: plantData.description?.trim() || "",
                image: plantData.image || "/default-plant.jpg", // You can add a default image
                light: plantData.light || "Medium indirect light",
                water: plantData.water || "Weekly",
                toxicity: plantData.toxicity || "Unknown",
                dateAdded: new Date().toISOString(),
                lastWatered: plantData.lastWatered || null,
                notes: plantData.notes?.trim() || "",
                isFavorite: false,
                category: plantData.category || "Indoor Plant",
                difficulty: plantData.difficulty || "Beginner"
            };

            setPlantsState(prevPlants => [...prevPlants, newPlant]);
            setLoading(false);
            return { success: true, plant: newPlant };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    // READ - Get all plants
    const getAllPlants = () => {
        return plants;
    };

    // READ - Get plant by ID
    const getPlantById = (id) => {
        return plants.find(plant => plant.id === id);
    };

    // READ - Search plants
    const searchPlants = (query) => {
        if (!query || !query.trim()) return plants;
        
        const searchTerm = query.toLowerCase().trim();
        return plants.filter(plant => 
            plant.name.toLowerCase().includes(searchTerm) ||
            plant.scientificName.toLowerCase().includes(searchTerm) ||
            plant.description.toLowerCase().includes(searchTerm)
        );
    };

    // READ - Filter plants
    const filterPlants = (filters) => {
        let filteredPlants = [...plants];

        if (filters.light) {
            filteredPlants = filteredPlants.filter(plant => 
                plant.light.toLowerCase().includes(filters.light.toLowerCase())
            );
        }

        if (filters.toxicity) {
            filteredPlants = filteredPlants.filter(plant => 
                plant.toxicity.toLowerCase() === filters.toxicity.toLowerCase()
            );
        }

        if (filters.isFavorite) {
            filteredPlants = filteredPlants.filter(plant => plant.isFavorite);
        }

        if (filters.difficulty) {
            filteredPlants = filteredPlants.filter(plant => 
                plant.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
            );
        }

        return filteredPlants;
    };

    // UPDATE - Update existing plant
    const updatePlant = async (id, updatedData) => {
        setLoading(true);
        setError(null);

        try {
            const plantIndex = plants.findIndex(plant => plant.id === id);
            if (plantIndex === -1) {
                throw new Error('Plant not found');
            }

            const updatedPlant = {
                ...plants[plantIndex],
                ...updatedData,
                id, // Ensure ID doesn't change
                dateModified: new Date().toISOString()
            };

            const updatedPlants = [...plants];
            updatedPlants[plantIndex] = updatedPlant;
            
            setPlantsState(updatedPlants);
            setLoading(false);
            return { success: true, plant: updatedPlant };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    // UPDATE - Mark plant as watered
    const waterPlant = async (id) => {
        return await updatePlant(id, { lastWatered: new Date().toISOString() });
    };

    // UPDATE - Toggle favorite status
    const toggleFavorite = async (id) => {
        const plant = getPlantById(id);
        if (!plant) {
            return { success: false, error: 'Plant not found' };
        }
        return await updatePlant(id, { isFavorite: !plant.isFavorite });
    };

    // UPDATE - Add note to plant
    const addNote = async (id, note) => {
        return await updatePlant(id, { notes: note.trim() });
    };

    // DELETE - Remove plant
    const deletePlant = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const plantExists = plants.some(plant => plant.id === id);
            if (!plantExists) {
                throw new Error('Plant not found');
            }

            setPlantsState(prevPlants => prevPlants.filter(plant => plant.id !== id));
            setLoading(false);
            return { success: true };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    // UTILITY - Get plants that need watering (example: haven't been watered in 7 days)
    const getPlantsNeedingWater = () => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        return plants.filter(plant => {
            if (!plant.lastWatered) return true; // Never watered
            return new Date(plant.lastWatered) < weekAgo;
        });
    };

    // UTILITY - Get plant statistics
    const getPlantStats = () => {
        return {
            total: plants.length,
            favorites: plants.filter(plant => plant.isFavorite).length,
            needingWater: getPlantsNeedingWater().length,
            byToxicity: {
                toxic: plants.filter(plant => plant.toxicity.toLowerCase().includes('toxic')).length,
                nonToxic: plants.filter(plant => plant.toxicity.toLowerCase().includes('non-toxic')).length
            },
            byDifficulty: {
                beginner: plants.filter(plant => plant.difficulty === 'Beginner').length,
                intermediate: plants.filter(plant => plant.difficulty === 'Intermediate').length,
                advanced: plants.filter(plant => plant.difficulty === 'Advanced').length
            }
        };
    };

    // UTILITY - Clear all data (useful for testing or reset)
    const clearAllPlants = async () => {
        setLoading(true);
        try {
            setPlantsState([]);
            localStorage.removeItem('userPlants');
            setLoading(false);
            return { success: true };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    // UTILITY - Reset to sample data
    const resetToSampleData = async () => {
        setLoading(true);
        try {
            const plantsWithIds = initializePlantsWithIds();
            setPlantsState(plantsWithIds);
            setLoading(false);
            return { success: true };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    // Clear error
    const clearError = () => setError(null);

    const contextValue = {
        // State
        plants,
        loading,
        error,
        
        // CRUD Operations
        addPlant,
        getAllPlants,
        getPlantById,
        updatePlant,
        deletePlant,
        
        // Search & Filter
        searchPlants,
        filterPlants,
        
        // Plant Actions
        waterPlant,
        toggleFavorite,
        addNote,
        
        // Utilities
        getPlantsNeedingWater,
        getPlantStats,
        clearAllPlants,
        resetToSampleData,
        clearError
    };

    return (
        <PlantsContext.Provider value={contextValue}>
            {children}
        </PlantsContext.Provider>
    );
};