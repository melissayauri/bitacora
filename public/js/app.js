$(document).ready(function() {
  /* Petición con ajax*/
  let objetoAJAX = $.get('index.html', function() {

  });
  /* se ejecuta cuando hay respuesta correcta de la solicitud en ajax*/
  objetoAJAX.done(function() {
    $('.splash').delay(4000).fadeOut('slow');
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
      if (title === '' && message === '') {
        alert('no ingrese campos vacíos');
      } else {
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
        $('.empty').val('');
      };
    };

    /* modal para publicar la imagen*/
    $('#imagen').modal();
    /* evento para publicar la imagen*/
    $('#postImg').on('click', postImagen);
    /* función para post*/
    function postImagen() {
      /* variable para el título de la imagen*/
      let titleImg = $('#titleImg').val();
      /* variable para crear la tarjeta de imagen*/
      let cardImagen = `<div class="row">
      <div class="col s12 l6 offset-l3">
      <div class="card">
      <div class="card-image">
      <img src="${_location}" class="" >
      <span class="card-title black-text ">${titleImg}</span>
      </div>
      </div>
      </div>
      </div>`;
      /*  validando que no se ingrese un campo vacio en el tiulo ni en la imagen*/
      let fileInput = document.getElementById('file-imagen');
      let filePath = fileInput.value;
      let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      if (!allowedExtensions.exec(filePath) || titleImg === '') {
        alert('Porfavor no ingrese campos vacíos');
        fileInput.value = '';
        return false;
      } else {
        /* incorporando la tarjeta*/
        publications.prepend(cardImagen);
        /* Limpiando el ingreso del título y el file*/
        $('.empty').val('');
      };
    }

    /* modal para publicar video o audio*/
    $('#multimedia').modal();
    /* evento para publicar un elemento multimedia*/
    $('#postMultimedia').on('click', postMedia);
    /* función para publicar los elemetos multimedia*/
    function postMedia() {
      /* variable para el título del elemento multimedia*/
      let titleMedias = $('#titleMedias').val();
      /* descripción*/
      let description = $('#description').val();
      /* variable para crear la tarjeta multimedia*/
      let cardMedia = ` <div class="row">
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
      </div>`;
      /* validando que los archivos sean solo tengan formatos de video o audio*/
      let fileInputs = document.getElementById('file-media');
      let filePaths = fileInputs.value;
      let allowedExtensionss = /(.mp3|.midi|.wav|.WMA|.mp4|.webM|.ogg)$/i;
      if (!allowedExtensionss.exec(filePaths) || titleMedias === '' || description === '') {
        alert('Porfavor ingrese solo videos o audio, no se permite campos vacíos');
        fileInputs.value = '';
        return false;
      } else {
        /* incorporando la tarjeta*/
        publications.prepend(cardMedia);
        $('.empty').val('');
      };
    }
    /* evento para subir la imagen y*/
    $('#file-imagen, #file-media').on('change', upload);
    function upload() {
      /* permite leer un archivo de tu disco duro local*/
      let reader = new FileReader();
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
    /* modal para crear un evento-día*/
    $('#date-event').modal();
    /* incorporando el dia según el calendario*/
    $('.datepicker').pickadate({
      /* Creates a dropdown to control month*/
      selectMonths: true,
      /* Creates a dropdown of 15 years to control year,*/
      selectYears: 15,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      /* Close upon selecting a date,*/
      closeOnSelect: false
    });
    $('#postEvent').on('click', postEvents);
    function postEvents() {
      let titleEvent = $('#titleEvent').val();
      let date = $('#date').val();
      let cardEvent = `<div class="row">
      <div class="col s12 l6 offset-l3">
      <div class="card red accent-1">
      <div class="card-content white-text">
      <span class="card-title">${titleEvent}</span>
      <p>${date}</p>
      <div class="map" id="map">
      </div>
      </div>
      </div>
      </div>
      </div>`;
      publications.prepend(cardEvent);
      initMap();
      $('.empty').val('');
    };
    /* verifica si hay error*/
    objetoAJAX.fail(function() {
      alert('verifica de nuevo');
    });
    // hacer algo tanto en error como en éxito
    objetoAJAX.always(function() {
      console.log('okey');
    });
  });
});
