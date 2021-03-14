// Middleware de logged In

const isLogged = (req, res, next) => {
    const logged = true
    if (logged) next()
    else res.send('Debe loguearse')
}

// Se puede agregar una prop al obj exports
exports.isLogged = isLogged