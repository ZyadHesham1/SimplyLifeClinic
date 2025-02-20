const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const enFilePath = path.join(__dirname, '../public/locale/en/translation.json');
const arFilePath = path.join(__dirname, '../public/locale/ar/translation.json');

// Configure multer for image uploads
const uploadDir = path.join(__dirname, '../src/assets/headshots/');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type.'));
    }
});

// Utility functions to read and write JSON
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
};

const writeJsonFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
    }
};

// **GET all doctors**
app.get('/doctors', async (req, res) => {
    try {
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData) return res.status(500).json({ message: 'Error loading doctors data' });

        const doctors = enData.doctors.list.map((doctor, index) => ({
            id: index, // Use index as ID
            name_en: doctor.name,
            title_en: doctor.title,
            description_en: doctor.description,
            name_ar: arData.doctors.list[index].name,
            title_ar: arData.doctors.list[index].title,
            description_ar: arData.doctors.list[index].description,
            image: doctor.image,
            availability: doctor.availability || {}
        }));

        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData) {
            console.error("❌ Error: JSON files not loaded properly.");
            return res.status(500).json({ message: "Error loading category data" });
        }

        if (!enData.categories || !arData.categories) {
            console.error("❌ Error: Categories section missing in one of the JSON files.");
            return res.status(500).json({ message: "Categories not found in one of the JSON files" });
        }

        // Extract category keys and their respective names
        const categories = Object.keys(enData.categories).map(key => {
            if (!enData.categories[key]?.name || !arData.categories[key]?.name) {
                console.error(`❌ Missing 'name' field for category: ${key}`);
            }

            return {
                key,
                label_en: enData.categories[key]?.name || "Unknown", // Fallback to avoid crashes
                label_ar: arData.categories[key]?.name || "Unknown"
            };
        });

        console.log("✅ Successfully fetched categories:", categories);
        res.json(categories);
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// **PUT - Update a doctor's categories in both English and Arabic files**
app.put('/update-doctor-categories/:id', async (req, res) => {
    try {
        const doctorId = parseInt(req.params.id);
        const { categoriesToAdd } = req.body; // Expected to be an array of new categories to add
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData || !enData.doctors.list[doctorId]) {
            console.error(`Error: Doctor with ID ${doctorId} not found.`);
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if categoriesToAdd is an array
        if (!Array.isArray(categoriesToAdd)) {
            return res.status(400).json({ message: "Invalid categories format, expected an array" });
        }

        // Add categories to the doctor in both English and Arabic
        enData.doctors.list[doctorId].categories = [
            ...new Set([...enData.doctors.list[doctorId].categories, ...categoriesToAdd]) // Prevent duplicates
        ];
        arData.doctors.list[doctorId].categories = [
            ...new Set([...arData.doctors.list[doctorId].categories, ...categoriesToAdd]) // Prevent duplicates
        ];

        // Write back the updated data to both files
        await writeJsonFile(enFilePath, enData);
        await writeJsonFile(arFilePath, arData);

        console.log("✅ Doctor categories updated successfully!");
        res.json({ message: 'Doctor categories updated successfully' });
    } catch (error) {
        console.error('❌ Error updating doctor categories:', error);
        res.status(500).json({ message: 'Failed to update doctor categories' });
    }
});
// Utility function to format availability correctly
const formatAvailability = (availability) => {
    if (!availability) return {};

    const formatted = {};
    Object.keys(availability).forEach(day => {
        const lowerDay = day.toLowerCase(); // Convert day names to lowercase
        formatted[lowerDay] = {
            start: availability[day].start.replace(":", ""), // Remove colon (17:50 -> 1750)
            end: availability[day].end.replace(":", "")
        };
    });

    return formatted;
};

// **POST - Add a new doctor (ensuring correct availability format)**
app.post('/add-doctor', upload.single('image'), async (req, res) => {
    try {
        const { en, ar } = JSON.parse(req.body.data);
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData) return res.status(500).json({ message: 'Error loading doctors data' });

        const newId = enData.doctors.list.length;
        const imagePath = req.file ? `/src/assets/headshots/${req.file.filename}` : null;

        // Format availability before saving
        en.availability = formatAvailability(en.availability);
        ar.availability = formatAvailability(ar.availability);

        // Store English and Arabic separately
        enData.doctors.list.push({ ...en, image: imagePath });
        arData.doctors.list.push({ ...ar, image: imagePath });

        await writeJsonFile(enFilePath, enData);
        await writeJsonFile(arFilePath, arData);

        console.log("✅ Doctor added successfully!");
        res.status(201).json({ message: "Doctor added successfully", id: newId });
    } catch (error) {
        console.error("❌ Error adding doctor:", error);
        res.status(500).json({ message: "Failed to add doctor", error: error.message });
    }
});



// **PUT - Update a doctor with correct availability format**
app.put('/update-doctor/:id', upload.single('image'), async (req, res) => {
    try {
        const doctorId = parseInt(req.params.id);
        const { en, ar } = JSON.parse(req.body.data);
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData || !enData.doctors.list[doctorId]) {
            console.error(`Error: Doctor with ID ${doctorId} not found.`);
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const imagePath = req.file ? `/src/assets/headshots/${req.file.filename}` : enData.doctors.list[doctorId].image;

        // Format availability before updating
        en.availability = formatAvailability(en.availability);
        ar.availability = formatAvailability(ar.availability);

        // Update English and Arabic separately
        enData.doctors.list[doctorId] = { ...en, image: imagePath };
        arData.doctors.list[doctorId] = { ...ar, image: imagePath };

        await writeJsonFile(enFilePath, enData);
        await writeJsonFile(arFilePath, arData);

        res.json({ message: 'Doctor updated successfully' });
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ message: 'Failed to update doctor' });
    }
});

// **DELETE - Remove a doctor**
app.delete('/delete-doctor/:id', async (req, res) => {
    try {
        const doctorId = parseInt(req.params.id);
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData || !enData.doctors.list[doctorId]) return res.status(404).json({ message: 'Doctor not found' });

        enData.doctors.list.splice(doctorId, 1);
        arData.doctors.list.splice(doctorId, 1);

        await writeJsonFile(enFilePath, enData);
        await writeJsonFile(arFilePath, arData);

        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ message: 'Failed to delete doctor' });
    }
});

// **Start the server**
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
