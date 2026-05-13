let menu = document.querySelector('#menu')
let listas=document.querySelector('.listas')
let usuarioEditando = null;
let cadastro=document.querySelector("#cadastro")
let listaUser=document.querySelector('#listaUsuarios')
const ContainerConta=document.querySelector('#ContainerConta')
const caixaConta=document.querySelector('#caixaConta')

function render(){
contasCriadas();
listarUsuarios();
mostrarUsuarios()
}
render()

function Abrirmenu() {
     
      listas.classList.toggle('hide')
}
function cadastrar() {
        const nome = document.getElementById("nome").value.trim();
        const banco = document.getElementById("banco").value;
        const saldo = document.getElementById("saldo").value;
        const msg = document.getElementById("msg");

        if (nome === "" || banco === "" || saldo === "") {
                msg.innerText = "Preencha todos os campos!";
                msg.style.color = "red";
                return;
        }

        const usuarios = getUsuarios();

        const usuario = {
                id: Date.now(),
                nome: nome,
                banco: banco,
                saldo: Number(saldo)
        };

        usuarios.push(usuario);
        salvarUsuarios(usuarios);

        msg.innerText = "Usuário cadastrado com sucesso!";
        msg.style.color = "green";

        // limpar campos
        document.getElementById("nome").value = "";
        document.getElementById("banco").value = "";
        document.getElementById("saldo").value = "";
      
      
render()
}
function criarUsuario(nome, banco, saldoInicial) {
        const usuarios = getUsuarios();

        const novoUsuario = {
                id: Date.now(), // ID simples
                nome: nome,
                banco: banco,
                saldo: Number(saldoInicial)
        };

        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);

        console.log("Usuário criado:", novoUsuario);
}
function contasCriadas(){
         const usuarios = getUsuarios();
        
         usuarios.forEach(item =>{
           caixaConta.innerHTML=`<p>Total  = ${usuarios.length}</p>`
         })
}

function listarUsuarios() {
        const usuarios = getUsuarios();

        usuarios.forEach(u => {
                console.log(`
Nome: ${u.nome}
Banco: ${u.banco}
Saldo: R$ ${u.saldo}
-----------------
    `);
        });
}
function depositar(idUsuario, valor) {
        const usuarios = getUsuarios();

        const usuario = usuarios.find(u => u.id === idUsuario);

        if (!usuario) {
                console.log("Usuário não encontrado");
                return;
        }

        usuario.saldo += Number(valor);
        salvarUsuarios(usuarios);

        console.log(`Depósito realizado. Saldo atual: R$ ${usuario.saldo}`);
}
function sacar(idUsuario, valor) {
        const usuarios = getUsuarios();

        const usuario = usuarios.find(u => u.id === idUsuario);

        if (!usuario) {
                console.log("Usuário não encontrado");
                return;
        }

        if (usuario.saldo < valor) {
                console.log("Saldo insuficiente");
                return;
        }

        usuario.saldo -= Number(valor);
        salvarUsuarios(usuarios);

        console.log(`Saque realizado. Saldo atual: R$ ${usuario.saldo}`);
}



function getUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
      
}

function exibirUsuarios(){
        listaUser.classList.toggle('hidden')
        render()
}
function mostrarUsuarios() {
  const divUsuarios = document.getElementById("usuarios");
  const usuarios = getUsuarios();

  divUsuarios.innerHTML = "";

  if (usuarios.length === 0) {
    divUsuarios.innerHTML = "<p>Nenhum usuário cadastrado</p>";
    return;
  }

  usuarios.forEach(u => {
    divUsuarios.innerHTML += `
      <div class="usuario">
        <strong>Nome:${u.nome}</strong>
        Banco: ${u.banco}<br>
        Saldo: ${u.saldo.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
})}<br>

        <button onclick="abrirEditar(${u.id})" class='salvar'>Editar</button>
        <button onclick="excluirUsuario(${u.id})"class='excluir'>Excluir</button>
      </div>
    `;
  });
contasCriadas()
}


function excluirUsuario(id) {
  let usuarios = getUsuarios();

  usuarios = usuarios.filter(u => u.id !== id);

  salvarUsuarios(usuarios);
  mostrarUsuarios();
}
function abrirEditar(id) {
  const usuarios = getUsuarios();
  usuarioEditando = usuarios.find(u => u.id === id);

  if (!usuarioEditando) return;

  document.getElementById("editNome").value = usuarioEditando.nome;
  document.getElementById("editBanco").value = usuarioEditando.banco;
  document.getElementById("editValor").value =  usuarioEditando.saldo;
  document.getElementById("editarBox").classList.remove('hidden');
  contasCriadas()
}

function salvarEdicao() {
  const usuarios = getUsuarios();
  const acao = document.getElementById("acao").value;
  const valor = Number(document.getElementById("editValor").value);

  const index = usuarios.findIndex(u => u.id === usuarioEditando.id);
  if (index === -1) return;

  if (acao === "deposito") {
    if (valor <= 0) return alert("Valor inválido");
    usuarios[index].saldo += valor;
  }

  if (acao === "saque") {
    if (valor <= 0) return alert("Valor inválido");
    if (usuarios[index].saldo < valor) return alert("Saldo insuficiente");
    usuarios[index].saldo -= valor;
  }

  if (acao === "editar") {
    usuarios[index].nome = document.getElementById("editNome").value;
    usuarios[index].banco = document.getElementById("editBanco").value;
  usuarios[index].saldo= Number(document.getElementById("editValor").value);
  }
  console.log(usuarioEditando)

  salvarUsuarios(usuarios);
  mostrarUsuarios();
  fecharEditar();
  contasCriadas();
}
function fecharEditar() {
  let containerEditor=document.getElementById("editarBox");
  containerEditor.classList.add('hidden')
  containerEditor.classList.remove('show')
  usuarioEditando = null;
}

