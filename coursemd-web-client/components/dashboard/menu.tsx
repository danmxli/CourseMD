import { FiPlus, FiDownload, FiSave, FiCode } from "react-icons/fi";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useFileStore } from "@/lib/store";

export default function GooeyMenu() {
    const markdownData = useFileStore((state) => state.markdownData)

    function downloadMdFile(content: string | undefined, filename: string = 'SYLLABUS.md') {
        if (!content) {
            console.error('Undefined markdown content')
            return
        }

        const blob = new Blob([content], { type: 'text/markdown' });
    
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    return (
        <div className="absolute bottom-0 left-12 h-[300px]">
            <nav className="menu">
                <input type="checkbox" className="peer hidden" name="menu" id="menu" />
                <label
                    className="shadow-md absolute bottom-12 z-10 flex h-14 w-14 scale-125 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-all duration-300 peer-checked:rotate-[135deg] peer-checked:scale-100"
                    htmlFor="menu"
                >
                    <FiPlus className="h-5 w-5" />
                </label>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <button
                            onClick={() => downloadMdFile(markdownData)}
                            className="shadow-md absolute bottom-12 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-80px]"
                        >
                            <FiDownload className="h-5 w-5" />
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        Download as <code>SYLLABUS.md</code>
                    </HoverCardContent>
                </HoverCard>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <button
                            className="shadow-md absolute bottom-12 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-162px]"
                        >
                            <FiCode className="h-5 w-5" />
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        Viewing raw markdown file.
                    </HoverCardContent>
                </HoverCard>
            </nav>
        </div>
    );
}
