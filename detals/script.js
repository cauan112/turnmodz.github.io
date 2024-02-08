
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

  import { getDatabase,ref,onChildAdded,get,child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
  
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

   var ProjectsDB = ref(getDatabase());
   var TutorialsDB = ref(getDatabase());
   var CodelistDB = ref(getDatabase());
   
    
  

var download = document.getElementsByClassName("button-download")[0]

var install = document.getElementsByClassName("button-install")[0]

var codeList = document.getElementById("code-list")
var projectDetals = document.getElementById("project-detals")
var tutorialsDetals = document.getElementById("tutorials-detals")
var loadingDetals = document.getElementById("loading-detals")

var Pagamentos = document.getElementById("pagamentos")

getDetals(localStorage.screen)
 

var url;
var code ;
var payment;
var showAds = 0
var link ;



function getDetals(getData) {

  

  if(getData == "projetos"){

    
 get(child(ProjectsDB,"Projects/"+localStorage.getItem("childkey"))).then((snapshot)=>{
   
  Pagamentos.style.display = "none"
  loadingDetals.style.display ="none"
  projectDetals.style.display = "block"

  if(snapshot.val().premium == "true"){
    download.innerText = "Comprar R$"+snapshot.val().price
    link = snapshot.val().link
    payment = true
  }else{
    payment = false
  }
    
var title = document.getElementsByClassName("title")[0]

  var description = document.getElementsByClassName("description")[0]

  var resources = document.getElementsByClassName("resources")[0]

  var date = document.getElementsByClassName("date")[0]


  title.innerText = snapshot.val().title
  description.innerText = snapshot.val().description
  resources.innerText = snapshot.val().resources
  date.innerText = "Publicado em "+snapshot.val().data
  url = snapshot.val().url


  });

}else if(getData == "tutoriais"){

  get(child(TutorialsDB,"Tutorials/"+localStorage.getItem("childkey"))).then((snapshot)=>{

    loadingDetals.style.display ="none"
    tutorialsDetals.style.display ="block"
  
    var video = document.getElementById("video")

    var title = document.getElementsByClassName("title")[1]
  
    var description = document.getElementsByClassName("description")[1]

    var date = document.getElementsByClassName("date")[1]
  
   
    title.innerText = snapshot.val().title
    description.innerText = snapshot.val().description
    date.innerText = "Publicado em "+snapshot.val().data
    video.innerHTML = snapshot.val().video
  
   
    });


  }



}
get(child(ProjectsDB,"Projects/"+localStorage.getItem("childkey"))).then((snapshot)=>{

  download.addEventListener("click",()=>{

 var status = document.getElementsByClassName("status")[0]

 var qrcode = document.getElementsByClassName("qr-code")[0]

  var code64 = document.getElementById("code-qr")

    
    if(payment){
    projectDetals.style.display = "none"
    loadingDetals.style.display ="block"

    let preco = parseFloat(snapshot.val().priceSite);
 
      


    const bodi = {
      'payment_method_id': "pix",
      'transaction_amount': preco,
      'description': 'Pagamento de Projeto',
      'payer': {
        'first_name': 'Jhonatan',
        'last_name': 'Silva',
        'email': 'cauanbrito47@gmail.com'
      }
    }



   const urll = new URL("https://api.mercadopago.com/v1/payments");

    let headers = {
      "Content-Type": "applicatin/json; charset=utf-8",
      "Authorization": "Bearer APP_USR-7354109160977637-061107-ceed0b8d9ecd22ab102f67f071b7c90e-1266945523",
      
    }

    fetch(urll, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodi)
    })
      .then(response => response.json())
      .then(json => {
      
        Pagamentos.style.display = "block"
        loadingDetals.style.display ="none"

     var baseQR64 = json.point_of_interaction.transaction_data.qr_code_base64;        code64.setAttribute('src', "data:image/jpg;base64," + baseQR64);

        qrcode.innerText = json.point_of_interaction.transaction_data.qr_code;

 var viewCode = document.querySelectorAll("textarea")
 viewCode.forEach((element)=>{
element.addEventListener("click",()=>{

var CodeQRCODE = (json.point_of_interaction.transaction_data.qr_code);

  CodeQRCODE.select();
  CodeQRCODE.setSelectionRange(0, 99999); // For mobile devices


  navigator.clipboard.writeText(CodeQRCODE);
        alert("Codigo copiado com sucesso!!")
})
 })
        
        if(json.status == "pending"){
          status.innerText = "O pagamento está pendente"
        }
        
        if(json.status == "approved"){
          status.innerText = "Pagamento Aprovado"
          window.location.href = "/aprovado"
        }

        VerifyPayment();

        function VerifyPayment() {

         const urli = new URL("https://api.mercadopago.com/v1/payments/"+json.id);

          let header = {
            "Content-Type": "applicatin/json; charset=utf-8",
            "Authorization": "Bearer APP_USR-7354109160977637-061107-ceed0b8d9ecd22ab102f67f071b7c90e-1266945523"
          }

          fetch(urli, {
            method: "GET",
            headers: header
          })
            .then(response => response.json())
            .then(json => {
              
              if(json.status == "pending"){
                status.innerText = "O pagamento está pendente"
              }

              if(json.status == "approved"){
                status.innerText = "Pagamento Aprovado"
                window.location.href = "/aprovado"
              }
            })

          setTimeout(VerifyPayment, 1000)

        }
        
      })

    

     // window.location.href = '/payment'
    }else{
    
    showAds = Math.floor(Math.random()*2)

    if(showAds == 0){

      window.location.href = url
      
    }else{

   window.location.href = "https://outrightsham.com/ux8f4gwr7?key=905a505a80e4ce30dc6eeb6ec127ea55"

    }}})
});

  
 
  
  const CodesDB = ref(getDatabase(),"Codes");
  onChildAdded(CodesDB, (data) => {
if(data.val().childkey == localStorage.getItem("childkey")){


  code = code += "<div data-code='"+data.val().description+"' class='code'><img class='icon-code' src='./icon_code_grey.png'><p>"+data.val().title+"</p><img class='icon-copy' src='../icon_copy_grey.png'></div>"
  
  
  
}


 
  codeList.innerHTML = code
  


  });

  get(child(CodelistDB,"Codes")).then((snapshot)=>{
    var viewCode = document.querySelectorAll(".code")
    viewCode.forEach((element)=>{
element.addEventListener("click",()=>{
  
  
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

alert("Codigo copiado com sucesso!!")

 
})
      
    })
  })