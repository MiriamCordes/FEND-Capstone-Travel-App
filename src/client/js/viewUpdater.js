async function updateView (){
    const request = await fetch('http://localhost:8080/travelResult')
    try {
        const data = await request.json();
        console.log(data);
        // TODO update view
    } catch(error) {
        console.log("error", error);
    }
};

export { updateView }