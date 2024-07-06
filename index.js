const express= require('express')
const dotenv=require('dotenv')
const app=express()
const {PrismaClient}= require('@prisma/client')

dotenv.config();
app.use(express.json())
const prisma= new PrismaClient();

app.post('/api/referral', async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail,course } = req.body;
  
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
      return res.status(400).send({ error: 'All fields are required' });
    }
  
    try {
      const referral = await prisma.referral.create({
        data: { referrerName, referrerEmail, refereeName, refereeEmail,course },
        
      });
      res.status(201).json(referral);
    }
 catch (error) {
    res.status(500).json({ error: 'Failed to create referral' });
  }
});

app.listen(process.env.PORT,()=>{
    console.log('server is running')
})

