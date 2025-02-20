import { useState, useEffect } from 'react';
import axios from 'axios';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
    image: null,
    availability: {},
    categories: []
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setAvailableCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error('Error fetching doctors:', err));
  }, []);

  // Handle doctor selection
  const handleDoctorSelect = (e) => {
    const doctorId = e.target.value;
    if (doctorId === "new") {
      setSelectedDoctor(null);
      setFormData({
        name_en: '',
        title_en: '',
        description_en: '',
        name_ar: '',
        title_ar: '',
        description_ar: '',
        image: null,
        availability: {},
        categories: []
      });
    } else {
      const doctor = doctors.find(doc => doc.id === parseInt(doctorId));
      if (doctor) {
        setSelectedDoctor(doctor.id);
        setFormData({
          ...doctor, 
          image: null, 
          categories: doctor.categories || []
        });
      }
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle availability changes
  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: { ...prev.availability[day], [field]: value }
      }
    }));
  };

  // Submit form (handles both add & update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
        const formDataToSend = new FormData();
        const requestData = {
            en: {
                name: formData.name_en,
                title: formData.title_en,
                description: formData.description_en,
                availability: formData.availability,
                categories: formData.categories
            },
            ar: {
                name: formData.name_ar,
                title: formData.title_ar,
                description: formData.description_ar,
                availability: formData.availability,
                categories: formData.categories
            }
        };

        formDataToSend.append("data", JSON.stringify(requestData));
        if (formData.image) formDataToSend.append("image", formData.image);

        const url = selectedDoctor === null ? "add-doctor" : `update-doctor/${selectedDoctor}`;
        await axios({
            method: selectedDoctor === null ? "POST" : "PUT",
            url: `http://localhost:5000/${url}`,
            data: formDataToSend,
            headers: { "Content-Type": "multipart/form-data" }
        });

        setSuccess(true);

        // Reload doctor list after adding/updating
        const updatedDoctors = await axios.get('http://localhost:5000/doctors');
        setDoctors(updatedDoctors.data);

    } catch (err) {
        console.error("Error updating doctor:", err);
        setError(err.response?.data?.message || 'Failed to save doctor');
    } finally {
        setLoading(false);
    }
  };

  // Handle doctor deletion
  const handleDelete = async () => {
    if (!selectedDoctor) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/delete-doctor/${selectedDoctor}`);
      setSelectedDoctor(null);
      window.location.reload();
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
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 mt-6" encType="multipart/form-data">
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

          {/* Image Upload */}
          <div>
            <h2 className="text-xl font-medium text-gray-900">Upload Image</h2>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="mt-2 block w-full p-2 border rounded" />
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-medium text-gray-900">Specializations</h2>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {availableCategories.map((category) => (
                <label key={category.key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category.key)}
                    onChange={() => handleCategoryChange(category.key)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="flex space-x-2">
                    <span>{category.label_en}</span> {/* English label */}
                    <span>/</span> {/* Separator */}
                    <span>{category.label_ar}</span> {/* Arabic label */}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900">Availability</h2>
            {DAYS.map(day => (
              <div key={day} className="flex space-x-2 mt-2">
                <label className="w-24">{day}</label>
                <input type="time" onChange={(e) => handleAvailabilityChange(day, "start", e.target.value)} />
                <input type="time" onChange={(e) => handleAvailabilityChange(day, "end", e.target.value)} />
              </div>
            ))}
          </div>

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
