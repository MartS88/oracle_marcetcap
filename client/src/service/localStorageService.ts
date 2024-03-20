export const localStorageService = {
  saveCredentials: (credentials: any) => {
    const serializedCredentials = JSON.stringify(credentials);
    localStorage.setItem('credentials', serializedCredentials);
  },

  getCredentials: () => {
    const storedCredentials = localStorage.getItem('credentials');
    return storedCredentials ? JSON.parse(storedCredentials) : null;
  },

  clearCredentials: () => {
    localStorage.clear();
  },
};
