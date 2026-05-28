import './OfferForm.css'

const FIELD_GROUPS = [
  {
    group: 'Candidate',
    fields: [
      { label: 'Candidate Name', key: 'candidateName', placeholder: 'Full name', },
      { label: 'Domain / Role', key: 'domain', placeholder: 'e.g. Data Analytics',},
    ]
  },
  {
    group: 'Dates',
    fields: [
      { label: 'Letter Date', key: 'date', placeholder: 'DD-M-YY', },
      { label: 'Internship Start Date', key: 'startDate', placeholder: 'DD-M-YY', },
      { label: 'Duration', key: 'duration', placeholder: 'e.g. 1 month',},
    ]
  },
  {
    group: 'HR & Registration',
    fields: [
      // { label: 'HR Name', key: 'hrName', placeholder: 'Full name', icon: '🏢' },
      { label: 'Registration ID', key: 'regId', placeholder: 'e.g. 1252025936',},
    ]
  },
]

export default function OfferForm({ fields, onChange }) {
  return (
    <div className="offer-form">
      <div className="form-scroll">
        {FIELD_GROUPS.map(({ group, fields: groupFields }) => (
          <div key={group} className="field-group">
            <div className="group-label">{group}</div>
            {groupFields.map(({ label, key, placeholder, icon }) => (
              <div key={key} className="field-item">
                <label className="field-label" htmlFor={key}>
                  <span className="field-icon">{icon}</span>
                  {label}
                </label>
                <input
                  id={key}
                  className="field-input"
                  type="text"
                  value={fields[key]}
                  onChange={e => onChange(key, e.target.value)}
                  placeholder={placeholder}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Reset button */}
        <div className="form-footer">
          <p className="form-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            All edits appear live in the preview panel
          </p>
        </div>
      </div>
    </div>
  )
}
