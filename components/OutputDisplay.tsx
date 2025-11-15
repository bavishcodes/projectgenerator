import React, { useState } from 'react';
import { GeneratedProject } from '../types';
import CodeBlock from './CodeBlock';
import { BotIcon, CircleDashedIcon, FileCode2Icon, TerminalIcon, TextIcon, TriangleAlertIcon } from './Icons';

interface OutputDisplayProps {
  isLoading: boolean;
  content: GeneratedProject | null;
  error: string | null;
}

type Tab = 'report' | 'domain' | 'problem' | 'output';

const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, content, error }) => {
  const [activeTab, setActiveTab] = useState<Tab>('report');

  const renderInitialState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <BotIcon className="w-16 h-16 text-zinc-600 mb-4" />
      <h3 className="text-lg font-semibold text-zinc-300">Project Output</h3>
      <p className="text-zinc-500 mt-1 max-w-xs">
        Click the "Generate Project" button to have Gemini create the PDDL files and report.
      </p>
    </div>
  );

  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <CircleDashedIcon className="w-16 h-16 text-cyan-500 animate-spin mb-4" />
      <h3 className="text-lg font-semibold text-zinc-300">Generating Project...</h3>
      <p className="text-zinc-500 mt-1">
        The AI is crafting your files. This may take a moment.
      </p>
    </div>
  );
  
  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg">
      <TriangleAlertIcon className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-400">An Error Occurred</h3>
      <p className="text-red-400/80 mt-1 max-w-md">{error}</p>
    </div>
  );

  const renderContent = () => {
    if (!content) return null;

    const tabContent: Record<Tab, { content: string; language: string; filename: string }> = {
      report: { content: content.projectReport, language: 'markdown', filename: 'report.md' },
      domain: { content: content.domainPddl, language: 'lisp', filename: 'domain.pddl' },
      problem: { content: content.problemPddl, language: 'lisp', filename: 'problem.pddl' },
      output: { content: content.plannerOutput, language: 'bash', filename: 'planner-output.txt' },
    };

    return (
      <CodeBlock
        language={tabContent[activeTab].language}
        code={tabContent[activeTab].content}
        filename={tabContent[activeTab].filename}
      />
    );
  };
  
  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'report', label: 'Report', icon: <TextIcon className="w-4 h-4 mr-2" /> },
    { id: 'domain', label: 'domain.pddl', icon: <FileCode2Icon className="w-4 h-4 mr-2" /> },
    { id: 'problem', label: 'problem.pddl', icon: <FileCode2Icon className="w-4 h-4 mr-2" /> },
    { id: 'output', label: 'Planner Output', icon: <TerminalIcon className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 shadow-lg h-full flex flex-col">
      {content && !isLoading && !error && (
         <div className="border-b border-zinc-800 px-4">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center whitespace-nowrap py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-100 hover:border-zinc-600'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
        </div>
      )}
      <div className="flex-grow p-1.5">
        {isLoading ? renderLoadingState() : 
         error ? renderErrorState() : 
         content ? renderContent() : renderInitialState()}
      </div>
    </div>
  );
};

export default OutputDisplay;