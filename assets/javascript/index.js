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
  map.addListener("dblclick", event =>{
    adicionarMarcador(event)
  })

 

}

function salvar(){
    let input = document.getElementById('nome').value;
    let obj = {
      nomeLocal: input,
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
    let modal = document.querySelector('.container')
      modal.classList.remove('mostrar')
}

function closeModal(button){
  event.preventDefault()
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

function adicionarMarcador(event){
  newMarker = new google.maps.Marker({
    position: event.latLng,
    map: map,
  })
}




