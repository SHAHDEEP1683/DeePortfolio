"use client";

import React, { useState, useRef, useEffect } from 'react';
import { personalData, skills, projects } from '@/lib/data';
import { getCodingTip } from '@/app/actions';
import { Mail, Github, Smartphone } from 'lucide-react';

const commands: { [key: string]: string } = {
  'help': 'Show this help message',
  'about': 'Show personal bio and skills',
  'projects': 'Show project list',
  'contact': 'Show contact information',
  'tip': 'Show a random coding tip or quote',
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

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{ command: string, result: React.ReactNode }[]>(() => [
    { command: '', result: <pre className="text-accent whitespace-pre-wrap">{asciiArt}</pre> },
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
        <div className="font-code">
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
        <div>
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
        <div>
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
            <div className="flex flex-col gap-2">
                <a href={`mailto:${personalData.email}`} className="flex items-center gap-2 hover:text-accent"><Mail size={16} /> {personalData.email}</a>
                <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent"><Github size={16} /> GitHub Profile</a>
                <span className="flex items-center gap-2"><Smartphone size={16} /> {personalData.phone}</span>
            </div>
        )
    } else if (cmd === 'tip') {
        try {
            const tip = await getCodingTip({ request: "a cool coding tip" });
            result = <p className="text-accent">"{tip}"</p>;
        } catch (error) {
            result = <p className="text-red-500">Error fetching tip. Please try again later.</p>
        }
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
        setOutput([{ command: '', result: <pre className="text-accent">{asciiArt}</pre> }]);
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
        className="rounded-lg bg-[#282c34] text-white shadow-lg"
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
                {line.command && <p className="flex items-center"><span className="text-accent mr-2">user@deepverse:~$</span> {line.command}</p>}
                <div>{line.result}</div>
            </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-accent mr-2">user@deepverse:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none focus:ring-0 focus:outline-none w-full font-code p-0"
                />
            </form>
        </div>
    </div>
  );
};

export default Terminal;
