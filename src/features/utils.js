export const postData = async function(url = "", data = {}) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        // cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        // referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });

    // return response.json();
}
