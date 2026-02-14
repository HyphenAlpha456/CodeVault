const mongoose = require('mongoose');


const pasteSchema = new mongoose.Schema({
  encryptedData: { 
    type: String, 
    required: [true, 'Encrypted content is required'] 
  },
  iv: { 
    type: String, 
    required: [true, 'Initialization Vector (IV) is required for decryption'] 
  },
 
  language: { 
    type: String, 
    default: 'plaintext' 
  },
  shortCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    index: { expires: 600 } 
  }
});
const Paste = mongoose.model('Paste', pasteSchema);

module.exports = Paste;