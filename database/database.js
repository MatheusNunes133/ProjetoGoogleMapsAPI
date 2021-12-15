const Client = require('pg').Client
const cliente = new Client({
    user:'postgres',
    password: 'postgres',
    host: '172.18.0.2',
    database:'GoogleMaps',
    port: 5432
})


async function addPonto(req, res){
    const {nomeLocal, lat, lng} = req.body;
    cliente.connect().then(()=> console.log('cliente conectado'))
        console.log(lat, lng)
        const query = `insert into ponto (nome, localizacao) values('${nomeLocal}', 'POINT(${lat} ${lng})')`;

        cliente.query(query, (error, results)=>{
            if(error){
                res.status(400).send(error)
                console.log(error)
                return
            }

            res.status(200).send('inserido')
        })
    
}


module.exports = {
    addPonto
};