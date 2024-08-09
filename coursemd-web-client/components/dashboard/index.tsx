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
import { useState } from "react";

export default function Dashboard() {
    const markdownData = useFileStore((state) => state.markdownData)
    const updateMarkdownData = useFileStore((state) => state.updateMarkdownData)

    function handleEditorChange(value: string | undefined, event: any) {
        updateMarkdownData(value)
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