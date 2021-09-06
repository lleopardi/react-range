export const getFilter = (path: string) => {
    const api = "https://demo8293904.mockable.io/";
    return fetch(`${api}${path}`).then((response) => response.json());
};

