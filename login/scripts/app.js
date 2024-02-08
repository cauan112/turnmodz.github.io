import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBoxUpY5MatqsyN_PBy9rujaHoQe4REI0o",
  authDomain: "playplus-app.firebaseapp.com",
  databaseURL: "https://playplus-app-default-rtdb.firebaseio.com",
  projectId: "playplus-app",
  storageBucket: "playplus-app.appspot.com",
  messagingSenderId: "469616481306",
  appId: "1:469616481306:web:a66768caa7481b8a14ada3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
var UsersDB = database.ref()
var nome ;

window.login = function() {
  // Get all our input fields
  var email = document.getElementById('email').value
  var password = document.getElementById('senha').value
  const elemento = document.getElementById('nameUser');

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    var starCountRef = firebase.database().ref('users/' + user.uid);
starCountRef.on('value', (snapshot) => {
 

  localStorage.setItem("uid",user.uid)
      
  localStorage.setItem("name",snapshot.val().name)

  localStorage.setItem("email",snapshot.val().email)
  window.location.href = "/home"


});
      
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })


  }

// Set up our register function
function register () {
  // Get all our input fields
  var email = document.getElementById('email').value
  var password = document.getElementById('senha').value
  var full_name = document.getElementById('name').value
  var img = "https://wallpapercave.com/wp/wp8846929.jpg";
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      password : password,
      image: img,
      name : full_name,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

      var obj = {
        email: email,
        password: password,
      };
    
      signInWithEmailAndPassword(auth, obj.email, obj.password)
      .then(function (success) {
        var aaaa =  (success.user.uid);
        localStorage.setItem("uid",aaaa)
        console.log(aaaa)
        
        
        
        window.location.href = "/home";
       // localStorage.setItem(success,user,uid)
        
      })
      .catch(function (err) {
        alert("login error"+err);
      });
    
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}