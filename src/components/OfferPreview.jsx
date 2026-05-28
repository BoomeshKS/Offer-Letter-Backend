import { forwardRef } from 'react'
import templateImg from '../assets/template.png'
import './OfferPreview.css'

export default forwardRef(function OfferPreview({ fields }, ref) {
  const { candidateName, domain, date, startDate, duration, regId, email, phone } = fields

  return (
    <div className="a4-wrap">
      <div className="letter" ref={ref} id="offer-letter-preview">
        <img className="tmpl-img" src={templateImg} alt="Template" />

        {/* Date */}
        <div className="ov ov-date">{date}</div>

        {/* Salutation */}
        <div className="ov ov-salutation">
          Dear <span className="highlight">{candidateName}</span>,
        </div>

        {/* Dynamic Body Content */}
        <div className="ov ov-body">
          <p>
            We are thrilled to inform you that you have been selected for internship in the 
            Altruisty in the domain of <span className="highlight">{domain}</span>. Congratulations!
          </p>
          
          <br />
          
          <p>
            The internship will commence on <span className="highlight">{startDate}</span> and 
            will last for a duration of <span className="highlight">{duration}</span>. 
            During this time, you will have the opportunity to gain practical experience, 
            learn from industry experts, and collaborate with a team of domain professionals.
          </p>

          <br />

          <p>
            We are confident that your skills and dedication will contribute greatly to the 
            success of our program, and we look forward to seeing the valuable contributions 
            you will make.
          </p>
        </div>

        {/* Registration ID */}
        <div className="ov ov-reg-line">
          REG:<span className="ov-reg-val">{regId}</span>
        </div>

      </div>
    </div>
  )
})