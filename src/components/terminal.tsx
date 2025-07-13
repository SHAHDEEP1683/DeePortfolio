"use client";

import React, { useState, useRef, useEffect } from 'react';
import { personalData, skills, projects } from '@/lib/data';
import { getCodingTip } from '@/app/actions';
import { Terminal as TerminalIcon, Mail, Github, Smartphone } from 'lucide-react';

const commands: { [key: string]: string } = {
  'help': 'Show this help message',
  'deep --info': 'Show personal bio and skills',
  'deep --projects': 'Show project list',
  'deep --contact': 'Show contact information',
  'deep --random-tip': 'Show a random coding tip or quote',
  'clear': 'Clear the terminal screen',
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{ command: string, result: React.ReactNode }[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endOfOutputRef = useRef<HTMLDivElement>(null);

  const executeCommand = async (command: string) => {
    let result: React.ReactNode = `Command not found: ${command}. Type 'help' for a list of commands.`;
    
    const args = command.trim().split(' ');
    const baseCmd = args[0];
    const option = args[1] || '';
    const fullCommand = `${baseCmd} ${option}`.trim();

    if (command === 'help') {
      result = (
        <div className="font-code">
          <p className="text-primary">Available commands:</p>
          <ul className="list-inside list-none">
            {Object.entries(commands).map(([cmd, desc]) => (
              <li key={cmd}>
                <span className="text-accent">{cmd.padEnd(20, ' ')}</span>- {desc}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (fullCommand === 'deep --info') {
      result = (
        <div>
          <p className="font-headline text-lg text-primary">{personalData.name}</p>
          <p>{personalData.bio}</p>
          <br />
          <p className="font-headline text-md text-primary">Skills:</p>
          <p><strong className="text-accent">Languages & Frameworks:</strong> {skills.languagesAndFrameworks.join(', ')}</p>
          <p><strong className="text-accent">Tools & Technologies:</strong> {skills.toolsAndTechnologies.join(', ')}</p>
        </div>
      );
    } else if (fullCommand === 'deep --projects') {
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
    } else if (fullCommand === 'deep --contact') {
        result = (
            <div className="flex flex-col gap-2">
                <a href={`mailto:${personalData.email}`} className="flex items-center gap-2 hover:text-accent"><Mail size={16} /> {personalData.email}</a>
                <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent"><Github size={16} /> GitHub Profile</a>
                <span className="flex items-center gap-2"><Smartphone size={16} /> {personalData.phone}</span>
            </div>
        )
    } else if (fullCommand === 'deep --random-tip') {
        const tip = await getCodingTip({ request: "a cool coding tip" });
        result = <p className="text-accent">"{tip}"</p>;
    }


    setOutput(prev => [...prev, { command, result }]);
    if (command.trim() !== '' && command.trim() !== 'clear') {
      setHistory(prev => [command, ...prev]);
    }
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === 'clear') {
        setOutput([]);
    } else {
        executeCommand(input);
    }
    setInput('');
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
    endOfOutputRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);
  
  useEffect(() => {
    setOutput([{
      command: '',
      result: <p>Welcome to DeepType! Type <span className="text-accent">'help'</span> to see available commands.</p>
    }])
  }, [])

  return (
    <div className="border rounded-lg p-4 font-code bg-card text-card-foreground shadow-lg h-96 flex flex-col">
      <div className="flex-grow overflow-y-auto pr-2">
        {output.map((line, index) => (
          <div key={index} className="mb-2">
            {line.command && <p className="flex items-center"><span className="text-accent mr-2">$</span> {line.command}</p>}
            <div>{line.result}</div>
          </div>
        ))}
        <div ref={endOfOutputRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center mt-2">
        <span className="text-accent mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none focus:ring-0 w-full font-code"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
