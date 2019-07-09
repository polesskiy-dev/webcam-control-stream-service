export const saveCredentials = (credentials) => {
  localStorage.setItem('credentials', JSON.stringify(credentials))
};

export const getCredentials = () => {
    return JSON.parse(localStorage.getItem('credentials'));
};

export const hasCredentials = () => {
    try {
        const credentials = getCredentials();

        if (credentials) return true;
    } catch (e) {
    }

    return false;
};
