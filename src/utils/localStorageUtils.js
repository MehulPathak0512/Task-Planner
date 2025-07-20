
export const saveToLocalStorage = (data) => {
  localStorage.setItem('kanbanData', JSON.stringify(data));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem('kanbanData');
  return data ? JSON.parse(data) : null;
};
