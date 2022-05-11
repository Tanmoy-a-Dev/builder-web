const portNumber = process.env.PORT || 5000;

const crossConfig = {
    port: portNumber,
    backendLink: `http://localhost:${portNumber}`
}

module.exports = crossConfig