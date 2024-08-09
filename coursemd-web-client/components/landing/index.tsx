import { useFileStore } from "@/lib/store";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GiFiles } from "react-icons/gi";
import { FiLoader } from "react-icons/fi";

export default function LandingPrompt() {
    const filePhase = useFileStore((state) => state.filePhase);
    const updateFilePhase = useFileStore((state) => state.updateFilePhase);
    const updateMarkdownData = useFileStore((state) => state.updateMarkdownData);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    }

    async function handleFileSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append("file_binary", selectedFile);

        try {
            updateFilePhase("uploading")
            const response = await fetch(`http://${process.env.NEXT_PUBLIC_SERVICE_DOMAIN}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload file");
            }
            const data = await response.json();
            updateMarkdownData(data.markdown)

            console.log("File uploaded successfully");
            updateFilePhase("finished")
        } catch (error) {
            console.error("Error uploading file:", error);
            updateFilePhase("new")
        }
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center`}
        >
            <Dialog>
                <Card className="w-fit sm:w-96">
                    <CardHeader>
                        <CardTitle>CourseMD</CardTitle>
                        <CardDescription>Convert university course syllabi into markdown format.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DialogTrigger className="flex flex-row items-center gap-3">
                            <GiFiles className="size-16" />
                            <code>README.md</code>
                        </DialogTrigger>
                    </CardContent>
                    <CardFooter>
                        {filePhase === "uploading" ? (
                            <Button disabled={true}>
                                <FiLoader className="mr-2 h-4 w-4 animate-spin"/>Processing file
                            </Button>
                        ) : (
                            <form className="flex flex-row gap-3" onSubmit={handleFileSubmit}>
                                <Input id="fileInput" type="file" onChange={handleFileChange} />
                                <Button type="submit" disabled={!selectedFile}>
                                    Submit
                                </Button>
                            </form>
                        )}
                    </CardFooter>
                </Card>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Note from the author</DialogTitle>
                        <DialogDescription>
                            Files are stored locally, are not sent to any third party database. Your data is not used to train AI models from OpenAI, Anthropic, etc.
                            <br /><br />
                            Credits: <a href="https://mupdf.com/" target="_blank" className="underline">MuPDF</a> for their open-source services.
                            <br /><br />
                            I intend to make this a free tool that people can use at their convenience. No API metering and billing.
                            <br /><br />
                            You can check out the <a href="https://github.com/danmxli/CourseMD" target="_blank" className="underline">source code here.</a>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </main>
    );
}