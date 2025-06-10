"use client"
import { Button } from '@/globalElements'
import { summarizeText } from '@/servers/transformer'
import React, { useState } from 'react'

const onButtonClick = (text, setSummary) => {
  const summary = summarizeText(text);
  setSummary(summary);
}

export default function SummarizeWidget() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="widget-container p-6 bg-white rounded-lg shadow-md flex flex-col gap-4 w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Summarize Text</h2>
        <p className="text-gray-600 mb-2">This widget allows you to summarize text using an AI model.</p>
        <textarea
          className="resize-y min-h-[120px] max-h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-gray-50 transition-all duration-200"
          placeholder="Enter text to summarize..."
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button disabled={loading} onClick={() => onButtonClick(text, setSummary)} className="mt-2">
          Summarize
        </Button>
      </div>
      <div>
        {summary && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </>
  )
}