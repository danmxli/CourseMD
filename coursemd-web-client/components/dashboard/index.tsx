import { useFileStore } from "@/lib/store"
import { Editor } from "@monaco-editor/react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import GooeyMenu from "./menu";

export default function Dashboard() {
    const markdownData = useFileStore((state) => state.markdownData)

    function handleEditorChange(value: any, event: any) {

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center ml-12 mr-12">
            <Card className="w-full">
                <CardHeader>
                    <Editor
                        height="80vh"
                        defaultLanguage="markdown"
                        defaultValue={markdownData}
                        onChange={handleEditorChange}
                    />
                </CardHeader>
            </Card>
            <GooeyMenu />
        </main>
    )
}