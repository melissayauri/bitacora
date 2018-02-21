$(document).ready(function() {
  /* Petición con ajax*/
  let objetoAJAX = $.get('index.html', function() {

  });
  /* se ejecuta cuando hay respuesta correcta de la solicitud en ajax*/
  objetoAJAX.done(function() {

    /* variables generales*/
    /* variable del container de publicaciones*/
    let publications = $('#publications');
    /* modal para publicar el mensaje*/
    $('#message').modal();
    /* evento para publicar el mensaje*/
    $('#postMessage').on('click', postMessage);
    /* función para publicar el mensaje*/
    function postMessage() {
      /* variable para el título*/
      let title = $('#title').val();
      /* variable para el mensaje*/
      let message = $('#post').val();
      /* varibale para la tarjeta del mensaje*/
      let cardMessage = `<div class="row">
      <div class="col s12 l6 offset-l3">
      <div class="card red accent-1 hoverable">
      <div class="card-content black-text">
      <h1 class="card-title white-text title">${title}</h1>
      <p>${ message}</p>
      </div>
      </div>
      </div>
      </div>`;
      /* incorporando la tarjeta*/
      publications.prepend(cardMessage);
      /* limpiando las entradas de la tarjeta de mensaje*/
      $('#title').val('');
      $('#post').val('');
    };
    /* modal para publicar la imagen*/
    $('#imagen').modal();
    /* evento para publicar la imagen*/
    $('#postImg').on('click', postImagen);
    /* función para post*/
    function postImagen() {
      /* variable para el título de la imagen*/
      let titleImg = $('#titleImg').val();
      publications.prepend(
        `<div class="row">
        <div class="col s12 l6 offset-l3">
         <div class="card">
           <div class="card-image">
            <img src="${_location}">
            <span class="card-title black-text">${titleImg}</span>
           </div>
         </div>
      </div>
     </div>`);
      /* Limpiando el ingreso del título y el file*/
      $('#titleImg').val('');
      $('#file-imagens').val('');
    };


    /* modal para publicar video o audio*/
    $('#multimedia').modal();
    /* evento para publicar un elemento multimedia*/
    $('#postMultimedia').on('click', postMedia);
    function postMedia() {
      let titleMedias = $('#titleMedias').val();
      let description = $('#description').val();
      publications.prepend(
        ` <div class="row">
        <div class="col s12 l6 offset-l3">
        <div class="card">
        <div class="card-image red accent-1 ">
        <video class="video-width video-zise" src="${_location}" controls loop></video>
        </div>
        <div class="card-content red accent-1">
        <span class="card-title activator grey-text text-darken-4">${titleMedias}<i class="material-icons right">more_vert</i></span>
        </div>
        <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${titleMedias}<i class="material-icons right">close</i></span>
        <p>${description}</p>
        </div>
        </div>
        </div>
        </div>`);
    };
    /* evento para subir la imagen y*/
    $('#file-imagen, #file-media').on('change', upload);
    function upload() {
      /* permite leer un archivo de tu disco duro local*/
      var reader = new FileReader();
      /* se obtiene el contenido del archivo*/
      reader.onload = function(event) {
        // console.log(event.target.result)
  			_location = event.target.result;
      };
      console.log(this.files);
  		let file = this.files[0];
      /* muestra la imagen*/
      reader.readAsDataURL(file);
    }
    $('#date-event').modal();
    /* verifica si hay error*/
    objetoAJAX.fail(function() {
      alert('verifica de nuevo');
    });
    // hacer algo tanto en error como en éxito
    objetoAJAX.always(function() {
      console.log('esta hecho');
    });
  });
});
