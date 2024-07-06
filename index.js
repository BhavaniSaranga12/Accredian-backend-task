const express= require('express')
const dotenv=require('dotenv')
const app=express()
const cors=require('cors')
const nodemailer=require('nodemailer')
const {PrismaClient}= require('@prisma/client')
app.use(cors())
dotenv.config();
app.use(express.json())
const prisma= new PrismaClient();

const port=process.env.PORT || 5000;


app.get('/', (req,res)=>{
    res.status(200).json({message:"Hello Everyonen"})
})
app.post('/api/referral', async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail,course } = req.body;
  
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
      return res.status(400).send({ error: 'All fields are required' });
    }
  
    try {
      const referral = await prisma.referral.create({
        data: { referrerName, referrerEmail, refereeName, refereeEmail,course },
        
      });
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: refereeEmail,
        subject: 'Referral',
        text: `Hi ${refereeName},\n\n${referrerName} has referred you to our ${course} Course.\n\nBest regards,\nTeam`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
  
      res.status(201).json(referral);
    }
 catch (error) {
    res.status(500).json({ error: 'Failed to create referral' });
  }
});

app.listen(port,()=>{
    console.log('server is running')
})

