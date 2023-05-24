function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }
  
  var theStream;
  
  function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('API não suportada pelo navegador.');
      return;
    }
    
    var constraints = {
      video: true
    };
  
    getUserMedia(constraints, function (stream) {
     var mediaControl = document.querySelector('video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      theStream = stream;
    }, function (err) {
      alert('Error: ' + err);
    });
  }
  
  function takePhoto() {
    if (!('ImageCapture' in window)) {
      alert('Captura de imagem não disponível');
      return;
    }
    
    if (!theStream) {
      alert('Primeiro Habilite a câmera!');
      return;
    }
    
    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
  
    theImageCapturer.takePhoto()
      .then(blob => {
        var theImageTag = document.getElementById("imageTag");
        theImageTag.src = URL.createObjectURL(blob);
      })
      .catch(err => alert('Error: ' + err));
    }