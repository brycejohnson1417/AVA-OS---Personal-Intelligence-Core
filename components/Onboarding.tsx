import React, { useState } from 'react';
import { Check, AlertTriangle, Terminal, Cpu, HardDrive } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [apiKeys, setApiKeys] = useState({
      openai: '',
      anthropic: '',
      gemini: '',
      grok: ''
  });
  
  const handleNext = () => setStep(s => s + 1);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
      
      {/* Progress */}
      <div className="flex items-center space-x-2 mb-12">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1 w-12 rounded-full transition-colors ${step >= i ? 'bg-accent-500' : 'bg-gray-800'}`}></div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-float">
          <Cpu className="w-16 h-16 text-accent-400 mx-auto" />
          <h2 className="text-3xl font-light font-mono text-white">Storage Reset & Initialization</h2>
          <p className="text-gray-400">Initiate secure wipe sequence for Local Compute nodes. <br/>This will clear local cache and prep for personal model ingestion. Confirm backup status.</p>
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-left text-sm text-red-200 flex items-start gap-3">
            <AlertTriangle className="shrink-0" size={18} />
            <div>
               <p className="font-bold">Warning: Irrevocable Action</p>
               <p>Ensure `SubNode_Recovery_Kit.zip` is stored on the cold-storage drive.</p>
            </div>
          </div>
          <button onClick={handleNext} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all">Confirm Wipe Sequence</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 w-full">
          <Terminal className="w-16 h-16 text-purple-400 mx-auto" />
          <h2 className="text-3xl font-light font-mono text-white">AI Engine Setup</h2>
          <p className="text-gray-400">Configure core API gateways for personal intelligence deployment.</p>
          
          <div className="grid gap-4 text-left">
             <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <label className="text-xs text-gray-500 uppercase block mb-1">OpenAI Gateway</label>
                <input type="password" value="sk-proj-................" disabled className="w-full bg-transparent text-green-400 font-mono text-sm focus:outline-none" />
             </div>
             <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <label className="text-xs text-gray-500 uppercase block mb-1">Anthropic Gateway</label>
                <input type="password" placeholder="Enter sk-ant-..." className="w-full bg-transparent text-white font-mono text-sm focus:outline-none" />
             </div>
             <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <label className="text-xs text-gray-500 uppercase block mb-1">Google Gateway</label>
                <input type="password" placeholder="Enter key..." className="w-full bg-transparent text-white font-mono text-sm focus:outline-none" />
             </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
             <span>Compute Quota Limit Active</span>
             <span className="text-green-400">Optimization Online</span>
          </div>

          <button onClick={handleNext} className="px-8 py-3 bg-accent-600 text-white font-bold rounded-full hover:bg-accent-500 transition-all w-full">Connect Agents</button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <HardDrive className="w-16 h-16 text-blue-400 mx-auto" />
          <h2 className="text-3xl font-light font-mono text-white">Semantic Memory Integration</h2>
          <p className="text-gray-400">Indexing local data, establishing knowledge graph, and setting up vector sync.</p>
          
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
             <div className="bg-blue-500 h-full w-[75%] animate-pulse"></div>
          </div>
          <div className="font-mono text-xs text-left space-y-1 text-gray-500">
             <p>&gt; syncing personal vault files...</p>
             <p>&gt; initializing @ava/vector-knowledge-base</p>
             <p>&gt; indexing personal documentation...</p>
             <p className="text-white">&gt; embedding data into semantic memory grid...</p>
          </div>

          <button onClick={handleNext} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all">Finalize Mesh Sync</button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 animate-float">
          <div className="w-20 h-20 bg-accent-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.6)]">
             <Check className="text-black w-10 h-10" />
          </div>
          <h2 className="text-3xl font-light font-mono text-white">System Operational</h2>
          <p className="text-gray-400">AVA OS is ready. Personal configuration parameters loaded into memory.</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">Enter Dashboard</button>
        </div>
      )}

    </div>
  );
};

export default Onboarding;
