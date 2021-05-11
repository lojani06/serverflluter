const {io}= require('../index');
const Band = require('../models/Band');
const Bands = require('../models/bands');

const bands = new Bands();



bands.addBand(new Band('salsa'));
bands.addBand(new Band('regueton latino'));
bands.addBand(new Band('exitos'));
bands.addBand(new Band('vamos que vamos'));
bands.addBand(new Band('estamos constantes'));

console.log(bands);

//mensaje
io.on('connection', client => {
    console.log('cliente conectado');
    client.on('disconnect', () => { 
        console.log('cliente desconetado');
    });

    client.emit('active-bands',bands.getBans());


    // client.on('mensaje',(data)=>{
    //    console.log(data)
    //    io.emit('mensaje',{admin:'nueva reunion'})
    // });


    // client.on('emitir-mensaje',(payload)=>{
    //     io.emit('nuevo-mensaje',payload);
    // })

    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBans());
    });

    client.on('add-band',(payload)=>{
        const newBand= new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBans());
    });

    client.on('delete-band',(payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBans());
    });
  });
