//Function para mostrar ou esconder a senha do cabra
function togglePassword() {
    //Variaveis do HTML onde esta o icon e o lugar onde a senha esta sendo digitada o input
    let password = document.getElementById("regSenha");
    let icon = document.getElementById("toggleIcon");
    let mostra = "img/mostra-senha-icon.png";
    let esconde = "img/esconde-senha-icon.png";

    moldesFunctions.escondeSenhas(password, icon, mostra, esconde);
}

//Mesma coisa, so que neste aqui se trata de outra 
function togglePasswordConfirma() {
    let password = document.getElementById("confirmaSenha");
    let icon = document.getElementById("toggleIconConfirma");
    let mostra = "img/mostra-senha-icon.png";
    let esconde = "img/esconde-senha-icon.png";

    moldesFunctions.escondeSenhas(password, icon, mostra, esconde);
}

//Funcao que cria a pagina HTML do reg -> So substitui o main content
function regPage() {
    let page = document.getElementById("mainPage");
    page.innerHTML = `
            <div class="design-login-container"> 
                <img src="img/Tela-Register.png">
            </div>

            <div class="login-container">
                <div class="title-login">
                    <h1> Cadastre-se </h1>
                </div>  
                
                <form class="register-area">
                    <div class="wrapper">
                        <input id="regCPF" name="1" placeholder="CPF" class="register__input" type="number">
                    </div>
                    <div class="wrapper">
                        <input id="regEmail" name="2" placeholder="Email" class="register__input" type="email" required>
                    </div>
                    <div class="wrapper">
                        <input id="regSenha" name="3" placeholder="Senha" class="register__input" type="password">
                        <img src="img/esconde-senha-icon.png" alt="Esconde Senha" onclick="togglePassword()" class="regHide__password" id="toggleIcon">
                    </div>
                    <div class="wrapper">
                        <input id="confirmaSenha" name="4" placeholder="Confirme sua senha" class="register__input" type="password">
                        <img src="img/esconde-senha-icon.png" alt="Esconde Senha" onclick="togglePasswordConfirma()" class="regHide__password" id="toggleIconConfirma">
                    </div>
                </form>
                <div id="msgErro" class="msg__erro"> </div>
                <section class="confirma-button">
                    <button onclick="registro()" class="reg__button">
                        <span>Criar Conta</span>
                    </button>
                    <button onclick="" class="reg__button" id="googleButton">
                        <img src="img/Google-Icon.png" alt="">
                        <span>Cadastre-se com o google</span>
                    </button>
                    <button onclick="" class="reg__button" id="faceButton">
                        <img src="img/Facebook-Icon.png" alt="">
                        <span>Cadastre-se com o Facebook</span>
                    </button>
                    <button onclick="loginPage()" class="reg__button" id="backButton">
                        <span>Login</span>
                    </button>
                </section>
            </div>
    `;
}

function registro() {
    event.preventDefault(); // Prevenir que a pagina att

    //Guardando as variaveis essenciais
    //Variaveis de input
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regSenha").value;
    let confirmaPassword = document.getElementById("confirmaSenha").value;
    let cpf = document.getElementById("regCPF").value;


    //Variavel de container onde ira aparecer a MSG de erro
    //Logo abaixo a variavel que cria um paragrafo que ira armazenas a msg de erro
    let msgErro = document.getElementById("msgErro");
    let paragrafo = document.createElement('p');

    //Para limpar o texto anterior! Impedindo de ficar criando umonte chatao isso
    msgErro.innerHTML = "";


    //Aqui estamos apenas verificando se os valores digitas não são vazios ou nulos
    //Caso todos sejam ele prossegue o codigo
    //Caso não ele informa que o usuario deve preencher os campos e não deixa-los em branco como visto no Else

    if (moldesFunctions.verificaVariasStringsVazia(email, cpf, password, confirmaPassword)
        && moldesFunctions.spacoEntreAsPalavras(email, password, confirmaPassword, cpf)) {

        //Verificando o emial para ver se é valido
        if (moldesFunctions.validaEmail(email)) {
            //Verifica se o valor da senha1 e a senha2 são iguais
            //Caso não ele retorna dizendo que os valores tem que ser iguais 
            //Caso true eles prosseguem
            if (password == confirmaPassword) {
                if (moldesFunctions.validaSenha(password, email, cpf)) {
                    //Verifica o CPF atravez da funcao ja pronta de verificacao de CPFS
                    //Caso true ele prossegue ele retorna false ent o progama continua, 
                    //Caso false ele retorna true e informa que o CPF é invalido
                    //Que o CPF digitado é invalido
                    if (!(moldesFunctions.validaCPF(cpf))) {
                        paragrafo.textContent = "Insira um CPF válido";
                        msgErro.appendChild(paragrafo);  //Atribuindo o paragro para o msgErro!
                        return;
                    } else {
                        //Aqui ele verifica atravez da funcao pronta se as 3 variaveis de fato não ja estão dentro do sistema
                        //Caso o registro seja bem sucessido ele retorna true e então vai a interface, pagina principal
                        //Caso não ele informa que um dos inputs email ou CPF ja foram registrados e que algo esta incorreto
                        //N informa se a senha ja foi registrada obvimante kk
                        if (moldesFunctions.validaRegistro(email, password, cpf)) {
                            interfacePage();  
                            console.log("Sucesso!");
                        }
                        //Caso email ou cpf ja registrados no sistema
                        else {
                            paragrafo.textContent = "Email ou CPF já registrado pfvr tente novamente!";
                            msgErro.appendChild(paragrafo);  //Atribuindo o paragro para o msgErro!
                            return;
                        }
                    }
                } else {
                    console.log("erro");
                }
                //Caso as senhas não sejam iguais 
            } else {
                paragrafo.textContent = "Senhas não conferem!";
                msgErro.appendChild(paragrafo);  //Atribuindo o paragro para o msgErro!
                return;
            }
        }//Caso o email seja invalido 
        else {
            paragrafo.textContent = "Por favor insira um e-mail válido";
            msgErro.appendChild(paragrafo);
            return;
        }
        //Caso os campos estejam vazios 
    } else {
        paragrafo.textContent = "Por favor preencha os campos corretamente sem espacos!!";
        msgErro.appendChild(paragrafo);  //Atribuindo o paragro para o msgErro!
        return;
    }

}

// N sei se essa porra é a melhor forma de otimizacao KKK mas ta funfando legal!
function loginPage() {
    let page = document.getElementById("mainPage");

    page.innerHTML = `
            <div class="design-login-container"> 
                <img src="img/Tela-Login.png">
                <p>Segurança</p>
                <p>Praticidade</p>
                <p>Confiança</p>
            </div>

            <div class="login-container">
                <div class="title-login">
                    <h1> Banco Souza </h1>
                    <img src="img/Logo-Icon.png" alt="logo">
                </div>  
                
                <form class="login-area">
                    <div class="wrapper">
                        <img src="/img/email-svgrepo-com.svg" class="image-login" alt="logo do @ de email">
                        <input id="regEmail" name="1" placeholder="Email" class="login__input" type="email">
                    </div>
                    <div class="wrapper">
                        <img src="img/password-svgrepo-com.svg"  class="image-login" alt="logo de um cadeado">
                        <input id="regSenha" name="2" placeholder="Senha" class="login__input" type="password">
                        <img src="img/esconde-senha-icon.png" alt="Esconde Senha" onclick="togglePassword()" class="hide-password" id="toggleIcon">
                    </div>
                </form>
                <div id="msgErro" class="msg__erro"> </div>
                <section class="confirma-button">
                    <button onclick="login()" class="button">
                        <span>Entrar</span>
                    </button>
                    <a href="#">Esqueceu a senha?</a>
                    <p>OU</p>
                    <button onclick="" class="button" id="googleButton">
                        <img src="img/Google-Icon.png" alt="">
                        <span>Continuar com o google</span>
                    </button>
                    <button onclick="" class="button" id="faceButton">
                        <img src="img/Facebook-Icon.png" alt="">
                        <span>Continuar com o Facebook</span>
                    </button>
                    <button onclick="regPage()" class="button" id="reg">
                        <span>Criar conta</span>
                    </button>
                </section>
            </div>
    `;
}

//Funcao para executar o login do usuario
function login() {
    event.preventDefault(); // Prevenir que a pagina att

    //Variaveis de input
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regSenha").value;

    //Variavel de container onde ira aparecer a MSG de erro
    //Logo abaixo a variavel que cria um paragrafo que ira armazenas a msg de erro
    let msgErro = document.getElementById("msgErro");
    let paragrafo = document.createElement('p');

    //Para limpar o texto anterior!
    msgErro.innerHTML = "";

    //Verifica se o email ou senha novamente são ou não vazios né aquela velha historia
    //Caso não pede pro usuario fazer o favor de preencher
    //Lembra que aqui esta invertido ou seja true caso retorne false e ass vc sabe né
    //Ent esse IF so funciona se ele digitar algo invalido!
    if (!(moldesFunctions.verificaVariasStringsVazia(email, password))) {
        paragrafo.textContent = "Por favor preencha os campos!!";
        msgErro.appendChild(paragrafo);  //Atribuindo o paragro para o msgErro!
        return;
    }

    //Verifica se os inputs estão de fato registrado no sistema
    //Se sim ele retorna TRUE e joga os usuarios para a pagina de interface
    //Caso não retorna false e informa que email ou senha não foram registrados
    if (moldesFunctions.validaLogin(email, password)) interfacePage();
    //Caso email ou senha invalidos
    else {
        paragrafo.textContent = "Email ou senha invalidos";
        msgErro.appendChild(paragrafo);  //Atribuindo o paragro para o msgErro!
        return;
    }
}

//Funcao para criar a pagina de interface do usuario
function interfacePage() {
    let page = document.getElementById("mainPage");
    page.innerHTML = `
            <header class="topo">
                <div class="InputPesquisa">
                    <input type="text" placeholder="Pesquisar">
                </div>
                <div>
                    <img src="img/mostra-senha-icon.png" alt="">
                    <img src="img/moon.png" alt="Modo Claro">
                    <img src="img/Profile Pic.png" onclick="loginPage()" alt="Profile Pic">
                </div>
            </header>
            <div class="IconesMenu">
                <div class="DashBoard">
                    <img src="img/DashBoard.png" alt="DashBoard" onclick="">
                    <p>DashBoard</p>
                </div>
                <div class="pix">
                    <img src="img/PIX.png" onclick="pix()" alt="Pix" onclick="">
                    <p>Área pix</p>
                </div>
                <div class="Cripto">
                    <img src="img/Cripto.png" alt="Cripto" onclick="">
                    <p>Cripto</p>
                </div>
            </div>
            <div class="containerOptions">
                <div class="conta" id="container-saldo">
                    <h2>Conta</h2>
                    <img src="img/arrow-down 1.png" alt="arrow">
                </div>

                <div class="conta" id="teste-container">
                    <h2>Fatura Atual</h2>
                    <img src="img/arrow-down 1.png" alt="arrow">
                    <p>Teste</p>
                </div>

                <div class="conta">
                    <h2>Extrato</h2>
                    <img src="img/arrow-down 1.png" alt="arrow">
                    <p>Teste</p>
                </div>
                
                <div class="conta">
                    <h2>Histórico</h2>
                    <img src="img/arrow-down 1.png" alt="arrow">
                    <p>Teste</p>
                </div>
            </div>

            <div class="Card">
                <img src="img/CardIcon.png" alt="Icon Card NuBank">
            </div>
    `;

    //Saldo interface

    let saldoContainer = document.getElementById("container-saldo");
    let saldo = dados[atualUser].saldo;
    let pSaldo = document.createElement('p');

    pSaldo.textContent = `${saldo}`;
    saldoContainer.appendChild(pSaldo);

}

//Funcao para criar a pagina de PIX do usuario onde ira fazer transferencias 
function pix() {
    let page = document.getElementById("mainPage");
    page.innerHTML = `           
            <header class="topo">
                <div class="InputPesquisa">
                    <input type="text" placeholder="Pesquisar">
                </div>
                <div>
                    <img src="img/mostra-senha-icon.png" alt="">
                    <img src="img/moon.png" alt="Modo Claro">
                    <img src="img/Profile Pic.png" onclick="loginPage()" alt="Profile Pic">
                </div>
            </header>
            <div class="IconesMenu">
                <div class="DashBoard">
                    <img src="img/DashBoard.png" onclick="interfacePage()" alt="DashBoard" onclick="">
                    <p>DashBoard</p>
                </div>
                <div class="pix">
                    <img src="img/PIX.png" onclick="pix()" alt="Pix" onclick="">
                    <p>Área pix</p>
                </div>
                <div class="Cripto">
                    <img src="img/Cripto.png" alt="Cripto" onclick="">
                    <p>Cripto</p>
                </div>
            </div>
            <div class="pix-container">
                <section class="trasnferir">
                    <h2>Informe o pix de transferencia</h2>
                    <input type="text" placeholder="Chave de transferencia" id="keyTransferencia">
                    <button onclick="transferencia()">Transferir</button>
                    <section id="tranfereContainer"> </section>
                </section>
                <section class="container-keys">
                    <h2>Suas atuais chaves de trasnferencia:</h2>
                </section>

            </div>

            <div class="Card">
                <img src="img/CardIcon.png" alt="Icon Card NuBank">
            </div>`;

}


//Funcao para fazer aquela transferencia marota
function transferencia() {

    console.log(atualUser);

    //Container onde tudo esta sendo manipulado
    let container = document.getElementById("tranfereContainer");

    //Guardando a chave do usuario
    let keyTransf = document.getElementById("keyTransferencia");

    //Criando variaveis para HTML para quando ele clicar no botao
    //Criar um input para digitar o valor
    let input = document.createElement('input');
    //Criar um botao para confirmar o valor digitado
    let confirmaButton = document.createElement('button');
    //Cria um paragrafo onde exibiremos msgs de possiveis erros
    let paragrafo = document.createElement('p');
    //Criando botao de confirmar valor trasnf
    let confirmaButtonTransf = document.createElement('button');
    //Uma variavel para manipularmos o array e conseguirmos atribuir valores digitados para a conta do mesmo!
    let userTransf;

    keyTransf = keyTransf.value;

    //Para n ficar criando varias vezes a msm coisa vc ja tlgd ne
    container.innerHTML = "";

    //Verifica se n é vazio, se for vazio ele pede pra preencher o campo e da return
    if (moldesFunctions.verificaStringVazia(input)){} 
    else {return;}

    let compara = moldesFunctions.ValidaChave(keyTransf,paragrafo,container)
    if(compara !== false){
        userTransf = compara;
    } else {
        return;
    }

    //Criando um input para o usuario inserir a quantidade desejada!!
    confirmaButton.textContent = "Confirme";
    input.placeholder = "Insira o valor desejado!";
    input.type = "number";

    //Integrando ambos o input e o botao de confirmar ao container !
    container.appendChild(input);
    container.appendChild(confirmaButton);

    //Adicionando um evento ao clicar no botao do transfere
    confirmaButton.addEventListener("click", confirma);
    //Funcao que executa ao usuario confirmar que esse é o valor que ele quer
    //Ela exibe o valor da trasnferencia e o usuario e pede para ele digitar novamente se ele tem certeza!
    function confirma() {
        //Transformando o valor input em um numero inteiro para então comparar
        input = parseFloat(input.value);
        if (input > dados[atualUser].saldo) {
            paragrafo.textContent = "Saldo insuficiente!";  //Se o cara tentar tiver metendo o golpe ele n conseguir trasnferir né, aqueles pique
            return;
        } else {
            paragrafo.textContent = `Tem certeza que deseja trasnferir ${input} ao usuario ${userTransf}`;
            confirmaButtonTransf.textContent = "Confirme o valor";
            container.appendChild(confirmaButtonTransf);
            confirmaButton.addEventListener("confirmando", confirmaDinheiro(input))
        }
        container.appendChild(paragrafo);
    }

    function confirmaDinheiro(value){
        dados[atualUser].saldo -= value;
        dados[userTransf].saldo += value
        paragrafo.textContent = `Saldo atual: ${dados[atualUser].saldo}`;
        container.appendChild(paragrafo);
        setTimeout(container.innerHTML ="",5000);
    }
}
