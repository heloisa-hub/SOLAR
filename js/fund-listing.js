(function () {
  var NA = "—";

  function fundCardHtml(fund) {
    return (
      '<a class="fund-card-mockup" href="fundo-detalhe.html?fundo=' + fund.slug + '">' +
        '<span class="fund-card-mockup-category">' + (fund.estrategiaResumo || fund.classificacaoAnbima) + "</span>" +
        "<h3>" + fund.nome + "</h3>" +
        '<div class="fund-card-mockup-row"><span>Patrimônio líquido</span><strong>' + (fund.plAtual || NA) + "</strong></div>" +
        '<div class="fund-card-mockup-row"><span>Data-base</span><strong>' + (fund.dataBase || NA) + "</strong></div>" +
      "</a>"
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    var containers = document.querySelectorAll("[data-fund-listing]");
    if (!containers.length || typeof SOLAR_CAPITAL_FUNDS === "undefined") return;

    containers.forEach(function (container) {
      var limit = parseInt(container.getAttribute("data-fund-listing"), 10);
      var funds = SOLAR_CAPITAL_FUNDS;
      if (limit) funds = funds.slice(0, limit);
      container.innerHTML = funds.map(fundCardHtml).join("");
    });
  });
})();
