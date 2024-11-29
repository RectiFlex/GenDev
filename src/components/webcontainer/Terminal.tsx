import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from 'xterm-addon-fit';
import { setTerminal } from '../../services/webcontainer/instance';
import '@xterm/xterm/css/xterm.css';

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    const term = new XTerm({
      theme: {
        background: '#0D0D1E',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selection: 'rgba(255, 255, 255, 0.3)',
      },
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      cursorBlink: true,
      cursorStyle: 'block',
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddonRef.current = fitAddon;

    xtermRef.current = term;
    setTerminal(term);

    // Delay opening the terminal to ensure the container is ready
    setTimeout(() => {
      if (terminalRef.current) {
        term.open(terminalRef.current);
        fitAddon.fit();
      }
    }, 0);

    const resizeObserver = new ResizeObserver(() => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    });

    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      term.dispose();
    };
  }, []);

  return (
    <div className="h-full bg-[#0D0D1E] p-2">
      <div ref={terminalRef} className="h-full rounded-lg overflow-hidden" />
    </div>
  );
}