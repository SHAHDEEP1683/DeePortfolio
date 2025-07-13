"use client"
import { useTheme } from "next-themes";
import Image from "next/image";
import { personalData } from "@/lib/data";
import { Github } from "lucide-react";

const GithubGraph = () => {
    const { theme } = useTheme();
    const githubUsername = personalData.github.split('/').pop();

    return (
        <section id="github" className="py-16 md:py-24 border-t">
            <div className="text-center mb-12">
                <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
                    <Github className="h-10 w-10 text-accent" />
                    Contributions
                </h2>
                <p className="text-muted-foreground mt-2">My coding activity on GitHub.</p>
            </div>

            <div className="flex justify-center">
                <Image
                    src={`https://ghchart.rshah.org/${theme === 'dark' ? '228be6' : '212529'}/${githubUsername}`}
                    alt="GitHub contribution graph"
                    width={890}
                    height={180}
                    className="rounded-md border"
                    unoptimized
                />
            </div>
        </section>
    )
}

export default GithubGraph;
