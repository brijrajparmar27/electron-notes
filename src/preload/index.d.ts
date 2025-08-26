declare global {
  interface Window {
    electron: {
      getNotes: () => Promise<
        Array<
          Pick<
            import('../shared/types/Note').NoteItem,
            'name' | 'title' | 'lastModifiedDate' | 'lastModifiedTime'
          >
        >
      >
      createNote: () => Promise<
        Array<
          Pick<
            import('../shared/types/Note').NoteItem,
            'name' | 'title' | 'lastModifiedDate' | 'lastModifiedTime'
          >
        >
      >
      getNoteContent: (name: string) => Promise<string>
      setNoteContent: (
        name: string,
        content: string
      ) => Promise<
        Pick<
          import('../shared/types/Note').NoteItem,
          'name' | 'title' | 'lastModifiedDate' | 'lastModifiedTime'
        >
      >
    }
  }
}

export {}
