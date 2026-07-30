"use client";

import React, { useState, useRef, useEffect } from 'react';
import { personalData, skills, projects } from '@/lib/data';
import { Mail, Github, Smartphone } from 'lucide-react';

const commands: { [key: string]: string } = {
  'help': 'Show this help message',
  'about': 'Show personal bio and skills',
  'projects': 'Show project list',
  'contact': 'Show contact information',
  'nativeplace': 'Show my native place.',
  'clear': 'Clear the terminal screen',
};

const asciiArt = `
██████╗ ███████╗███████╗██████╗ 
██╔══██╗██╔════╝██╔════╝██╔══██╗
██║  ██║█████╗  █████╗  ██████╔╝
██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ 
██████╔╝███████╗███████╗██║     
╚═════╝ ╚══════╝╚══════╝╚═╝     
`;

const Block = ({ x, y, cols = 1 }: { x: number; y: number; cols?: number }) => {
  return (
    <g>
      {Array.from({ length: cols }).map((_, i) => (
        <rect
          key={i}
          x={x + i * 9}
          y={y}
          width="7"
          height="12"
          fill="#ffffff"
        />
      ))}
    </g>
  );
};

const DoublePath = ({ d1, d2 }: { d1: string; d2: string }) => {
  return (
    <g opacity="0.85">
      <path d={d1} stroke="#ff0055" strokeWidth="1" fill="none" transform="translate(-1, 0)" />
      <path d={d2} stroke="#ff0055" strokeWidth="1" fill="none" transform="translate(-1, 0)" />
      <path d={d1} stroke="#00ffcc" strokeWidth="1" fill="none" transform="translate(1, 0)" />
      <path d={d2} stroke="#00ffcc" strokeWidth="1" fill="none" transform="translate(1, 0)" />
      <path d={d1} stroke="#ffffff" strokeWidth="1" fill="none" />
      <path d={d2} stroke="#ffffff" strokeWidth="1" fill="none" />
    </g>
  );
};

const DeepLogoMobile = () => {
  return (
    <svg viewBox="0 0 280 135" className="w-full max-w-[260px] mx-auto my-3" fill="currentColor">
      {/* D Connections */}
      <DoublePath
        d1="M 50 18 L 50 24 L 14 24 L 14 34"
        d2="M 52 18 L 52 26 L 12 26 L 12 34"
      />
      <DoublePath
        d1="M 50 42 L 50 48 L 14 48 L 14 58"
        d2="M 52 42 L 52 50 L 12 50 L 12 58"
      />
      <DoublePath
        d1="M 50 66 L 50 72 L 14 72 L 14 82"
        d2="M 52 66 L 52 74 L 12 74 L 12 82"
      />
      <DoublePath
        d1="M 50 90 L 50 96 L 14 96 L 14 106"
        d2="M 52 90 L 52 98 L 12 98 L 12 106"
      />
      <DoublePath
        d1="M 12 118 L 12 126 L 52 126 L 52 118"
        d2="M 14 118 L 14 128 L 50 128 L 50 118"
      />

      {/* E1 Connections */}
      <DoublePath
        d1="M 120 18 L 120 24 L 84 24 L 84 34"
        d2="M 122 18 L 122 26 L 82 26 L 82 34"
      />
      <DoublePath
        d1="M 111 66 L 111 72 L 84 72 L 84 82"
        d2="M 113 66 L 113 74 L 82 74 L 82 82"
      />
      <DoublePath
        d1="M 82 118 L 82 126 L 122 126 L 122 118"
        d2="M 84 118 L 84 128 L 120 128 L 120 118"
      />

      {/* E2 Connections */}
      <DoublePath
        d1="M 190 18 L 190 24 L 154 24 L 154 34"
        d2="M 192 18 L 192 26 L 152 26 L 152 34"
      />
      <DoublePath
        d1="M 181 66 L 181 72 L 154 72 L 154 82"
        d2="M 183 66 L 183 74 L 152 74 L 152 82"
      />
      <DoublePath
        d1="M 152 118 L 152 126 L 192 126 L 192 118"
        d2="M 154 118 L 154 128 L 190 128 L 190 118"
      />

      {/* P Connections */}
      <DoublePath
        d1="M 260 18 L 260 24 L 224 24 L 224 34"
        d2="M 262 18 L 262 26 L 222 26 L 222 34"
      />
      <DoublePath
        d1="M 260 42 L 260 48 L 224 48 L 224 58"
        d2="M 262 42 L 262 50 L 222 50 L 222 58"
      />
      <DoublePath
        d1="M 260 66 L 260 72 L 224 72 L 224 82"
        d2="M 262 66 L 262 74 L 222 74 L 222 82"
      />
      <DoublePath
        d1="M 222 118 L 222 126 L 238 126 L 238 118"
        d2="M 224 118 L 224 128 L 236 128 L 236 118"
      />

      {/* Letter D */}
      <Block x={10} y={6} cols={5} />
      <Block x={10} y={30} cols={1} />
      <Block x={46} y={30} cols={1} />
      <Block x={10} y={54} cols={1} />
      <Block x={46} y={54} cols={1} />
      <Block x={10} y={78} cols={1} />
      <Block x={46} y={78} cols={1} />
      <Block x={10} y={102} cols={5} />

      {/* Letter E */}
      <Block x={80} y={6} cols={5} />
      <Block x={80} y={30} cols={1} />
      <Block x={80} y={54} cols={4} />
      <Block x={80} y={78} cols={1} />
      <Block x={80} y={102} cols={5} />

      {/* Letter E */}
      <Block x={150} y={6} cols={5} />
      <Block x={150} y={30} cols={1} />
      <Block x={150} y={54} cols={4} />
      <Block x={150} y={78} cols={1} />
      <Block x={150} y={102} cols={5} />

      {/* Letter P */}
      <Block x={220} y={6} cols={5} />
      <Block x={220} y={30} cols={1} />
      <Block x={256} y={30} cols={1} />
      <Block x={220} y={54} cols={5} />
      <Block x={220} y={78} cols={1} />
      <Block x={220} y={102} cols={1} />
    </svg>
  );
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{ command: string, result: React.ReactNode }[]>(() => [
    { 
      command: '', 
      result: (
        <>
          <pre className="text-accent whitespace-pre-wrap hidden sm:block">{asciiArt}</pre>
          <div className="sm:hidden">
            <DeepLogoMobile />
          </div>
        </>
      ) 
    },
    { command: '', result: <p>Welcome to Deep Terminal! Type <span className="text-accent">'help'</span> to see available commands.</p>}
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  const executeCommand = async (command: string) => {
    let result: React.ReactNode = `Command not found: ${command}. Type 'help' for a list of commands.`;
    
    const cmd = command.trim().toLowerCase();

    if (cmd === 'help') {
      result = (
        <div className="font-code text-sm sm:text-base">
          <p className="text-primary">Available commands:</p>
          <ul className="list-inside list-none">
            {Object.entries(commands).map(([cmd, desc]) => (
              <li key={cmd}>
                <span className="text-accent">{cmd.padEnd(12, ' ')}</span>- {desc}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (cmd === 'about') {
      result = (
        <div className="text-sm sm:text-base">
          <p className="font-headline text-lg text-primary">{personalData.name}</p>
          <p>{personalData.bio}</p>
          <br />
          <p className="font-headline text-md text-primary">Skills:</p>
          <p><strong className="text-accent">Core Technologies:</strong> {skills.coreTechnologies.join(', ')}</p>
          <p><strong className="text-accent">Frameworks & Libraries:</strong> {skills.frameworksAndLibraries.join(', ')}</p>
        </div>
      );
    } else if (cmd === 'projects') {
      result = (
        <div className="text-sm sm:text-base">
          {projects.map((p, i) => (
            <div key={i} className="mb-2">
              <p className="font-headline text-md text-primary">{p.title}</p>
              <p>{p.description}</p>
              <p><strong className="text-accent">Tech:</strong> {p.tech.join(', ')}</p>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'contact') {
        result = (
            <div className="flex flex-col gap-2 text-sm sm:text-base">
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalData.email}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-accent"
                >
                  <Mail size={16} /> {personalData.email}
                </a>
                <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent"><Github size={16} /> GitHub Profile</a>
                <span className="flex items-center gap-2"><Smartphone size={16} /> {personalData.phone}</span>
            </div>
        )
    } else if (cmd === 'nativeplace') {
        result = <p className="text-sm sm:text-base">Amreli, Gujarat.</p>;
    }

    setOutput(prev => [...prev, { command, result }]);
    if (cmd && cmd !== 'clear') {
      setHistory(prev => [command, ...prev]);
    }
    setHistoryIndex(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commandToExecute = input;
    setInput('');
    if (commandToExecute.trim().toLowerCase() === 'clear') {
        setOutput([{ command: '', result: <pre className="text-accent hidden sm:block">{asciiArt}</pre> }]);
    } else {
        await executeCommand(commandToExecute);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0 && historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setInput('');
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const matchingCommand = Object.keys(commands).find(cmd => cmd.startsWith(input));
        if (matchingCommand) {
            setInput(matchingCommand);
        }
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      scrollToBottom();
    }
  }, [output]);
  

  return (
    <div 
        className="rounded-lg bg-[#282c34] text-white shadow-lg text-sm sm:text-base"
        onClick={() => inputRef.current?.focus()}
    >
        <div className="flex items-center p-3 bg-[#21252b] rounded-t-lg">
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm font-sans text-gray-400">
                {'>_'} deep-shah-portfolio
            </div>
        </div>
        <div ref={terminalBodyRef} className="p-4 font-code h-96 overflow-y-auto" >
            {output.map((line, index) => (
            <div key={index} className="mb-2">
                {line.command && (
                  <p className="flex items-center">
                    <span className="text-accent mr-2">
                      <span className="hidden sm:inline">user@deepverse:~$</span>
                      <span className="sm:hidden">deep:~$</span>
                    </span>{" "}
                    {line.command}
                  </p>
                )}
                <div>{line.result}</div>
            </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-accent mr-2">
                  <span className="hidden sm:inline">user@deepverse:~$</span>
                  <span className="sm:hidden">deep:~$</span>
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none focus:ring-0 focus:outline-none w-full font-code p-0 text-sm sm:text-base"
                />
            </form>
        </div>
    </div>
  );
};

export default Terminal;
