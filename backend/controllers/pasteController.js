const Paste = require('../models/Paste');
const { encrypt, decrypt } = require('../utils/cryptoUtils');


const generateShortCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * @desc    
 * @route   
 */
exports.createPaste = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code content is required" });
    }

    const shortCode = generateShortCode();

    const { encryptedData, iv } = encrypt(code);

    
    await Paste.create({
      shortCode,
      encryptedData,
      iv,
      language: language || 'cpp'
    });

    
    res.status(201).json({ 
      success: true, 
      shortCode: shortCode, 
      expiresAt: "10 minutes" 
    });
    
  } catch (err) {
    console.error('Create Error:', err);
    if (err.code === 11000) {
      return res.status(500).json({ error: "Code collision. Please try again." });
    }
    res.status(500).json({ error: "Server error during encryption" });
  }
};

/**
 * @desc    
 * @route   
 */
exports.getPaste = async (req, res) => {
  try {
    
    const paste = await Paste.findOne({ shortCode: req.params.id });

    if (!paste) {
      return res.status(404).json({ 
        error: "Snippet not found or has expired (10-minute limit reached)" 
      });
    }

  
    const decryptedCode = decrypt(paste.encryptedData, paste.iv);

    
    res.status(200).json({
      success: true,
      code: decryptedCode,
      language: paste.language
    });

  } catch (err) {
    console.error('Retrieve Error:', err);
    res.status(500).json({ error: "Server error during decryption" });
  }
};