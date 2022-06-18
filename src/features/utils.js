export const postData = async (url = "", data = {}) => {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        cache: "default",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const getData = async (url = "") => {
    return fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "default",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
