(function () {
  var NA = "—";

  function principalClass(fund) {
    if (!fund.classes || !fund.classes.length) return null;
    if (fund.classePrincipal) {
      var found = fund.classes.filter(function (c) { return c.nome === fund.classePrincipal; })[0];
      if (found) return found;
    }
    return fund.classes[0];
  }

  function rentabilidadeLtm(fund) {
    var cls = principalClass(fund);
    if (!cls || cls.dozeMeses === null || cls.dozeMeses === undefined) return NA;
    var num = Number(cls.dozeMeses);
    return (num > 0 ? "+" : "") + num.toFixed(2).replace(".", ",") + "%";
  }

  // Aberto/Fechado aqui é sobre captação (há série aceitando aporte agora?),
  // não sobre o condomínio do fundo (que já aparece na ficha técnica) — por
  // isso é lido de janelaResgate, não de fund.condominio.
  function isRaisingNow(fund) {
    return !!fund.janelaResgate && !/^sem s[ée]rie/i.test(fund.janelaResgate);
  }

  function statusPillHtml(fund) {
    if (!fund.janelaResgate) return "";
    var open = isRaisingNow(fund);
    return '<span class="fund-status-pill ' + (open ? "fund-status-pill--open" : "fund-status-pill--closed") + '">' +
      (open ? "Aberto a aportes" : "Sem série aberta") + "</span>";
  }

  function fundCardHtml(fund) {
    return (
      '<a class="fund-card-mockup" href="fundo-detalhe.html?fundo=' + fund.slug + '">' +
        '<div class="fund-card-mockup-top">' +
          '<span class="fund-card-mockup-category">' + (fund.estrategiaResumo || fund.classificacaoAnbima) + "</span>" +
          statusPillHtml(fund) +
        "</div>" +
        "<h3>" + fund.nome + "</h3>" +
        '<div class="fund-card-mockup-row"><span>Patrimônio líquido</span><strong>' + (fund.plAtual || NA) + "</strong></div>" +
        '<div class="fund-card-mockup-row"><span>Rentabilidade LTM</span><strong>' + rentabilidadeLtm(fund) + "</strong></div>" +
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
