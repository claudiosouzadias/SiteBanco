//Variaveis de controler global que serão constamente usadas ao longo deste codigo e outros codigos!
let numUsers = 0;
var dados = {};
var atualUser = 0;

//Minha linda molde de funcoes que guarda todas as funcoes que eu normalmente uso nos codigos
//Arrasto ela pra onde for pra ja ter codigos que podem ser muito uteis no futuro ja prontos!
//Ent so precisaria aplicar a logica em outros lugares que eu quiser, muito bom né eu sei
const moldesFunctions = {
    //Funcao para verificar se uma variavel string esta ou é vazia
    verificaStringVazia: function (string) {
        //Faz uma verificao onde se a variavel vazia return false
        // E se a variavel n estiver vazia return true
        //Atntes ele n era capaz de analizar nada alem de string mas cm esse STRING ele sera capaz de
        //Transformar variaveis que n são string em string permitindo que sejamos capazes de analizar espacos vazios em variaveis que n são string
        if (string.length === 0 || string === null || string === undefined) {
            return false;
        } else {
            return true
        }
    },
    //Funcao para retornar o valor, esta funcao permite ter varios campos de uma so vez
    verificaVariasStringsVazia: function (...campos) {
        return campos.every(this.verificaStringVazia);
    },
    //Funcao para verificar se tem espacos vazios entre as palavras e se ela é vazia!
    spacoEntrePalavra: function (string) {
        const verificadora = /\s+/; // Atribuindo para ver se a variavel possui um ou mais espacos em branco
        return !(verificadora.test(string));
    },
    spacoEntreAsPalavras: function (...campos) {
        return campos.every(this.spacoEntrePalavra);
    },
    //Function para contar as letras maiusculas na palavra
    contaLetraMaiuscula: function (string) {

        //Aqui temos ele retornando o tamanho da qntd de letras maiusculas que tem\
        //Ele pega e separa com split '' letra por letra, e o filter faz jogar para letra armazenas como se fosse letra por letrinha
        // => é uma abreviacao para criacao de uma funcao
        //Ai com upperCase ele pega e calcula as letras maiusculas
        //o letra !== letra.toLowercase() evita que ele compare outras coisas que não sejam caracteres
        //Meio complexo de entender eu sei, nem eu consegui explicar direito pq n entendi mt ainda mas vamo indo né
        return string.split('').filter(letra => letra === letra.toUpperCase() && letra !== letra.toLowerCase()).length;
    },
    //Function para contar os caracteres minusculas nas palavras
    //Faz a msm coisa que em cima so que faz o contrario é meio obvio né kkkkk
    contaLetraMinusculas: function (string) {
        return string.split('').filter(letra => letra === letra.toLowerCase() && letra !== letra.toUpperCase()).length;
    },
    //Nesta funcao estamos verificando se a palavra possui algum numero
    //Faremos isso contando o numero de caracteres em comum que a palavra tera entre a variavel com os numeros e a string desejada
    contaNumeroPalavra: function (string) {
        let num = "0123456789";
        let contador = 0;
        //Neste loop for ele esta passando por cada letra da variavel string
        for (let letra of string) {
            //Se por acaso a variavel num e a letra da palavra tiverem algo em comum o contador sera somado + 1
            //Sendo assim contaremos a quantidade de caracteres em comum entre os 2!
            if (num.includes(letra)) {
                contador++;
            }
        }
        return contador;
    },
    //Basicamente mesma logica de contar o numero de palavras no entanto estaremos contando o numero de caracteres especiais
    contaCarEspecial: function (string) {
        let caract = "!@#$%^&*()-_+=<>?";
        let contador = 0;
        //Neste loop for ele esta passando por cada letra da variavel string
        for (let letra of string) {
            //Se por acaso a variavel num e a letra da palavra tiverem algo em comum o contador sera somado + 1
            //Sendo assim contaremos a quantidade de caracteres em comum entre os 2!
            if (caract.includes(letra)) {
                contador++;
            }
        }
        return contador;
    },
    // Verifica se o caractere é um dígito (número entre '0' e '9')
    isDigit: function (string) {
        return /\d/.test(string);
    },
    // Verifica se o caractere é uma letra (entre 'a'-'z' ou 'A'-'Z')
    isLetter: function (string) {
        return /^[a-zA-Z]$/.test(string);
    },
    //Function que tem como objetivo verificar se é uma sequencia logica como ABCD ou 1234.
    analisaSequencia: function (string) {
        //Looping padrao para passar de palavra em palavra
        //Mas aqui usamos - 1 pq estaremos usando i + 1 do lenght para fazer verificao de sequencia
        for (let i = 0; i < string.length - 2; i++) {
            //Essa funcao auxiliar verifica se o numero ele é entre 0-9
            //No caso ele esta verificando a posicao atual do i e uma posicao a sua frente
            if (this.isDigit(string[i]) && this.isDigit(string[i + 1]) && this.isDigit(string[i + 2])) {

                //Transforma o texto em numero e verifica se o espaco da frente menos o atual é diferente de 1, se for quer dizer q n é uma sequencia
                //Caso seja é uma sequencia ent ele retorna true
                if ((parseInt(string[i + 1]) - parseInt(string[i])) === 1 && (parseInt(string[i + 2]) - parseInt(string[i + 1])) === 1) {
                    return true;
                }
            }

            //Aqui fazemos a mesma coisa com o numero mas usamos a funcao auxiliar isLetter
            if (this.isLetter(string[i]) && this.isLetter(string[i + 1]) && this.isLetter(string[i + 2])) {

                //Aqui fazendo a msm coisa mas a funcao charCodeAt auxiliar ele transforma o caractere em um numero
                //No caso as letras né de tipo a - z ele tem um negocio interno que tem uma ordem tipo 1234 para cada caractere
                //e ent ele pega o numero e subtrai e se diferente de 1 n é uma sequencia
                if ((string.charCodeAt(i + 1) - string.charCodeAt(i)) === 1 && (string.charCodeAt(i + 2) - string.charCodeAt(i + 1)) === 1) {
                    return true
                }
            }
        }
        //Caso n encontre nenhuma sequencia 
        return false;
    },
    //Function para analisar se a string é uma sequencia tipo 111111 ou AAAAAAAAA e assim por diante.
    analisaRepeticao: function (string) {
        for (let i = 0; i < string.length; i++) {
            if (string[i] === string[i + 1]) {
                return true;
            }
        }
        return false;
    },
    //Funcao pra verificar se o cara n ta mentindo o CPF -> É da receita Federal o codigo ent sla kk
    validaCPF: function (cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;
        // Valida 1o digito	
        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito	
        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    },
    //Literalmente o nome KK
    //Funcao pra gerar um numero aleatorio uai kkk
    //Nesse caso ele recebe o tamanhao que vc deseja do numero random
    gerarAleatorio: function (tamanho) {
        //Cria uma variavel com todos os cacteres que eu quero que estejam dentro da variavel random
        //Tipo n todos estarão mas podem estar entende!
        const carac = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let result = "";

        //Um looping for pra criar os caracteres ate ser do tamanho da variavel de tamanho
        for (let i = 0; i < tamanho; i++) {
            // Pega um numero aleatorio pelo tamanho da variavel cm caractere
            //Tipo ele ve o tamanho total do array pra ai ele pegar um numero random
            //Pra ele n sair pegando numeros foras do array e dar o famoso erro de out array
            const indiceRandom = Math.floor(Math.random() * carac.length);

            //Aqui ele esta atribuindo coisas aleatorias do carac para a variavel result
            //Tipo o indiceRandom esta falando uma hora - > 2 e dps 27, pra serem gerados aleatoriamente
            result += carac[indiceRandom]; //Aqui ele esta atribuind
        }

        //Retorna o resultado que vai ser a combinacao de caracteres aleatorios de acordo com o tamanho indicado
        return result;
    },
    //Validando o registro do meliante metiroso
    validaRegistro: function (email, password, cpf) {

        //Transformando tudo em segredo SHHHHHHHHHHHHHHHHHHHHHH
        const hashedPassword = btoa(password);
        const hashedEmail = btoa(email);

        //Verificando se por acaso o email e a senha existe ja tlgd se n existirem pode continuar legal
        for (let dado in dados) {
            if (dados[dado].email === hashedEmail && dados[dado].password === hashedPassword && dados[dado].cpf === cpf) {
                return;
            }
        }

        //Esse numUsers controla o numero de usuarios no banco SERVE DAORA VIU 
        //Esse Atual User é pra quem ta na interface do codigo na hr
        //Isso so funciona pq n se trata de um banco de dados de verdade ne
        //Ta tudo forjado aqui na marra e na hora, se fosse um d vdd n sei fazer ainda lol xD
        numUsers++;
        atualUser = numUsers - 1;


        //Aqui eu to armazenando todas as informacoes do usuario no array correspondente
        //ao user atual, pq qnd registra todos eles tem informacoes basicas que sao validadas e criadas aqui
        dados[atualUser] = {
            cpf: cpf,
            email: hashedEmail,
            password: hashedPassword,
            saldo: 1000,
            chaveTel: false,
            chaveEmail: email,
            chaveRandom: this.gerarAleatorio(7), //Gera uma chave aleatoria, n toda hora muda, mas é uma aleatoria pra pessoa ja ter uma alem do email
        };


        //Ai retorna true pro codigo prosseguir
        return true;
    },
    //Aqui tamo validando o login do meliante abusado
    validaLogin: function (email, password) {
        const hashedPassword = btoa(password); //Transformando em segredo né
        const hashedEmail = btoa(email);

        //Verificando em um loop se os dados conferem
        //Se n conferir retorna falso e se conferir retorna true, ez do ez mamao com acucar
        for (let dado in dados) {
            if (dados[dado].email === hashedEmail && dados[dado].password === hashedPassword) {
                atualUser = dado;
                return true;
            } else {
                return false;
            }
        }
    },
    //Funcao para esconder as senhas 
    //Fiz isto pq eu tava usando mais de 1 vez tlgd
    //Aqui ele pega os parametros do iD HTML e o caminho das imagens!
    escondeSenhas: function(idInput, idIcon, caminhoImageMostra, caminhoImagemEsconde) {
        let password = idInput;
        let icon = idIcon;

        // Gradualmente esconde o ícone
        icon.style.opacity = 0;

        // Após 0.5 segundos (tempo da transição), troca a imagem
        setTimeout(function () {
            if (password.type === "password") {
                password.type = "text";
                icon.src = caminhoImageMostra;  // Altera o ícone
                icon.alt = "Mostra Senha";
            } else {
                password.type = "password";
                icon.src = caminhoImagemEsconde;  // Volta para o ícone de mostrar
                icon.alt = "Esconde Senha";
            }

            // Gradualmente faz o ícone aparecer de volta
            icon.style.opacity = 1;
        }, 300);  // Aguarda 0.5 segundos para trocar a imagem
    },
    //Function para validar as senhas
    //Aqui contaremos os caracteres tamanho da palavra e possiveis sequencias de palavras.
    validaSenha: function (password, email, cpf) {
        //Variavel de container onde ira aparecer a MSG de erro
        //Logo abaixo a variavel que cria um paragrafo que ira armazenas a msg de erro
        let msgErro = document.getElementById("msgErro");
        let paragrafo = document.createElement('p');

        //Pegando a largura da senha se for menor que 8 ou maior que 20 retorna falso
        if (password.length < 8 || password.length > 20) {
            paragrafo.textContent = "A senha deve conter entre 8 a 20 caracteres";
            msgErro.appendChild(paragrafo);
            return false;
        }

        //Verificando se tem letras maiusculas e minusculas na senha
        else if (this.contaLetraMaiuscula(password) < 1 || this.contaLetraMinusculas(password) < 1) {
            paragrafo.textContent = "A senha precisa conter ao menos uma letra maiuscula ou minuscula";
            msgErro.appendChild(paragrafo);
            return false;
        }

        //Verificando se possui ao menos um numero
        else if (this.contaNumeroPalavra(password) < 1) {
            paragrafo.textContent = "A precisa conter ao menos um numero";
            msgErro.appendChild(paragrafo);
            return false;
        }

        //Verificando se possui caractere espcial
        else if (this.contaCarEspecial(password) < 1) {
            paragrafo.textContent = "A precisa conter ao menos um caractere especial";
            msgErro.appendChild(paragrafo);
            return false;
        }

        //Verificando se a senha for igual aos inputs de email ou cpf ele der invalido
        //Pq senha n pode conter coisas pessoais!
        else if (password == email) {
            paragrafo.textContent = "A senha e o email não podem ser iguais";
            msgErro.appendChild(paragrafo);
            return false;
        }
        else if (password == cpf) {
            paragrafo.textContent = "A senha e o cpf não podem ser iguais";
            msgErro.appendChild(paragrafo);
            return false;
        }

        //Fazendo verificacao se por acaso a senha é uma sequencia obvia de caracteres
        else if (this.analisaSequencia(password)) {
            paragrafo.textContent = "Evite sequencias como ABC na senha para não torna-la obvia";
            msgErro.appendChild(paragrafo);
            return false;
        }

        else if (this.analisaRepeticao(password)) {
            paragrafo.textContent = "Evite repetições como aa";
            msgErro.appendChild(paragrafo);
            return false;
        }

        else {
            return true;
        }

    },
    //Codigo oficial de verificao de email
    validaEmail: function(email){
        const compara = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;
        return compara.test(email);
    },
    //Function para tentar validar a chave pix do usuario
    ValidaChave: function(keyTransf,paragrafo,container){
        let controla;
        //Looping para ver se a chave esta compativel com alguma chave
        for(let i = 0; i < numUsers; i++){
            //Verifica se alguma das chaves é correspondente a alguma chave contida no sistema
            //Se não ele informa que a chave é invalida e então da return!
            //Verifica tambem se o cara n ta digitando a propria chave tlgd kk
            if (keyTransf === dados[i].cpf && keyTransf != dados[atualUser].cpf) {
                console.log("Chave do usuario:" + keyTransf + i);
                return i;
            }
            else if (keyTransf === dados[i].chaveTel && keyTransf != dados[atualUser].chaveTel) {
                console.log("Chave do usuario:" + keyTransf + i);
                return i;
            }
            else if (keyTransf === dados[i].chaveEmail && keyTransf != dados[atualUser].chaveEmail) {
                console.log("Chave do usuario:" + keyTransf + i);
                return i;
            }
            else if (keyTransf === dados[i].chavechaveRandom && keyTransf != dados[atualUser].chavechaveRandom) {
                console.log("Chave do usuario:" + keyTransf + i);
                return i;
            }

        }
        //Caso a chave não seja correspondente a nenhuma das chaves de transferencia indicada. 
        paragrafo.textContent = "Insira uma chave valida!"; 
        console.log("Insira uma chave valida")
        container.appendChild(paragrafo); 
        return false;
    },
    //Function para validar um telefone
    ValidaTell: function(numero){
        // Expressão regular para verificar o padrão de telefone brasileiro com 11 dígitos
        const padrao = /^(?:\(?\d{2}\)?\s?)?(?:9?\d{4}-?\d{4}|\d{8,9})$/;

        return padrao.test(numero);
    },
}
