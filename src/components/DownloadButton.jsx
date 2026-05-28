import { useState } from 'react'
import html2pdf from 'html2pdf.js'
import toast from 'react-hot-toast'
import './DownloadButton.css'

export default function DownloadButton() {

  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {

    if (!email) {
      toast.error('Please enter email')
      return
    }

    try {

      setLoading(true)

      const element = document.getElementById('offer-letter-preview')

      if (!element) {
        toast.error('Preview not found')
        return
      }

      const opt = {
        margin: 0,

        filename: 'Offer_Letter.pdf',

        image: {
          type: 'jpeg',
          quality: 1,
        },

        html2canvas: {
          scale: 3,
          useCORS: true,
          backgroundColor: '#ffffff',
        },

        jsPDF: {
          unit: 'px',
          format: [794, 1123],
          orientation: 'portrait',
        },
      }

      /* Generate PDF Blob */
      const pdfBlob = await html2pdf()
        .set(opt)
        .from(element)
        .outputPdf('blob')

      /* Download PDF */
      html2pdf().set(opt).from(element).save()

      /* Send Email */
      const formData = new FormData()

      formData.append(
        'pdf',
        pdfBlob,
        'Offer-Letter.pdf'
      )

      formData.append(
        'candidateEmail',
        email
      )

      const response = await fetch(
        'https://offer-letter-backend-mqtc.onrender.com/send-email',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (data.success) {

        toast.success('Offer letter emailed successfully!')

        setShowModal(false)

        setEmail('')

      } else {

        toast.error('Email sending failed')

      }

    } catch (err) {

      console.error(err)

      toast.error('Something went wrong')

    } finally {

      setLoading(false)

    }
  }

  return (
    <>
      <button
        className="download-btn"
        onClick={() => setShowModal(true)}
      >
        Download PDF
      </button>

      {showModal && (
        <div className="email-modal-overlay">

          <div className="email-modal">

            <h3>Send Offer Letter</h3>

            <input
              type="email"
              placeholder="Enter candidate email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="send-btn"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? 'Sending...' : '✓'}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  )
}