import aloeVeraImage from "./plant-images/aloe-vera.jpeg";
import pothosImage from "./plant-images/pothos.jpg";
import spiderPlantImage from "./plant-images/spider-plant.jpg";
import peaceLilyImage from "./plant-images/Spathiphyllum.jpg";
import zzPlantImage from "./plant-images/zz-plant.jpg";
import monsteraImage from "./plant-images/monstera.jpg";
import rubberPlantImage from "./plant-images/rubber-plant.jpeg";
import bostonFernImage from "./plant-images/boston-fern.jpg";
import jadePlantImage from "./plant-images/jade-plant.jpg";
import snakePlantImage from "./plant-images/Snake-plant.jpg"

const houseplants = [
    {
        name: "Snake Plant",
        scientificName: "Sansevieria trifasciata",
        description: "A hardy plant with upright leaves. Tolerant of low light and infrequent watering.",
        image: snakePlantImage,
        light: "Low to bright indirect",
        water: "Every 2–3 weeks",
        toxicity: "Toxic to pets"
    },
    {
        name: "Pothos",
        scientificName: "Epipremnum aureum",
        description: "A fast-growing vine with heart-shaped leaves. Great for beginners.",
        image: pothosImage,
        light: "Low to bright indirect",
        water: "Once a week",
        toxicity: "Toxic to pets"
    },
    {
        name: "Spider Plant",
        scientificName: "Chlorophytum comosum",
        description: "An easy-to-grow plant that produces 'babies'.",
        image: spiderPlantImage,
        light: "Bright indirect",
        water: "Once a week",
        toxicity: "Non-toxic to pets"
    },
    {
        name: "Peace Lily",
        scientificName: "Spathiphyllum spp.",
        description: "Elegant white flowers and dark green leaves. Enjoys humidity.",
        image: peaceLilyImage,
        light: "Low to medium indirect",
        water: "Keep soil moist",
        toxicity: "Toxic to pets"
    },
    {
        name: "ZZ Plant",
        scientificName: "Zamioculcas zamiifolia",
        description: "Tolerates neglect and low light. Waxy, attractive leaves.",
        image: zzPlantImage,
        light: "Low to bright indirect",
        water: "Every 2–3 weeks",
        toxicity: "Toxic to pets"
    },
    {
        name: "Monstera",
        scientificName: "Monstera deliciosa",
        description: "Popular for its large, fenestrated leaves. Fast-growing.",
        image: monsteraImage,
        light: "Bright indirect",
        water: "Weekly",
        toxicity: "Toxic to pets"
    },
    {
        name: "Aloe Vera",
        scientificName: "Aloe barbadensis miller",
        description: "Succulent with medicinal sap. Requires little water.",
        image: aloeVeraImage,
        light: "Bright direct or indirect",
        water: "Every 3 weeks",
        toxicity: "Toxic to pets"
    },
    {
        name: "Rubber Plant",
        scientificName: "Ficus elastica",
        description: "Glossy leaves, grows into a small indoor tree.",
        image: rubberPlantImage,
        light: "Bright indirect",
        water: "Every 1–2 weeks",
        toxicity: "Toxic to pets"
    },
    {
        name: "Boston Fern",
        scientificName: "Nephrolepis exaltata",
        description: "Lush, arching fronds. Loves humidity and consistent moisture.",
        image: bostonFernImage,
        light: "Indirect light",
        water: "Keep moist",
        toxicity: "Non-toxic to pets"
    },
    {
        name: "Jade Plant",
        scientificName: "Crassula ovata",
        description: "A popular succulent with thick, shiny leaves. Symbol of good luck.",
        image: jadePlantImage,
        light: "Bright indirect to direct",
        water: "Every 2–3 weeks",
        toxicity: "Toxic to pets"
    }
];

export default houseplants;