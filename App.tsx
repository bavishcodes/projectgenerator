import React, { useState, useCallback } from 'react';
import { PROMPT_TEXT } from './constants';
import { GeneratedProject } from './types';
import { generatePddlProject } from './services/geminiService';
import PromptDisplay from './components/PromptDisplay';
import OutputDisplay from './components/OutputDisplay';
import { GithubIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedProject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generatePddlProject(PROMPT_TEXT);
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Brand Logo */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <SparklesIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <h1 className="text-xl font-bold text-zinc-100 tracking-tight">AI PDDL Project Generator</h1>
              </div>
              {/* Navigation Links */}
              <div className="hidden md:flex items-baseline space-x-4">
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-cyan-400" aria-current="page">Dashboard</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors">About</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors">Documentation</a>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="https://github.com/google/generative-ai-docs/tree/main/site/en/gemini-api/docs/applications/pddl_project_generator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                aria-label="View on GitHub"
              >
                <GithubIcon className="w-6 h-6" />
                <span className="hidden lg:inline text-sm font-medium">View on GitHub</span>
              </a>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col space-y-6 lg:sticky top-24">
            <PromptDisplay prompt={PROMPT_TEXT} />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Project...
                </>
              ) : '✨ Generate Project'}
            </button>
          </div>
          <div className="lg:min-h-[calc(100vh-8rem)]">
            <OutputDisplay 
              isLoading={isLoading}
              content={generatedContent}
              error={error}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-zinc-500 text-sm">
            Powered by the <a href="https://ai.google.dev/gemini-api" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Gemini API</a>.
        </div>
      </footer>
    </div>
  );
};

export default App;