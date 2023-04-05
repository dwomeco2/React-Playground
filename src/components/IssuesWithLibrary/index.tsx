import React, { useState, Suspense } from 'react'

export default function IssueWithLibrary() {
  const [issue, setIssue] = useState(0)

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-wrap w-full justify-center gap-2 text-center mb-2">
        <div>
          <button className="py-2 px-8 w-full bg-red-500 text-white" onClick={() => setIssue(1)}>
            framer-motion issue
          </button>
        </div>
        <div>
          <button className="py-2 px-8 w-full bg-red-500 text-white" onClick={() => setIssue(2)}>
            Dnd-kit Issue
          </button>
        </div>
      </div>
      <div className="w-full h-full">
        {issue == 1 && (
          <Suspense fallback={<div>Loading...</div>}>
            <iframe
              src="https://codesandbox.io/embed/backgroundcolor-in-framer-motion-forked-fij3sd?fontsize=14&hidenavigation=1&theme=dark"
              style={{ width: '100%', height: '100%', border: 0, borderRadius: '4px', overflow: 'hidden' }}
              title="backgroundColor in Framer-motion"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </Suspense>
        )}
        {issue == 2 && (
          <Suspense fallback={<div>Loading...</div>}>
            <iframe
              src="https://codesandbox.io/embed/dnd-kit-resortable-lots-of-render-issue-ftlh3c?fontsize=14&hidenavigation=1&theme=dark"
              style={{ width: '100%', height: '100%', border: 0, borderRadius: '4px', overflow: 'hidden' }}
              title="Dnd-kit Resortable lots of render issue"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </Suspense>
        )}
      </div>
    </div>
  )
}
