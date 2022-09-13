const localStorage = window.localStorage;

const setStorageItem = (action: STORAGE_ACTION, data: string | object) =>
  localStorage.setItem(
    action,
    typeof data === "string" ? data : JSON.stringify(data),
  );

const getStorageItem = (action: STORAGE_ACTION) => {
  const stringifyData = localStorage.getItem(action);

  if (!stringifyData) {
    return null;
  }

  return JSON.parse(stringifyData);
};

const STORAGE_ACTION = {
  BOOK_MARKED_REPOSITORY: "BOOK_MARKED_REPOSITORY",
} as const;

type STORAGE_ACTION = typeof STORAGE_ACTION[keyof typeof STORAGE_ACTION];

export { setStorageItem, getStorageItem };
