
import { isValidWhatsappMessage, processWhatsappMessage2 } from '../services/WhatsAppService.js';

function handelMessages(req,res){
    const body = req.body;
    console.log('Request body:', body);
  
    // Check if it's a WhatsApp status update
    if (
      body.entry?.[0]?.changes?.[0]?.value?.statuses
    ) {
      console.log('Received a WhatsApp status update.');
      return res.status(200).json({ status: 'ok' });
    }
  
    try {
      if (isValidWhatsappMessage(body)) {
        processWhatsappMessage2(body);
        return res.status(200).json({ status: 'ok' });
      } else {
        // if the request is not a WhatsApp API event, return an error
        return res.status(404).json({ status: 'error', message: 'Not a WhatsApp API event' });
      }
    } catch (err) {
      console.error('Failed to decode JSON', err);
      return res.status(400).json({ status: 'error', message: 'Invalid JSON provided' });
    }
}

export default handelMessages;
