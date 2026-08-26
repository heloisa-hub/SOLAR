(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nome = form.nome.value.trim();
      var email = form.email.value.trim();
      var telefone = form.telefone.value.trim();
      var assunto = form.assunto.value;
      var mensagem = form.mensagem.value.trim();

      var subject = "Contato pelo site — " + (assunto || "Solar Capital") + " — " + nome;
      var body =
        "Nome: " + nome + "\n" +
        "E-mail: " + email + "\n" +
        "Telefone: " + telefone + "\n" +
        "Assunto: " + assunto + "\n\n" +
        "Mensagem:\n" + mensagem;

      var mailto =
        "mailto:contato@solarcapital.com.br" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  });
})();
