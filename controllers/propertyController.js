
function getSeeMyProperties(req, res) {
    res.render('property/admin', {
        page: 'Mis Propiedades'
    });
}

export {
    getSeeMyProperties
}