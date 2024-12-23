
async function getProperties(req, res) {
    res.json({ message: "GET properties" });
}

async function getCategories(req, res) {
    res.json({ message: "GET categories" });
}


export {
    getProperties,
    getCategories
}