/////////////////MURO

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

//let buttonSave = document.getElementById('button-save');
window.wall = {

  save: () => {
    //function safe(){
    //let name = document.getElementById('name').value;
    let mssg = document.getElementById('mssg').value;

    //Agregar datos
    db.collection("users").add({
        //first: name,
        last: mssg

      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        //document.getElementById('name').value = '';
        document.getElementById('mssg').value = '';
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  },

  realTimeData: () => {

    let table = document.getElementById('post');

    

    db.collection("users").onSnapshot((querySnapshot) => {
      table.innerHTML = "";
      let contentTwo= document.getElementById('post-for-active-users');
    contentTwo.innerHTML = 
`<input type="text" id="mssg" placeholder="Mensaje" class="form-control my-3">
<button class="btn btn-link" id="button-save" onclick="window.wall.save()">Publicar</button>`
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().last}`);

        

        table.innerHTML +=  `
            
         <div class="card">
        
            <i class="material-icons">account_circle</i>
      
            <section id = "post">
                
                <p class="comment">${doc.data().last}</p> 

            </section>
      
                <section id ="buttons-wall">
                

                    <button class = "button-icon"><i class="material-icons" id="creating" onclick="window.wall.editingData('${doc.id}','${doc.data().last}')" >create</i></button>
                    <button class = "button-icon"><i class="material-icons" onclick="window.wall.deleteData('${doc.id}')">delete</i></button>
                    <span class="likebtn-wrapper" data-identifier="likeButton1" datatheme="ugreen"></span>

                </section>  
                
        </div>
         
        `
        
      });
    });
  },




  deleteData: (id) => {

    db.collection("users").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document:", error);
    });
  },




  //Editar Datos

  editingData: (id, mssg) => {

    //document.getElementById('name').value = name;
    document.getElementById('mssg').value = mssg;
    let buttonEdit = document.getElementById('button-save');
    buttonEdit.innerHTML = 'Editar';

    buttonEdit.onclick = () => {

      let dataRef = db.collection("users").doc(id);
      // Set the field of id

      //let name = document.getElementById('name').value;
      let email = document.getElementById('mssg').value;

      return dataRef.update({
          //first: name,
          last: email
        })
        .then(function () {
          console.log("Document successfully updated!");
          buttonEdit.innerHTML = 'Guardar';
          //document.getElementById('name').value = '';
          document.getElementById('mssg').value = '';
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

    }

  },

 



};

    //sidenav
    document.addEventListener('DOMContentLoaded', () => {
      var elements = document.querySelectorAll('.slider');
      var instances = M.Slider.init(elements, {

      });
      var elements = document.querySelectorAll('.materialboxed');
      var instances = M.Materialbox.init(elements);

      var elements = document.querySelectorAll('.sidenav');
      var instance = M.Sidenav.init(elements);

    });

  
