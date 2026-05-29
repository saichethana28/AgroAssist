import { useState } from 'react'
import {
  Send,
  Loader,
  AlertCircle,
  Bot,
  User,
} from 'lucide-react'

import { API_BASE_URL } from '../config'

import axios from 'axios'

interface Message {
  id: string
  type: 'question' | 'answer'
  content: string
}

export default function FarmerQnA() {

  const [question, setQuestion] =
    useState('')

  const [language, setLanguage] =
    useState('english')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [messages, setMessages] =
    useState<Message[]>([])

  const languages = [
    'English',
    'Hindi',
    'Marathi',
    'Tamil',
    'Telugu',
    'Kannada',
  ]

  const handleAsk = async () => {

    if (!question.trim()) {

      setError(
        'Please enter a question'
      )

      return
    }

    const newQuestion: Message = {
      id: Date.now().toString(),
      type: 'question',
      content: question,
    }

    setMessages((prev) => [
      ...prev,
      newQuestion,
    ])

    setQuestion('')

    setLoading(true)

    setError('')

    try {

      const response =
        await axios.post(
          `${API_BASE_URL}/ask-question`,
          null,
          {
            params: {
              question,
              language:
                language.toLowerCase(),
            },
          }
        )

      const answer: Message = {
        id: (
          Date.now() + 1
        ).toString(),

        type: 'answer',

        content:
          response.data.answer,
      }

      setMessages((prev) => [
        ...prev,
        answer,
      ])

    } catch (err: any) {

      setError(
        err.response?.data?.detail
        || 'Failed to get answer'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-xl
      p-6
      flex
      flex-col
      h-[700px]
    ">

      {/* Header */}
      <div className="mb-6">

        <h2 className="
          text-3xl
          font-bold
          text-green-800
          mb-2
        ">
          AI Farmer Assistant
        </h2>

        <p className="text-gray-600">
          Ask farming, crop disease,
          irrigation, or treatment
          questions
        </p>

      </div>

      {/* Language */}
      <div className="mb-4">

        <label className="
          block
          text-sm
          font-medium
          text-gray-700
          mb-2
        ">
          Language
        </label>

        <select
          value={language}

          onChange={(e) =>
            setLanguage(
              e.target.value
            )
          }

          className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-600
          "
        >

          {languages.map((lang) => (

            <option
              key={lang}
              value={lang.toLowerCase()}
            >
              {lang}
            </option>

          ))}

        </select>

      </div>

      {/* Error */}
      {error && (

        <div className="
          bg-red-50
          border
          border-red-200
          rounded-xl
          p-4
          mb-4
          flex
          gap-3
        ">

          <AlertCircle className="
            w-5
            h-5
            text-red-600
            flex-shrink-0
          " />

          <p className="
            text-red-700
            text-sm
          ">
            {error}
          </p>

        </div>
      )}

      {/* Chat Area */}
      <div className="
        flex-1
        overflow-y-auto
        mb-4
        bg-gradient-to-b
        from-green-50
        to-white
        rounded-2xl
        p-5
        space-y-4
        border
      ">

        {messages.length === 0 && (

          <div className="
            h-full
            flex
            items-center
            justify-center
            text-center
            text-gray-400
          ">

            <div>

              <Bot className="
                w-14
                h-14
                mx-auto
                mb-3
              " />

              <p>
                Ask your first
                farming question 🌱
              </p>

            </div>

          </div>
        )}

        {messages.map((msg) => (

          <div
            key={msg.id}

            className={`
              flex
              ${msg.type === 'question'
                ? 'justify-end'
                : 'justify-start'}
            `}
          >

            <div
              className={`
                max-w-[80%]
                rounded-2xl
                px-5
                py-4
                shadow-md

                ${msg.type === 'question'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border'}
              `}
            >

              <div className="
                flex
                items-center
                gap-2
                mb-2
              ">

                {msg.type === 'question'
                  ? (
                    <User className="
                      w-4 h-4
                    " />
                  )
                  : (
                    <Bot className="
                      w-4 h-4
                      text-green-600
                    " />
                  )
                }

                <p className="
                  text-sm
                  font-semibold
                ">

                  {msg.type === 'question'
                    ? 'You'
                    : 'AgroAssist AI'}

                </p>

              </div>

              <p className="
                text-sm
                whitespace-pre-wrap
                leading-relaxed
              ">
                {msg.content}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* Input */}
      <div className="
        flex
        gap-3
        items-center
      ">

        <input
          type="text"

          value={question}

          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }

          onKeyDown={(e) => {
            if (
              e.key === 'Enter'
            ) {
              handleAsk()
            }
          }}

          placeholder="
            Ask about crops,
            diseases, fertilizers...
          "

          disabled={loading}

          className="
            flex-1
            border
            border-gray-300
            rounded-2xl
            px-5
            py-4
            focus:outline-none
            focus:ring-2
            focus:ring-green-600
          "
        />

        <button
          onClick={handleAsk}

          disabled={
            loading ||
            !question.trim()
          }

          className="
            bg-green-600
            hover:bg-green-700
            disabled:bg-gray-400
            text-white
            p-4
            rounded-2xl
            transition
            shadow-lg
          "
        >

          {loading
            ? (
              <Loader className="
                w-5
                h-5
                animate-spin
              " />
            )
            : (
              <Send className="
                w-5
                h-5
              " />
            )
          }

        </button>

      </div>

    </div>
  )
}