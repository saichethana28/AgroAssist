import { useState } from 'react'
import { Loader, AlertCircle } from 'lucide-react'
import { API_BASE_URL } from '../config'
import axios from 'axios'

export default function TreatmentGuide() {
  const [disease, setDisease] = useState('')
  const [cropType, setCropType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [treatment, setTreatment] = useState('')

  const crops = ['Rice', 'Wheat', 'Corn', 'Tomato', 'Potato', 'Cotton', 'Sugarcane']
  const diseases = [
    'Rice Blast',
    'Early Blight',
    'Wheat Rust',
    'Corn Leaf Spot',
    'Powdery Mildew',
    'Leaf Spot',
  ]

  const handleGetTreatment = async () => {
    if (!disease || !cropType) {
      setError('Please select both disease and crop type')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/get-treatment`, null, {
        params: { disease, crop_type: cropType },
      })

      setTreatment(response.data.treatment)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to get treatment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Treatment Recommendations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Crop Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Crop Type
          </label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select a crop...</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        {/* Disease */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disease
          </label>
          <select
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select a disease...</option>
            {diseases.map((dis) => (
              <option key={dis} value={dis}>
                {dis}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handleGetTreatment}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mb-6"
      >
        {loading && <Loader className="w-5 h-5 animate-spin" />}
        {loading ? 'Getting Treatment...' : 'Get Treatment Guide'}
      </button>

      {treatment && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Treatment Guide</h3>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {treatment}
          </div>
        </div>
      )}
    </div>
  )
}