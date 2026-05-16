import express from 'express'
import multer from 'multer'
import fs from 'fs'
import cors from 'cors'
import { Resend } from 'resend'
import dotenv from "dotenv";
dotenv.config();

const app = express()

app.use(cors())

app.use(express.json())

const upload = multer({
  dest: 'uploads/',
})

const resend = new Resend(process.env.RESEND_API_KEY)

app.post(
  '/send-email',
  upload.single('pdf'),

  async (req, res) => {

    try {

      const pdfPath = req.file.path

      const pdfBuffer = fs.readFileSync(pdfPath)

      await resend.emails.send({

        from: 'Altruisty <offers@altruistyinnovation.com>',

        to: req.body.candidateEmail,

        subject: 'Offer Letter',

        html: `
          <div style="background-color: #000000; color: #ffffff; font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; max-width: 600px; border-radius: 8px;">
            <h2 style="color: #ffffff; border-bottom: 1px solid #333333; padding-bottom: 10px; margin-top: 0;">Internship Offer Letter</h2>
            
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6;">Dear Intern,</p>
            
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6;">We are pleased to inform you that you have been selected for an internship at <strong style="color: #ffffff;">Altruisty Innovation Private Limited</strong>. Congratulations!</p>
            
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6;">You will have the opportunity to gain practical experience, enhance your skills, and work with our professional team on real-time projects. We look forward to your valuable contributions during this internship.</p>
            
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6;">Kindly confirm your acceptance by replying to this communication.</p>
            
            <div style="margin-top: 35px; padding-top: 15px; border-top: 1px solid #333333;">
              <p style="color: #e0e0e0; font-size: 15px; margin-bottom: 15px;">Best Regards,</p>
              <div style="font-size: 16px; font-weight: bold; color: #ffffff;">Bhavithra A N</div>
              <div style="font-size: 14px; color: #aaaaaa; margin-bottom: 15px;">HR & Executive Lead</div>
              
              <div style="font-size: 15px; font-weight: bold; color: #ffffff; margin-bottom: 10px;">Altruisty Innovation Private Limited</div>
              
              <div style="font-size: 13px; color: #888888; line-height: 1.8;">
                <div>📞 8667839838</div>
                <div>🌐 <a href="https://altruistyinnovation.com" style="color: #888888; text-decoration: none;">altruistyinnovation.com</a></div>
                <div>✉ <a href="mailto:altruistybusiness@gmail.com" style="color: #888888; text-decoration: none;">altruistybusiness@gmail.com</a></div>
              </div>
            </div>
          </div>
        `,

        attachments: [
          {
            filename: 'Offer-Letter.pdf',
            content: pdfBuffer,
          },
        ],
      })

      fs.unlinkSync(pdfPath)

      res.json({
        success: true,
      })

    } catch (err) {

      console.error(err)

      res.status(500).json({
        success: false,
      })

    }
  }
)

app.listen(5000, () => {
  console.log('Server running on port 5000')
})