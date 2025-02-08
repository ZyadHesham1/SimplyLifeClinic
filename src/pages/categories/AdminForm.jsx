import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name_en: '',
    title_en: '',
    description_en: '',
    name_ar: '',
    title_ar: '',
    description_ar: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch doctors from the server
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Update form when a doctor is selected
  const handleDoctorSelect = (e) => {
    const doctorId = e.target.value;
    if (doctorId === "new") {
      // Reset form for adding a new doctor
      setSelectedDoctor(null);
      setFormData({
        name_en: '',
        title_en: '',
        description_en: '',
        name_ar: '',
        title_ar: '',
        description_ar: '',
        image: ''
      });
    } else {
      const doctor = doctors.find(doc => doc.id === parseInt(doctorId));
      if (doctor) {
        setSelectedDoctor(doctor.id);
        setFormData(doctor);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (selectedDoctor === null) {
        // Add new doctor
        await axios.post('http://localhost:5000/add-doctor', formData);
      } else {
        // Update existing doctor
        await axios.put(`http://localhost:5000/update-doctor/${selectedDoctor}`, formData);
      }

      setSuccess(true);
      window.location.reload(); // Refresh to update doctors list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDoctor) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/delete-doctor/${selectedDoctor}`);
      setSelectedDoctor(null);
      window.location.reload(); // Refresh to update doctors list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete doctor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Doctors</h1>

        {success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">Doctor saved successfully!</div>}
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

        {/* Doctor Selection */}
        <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
        <select onChange={handleDoctorSelect} className="mt-2 block w-full p-2 border border-gray-300 rounded">
          <option value="new">Add New Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name_en}
            </option>
          ))}
        </select>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 mt-6">
          {/* English Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900">English Version</h2>
            <input type="text" name="name_en" value={formData.name_en} onChange={handleInputChange} placeholder="Name (English)" className="mt-2 block w-full p-2 border rounded" required />
            <input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} placeholder="Title (English)" className="mt-2 block w-full p-2 border rounded" required />
            <textarea name="description_en" value={formData.description_en} onChange={handleInputChange} placeholder="Description (English)" className="mt-2 block w-full p-2 border rounded" required />
          </div>

          {/* Arabic Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900">Arabic Version</h2>
            <input type="text" name="name_ar" value={formData.name_ar} onChange={handleInputChange} placeholder="Name (Arabic)" className="mt-2 block w-full p-2 border rounded" required />
            <input type="text" name="title_ar" value={formData.title_ar} onChange={handleInputChange} placeholder="Title (Arabic)" className="mt-2 block w-full p-2 border rounded" required />
            <textarea name="description_ar" value={formData.description_ar} onChange={handleInputChange} placeholder="Description (Arabic)" className="mt-2 block w-full p-2 border rounded" required />
          </div>

          {/* Image */}
          <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL" className="mt-2 block w-full p-2 border rounded" required />

          <div className="flex justify-between">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">{loading ? 'Saving...' : 'Save Doctor'}</button>
            {selectedDoctor !== null && (
              <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
