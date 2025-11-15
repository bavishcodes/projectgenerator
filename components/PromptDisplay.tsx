import React from 'react';
import { PromptIcon } from './Icons';

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 shadow-lg">
      <div className="p-4 border-b border-zinc-800 flex items-center space-x-3">
        <PromptIcon className="w-5 h-5 text-cyan-400" />
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">AI Studio Prompt</h2>
          <p className="text-sm text-zinc-400 mt-1">
            This prompt will be sent to the Gemini API to generate the PDDL project.
          </p>
        </div>
      </div>
      <div className="p-4 max-h-[calc(100vh-25rem)] overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 bg-transparent">
          {prompt.trim()}
        </pre>
      </div>
    </div>
  );
};

export default PromptDisplay;