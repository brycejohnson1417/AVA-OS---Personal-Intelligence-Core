import React from 'react';

interface AgentCoreProps {
  status?: 'idle' | 'listening' | 'processing' | 'speaking';
  size?: 'sm' | 'md' | 'lg';
}

const AgentCore: React.FC<AgentCoreProps> = ({ status = 'idle', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-32 h-32',
    lg: 'w-64 h-64',
  };

  const getColor = () => {
    switch (status) {
      case 'listening': return 'border-accent-300 shadow-[0_0_30px_#5eead4]';
      case 'processing': return 'border-purple-500 shadow-[0_0_30px_#a855f7]';
      case 'speaking': return 'border-cyan-400 shadow-[0_0_50px_#22d3ee]';
      default: return 'border-accent-700/50 shadow-[0_0_15px_#0f766e]';
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
      {/* Outer Rings */}
      <div className={`absolute inset-0 rounded-full border border-opacity-20 animate-[spin_10s_linear_infinite] ${status === 'processing' ? 'border-purple-500' : 'border-accent-500'}`}></div>
      <div className={`absolute inset-2 rounded-full border border-opacity-30 border-dashed animate-[spin_15s_linear_infinite_reverse] ${status === 'processing' ? 'border-purple-400' : 'border-accent-400'}`}></div>
      
      {/* Core */}
      <div className={`relative w-1/2 h-1/2 rounded-full border-2 bg-black/80 backdrop-blur-sm transition-all duration-500 ${getColor()} animate-pulse-slow flex items-center justify-center overflow-hidden`}>
        {/* Inner Waveform Simulation */}
        <div className="flex items-center justify-center space-x-1 h-full w-full opacity-80">
           {[1,2,3,4,5].map((i) => (
             <div 
                key={i} 
                className={`w-1 bg-current rounded-full transition-all duration-300 ${status === 'speaking' || status === 'processing' ? 'animate-bounce' : 'h-1'}`}
                style={{
                    backgroundColor: status === 'processing' ? '#d8b4fe' : '#99f6e4',
                    height: status === 'idle' ? '4px' : `${Math.random() * 80}%`,
                    animationDelay: `${i * 0.1}s`
                }}
             ></div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AgentCore;