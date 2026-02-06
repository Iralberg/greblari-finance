async function converter() {
  const valor = document.getElementById("valor").value;
  const de = document.getElementById("de").value;
  const para = document.getElementById("para").value;
  const resultado = document.getElementById("resultado");

  if (!valor) {
    resultado.innerText = "Informe um valor";
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${de}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const cotacao = data.rates[para];

    const convertido = (valor * cotacao).toFixed(2);
    resultado.innerText = `${valor} ${de} = ${convertido} ${para}`;
  } catch (erro) {
    resultado.innerText = "Erro ao buscar cotação";
  }
}
