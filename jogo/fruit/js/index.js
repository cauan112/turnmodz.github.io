const api = axios.create({
    baseURL: '/api',
    timeout: 90000,
    headers: { 'Access-Control-Allow-Origin': '*' }
});

$(".logout").click(function(e){
    e.preventDefault()

    api.post("/logout.php", {}).then(res => {
        const { data } = res
        console.log(data)
        if (data.error) {
            error(data.error)
        } else {
            localStorage.clear();
            window.location.href = '/';
        }
    })
});

if (document.getElementById("logout"))
    document.getElementById("logout").addEventListener("click", e => {
        console.log("Logout")
        e.preventDefault()

        api.post("/logout.php", {}).then(res => {
            const { data } = res
            console.log(data)
            if (data.error) {
                error(data.error)
            } else {
                localStorage.clear();
                window.location.href = '/';
            }
        })
    })


const error = (err) => Swal.fire({
    title: 'Erro!',
    text: err,
    icon: 'error',
    confirmButtonText: 'Ok'
})

const success = (err) => Swal.fire({
    title: 'Sucesso!',
    text: err,
    icon: 'success',
    confirmButtonText: 'Ok'
})

const openModal = id => {
    document.getElementById(id).classList.toggle("active");
}

// class ToggleActive {
//     constructor(id) {
//         document.getElementById("open-" + id).addEventListener("click", function (event) {
//             event.stopPropagation();
//             document.body.style.overflow = "hidden"
//             document.getElementById(id).classList.toggle("active");
//         });

//         document.getElementById("close-" + id).addEventListener("click", function (event) {
//             event.stopPropagation();
//             document.body.style.overflow = "auto"
//             document.getElementById(id).classList.toggle("active");
//         });
//     }
// }

// class ToPage {
//     constructor(id) {
//         document.querySelector("#to-" + id).addEventListener('click', () => {
//             document.querySelectorAll("section").forEach(e => {
//                 e.classList.add("hidden");
//             })
//             document.querySelector("section#" + id).classList.remove("hidden");
//             document.body.style.overflow = "auto"
//             document.getElementById("menu").classList.toggle("active");

//             const targetId = "header";
//             const targetElement = document.querySelector(targetId);
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//         });
//     }
// }

// document.querySelector("#to-home").addEventListener('click', () => {
//     document.querySelectorAll("section").forEach(e => {
//         e.classList.remove("hidden");
//     });
//     document.querySelectorAll("section.page").forEach(e => {
//         e.classList.add("hidden");
//     });


//     document.body.style.overflow = "auto"
//     document.getElementById("menu").classList.toggle("active");

//     const targetId = "header";
//     const targetElement = document.querySelector(targetId);
//     targetElement.scrollIntoView({ behavior: 'smooth' });
// });

// document.getElementById("facalogin").addEventListener("click", function () {
//     document.body.style.overflow = "hidden"
//     document.getElementById("signup").classList.toggle("active");
//     document.getElementById("signin").classList.toggle("active");
// });

// if (document.getElementById("open-forgot-password"))
//     document.getElementById("open-forgot-password").addEventListener("click", function () {
//         document.body.style.overflow = "hidden"
//         document.getElementById("signup").classList.remove("active");
//         document.getElementById("signin").classList.remove("active");
//     });

const telefoneInput = document.getElementById('tel');
const telefoneMask = IMask(telefoneInput, {
    mask: '(00) 0 0000-0000'
});


// new ToggleActive("menu");
// try {
//     new ToggleActive("signup");
//     new ToggleActive("forgot-password");
//     new ToggleActive("signin");
// }
// catch (ex) {
//     new ToggleActive("wallet");
//     new ToggleActive("wallet-saque");
//     new ToggleActive("stake");
//     new ToggleActive("stake-2");
// }


// new ToPage("faq");

// document.querySelectorAll("section").forEach(e=>{
//     e.classList.add("hidden");
// })
// document.querySelector("section#faq").classList.remove("hidden");

document.querySelector("#to-games").addEventListener('click', (event) => {
    document.querySelectorAll("section").forEach(e => {
        e.classList.remove("hidden");
    });
    document.querySelectorAll("section.page").forEach(e => {
        e.classList.add("hidden");
    });

    document.body.style.overflow = "auto"
    document.getElementById("menu").classList.toggle("active");
    const targetId = "#mais-jogados";
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelector("#to-winners").addEventListener('click', (event) => {
//     document.querySelectorAll("section").forEach(e => {
//         e.classList.remove("hidden");
//     });
//     document.querySelectorAll("section.page").forEach(e => {
//         e.classList.add("hidden");
//     });
//
//     document.body.style.overflow = "auto"
//     document.getElementById("menu").classList.toggle("active");
//     const targetId = "#winners";
//     const targetElement = document.querySelector(targetId);
//     targetElement.scrollIntoView({ behavior: 'smooth' });
// });

function outClick(event) {
    const modalContent = this.querySelector('.modal-content');

    if (!modalContent.contains(event.target)) {
        document.body.style.overflow = "auto"
        this.classList.toggle("active");
    }
}

// document.querySelectorAll(".modal").forEach(modal => {
//     modal.addEventListener('click', outClick);
// })

// function outClickMenu(event) {
//     const menu = this.querySelector('#menu');

//     if (!menu.contains(event.target)) {
//         document.body.style.overflow = "auto"
//         menu.classList.remove("active");
//     }
// }

// document.addEventListener('click', outClickMenu);





document.getElementById("signup-form").addEventListener("submit", e => {
    e.preventDefault()
    var formData = new FormData(e.target)

    api.post("/register.php", formData).then(res => {
        const { data } = res
        console.log(data)
        if (data.error) {
            error(data.error)
        } else if (data.success) {
            api.post("/auth.php", formData).then(res => {
                console.log(res)
                localStorage.clear();
                localStorage.setItem("token", res.data.token)
                window.location.href = "/?cmd=dp";
            });
        }
    })
})

function useFreeBet(id) {
    var formData = new FormData();

    formData.append('id', id);

    api.post("/freebet.php", {id: id}).then(res => {
        const { data } = res
        console.log(data)
        if (data.error) {
            error(data.error)
        } else if (data.success) {
            console.log(data);
        }
    })
}

function auth() {
    console.log("Signin")
    var email  = $('#login-email').val();
    var pass  = $('#login-password').val();

    var formData = new FormData();

    formData.append('email', email);
    formData.append('password', pass);

    api.post("/auth.php", formData).then(res => {
        const { data } = res
        console.log(data);
        if (data.error) {
            error(data.error)
        } else if (data.success) {
            localStorage.clear();
            console.log(res)
            localStorage.setItem("token", data.token)
            document.location.reload()
        }
    })
}

function authIN() {
    console.log("Signin")
    var email  = $('#emailIN').val();
    var pass  = $('#passwordIN').val();

    var formData = new FormData();

    formData.append('email', email);
    formData.append('password', pass);

    api.post("/auth.php", formData).then(res => {
        const { data } = res
        console.log(data);
        if (data.error) {
            error(data.error)
        } else if (data.success) {
            console.log(res)
            localStorage.setItem("token", data.token)
            document.location.reload()
        }
    })
}

document.addEventListener("DOMContentLoaded", function() {
    // Referência aos elementos do DOM
    var stakeInput = $(".stake-in");
    var sendButton = $(".send-stake");

    var stakeInput2 = $(".stake-in-2");
    var sendButton2 = $(".send-stake-2");

    $(".stake-in, .stake-in-2, #amount").inputmask("currency", {
        prefix: "R$ ",
        groupSeparator: ".",
        alias: "numeric",
        autoGroup: true,
        digits: 2,
        rightAlign: false
    });

    // Adiciona um ouvinte de evento de clique ao botão
    sendButton.on( "click", function() {
        // Remove o prefixo "R$ " e quaisquer separadores de milhares

        var inputValue = parseFloat(stakeInput.val().replace("R$ ", "").replace(",", ""));

        if (!isNaN(inputValue) && inputValue >= 1) {

            var formattedValue = inputValue;
            var token = $("#main").val();
            api.post("/verify-balance.php", {
                token: token,
                stake: formattedValue
            }).then(res => {
                const { data } = res
                console.log(data)
                if (data.error) {
                    error(data.error)
                } else {
                    stake(formattedValue);
                    localStorage.setItem("stake", formattedValue);
                    window.location.href = "game.php?g=fruit-ninja&fb=0&amount="+formattedValue;
                }
            });
        } else {
            // Exibe uma mensagem de erro se o valor for inválido
            error("Por favor, insira um valor maior ou igual a R$ 1.");
        }
    });

    sendButton2.on( "click", function() {
        var inputValue = parseFloat(stakeInput2.val().replace("R$ ", "").replace(",", ""));

        if (!isNaN(inputValue) && inputValue >= 1) {

            var formattedValue = inputValue;
            var token = $("#main").val();
            api.post("/verify-balance.php", {
                token: token,
                stake: formattedValue
            }).then(res => {
                const { data } = res
                console.log(data)
                if (data.error) {
                    error(data.error)
                } else {
                    stake(formattedValue);
                    localStorage.setItem("stake", formattedValue);
                    window.location.href = "game.php?g=" + localStorage.getItem('gameStake') + "&fb=0&amount="+formattedValue;
                }
            });
        } else {
            // Exibe uma mensagem de erro se o valor for inválido
            error("Por favor, insira um valor maior ou igual a R$ 1.");
        }
    });
});

function stake(formattedValue) {
    var token = $("#main").val();
    api.post("/stake.php", {
        token: token,
        stake: formattedValue,
        game: localStorage.getItem('gameStake')
    }).then(res => {
        const { data } = res
        console.log(data)
        if (data.error) {
            error(data.error)
        } else {
            window.location.href = "game.php?g=" + localStorage.getItem('gameStake') + "&fb=0&amount="+formattedValue;
        }
    });
}

function moeda(getValor) {
    const source = ['.', ','];
    const replace = ['', '.'];
    let valor = getValor.toString();  // Certificar-se de que valor seja uma string

    for (let i = 0; i < source.length; i++) {
        valor = valor.replace(new RegExp(source[i], 'g'), replace[i]);
    }

    return valor;
}

// Obtenha a URL atual
const url = new URL(window.location.href);

// Verifique se a URL contém "?cmd=st"
if (url.search.includes("?cmd=st")) {
    // const element = document.getElementById("open-stake-2");
    const element = new bootstrap.Modal(document.getElementById("stake-2"));
    if (element) {
        // element.click();
        checkBalance()
        element.show();
    } else {
        console.log("Elemento com o ID 'open-stake-2' não encontrado.");
    }
    setTimeout(() => {
        checkBalance();
    }, 1500);
} else {
    console.log("A URL não contém '?cmd=st'.");
}

if (url.search.includes("?cmd=wd")) {
    // const element = document.getElementById("open-wallet-saque");
    const element = new bootstrap.Modal(document.getElementById("wallet-saque"));
    if (element) {
        checkBalance();
        // element.click();
        element.show();
    } else {
        console.log("Elemento com o ID 'open-stake-2' não encontrado.");
    }
} else {
    console.log("A URL não contém '?cmd=st'.");
}

if (url.search.includes("?af")) {
    // const element = document.getElementById("open-wallet-saque");
    const element = new bootstrap.Modal(document.getElementById("signup"));
    if (element) {
        // element.click();
        element.show();
    } else {
        console.log("Elemento com o ID 'open-stake-2' não encontrado.");
    }
} else {
    console.log("A URL não contém '?cmd=st'.");
}

if (url.search.includes("?cmd=dp")) {
    // const element = document.getElementById("open-wallet-saque");
    const element = new bootstrap.Modal(document.getElementById("wallet"));
    if (element) {
        element.show();
    } else {
        console.log("Elemento com o ID 'wallet' não encontrado.");
    }
} else {
    console.log("A URL não contém '?cmd=dp'.");
}

function fMasc(objeto, mascara)
{
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()",1)
}

function fMascEx()
{
    obj.value = masc(obj.value)
}

function mCPF(cpf)
{
    cpf = cpf.replace(/\D/g,"");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return cpf
}

function number_format(number, decimals, dec_point, thousands_point)
{
    if (number == null || ! isFinite(number)) {
        throw new TypeError("number is not valid");
    }

    if (! decimals) {
        var len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }

    if (! dec_point) {
        dec_point = '.';
    }

    if (! thousands_point) {
        thousands_point = '';
    }

    number = parseFloat(number).toFixed(decimals);

    number = number.replace(".", dec_point);

    var splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);

    return number;
}

function checkBalance() {
    var token = $("#main").val();
    api.post("/check-balance.php", {
        token: token,
    }).then(res => {
        const { data } = res
        console.log(data)
        if (data.error) {
            error(data.error)
        } else {
            $("#balanceResolve").html('<span style="opacity: .7;">R$ ' + number_format(data.credit, 2, ',', '.') + ' (+<span style="color:lime;">' + data.bonus + '</span> bonus)</span>');
            $(".balanceResolve").html('R$ ' + number_format(data.credit, 2, ',', '.'));
        }
    });
}

function infoGameStake(gameStake) {
    localStorage.setItem('gameStake', gameStake);
    $("#info-game-stake").html('');
    if (gameStake == 'fruit-ninja') {
        $("#info-game-stake").html('<h3 style="text-align: center;">Cortar frutas</h3>\n' +
                                   '<p class="small mb-3">Cada fruta tem um valor pré determinado, ao corta-la você coleta seu valor, e é melhor não deixar ela cair, #ficadica!</p>');
    } else if (gameStake == 'subway') {
        $("#info-game-stake").html('<h3 style="text-align: center;">Pule sobre os trens</h3>\n' +
            '<p class="small mb-3">Pegue moedas e fature, não bata ou seja pego, #ficadica!</p>');
    }
}

function infoGameStakeReturn() {
    var game = $("#game-played").val();
    $("#info-game-stake").html('');
    if (game == 'fruit-ninja') {
        $("#info-game-stake").html('<h3 style="text-align: center;">Cortar frutas</h3>\n' +
            '<p class="small mb-3">Cada fruta tem um valor pré determinado, ao corta-la você coleta seu valor, e é melhor não deixar ela cair, #ficadica!</p>');
    } else if (game == 'subway') {
        $("#info-game-stake").html('<h3 style="text-align: center;">Pule sobre os trens</h3>\n' +
            '<p class="small mb-3">Pegue moedas e fature, não bata ou seja pego, #ficadica!</p>');
    }
}

setTimeout(() => {
    infoGameStakeReturn();
},250);
