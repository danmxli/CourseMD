import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GiFiles } from "react-icons/gi";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center`}
    >
      <Dialog>
        <Card className="max-w-screen-sm">
          <CardHeader>
            <CardTitle>CourseMD</CardTitle>
            <CardDescription>Convert university course syllabi into markdown format.</CardDescription>
          </CardHeader>
          <CardContent>
            <GiFiles className="size-12" />
          </CardContent>
          <CardFooter className="gap-3">
            <Button>
              Upload your file
            </Button>
            <DialogTrigger asChild>
              <Button variant="secondary">
                Read me
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note from the author</DialogTitle>
            <DialogDescription>
              <p>
                Files are stored locally, are are not sent to any third party database. Your data is not used to train AI models from OpenAI, Anthropic, etc.
              </p>
              <br />
              <p>Credits: <a href="https://mupdf.com/" target="_blank" className="underline">MuPDF</a> for their open-source services.</p>
              <br />
              <p>
                I intend to make this a free tool that people can use at their convenience. No API metering and billing.
              </p>
              <br />
              <p>You can check out the <a href="https://github.com/danmxli/CourseMD" target="_blank" className="underline">source code here.</a></p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
