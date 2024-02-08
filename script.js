
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";


import { getDatabase, ref, onChildAdded, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoxUpY5MatqsyN_PBy9rujaHoQe4REI0o",
  authDomain: "playplus-app.firebaseapp.com",
  databaseURL: "https://playplus-app-default-rtdb.firebaseio.com",
  projectId: "playplus-app",
  storageBucket: "playplus-app.appspot.com",
  messagingSenderId: "469616481306",
  appId: "1:469616481306:web:a66768caa7481b8a14ada3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

var UsersDB = ref(getDatabase())
var ProjectsDB = ref(getDatabase())
var TutorialsDB = ref(getDatabase())
var Tutorials = ""
var Projects = ""
var showAds = 0
var listView = document.getElementById("list-item")
var select = document.querySelectorAll(".select")
var loadingDetals = document.getElementById("loading-detals")
var ProfileBody = document.getElementById("profile-body")



//Profile
const nameProfile = document.getElementById('name-profile')
const emailProfile = document.getElementById('email-profile')


get(child(ProjectsDB, "Projects")).then((snapshot) => {

  loadingDetals.style.display = "none"

  snapshot.forEach(data => {

    if (data.val().premium == "false") {

      Projects = Projects += "<div class='item' data-childkey='" + data.val().childkey + "' data-size='" + data.val().size + "'data-screen='projetos'><img class='img-apk'  src=" + data.val().icon + " alt=''><h5 class='title-item'>" + data.val().title + "</h5><div class='content-text'><p>" + data.val().description + "</p></div><div class='button-link'><div class='button'>Ver mais</div></div></div>"

    } else {
      Projects = Projects += "<div class='item' data-childkey='" + data.val().childkey + "' data-size='" + data.val().size + "'data-screen='projetos'><img class='img-apk'  src=" + data.val().icon + " alt=''><h5 class='title-item'>" + data.val().title + "</h5><div class='content-text'><p>" + data.val().description + "</p></div><div class='button-link'><div class='button'>Comprar R$" + data.val().price + "</div></div></div>"
    }

  });

  listView.innerHTML = Projects

});

//listView.innerHTML = "<div class='item'><img class='img-apk'  src='https://firebasestorage.googleapis.com/v0/b/playplus-app.appspot.com/o/Premium-PNG-Image.png?alt=media&token=808fa829-6a47-4473-907c-969bb3808d01' alt=''><h5 class='title-item'>INVISTA SEUS LUCROS</h5><div class='content-text'><p>Com apenas R$8,00 você já ganhará R$256,00 após concluir o pagamento, você pode está concorrendo também a uma pop 110i 0 km ou 12 mil no pix.</p></div><div class='button-link'><div class='button'>Comprar R$8,00</div></div></div>"

get(child(TutorialsDB, "Tutorials")).then((snapshot) => {

  loadingDetals.style.display = "none"

  snapshot.forEach(data => {



    Tutorials = Tutorials += "<div class='item' data-childkey='" + data.val().childkey + "' data-size='null'data-screen='tutoriais'><h5 class='title-item'>" + data.val().title + "</h5><div class='content-text'><p>" + data.val().description + "</p></div><div class='button-link'><img class='img-apk'  src='./icon_tutorials_logo.png' alt=''><div class='button'>Ver mais</div></div></div>"


  });



  var item = document.querySelectorAll(".item")
  item.forEach((element) => {
    element.addEventListener("click", () => {


      localStorage.setItem("childkey", element.dataset.childkey)

      localStorage.setItem("size", element.dataset.size)

      localStorage.setItem("screen", element.dataset.screen)
      window.location.href = "../detals"



    })

  })

});




select.forEach((element) => {

  element.addEventListener("click", () => {

    if (element.innerHTML == "Projetos") {

      listView.innerHTML = Projects
    }

    if (element.innerHTML == "Tutoriais") {

      listView.innerHTML = Tutorials
    }

    get(child(ProjectsDB, "Projects")).then((snapshot) => {



      var item = document.querySelectorAll(".item")
      item.forEach((element) => {
        element.addEventListener("click", () => {

          localStorage.setItem("childkey", element.dataset.childkey)

          localStorage.setItem("size", element.dataset.size)

          localStorage.setItem("value", element.dataset.value)

          localStorage.setItem("screen", element.dataset.screen)
          window.location.href = "./detals"


        })

      })

    });

  })
})

getDetals(localStorage.screen)


function getDetals(getData) {

  get(child(UsersDB, "users/" + localStorage.getItem("uid"))).then((snapshot) => {

    var data = snapshot.val()


     if(window.location.href == "https://turn-modz.web.app/profile/"){

    ProfileBody.style.display = "block"

  }

    document.getElementById('img-profile').src = data.image;

    nameProfile.innerText = ("Olá, "+ data.name)
    emailProfile.innerText = data.email


  });

  window.profile = function () {

    window.location.href = "/profile"

  }

  if(window.location.href == "https://turn-modz.web.app/profile/"){

    ProfileBody.style.display = "none"

  }


}

window.logout = function() {
  signOut(auth)
    .then(function () {
      window.location.href = "/login";
    })
    .catch(function (err) {
      console.log(err);
    });
}