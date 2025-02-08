const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const enFilePath = path.join(__dirname, '../public/locale/en/translation.json');
const arFilePath = path.join(__dirname, '../public/locale/ar/translation.json');

// Utility function to read JSON files
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
};

// Utility function to write JSON files
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

        if (!enData || !arData) {
            return res.status(500).json({ message: 'Error loading doctors data' });
        }

        const doctors = Object.keys(enData.doctors.list).map(id => ({
            id: parseInt(id),
            name_en: enData.doctors.list[id].name,
            title_en: enData.doctors.list[id].title,
            description_en: enData.doctors.list[id].description,
            name_ar: arData.doctors.list[id].name,
            title_ar: arData.doctors.list[id].title,
            description_ar: arData.doctors.list[id].description,
            image: enData.doctors.list[id].image
        }));

        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// **POST - Add a new doctor**
app.post('/add-doctor', async (req, res) => {
    try {
        const newDoctor = req.body;
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData) {
            return res.status(500).json({ message: 'Error loading doctors data' });
        }

        const newId = Object.keys(enData.doctors.list).length; // Get new doctor ID

        enData.doctors.list[newId] = {
            name: newDoctor.name_en,
            title: newDoctor.title_en,
            description: newDoctor.description_en,
            image: newDoctor.image
        };

        arData.doctors.list[newId] = {
            name: newDoctor.name_ar,
            title: newDoctor.title_ar,
            description: newDoctor.description_ar,
            image: newDoctor.image
        };

        await writeJsonFile(enFilePath, enData);
        await writeJsonFile(arFilePath, arData);

        res.status(201).json({ message: 'Doctor added successfully', id: newId });
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({ message: 'Failed to add doctor' });
    }
});

// **PUT - Update an existing doctor**
app.put('/update-doctor/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDoctor = req.body;
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData) {
            return res.status(500).json({ message: 'Error loading doctors data' });
        }

        if (!enData.doctors.list[id] || !arData.doctors.list[id]) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        enData.doctors.list[id] = {
            name: updatedDoctor.name_en,
            title: updatedDoctor.title_en,
            description: updatedDoctor.description_en,
            image: updatedDoctor.image
        };

        arData.doctors.list[id] = {
            name: updatedDoctor.name_ar,
            title: updatedDoctor.title_ar,
            description: updatedDoctor.description_ar,
            image: updatedDoctor.image
        };

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
        const { id } = req.params; // The doctor index to be removed
        const enData = await readJsonFile(enFilePath);
        const arData = await readJsonFile(arFilePath);

        if (!enData || !arData || !enData.doctors.list || !arData.doctors.list) {
            return res.status(500).json({ message: 'Error loading doctors data' });
        }

        // Ensure ID is a valid index
        if (id < 0 || id >= enData.doctors.list.length) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Remove the doctor from the list (use `.filter()` to avoid leaving `null`)
        enData.doctors.list = enData.doctors.list.filter((_, index) => index != id);
        arData.doctors.list = arData.doctors.list.filter((_, index) => index != id);

        await writeJsonFile(enFilePath, enData);
        await writeJsonFile(arFilePath, arData);

        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ message: 'Failed to delete doctor' });
    }
});



// **Start the server**
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
