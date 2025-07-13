import Terminal from "./terminal";
import { CaseSensitive, Terminal as TerminalIcon } from "lucide-react";

const TerminalSection = () => {
    return (
        <section id="terminal" className="py-16 md:py-24 border-t">
            <div className="text-center mb-12">
                <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
                    <TerminalIcon className="h-10 w-10" />
                    Interactive Terminal
                </h2>
                <p className="text-muted-foreground mt-2">Try typing a command below! Start with 'help' to see the list of available commands.</p>
            </div>
            <div className="max-w-4xl mx-auto">
                <Terminal />
            </div>
        </section>
    );
};

export default TerminalSection;
