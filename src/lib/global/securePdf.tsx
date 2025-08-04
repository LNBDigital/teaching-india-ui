import React, { useEffect, useRef } from 'react';

interface PDFIframeProps {
  src: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function PDFIframe({ 
  src, 
  width = "100%", 
  height = "600px", 
  className = "" 
}: PDFIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const disablePDFControls = () => {
    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
      }
      
      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  };

  useEffect(() => {
    const cleanup = disablePDFControls();
    return cleanup;
  }, []);

  return (
    <div className={`pdf-container ${className}`}>
      <iframe
        ref={iframeRef}
        id="pdfFrame"
        src={src}
        width={width}
        height={height}
        onLoad={disablePDFControls}
        onContextMenu={(e) => e.preventDefault()}
        style={{ 
          border: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
        title="PDF Viewer"
      />
    </div>
  );
}

// Usage example:
// <PDFIframe src="your-pdf-url" width="100%" height="600px" />