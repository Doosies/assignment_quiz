export const WrongNoteStore = {
  getFromLocalStorage: vi.fn(() => ({
    wrongCounter: {},
    wrongNoteItems: {},
  })),
  set: vi.fn(),
  getWrongNoteItemList: vi.fn(() => []),
  removeWrongNoteByQustion: vi.fn(),
};
