export const dataBusMessagePatterns = {
  auth: {
    register: 'dataBus.auth.register',
    login: 'dataBus.auth.login',
    verify: 'dataBus.auth.verify',
  },
  notes: {
    createNote: 'dataBus.notes.createNote',
    findUserNotes: 'dataBus.notes.findUserNotes',
    findOneNote: 'dataBus.notes.findOneNote',
    updateNote: 'dataBus.notes.updateNote',
    removeNote: 'dataBus.notes.removeNote',
  },
};
