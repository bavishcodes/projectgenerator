import React, { useState, useEffect } from 'react';
import { CheckIcon, CopyIcon, DownloadIcon } from './Icons';

interface CodeBlockProps {
  code: string;
  language: string;
  filename: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="bg-zinc-900 rounded-lg relative group h-full">
      <div className="max-h-[calc(100vh-15rem)] lg:max-h-[calc(100vh-18rem)] overflow-auto p-4">
          <pre className="text-sm">
            <code className={`language-${language} whitespace-pre-wrap`}>
              {code.trim()}
            </code>
          </pre>
      </div>
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button
          onClick={handleDownload}
          className="p-1.5 bg-zinc-700/80 text-zinc-300 rounded-md hover:bg-zinc-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Download file"
        >
          <DownloadIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleCopy}
          className="p-1.5 bg-zinc-700/80 text-zinc-300 rounded-md hover:bg-zinc-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Copy code"
        >
          {isCopied ? (
            <CheckIcon className="w-5 h-5 text-green-400" />
          ) : (
            <CopyIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;