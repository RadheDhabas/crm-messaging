

const validateSignature = (payload, signature) => {
  // Get the APP_SECRET from environment variables or config
  const appSecret = process.env.APP_SECRET;  // Replace with actual secret or use config

  // Generate the expected signature using the payload and APP_SECRET
  const expectedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(payload, 'utf-8')
    .digest('hex');

  // Compare the computed signature with the incoming signature
  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
};
const signatureRequired = (req, res, next) => {
  const signature = req.headers['x-hub-signature-256'];  // Get the signature from header
  if (!signature) {
    logging.info("Signature header missing!");
    return res.status(403).json({ status: "error", message: "Signature missing" });
  }

  // Remove 'sha256=' prefix from the signature
  const actualSignature = signature.substring(7);  // Remove 'sha256='

  // Validate the signature
  if (!validateSignature(req.rawBody, actualSignature)) {
    logging.info("Signature verification failed!");
    return res.status(403).json({ status: "error", message: "Invalid signature" });
  }

  // Proceed with the request if the signature is valid
  next();
};

  export default signatureRequired;