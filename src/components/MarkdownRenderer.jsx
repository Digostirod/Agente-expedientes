"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ 
  content, 
  className = '',
  containerClassName = ''
}) {
  if (!content) return null;
  
  return (
    <div className={`markdown-renderer ${containerClassName}`}>
      <ReactMarkdown
        className={`prose max-w-none ${className}`}
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 mt-4" {...props} />,
          p: ({node, ...props}) => <p className="mb-4" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: ({node, ...props}) => <li className="mb-1" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 py-1 mb-4 italic" {...props} />
          ),
          code: ({node, inline, ...props}) => 
            inline 
              ? <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />
              : <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4"><code {...props} /></pre>,
          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
          em: ({node, ...props}) => <em className="italic" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
          hr: ({node, ...props}) => <hr className="my-6 border-t border-gray-300" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
