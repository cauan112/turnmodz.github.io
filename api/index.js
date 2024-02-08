var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path');
var querystring = require('querystring');
var request = require('request');
var axios = require('axios');
const reactViews = require('express-react-views');
const https = require('https');
//const jsonFile = require('jsonfile');
// for parsing the body in POST request
var bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const mercadoPago = require('mercadopago');
const { v4 } = require('uuid');
var userFile = fs.readFileSync('users.json');
var users = new Buffer.from(userFile).toString();
var keys = ["Bearer Fs2Y3RWH0u6G1WcaaO6E4S5X"];
require('dotenv/config');

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use(bodyParser.json());

var statusOK = [
	{
		status: 'ok',
		message: 'Bem sucedido'
	}
];



//API POSTS


app.post('/v1/users', function(req, res) {
	if (!req.headers.authorization) {
		return res.send({ error: 'Requer uma autorização' });
	} else {
		if (keys.includes(req.headers.authorization)) {
			var user = req.body.user;
    
      
			var data = fs.readFileSync('users.json');
			var myObject = JSON.parse(data);
			myObject.push(user);
			var newData = JSON.stringify(myObject);
			fs.writeFile('users.json', newData, err => {
				if (err) throw err;
        return res.json(statusOK);
			});

		} else {
			return res.json({ error: 'Autorizacao invalida!!' });
		}
	}

});

app.post('/apikey', function(req, res) {
	if (!req.headers.authorization) {
		return res.send({ error: 'Requer uma autorização' });
	} else {
		if (keys.includes(req.headers.authorization)) {
			var chave = req.body.key;
			keys.push(chave);
		} else {
			return res.json({ error: 'Autorizacao invalida!!' });
		}
	}
	return res.json(statusOK);
});

app.post('/chat', function(req, res) {
	if (!req.headers.authorization) {
		return res.send({ error: 'Requer uma autorização' });
	} else {
		if (keys.includes(req.headers.authorization)) {
			var chat = req.body.dados;
    
      
			var data = fs.readFileSync('chat.json');
			var myObject = JSON.parse(data);
			myObject.push(chat);
			var newData = JSON.stringify(myObject);
			fs.writeFile('chat.json', newData, err => {
				if (err) throw err;
        return res.sendFile(path.resolve('chat.json'));
			});

		} else {
			return res.json({ error: 'Autorizacao invalida!!' });
		}
	}

});
                                                     
//FIM DOS POSTS

//API DE GETS

app.get('/cpf:cpf', function(req, res) {
	if (!req.headers.authorization) {
		return res.json({ error: 'Requer uma autorização' });
	} else {
		if (req.headers.authorization == keys) {
      res.sendFile(path.resolve('testkey.json'));
		} else {
			return res.json({ error: 'Autorizacao invalida!!' });
		}
	}
});

app.get('/chat', function(req, res){
res.render('docs.html')
  
//  res.sendFile(path.resolve('chat.json'));
})

app.post('/textpro', function(req, res) {
	//res.sendFile(path.resolve('docs.html'));


const url = new URL("https://textpro.vercel.app/api");

  
let headers = {
    "Authorization": `TechnoStone`,
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: headers,
})


    .then(response => response.json())
    .then(json => 

   //let obtido = JSON.stringify(obtidoo);
 
      
  fs.writeFile('textpro.json', JSON.parse(JSON.stringify(
`{
	"text": "${req.body.text}",
	"image": "${json.logo}",
  "by": "@turnmodz"
}`)), err => {
				if (err) throw err;
        return res.sendFile(path.resolve('textpro.json'));
			}));

});

app.get('/cnpj:cnpj_id', function(req, res) {


const url = new URL("https://api-publica.speedio.com.br/buscarcnpj?cnpj="+ req.params.cnpj_id);



fetch(url, {
    method: "GET",
})


    .then(response => response.json())
                                               .then(json => 

                                                                                          fs.writeFile('cnpjoto.json', JSON.parse(JSON.stringify(`{
                                                 "text": "$req.body.text",
                                                 "image": "$json.logo",
                                                 "by": "@turnmodz"
                                               }`)), err => {
                                                       if (err) throw err;
                                                       return res.sendFile(path.resolve('cnpjoto.json'));
                                                     }));

    });
      




app.get('/apikey', function(req, res) {
	return res.json(keys);
});

app.get('/api/v1/users', function(req, res) {
	return res.sendFile(path.resolve('users.json'));
});

app.get('/docs', function(req, res) {
	return res.sendFile(path.resolve('docs.html'));
});

app.get('/api/v1/users/id=:id', function(req, res) {
	var user = JSON.parse(users);

	const item = user.find(obj => obj.id === req.params.id);
	if (!item == '') {
		res.json(item);
	} else {
		res.sendFile(path.resolve('notfound.json'));
	}
});

//FIM DOS GETS

app.get('/pay/:product_id', async (req, res) => {
  let id = v4();
  let emailpagador = 'emailPagado@gmail.com';
  let product_id = req.params.product_id;


  var product = database.products.filter(product => product.id == product_id);

  if (product.length == 0) {
    return res.sendStatus(404)
  }

  // Dados para a API
  let dados = {
    items: [
      item = {
        id: id, // id da venda
        title: product[0].name,
        quantity: 1, // quantidade, multiplica o preço unitário
        currency_id: 'BRL',
        unit_price: parseFloat(product[0].price) // preço que o usuário vai pagar
      }
    ],

    payer: { // quem vai pagar
      email:emailpagador
    },
    external_reference: id,
  }


  try {
    // Gera um pagamento
    var pagamento = await mercadoPago.preferences.create(dados)

    // Insere um novo pagamento
    database.payments.push({
      email: emailpagador,
      id_payment: id,
      name: product[0].name,
      price: parseFloat(product[0].price),
      status: 'A pagar'
    })

    // Retorna o checkout para o usuário
    return res.redirect(pagamento.body.init_point);
  } catch(error) {
    return res.send(error.message)
  }
})

app.post('/notify', (req, res) => {
  var id = req.query.id;
  console.log('chegou!')

  // Esperar 20s para o mercado pago cadastrar a venda no db deles.
  setTimeout(() => {
    var filtro = { "order.id": id }

    // Verifica se o pagamento está no banco de dados do mercado pago
    mercadoPago.payment.search({
      qs: filtro
    }).then(data => {
      // Pagamento está no banco de dados
      var payment = data.body.results[0]
      if (payment != undefined) {

        if (payment.status === 'approved') {
          let id_payment = database.payments.findIndex(pay => pay.id_payment == payment.external_reference)
          database.payments[id_payment].status = 'Pago'
        } else {
          console.log('pagamento não aprovado!', payment.status)
        }
      } else {
        console.log('Pagamento não existe!', payment)
      }
    }).catch(error => {
      console.log(error)
    })
  }, 20000) // 20s

  res.send('ok');
})

//NETWORKS

app.listen('3000', function() {
	console.log('API ativada');
});

app.use(function(req, res, next) {
	res.status(404);

	if (req.accepts('json')) {
		res.sendFile(path.resolve('404.json'));
		return;
	}
});

  /* fs.watchFile('index.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log('O arquivo "index.js" foi editado, irei reiniciar...');
process.exit()
}
})*/