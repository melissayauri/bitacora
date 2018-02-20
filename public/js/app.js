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
