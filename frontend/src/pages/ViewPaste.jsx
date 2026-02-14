import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Copy, Check, FileCode, Clock, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ViewPaste = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  
  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pastes/${id}`);
        setPaste(res.data);
      } catch (err) {
        setError("This snippet has expired or does not exist.");
      } finally {
        setLoading(false);
      }
    };
    fetchPaste();
  }, [id]);

  
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
      <p className="text-gray-400">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 px-4 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="glass rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          
          
          <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <FileCode className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-white">Secret Snippet</h2>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Auto-deletes in 10m
                </span>
              </div>
            </div>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors text-gray-300 hover:text-white"
            >
              {copied ? (
                <> <Check className="w-4 h-4 text-green-400" /> Copied </>
              ) : (
                <> <Copy className="w-4 h-4" /> Copy Code </>
              )}
            </button>
          </div>

          
          <div className="relative group">
            <pre className="p-6 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed bg-[#0b1120] min-h-[300px]">
              <code>{paste?.code}</code>
            </pre>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default ViewPaste;