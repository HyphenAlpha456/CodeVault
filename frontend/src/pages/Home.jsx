import { useState } from 'react';
import axios from 'axios';
import { Copy, Check, Loader2, Send, Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';


const detectLanguage = (code) => {
  if (code.includes('def ') || code.includes('import ') || code.includes('print(')) return 'python';
  if (code.includes('class ') || code.includes('public static void')) return 'java';
  if (code.includes('#include') || code.includes('using namespace')) return 'cpp';
  if (code.includes('function') || code.includes('const ') || code.includes('console.log')) return 'javascript';
  if (code.includes('<!DOCTYPE html>') || code.includes('<html>')) return 'html';
  if (code.includes('SELECT ') && code.includes('FROM ')) return 'sql';
  return 'plaintext'; 
};

const Home = () => {

  const [sendCode, setSendCode] = useState('');
  const [generatedPin, setGeneratedPin] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  
  const [retrievePin, setRetrievePin] = useState('');
  const [retrievedCode, setRetrievedCode] = useState(null);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [copiedRetrieved, setCopiedRetrieved] = useState(false);

  
  const handleSend = async () => {
    if (!sendCode.trim()) return toast.error("Text area is empty!");
    
    setIsSending(true);
    try {
      
      const detectedLang = detectLanguage(sendCode);

      const res = await axios.post('http://localhost:5000/api/pastes/share', { 
        code: sendCode,
        language: detectedLang 
      });

      
      const pin = res.data.shortCode || res.data.id;

      if (pin) {
        setGeneratedPin(pin);
        setSendCode(''); 
        toast.success(`Secured as ${detectedLang}! Share the PIN.`);
      } else {
        toast.error("Server Error: No PIN returned.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send data.");
    } finally {
      setIsSending(false);
    }
  };

  const copyGeneratedPin = () => {
    navigator.clipboard.writeText(generatedPin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  
  const handleRetrieve = async () => {
    if (retrievePin.length !== 6) return toast.error("PIN must be 6 digits");
    
    setIsRetrieving(true);
    try {
      
      const res = await axios.get(`http://localhost:5000/api/pastes/${retrievePin}`);
      setRetrievedCode(res.data.code);
      toast.success("Data Retrieved Successfully!");
    } catch (err) {
      toast.error("Invalid PIN or Code Expired");
      setRetrievedCode(null);
    } finally {
      setIsRetrieving(false);
    }
  };

  const copyRetrievedCode = () => {
    navigator.clipboard.writeText(retrievedCode);
    setCopiedRetrieved(true);
    setTimeout(() => setCopiedRetrieved(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center gap-8">
      
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">Online <span className="text-indigo-400">Secure</span> Clipboard</h1>
        <p className="text-gray-400">Universal Secure Vault: Text, Code, or Links.</p>
      </div>

      <div className="w-full max-w-3xl glass rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="bg-white/5 px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            1. Send to Clipboard
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          {!generatedPin ? (
            
            <>
              <textarea
                value={sendCode}
                onChange={(e) => setSendCode(e.target.value)}
                placeholder="Paste any text, code, or secret here..."
                className="w-full h-40 bg-black/30 border border-white/10 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-indigo-500 font-mono resize-y placeholder:text-gray-600"
              />
              <button
                onClick={handleSend}
                disabled={isSending || !sendCode}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSending ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                Encrypt & Send
              </button>
            </>
          ) : (
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-6 text-center space-y-4"
            >
              <div className="text-gray-300">Share this PIN to retrieve the data:</div>
              <div className="text-5xl font-black text-indigo-400 tracking-widest font-mono select-all">
                {generatedPin}
              </div>
              <div className="flex justify-center gap-4">
                <button onClick={copyGeneratedPin} className="btn-secondary flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-white transition-colors border border-white/5">
                  {copiedPin ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copiedPin ? "Copied" : "Copy PIN"}
                </button>
                <button onClick={() => setGeneratedPin(null)} className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                  <RefreshCw className="w-4 h-4" /> Send New
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

     
      <div className="w-full max-w-3xl glass rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="bg-white/5 px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            2. Retrieve from Clipboard
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              maxLength={6}
              value={retrievePin}
              onChange={(e) => setRetrievePin(e.target.value)}
              placeholder="Enter 6-digit PIN"
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 text-white text-lg tracking-widest focus:outline-none focus:border-green-500 font-mono placeholder:tracking-normal placeholder:text-gray-600"
            />
            <button
              onClick={handleRetrieve}
              disabled={isRetrieving || retrievePin.length !== 6}
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-green-900/20"
            >
              {isRetrieving ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
              Retrieve
            </button>
          </div>

          
          {retrievedCode && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="relative group">
                <textarea
                  readOnly
                  value={retrievedCode}
                  className="w-full h-40 bg-black/50 border border-green-500/30 rounded-lg p-4 text-green-100 font-mono focus:outline-none resize-y"
                />
                <button 
                  onClick={copyRetrievedCode}
                  className="absolute top-4 right-4 p-2 bg-black/60 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
                >
                  {copiedRetrieved ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;