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

  //Agregar documentos

  function guardar(){
      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var fechar = document.getElementById('fecha').value;

      //Coordenadas del usuario

      function localizacion(posicion){
        var latitude = posicion.coords.latitude;
        var longitude = posicion.coords.longitude;

        db.collection("users").add({
            nombre: nombre,
            apellido: apellido,
            fecha: fechar,
            Latitud: latitude,
            Longitud: longitude
        })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('nombre').value=''
                document.getElementById('apellido').value=''
                document.getElementById('fecha').value=''
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
        });

      }//Aqui termina el metodo para las coordenadas
      function error(){
        output.innerHTML("<p> No se pudo obtener su ubicacion </p> ")
    }

    navigator.geolocation.getCurrentPosition(localizacion,error);

        
    
     
  }

  //Leer documentos

  var tabla = document.getElementById('tabla');
//onSnapshot() sirve para escuchar los resultados de una consulta a diferencia del
// get().then que no lo realiza
  db.collection("users").onSnapshot((querySnapshot) => {

    //Hay que limpiar la tabla para que no sobrescriba los datos cada vez que se agrege
    tabla.innerHTML = '';

    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        // comillas especiales ``
        tabla.innerHTML += `
        <tr>
            <th scope="row">`+doc.id+`</th>
            <td>`+doc.data().nombre+`</td>
            <td>`+doc.data().apellido+`</td>
            <td>`+doc.data().fecha+`</td>
            <td>`+doc.data().Latitud+`</td>
            <td>`+doc.data().Longitud+`</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')" >Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="Editar('${doc.id}',
            '${doc.data().nombre}','${doc.data().apellido}','${doc.data().fecha}')" >Modificar</button></td>
          </tr>
    `
    //Se puede de las maneras para mostrar los campos en la tabla
    //<tr>
      //      <th scope="row">${doc.id}</th>
      //      <td>${doc.data().nombre}</td>
      //      <td>${doc.data().apellido}</td>
       //     <td>${doc.data().fecha}</td>
      //    </tr>

    });
});


//Borrar documentos

function eliminar(id){

    var opcion = confirm("Desea eliminar el usuario");

    if(opcion==true){
        db.collection("users").doc(id).delete().then(function() {
            alert("Usuario eliminado");
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            alert("Error al eliminar usuario")
            console.error("Error removing document: ", error);
        });
    }else{
        nombre.focus();
    }
}

//Editar documentos

function Editar(Id,nombre,apellido,fecha){

    document.getElementById('nombre').value=nombre;
    document.getElementById('apellido').value=apellido;
    document.getElementById('fecha').value=fecha;

    var boton = document.getElementById('botonGM');
    boton.innerHTML='Editar';
    boton.classList.add('btn-warning');

    boton.onclick=function(){

        var washingtonRef = db.collection("users").doc(Id);

        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var fechar = document.getElementById('fecha').value;

        return washingtonRef.update({
            nombre: nombre,
            apellido: apellido,
            fecha: fechar
        })
        .then(function() {
            boton.classList.add('btn-info');
            boton.classList.remove('btn-warning');
            boton.innerHTML='Guardar';
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('fecha').value='';

            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }


}

