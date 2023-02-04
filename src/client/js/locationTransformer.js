async function transformLocation(data = {}) {
    const response = await fetch('http://localhost:8080/transformLocation', {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    });
    try {
        const geoData = await response.json();
        return geoData;
    } catch (error) {
        console.log("Error transforming location: ", error);
    }
};

export { transformLocation }