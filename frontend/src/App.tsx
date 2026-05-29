import { useState } from 'react'

import {
  Upload,
  Leaf,
  MessageCircle,
} from 'lucide-react'

import DiseaseDetector from './components/DiseaseDetector'
import TreatmentGuide from './components/TreatmentGuide'
import FarmerQnA from './components/FarmerQnA'

import './App.css'

type Tab =
  | 'detect'
  | 'treatment'
  | 'qna'

function App() {

  const [activeTab, setActiveTab] =
    useState<Tab>('detect')

  const [detectionResult, setDetectionResult] =
    useState(null)

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-green-50
      via-emerald-50
      to-lime-100
    ">

      {/* Header */}
      <header className="
        bg-white/90
        backdrop-blur-md
        shadow-md
        sticky
        top-0
        z-50
        border-b
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-5
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <div className="
              bg-green-600
              p-3
              rounded-2xl
              shadow-lg
            ">

              <Leaf className="
                w-8
                h-8
                text-white
              " />

            </div>

            <div>

              <h1 className="
                text-3xl
                font-extrabold
                text-gray-900
              ">
                AgroAssist
              </h1>

              <p className="
                text-gray-600
                text-sm
              ">
                AI Powered Agricultural Intelligence
              </p>

            </div>

          </div>

          <div className="
            hidden
            md:flex
            items-center
            gap-2
            bg-green-50
            px-4
            py-2
            rounded-full
            border
            border-green-200
          ">

            <div className="
              w-2
              h-2
              bg-green-500
              rounded-full
              animate-pulse
            "></div>

            <span className="
              text-sm
              font-medium
              text-green-700
            ">
              AI System Active
            </span>

          </div>

        </div>

      </header>

      <main className="
        max-w-7xl
        mx-auto
        px-6
        py-10
      ">

        {/* Hero Section */}
        <div className="
          mb-10
          bg-gradient-to-r
          from-green-600
          via-emerald-600
          to-green-700
          rounded-3xl
          p-10
          text-white
          shadow-2xl
          relative
          overflow-hidden
          hover:shadow-2xl
          hover:-translate-y-1
          duration-300
        ">

          <div className="
            absolute
            inset-0
            opacity-10
            bg-[radial-gradient(circle_at_top_right,_white,_transparent_40%)]
          "></div>

          <div className="
            relative
            z-10
          ">

            <div className="
              inline-flex
              items-center
              gap-2
              bg-white/20
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
              mb-6
              backdrop-blur-sm
            ">

              🌱 AI Powered Agriculture Platform

            </div>

            <h1 className="
              text-5xl
              font-extrabold
              leading-tight
              mb-6
              max-w-3xl
            ">

              Smart Crop Disease Detection &
              AI Farming Assistance

            </h1>

            <p className="
              text-lg
              text-green-50
              max-w-2xl
              leading-relaxed
              mb-8
            ">

              AgroAssist helps farmers detect crop diseases,
              receive treatment recommendations, and ask
              AI-powered agricultural questions using
              multimodal intelligence and RAG technology.

            </p>

            <div className="
              flex
              flex-wrap
              gap-4
            ">

              <div className="
                bg-white/15
                px-5
                py-3
                rounded-2xl
                backdrop-blur-sm
              ">
                ⚡ FastAPI Backend
              </div>

              <div className="
                bg-white/15
                px-5
                py-3
                rounded-2xl
                backdrop-blur-sm
              ">
                🤖 AI Powered
              </div>

              <div className="
                bg-white/15
                px-5
                py-3
                rounded-2xl
                backdrop-blur-sm
              ">
                📚 RAG + Vector DB
              </div>

              <div className="
                bg-white/15
                px-5
                py-3
                rounded-2xl
                backdrop-blur-sm
              ">
                🌾 Farmer Friendly
              </div>

            </div>

          </div>

        </div>

        {/* Features */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-10
        ">

          {/* Feature 1 */}
          <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-lg
            border
            hover:shadow-2xl
            hover:-translate-y-1
            duration-300
          ">

            <div className="
              w-14
              h-14
              bg-green-100
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
              mb-4
            ">
              🌿
            </div>

            <h3 className="
              text-xl
              font-bold
              text-gray-800
              mb-3
            ">
              Disease Detection
            </h3>

            <p className="
              text-gray-600
              leading-relaxed
            ">

              Upload crop images and detect
              plant diseases using AI-powered
              agricultural analysis.

            </p>

          </div>

          {/* Feature 2 */}
          <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-lg
            border
            hover:shadow-2xl
            hover:-translate-y-1
            duration-300
          ">

            <div className="
              w-14
              h-14
              bg-blue-100
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
              mb-4
            ">
              💊
            </div>

            <h3 className="
              text-xl
              font-bold
              text-gray-800
              mb-3
            ">
              Treatment Guidance
            </h3>

            <p className="
              text-gray-600
              leading-relaxed
            ">

              Receive practical treatment
              recommendations and preventive
              agricultural solutions.

            </p>

          </div>

          {/* Feature 3 */}
          <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-lg
            border
            hover:shadow-2xl
            hover:-translate-y-1
            duration-300
          ">

            <div className="
              w-14
              h-14
              bg-yellow-100
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
              mb-4
            ">
              🤖
            </div>

            <h3 className="
              text-xl
              font-bold
              text-gray-800
              mb-3
            ">
              AI Farmer Assistant
            </h3>

            <p className="
              text-gray-600
              leading-relaxed
            ">

              Ask farming questions and get
              AI-generated agricultural advice
              with multilingual support.

            </p>

          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="
          flex
          flex-wrap
          gap-3
          mb-10
          bg-white/80
          backdrop-blur-md
          p-3
          rounded-2xl
          shadow-lg
          border
          border-green-100
        ">

          {/* Detect */}
          <button
            onClick={() =>
              setActiveTab('detect')
            }

            className={`
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              font-medium
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-md

              ${
                activeTab === 'detect'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >

            <Upload className="
              w-4
              h-4
            " />

            Disease Detection

          </button>

          {/* Treatment */}
          <button
            onClick={() =>
              setActiveTab('treatment')
            }

            className={`
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              font-medium
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-md

              ${
                activeTab === 'treatment'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >

            <Leaf className="
              w-4
              h-4
            " />

            Treatment Guide

          </button>

          {/* QnA */}
          <button
            onClick={() =>
              setActiveTab('qna')
            }

            className={`
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              font-medium
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-md

              ${
                activeTab === 'qna'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >

            <MessageCircle className="
              w-4
              h-4
            " />

            Ask Question

          </button>

        </div>

        {/* Main Content */}
        <div className="
          grid
          grid-cols-1
          gap-8
        ">

          <div>

            {activeTab === 'detect' && (
              <DiseaseDetector
                onResult={
                  setDetectionResult
                }
              />
            )}

            {activeTab === 'treatment' && (
              <TreatmentGuide />
            )}

            {activeTab === 'qna' && (
              <FarmerQnA />
            )}

          </div>

        </div>

        {/* Footer */}
        <footer className="
          mt-16
          bg-white
          rounded-3xl
          shadow-lg
          border
          p-8
          hover:shadow-2xl
          hover:-translate-y-1
          duration-300
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-6
          ">

            {/* Left */}
            <div>

              <div className="
                flex
                items-center
                gap-3
                mb-2
              ">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-green-100
                  flex
                  items-center
                  justify-center
                  text-2xl
                ">
                  🌱
                </div>

                <div>

                  <h3 className="
                    text-xl
                    font-bold
                    text-gray-800
                  ">
                    AgroAssist
                  </h3>

                  <p className="
                    text-gray-500
                    text-sm
                  ">
                    AI Agricultural Assistant
                  </p>

                </div>

              </div>

              <p className="
                text-gray-600
                max-w-md
              ">

                Empowering farmers with
                AI-driven crop disease detection,
                treatment recommendations,
                and intelligent agricultural guidance.

              </p>

            </div>

            {/* Right */}
            <div className="
              text-center
              md:text-right
            ">

              <p className="
                text-gray-700
                font-semibold
                mb-2
              ">
                Built With
              </p>

              <div className="
                flex
                flex-wrap
                justify-center
                md:justify-end
                gap-2
              ">

                <span className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">
                  FastAPI
                </span>

                <span className="
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">
                  React
                </span>

                <span className="
                  bg-purple-100
                  text-purple-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">
                  RAG
                </span>

                <span className="
                  bg-yellow-100
                  text-yellow-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">
                  AI
                </span>

              </div>

              <p className="
                text-gray-400
                text-sm
                mt-4
              ">
                © 2026 AgroAssist Project
              </p>

            </div>

          </div>

        </footer>

      </main>

    </div>
  )
}

export default App