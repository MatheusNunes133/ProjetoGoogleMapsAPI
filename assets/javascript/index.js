let map;
let centerMarker;
let marker;
let newMarker;

function initMap() {
  centerMarker = new google.maps.LatLng(-6.892216009370435, -38.55855970419098 )
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerMarker,
    zoom: 14,
    mapTypeId: 'hybrid'
  });


  /*map.addListener("click", (event) => {
    adicionarMarcador(event);
  });*/

  marker = new google.maps.Marker({
    position: centerMarker,
    map:map,
    draggable: true,
    animation: google.maps.Animation.BOUNCE
  });


  map.addListener("click", event =>{
    alterarMarcador(event);
    insertValues();
  })
  
  getPontos()
}


function getPontos(){
    fetch('http://localhost:3000/getPontos')
    .then((res)=>{
      return res.json()
    }).then((response)=>{
        console.log(response)
        for(let i=0; i<response.length;i++){
          let pontosCriados = new google.maps.LatLng(response[i].lat, response[i].lng)
              marker = new google.maps.Marker({
                position: pontosCriados,
                map:map,
                draggable: true,
                animation: google.maps.Animation.BOUNCE
              });
        }
    })
}

function salvar(){
    let input = document.getElementById('nome').value;
    let obj = {
      nomeLocal: input,
      desc: document.querySelector('textarea').value,
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng()
    }

    fetch("http://localhost:3000/pontos", {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    }).then((response =>{alert('inserido')}))
    .catch(error =>{alert('Falha ao salvar' + error)})

      input.value = ''
    let textarea = document.querySelector('textarea').value
      textarea.value = ''
    let modal = document.querySelector('.container')
      modal.classList.remove('mostrar')
      getPontos()
}

function closeModal(button){
  event.preventDefault()
  let input = document.getElementById('nome').value;
    input.value = ' '
  let textarea = document.querySelector('textarea').value
    textarea.value = ' '
  let modal = document.querySelector('.container')
      modal.classList.remove('mostrar')
}

function insertValues(){
  let div = document.querySelector('.container')
    div.classList.add('mostrar')
}

function alterarMarcador(event){
  marker.setPosition(event.latLng)
}





