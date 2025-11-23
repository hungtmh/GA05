import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import provinceData from "./data/provinces.json";
import wardData from "./data/wards.json";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const selectedCity = watch("city");

  useEffect(() => {
    // Load provinces
    const provinceList = Object.values(provinceData).map((province) => ({
      code: province.code,
      name: province.name_with_type,
    }));
    setProvinces(provinceList);

    // Load all wards
    const wardList = Object.values(wardData).map((ward) => ({
      code: ward.code,
      name: ward.name_with_type,
      parentCode: ward.parent_code,
    }));
    setWards(wardList);
  }, []);

  useEffect(() => {
    // Filter wards based on selected city and sort alphabetically
    if (selectedCity) {
      const filtered = wards
        .filter((ward) => ward.parentCode === selectedCity)
        .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
      setFilteredWards(filtered);
    } else {
      setFilteredWards([]);
    }
  }, [selectedCity, wards]);

  const onSubmit = (data) => {
    // Get full names for display
    const selectedProvince = provinces.find(p => p.code === data.city);
    const selectedWard = filteredWards.find(w => w.code === data.ward);
    
    const fullData = {
      houseNumber: data.houseNumber,
      street: data.street,
      city: selectedProvince?.name || data.city,
      ward: selectedWard?.name || data.ward,
      fullAddress: `${data.houseNumber}, ${data.street}, ${selectedWard?.name || ''}, ${selectedProvince?.name || ''}`
    };
    
    setFormData(fullData);
    setShowModal(true);
    console.log("Form Data:", fullData);
  };

  const handleConfirm = () => {
    setShowModal(false);
    reset();
    setFilteredWards([]);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Enhanced Shipping Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* House Number */}
          <div>
            <label
              htmlFor="houseNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              House Number
            </label>
            <input
              id="houseNumber"
              type="text"
              {...register("houseNumber", {
                required: "House number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "House number must be numeric",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.houseNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="227"
            />
            {errors.houseNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.houseNumber.message}
              </p>
            )}
          </div>

          {/* Street */}
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Street
            </label>
            <input
              id="street"
              type="text"
              {...register("street", {
                required: "Street is required",
                minLength: {
                  value: 3,
                  message: "Street must be at least 3 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.street ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nguyễn Văn Cừ"
            />
            {errors.street && (
              <p className="mt-1 text-sm text-red-600">
                {errors.street.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <select
              id="city"
              {...register("city", { required: "City is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a city</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* Ward */}
          <div>
            <label
              htmlFor="ward"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ward
            </label>
            <select
              id="ward"
              {...register("ward", { required: "Ward is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${
                errors.ward ? "border-red-500" : "border-gray-300"
              }`}
              disabled={!selectedCity}
            >
              <option value="">
                {selectedCity ? "Select a ward" : "Please select a city first"}
              </option>
              {filteredWards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
            {errors.ward && (
              <p className="mt-1 text-sm text-red-600">{errors.ward.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-fadeIn">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Confirm Shipping Address
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please verify your shipping information
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">House Number:</span>
                <span className="text-sm text-gray-900 font-semibold">
                  {formData?.houseNumber}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Street:</span>
                <span className="text-sm text-gray-900 font-semibold text-right">
                  {formData?.street}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">City:</span>
                <span className="text-sm text-gray-900 font-semibold text-right">
                  {formData?.city}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Ward:</span>
                <span className="text-sm text-gray-900 font-semibold text-right">
                  {formData?.ward}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <span className="text-xs font-medium text-gray-600 block mb-1">
                  Full Address:
                </span>
                <span className="text-sm text-gray-900 font-semibold">
                  {formData?.fullAddress}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;