import { useState } from 'react'
import { Upload, Loader, AlertCircle } from 'lucide-react'
import { API_BASE_URL } from '../config'
import axios from 'axios'

export default function DiseaseDetector() {

  const [file, setFile] = useState<File | null>(null)

  const [preview, setPreview] = useState<string>('')

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const [result, setResult] = useState<any>(null)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile = e.target.files?.[0]

    if (selectedFile) {

      setFile(selectedFile)

      setError('')

      // Preview image
      const reader = new FileReader()

      reader.onload = (e) => {

        setPreview(
          e.target?.result as string
        )
      }

      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDetect = async () => {

    if (!file) {

      setError(
        'Please select an image'
      )

      return
    }

    setLoading(true)

    setError('')

    try {

      const formData = new FormData()

      formData.append(
        'file',
        file
      )

      const response = await axios.post(
        `${API_BASE_URL}/detect-disease`,
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      )

      setResult(response.data)


    } catch (err: any) {

      setError(
        err.response?.data?.detail
        || 'Detection failed'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="bg-white rounded-2xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-green-800 mb-2">
        Crop Disease Detection
      </h2>

      <p className="text-gray-600 mb-8">
        Upload a crop image to analyze
        plant disease using AI
      </p>

      {/* Upload Box */}
      <div className="
        border-2
        border-dashed
        border-green-300
        rounded-2xl
        p-10
        text-center
        mb-6
        hover:border-green-500
        hover:bg-green-50
        transition
      ">

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />

        <label
          htmlFor="file-input"
          className="cursor-pointer"
        >

          <Upload className="
            w-14
            h-14
            mx-auto
            text-green-600
            mb-4
          " />

          <p className="
            text-lg
            font-semibold
            text-gray-800
          ">
            Click to Upload Image
          </p>

          <p className="
            text-sm
            text-gray-500
            mt-2
          ">
            PNG, JPG, JPEG up to 10MB
          </p>

        </label>
      </div>

      {/* Preview */}
      {preview && (

        <div className="mb-6">

          <img
            src={preview}
            alt="Preview"
            className="
              max-w-full
              h-auto
              rounded-xl
              max-h-72
              mx-auto
              shadow-md
            "
          />

          <p className="
            text-center
            text-gray-600
            mt-3
            text-sm
          ">
            {file?.name}
          </p>

        </div>
      )}

      {/* Error */}
      {error && (

        <div className="
          bg-red-50
          border
          border-red-200
          rounded-xl
          p-4
          mb-6
          flex
          gap-3
        ">

          <AlertCircle className="
            w-5
            h-5
            text-red-600
            flex-shrink-0
            mt-1
          " />

          <p className="text-red-700">
            {error}
          </p>

        </div>
      )}

      {/* Button */}
      <button
        onClick={handleDetect}
        disabled={!file || loading}
        className="
          w-full
          bg-green-600
          hover:bg-green-700
          disabled:bg-gray-400
          text-white
          font-bold
          py-4
          rounded-xl
          transition
          flex
          items-center
          justify-center
          gap-2
          text-lg
        "
      >

        {loading && (
          <Loader className="
            w-5
            h-5
            animate-spin
          " />
        )}

        {loading
          ? 'Analyzing Image...'
          : 'Detect Disease'
        }

      </button>

      {/* Results */}
      {result && (

        <div className="
          mt-8
          bg-green-50
          border
          border-green-200
          rounded-2xl
          p-6
          shadow
        ">

          <h3 className="
            text-2xl
            font-bold
            text-green-900
            mb-6
          ">
            Detection Results
          </h3>

          <div className="space-y-4">

            {/* Disease */}
            <div className="
              bg-white
              rounded-xl
              p-4
              shadow-sm
            ">
              <p className="
                text-sm
                text-gray-500
              ">
                Disease
              </p>

              <p className="
                text-2xl
                font-bold
                text-red-600
              ">
                {
                  result.result.analysis.disease
                }
              </p>
            </div>

            {/* Confidence */}
            <div className="
              bg-white
              rounded-xl
              p-4
              shadow-sm
            ">
              <p className="
                text-sm
                text-gray-500
              ">
                Confidence
              </p>

              <p className="
                text-xl
                font-semibold
                text-green-700
              ">
                {
                  (
                    result.result.analysis.confidence
                    * 100
                  ).toFixed(0)
                }%
              </p>
            </div>

            {/* Severity */}
            <div className="
              bg-white
              rounded-xl
              p-4
              shadow-sm
            ">
              <p className="
                text-sm
                text-gray-500
              ">
                Severity
              </p>

              <p className="
                text-xl
                font-semibold
                text-yellow-700
              ">
                {
                  result.result.analysis.severity
                }
              </p>
            </div>

            {/* Symptoms */}
            <div className="
              bg-white
              rounded-xl
              p-4
              shadow-sm
            ">

              <p className="
                text-sm
                text-gray-500
                mb-2
              ">
                Symptoms
              </p>

              <ul className="
                list-disc
                list-inside
                text-gray-700
                space-y-1
              ">

                {
                  result.result.analysis.symptoms.map(
                    (
                      symptom: string,
                      index: number
                    ) => (
                      <li key={index}>
                        {symptom}
                      </li>
                    )
                  )
                }

              </ul>

            </div>

            {/* Treatment */}
            <div className="
              bg-white
              rounded-xl
              p-4
              shadow-sm
            ">

              <p className="
                text-sm
                text-gray-500
                mb-2
              ">
                Recommended Treatment
              </p>

              <ul className="
                list-disc
                list-inside
                text-gray-700
                space-y-1
              ">

                {
                  result.result.analysis
                    .recommended_treatment.map(
                      (
                        item: string,
                        index: number
                      ) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )
                }

              </ul>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}