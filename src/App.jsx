import { useState, useRef } from 'react'
import OfferForm from './components/OfferForm'
import OfferPreview from './components/OfferPreview'
import DownloadButton from './components/DownloadButton'
import './App.css'

const DEFAULT_FIELDS = {
  candidateName: 'S Sandeep Kumaar',
  domain:        'Data Analytics',
  date:          '02-5-26',
  startDate:     '4-5-26',
  duration:      '1 month',
  hrName:        'Bhavithra A N',
  regId:         '1252025936',
  email:         'altruistybusiness@gmail.com',
  phone:         '8667839838',
}

export default function App() {
  const [fields, setFields] = useState(DEFAULT_FIELDS)
  const previewRef = useRef(null)

  const handleChange = (name, value) => {
    setFields(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="app-shell">
      <header className="app-header no-print">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6M9 16h6M9 8h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span className="brand-name">Offer Letter Generator</span>
              <span className="brand-sub">Altruisty Innovation Pvt Ltd</span>
            </div>
          </div>
          <DownloadButton previewRef={previewRef} />
        </div>
      </header>

      <main className="app-main">
        <aside className="form-panel no-print">
          <div className="panel-header">
            <h2 className="panel-title">Edit Fields</h2>
            <p className="panel-subtitle">Live preview updates as you type →</p>
          </div>
          <OfferForm fields={fields} onChange={handleChange} />
        </aside>

        <section className="preview-panel mobile-hide-preview">
          <div className="preview-panel-header no-print">
            <span className="preview-badge">
              <span className="live-dot"></span>
              Live Preview
            </span>
            <span className="preview-size-label">A4 · 1414 × 2000 px template</span>
          </div>
          <div className="preview-scroller">
            <OfferPreview ref={previewRef} fields={fields} />
          </div>
        </section>
      </main>
    </div>
  )
}
