 if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => {
      console.log("PWA iniciado");
    });
}

        let email=document.getElementById('email')
        let senha=document.getElementById('senha')
        function login(){
            if(email.value==='robopelado456@gmail.com' && senha.value==='iraldo123')
        {
            window.location.href='paginas/pag01/pag01.html'
        }else{
            alert('Erro[ ], Email ou senha incorretos')
        }
        email.value=''
        senha.value=''
        }