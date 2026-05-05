import React, { useState } from 'react';
import { LayoutDashboard, Network, Settings, MessageSquare, Menu, Activity, Smartphone, Database } from 'lucide-react';
import { AppView } from './types';
import AgentCore from './components/AgentCore';
import KnowledgeGraph from './components/KnowledgeGraph';
import InterviewMode from './components/InterviewMode';
import Onboarding from './components/Onboarding';
import { INITIAL_GRAPH_DATA, USER_CONTEXT_DUMP } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case AppView.OBSIDIAN_GRAPH:
        return <div className="h-full p-4"><KnowledgeGraph data={INITIAL_GRAPH_DATA} /></div>;
      case AppView.INTERVIEW:
        return <div className="h-full p-4"><InterviewMode initialContext={USER_CONTEXT_DUMP} /></div>;
      case AppView.ONBOARDING:
        return <div className="h-full bg-void/50 backdrop-blur-md"><Onboarding /></div>;
      case AppView.DASHBOARD:
      default:
        return (
          <div className="h-full p-6 overflow-y-auto">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Hero Section */}
                <div className="lg:col-span-2 bg-gradient-to-br from-accent-900/20 to-black border border-accent-500/20 rounded-2xl p-8 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs font-mono text-accent-400">SYSTEM STATUS: ONLINE</div>
                      <div className="text-xs font-mono text-gray-500">LATENCY: 12ms</div>
                   </div>
                   <div className="flex items-center space-x-8">
                      <AgentCore status="idle" size="lg" />
                      <div>
                        <h1 className="text-4xl font-light text-white mb-2">Core Online.</h1>
                        <p className="text-accent-200 text-lg font-light mb-4">Personal intelligence initialized. Semantic memory grid is fully synchronized with your data streams.</p>
                        <div className="flex gap-3">
                           <button onClick={() => setCurrentView(AppView.INTERVIEW)} className="px-6 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-full text-sm font-semibold transition-colors flex items-center gap-2">
                              <MessageSquare size={16} /> Chat Interface
                           </button>
                           <button onClick={() => setCurrentView(AppView.OBSIDIAN_GRAPH)} className="px-6 py-2 border border-white/20 hover:bg-white/10 text-white rounded-full text-sm font-semibold transition-colors flex items-center gap-2">
                              <Network size={16} /> View Topology
                           </button>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Quick Stats / Context */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                   <h3 className="text-gray-400 font-mono text-xs uppercase tracking-wider mb-4">Active Objectives</h3>
                   <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                         <span className="text-sm text-gray-200">Processing Morning Briefing</span>
                      </li>
                      <li className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                         <span className="text-sm text-gray-200">Inbox Zero Optimization</span>
                      </li>
                      <li className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                         <span className="text-sm text-gray-200">Semantic Memory Indexing</span>
                      </li>
                   </ul>
                   <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex justify-between items-end">
                         <div>
                            <div className="text-2xl font-mono text-white">$2.40</div>
                            <div className="text-xs text-gray-500">API Spend / $10.00</div>
                         </div>
                         <div className="h-10 w-24 bg-gray-800 rounded flex items-end px-1 gap-1 pb-1">
                            <div className="bg-accent-500 w-1/4 h-[40%] rounded-sm"></div>
                            <div className="bg-accent-500 w-1/4 h-[60%] rounded-sm"></div>
                            <div className="bg-accent-500 w-1/4 h-[30%] rounded-sm"></div>
                            <div className="bg-gray-600 w-1/4 h-[80%] rounded-sm"></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Modules Grid */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div onClick={() => setCurrentView(AppView.ONBOARDING)} className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-accent-500/50 cursor-pointer transition-all group">
                   <Activity className="text-gray-400 group-hover:text-accent-400 mb-3" />
                   <h4 className="text-white font-mono text-sm">System Health</h4>
                   <p className="text-gray-500 text-xs mt-1">Optimization Required</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-blue-500/50 cursor-pointer transition-all group">
                   <Smartphone className="text-gray-400 group-hover:text-blue-400 mb-3" />
                   <h4 className="text-white font-mono text-sm">Mobile Bridge</h4>
                   <p className="text-gray-500 text-xs mt-1">Remote Access Active</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-purple-500/50 cursor-pointer transition-all group">
                   <Database className="text-gray-400 group-hover:text-purple-400 mb-3" />
                   <h4 className="text-white font-mono text-sm">Semantic Database</h4>
                   <p className="text-gray-500 text-xs mt-1">1.2B Vectors Indexed</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-yellow-500/50 cursor-pointer transition-all group">
                   <Settings className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                   <h4 className="text-white font-mono text-sm">Agent Config</h4>
                   <p className="text-gray-500 text-xs mt-1">4 Sub-Agents Running</p>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-gray-100 font-sans selection:bg-accent-500/30 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col border-r border-white/10 bg-void transition-all duration-300 z-20`}>
         <div className="p-6 flex items-center justify-center">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-accent-400 to-purple-500 animate-pulse ${!sidebarOpen && 'scale-75'}`}></div>
            {sidebarOpen && <span className="ml-3 font-mono font-bold tracking-widest text-white">AVA OS</span>}
         </div>
         
         <nav className="flex-1 px-4 space-y-2 mt-8">
            <NavButton icon={<LayoutDashboard />} label="Dashboard" active={currentView === AppView.DASHBOARD} expanded={sidebarOpen} onClick={() => setCurrentView(AppView.DASHBOARD)} />
            <NavButton icon={<Network />} label="Topology Graph" active={currentView === AppView.OBSIDIAN_GRAPH} expanded={sidebarOpen} onClick={() => setCurrentView(AppView.OBSIDIAN_GRAPH)} />
            <NavButton icon={<MessageSquare />} label="Chat Interface" active={currentView === AppView.INTERVIEW} expanded={sidebarOpen} onClick={() => setCurrentView(AppView.INTERVIEW)} />
            <NavButton icon={<Activity />} label="System Setup" active={currentView === AppView.ONBOARDING} expanded={sidebarOpen} onClick={() => setCurrentView(AppView.ONBOARDING)} />
         </nav>

         <div className="p-4 border-t border-white/10">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full p-2 hover:bg-white/5 rounded-lg text-gray-400 flex justify-center">
               <Menu size={20} />
            </button>
         </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50 p-4 flex justify-between items-center">
         <div className="font-mono font-bold text-white">AVA OS</div>
         <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="text-accent-400"><LayoutDashboard /></button>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pt-16 md:pt-0">
         {renderContent()}
      </div>
    </div>
  );
}

const NavButton = ({ icon, label, active, expanded, onClick }: any) => (
   <button 
      onClick={onClick}
      className={`w-full flex items-center p-3 rounded-xl transition-all ${
         active 
         ? 'bg-accent-900/30 text-accent-400 border border-accent-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]' 
         : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
      }`}
   >
      <div className={`${active ? 'text-accent-400' : ''}`}>{icon}</div>
      {expanded && <span className="ml-3 text-sm font-medium">{label}</span>}
   </button>
);

export default App;
