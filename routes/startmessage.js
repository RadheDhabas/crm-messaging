import express from "express"; 
import axios from "axios";
const router = express.Router();

router.get('/send-first-message', async(req,res)=>{
    const url = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`;
  
    const headers = {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    };
  
    const data = {
      "messaging_product": "whatsapp",
      "to": RECIPIENT_WAID,
      "type": "template",
      "template": {
        "name": "r_test_1",
        "language": { "code": "en" }
      }
    };
  
    try {
      const response = await axios.post(url, data, { headers });
      console.log('Status Code:', response.status);
      console.log('Response Data:', response.data);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
});

export default router;