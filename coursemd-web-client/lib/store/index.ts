import { create } from 'zustand'

export type TFilePhase = 'new' | 'uploading' | 'finished'

type FileState = {
    filePhase: TFilePhase
    markdownData: string | undefined
}

type FileAction = {
    updateFilePhase: (phase: FileState['filePhase']) => void
    updateMarkdownData: (phase: FileState['markdownData']) => void
}

export const useFileStore = create<FileState & FileAction>((set) => ({
    filePhase: 'new',
    markdownData: undefined,
    updateFilePhase: (filePhase) => set(() => ({ filePhase: filePhase })),
    updateMarkdownData: (markdownData) => set(() => ({ markdownData: markdownData }))
}))