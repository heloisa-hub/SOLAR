(function () {
  var NA = "—";

  var ICONS = {
    coin: '<circle cx="12" cy="12" r="9"/><path d="M9.2 14.2c.4 1 1.4 1.6 2.8 1.6 1.8 0 2.8-.8 2.8-1.9 0-1.2-1-1.6-2.8-2s-2.8-.9-2.8-2c0-1.1 1-1.9 2.8-1.9 1.4 0 2.4.6 2.8 1.6M12 6.5v1M12 16.5v1"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    person: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-4 3.2-6.5 7-6.5s7 2.5 7 6.5"/>',
    layers: '<path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z"/><path d="M4 12.5l8 4.5 8-4.5"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 8h1M8 12h1M8 16h1M15 8h1M15 12h1M15 16h1"/>'
  };

  function injectIcons(root) {
    root.querySelectorAll("[data-icon]").forEach(function (el) {
      var key = el.getAttribute("data-icon");
      var inner = ICONS[key];
      if (!inner) return;
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
    });
  }

  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function findFund(slug) {
    if (typeof SOLAR_CAPITAL_FUNDS === "undefined") return null;
    for (var i = 0; i < SOLAR_CAPITAL_FUNDS.length; i++) {
      if (SOLAR_CAPITAL_FUNDS[i].slug === slug) return SOLAR_CAPITAL_FUNDS[i];
    }
    return null;
  }

  function isEmpty(value) {
    return value === null || value === undefined || value === "";
  }

  function formatDate(iso) {
    var parts = iso.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }

  function formatPercent(value) {
    if (isEmpty(value)) return NA;
    var num = Number(value);
    var sign = num > 0 ? "+" : "";
    return sign + num.toFixed(2).replace(".", ",") + "%";
  }

  function formatCdiPercent(value) {
    if (isEmpty(value)) return NA;
    return Number(value).toFixed(1).replace(".", ",") + "%";
  }

  function percentClass(value) {
    if (isEmpty(value)) return "";
    return Number(value) >= 0 ? "positive" : "negative";
  }

  function fillTextFields(root, fund) {
    var nodes = root.querySelectorAll("[data-field]");
    nodes.forEach(function (node) {
      var field = node.getAttribute("data-field");
      if (fund[field] === undefined) return;
      node.textContent = isEmpty(fund[field]) ? NA : fund[field];
    });
    var dateNodes = root.querySelectorAll("[data-field-date]");
    dateNodes.forEach(function (node) {
      var field = node.getAttribute("data-field-date");
      var value = fund[field];
      node.textContent = isEmpty(value) ? NA : formatDate(value);
    });
  }

  function fillStatusBadge(fund) {
    var badge = document.getElementById("fund-status-badge");
    if (!badge) return;
    if (isEmpty(fund.statusLabel)) {
      badge.style.display = "none";
      return;
    }
    badge.textContent = fund.statusLabel;
    badge.style.display = "inline-block";
  }

  function fillTitleAndMeta(fund) {
    document.title = fund.nome + " — Solar Capital";
  }

  function principalClass(fund) {
    if (!fund.classes || !fund.classes.length) return null;
    if (fund.classePrincipal) {
      var found = fund.classes.filter(function (c) { return c.nome === fund.classePrincipal; })[0];
      if (found) return found;
    }
    return fund.classes[0];
  }

  function renderOverviewRentabilidade(fund) {
    var container = document.getElementById("overview-rentabilidade");
    if (!container) return;
    var cls = principalClass(fund);
    if (!cls) {
      container.innerHTML = "<p>" + NA + "</p>";
      return;
    }
    var primaryRow =
      "<div class=\"stat-primary\"><dt>Mês</dt><dd>" + formatPercent(cls.mes) + "</dd></div>" +
      "<div><dt>Ano</dt><dd>" + formatPercent(cls.ano) + "</dd></div>" +
      "<div><dt>12 meses</dt><dd>" + formatPercent(cls.dozeMeses) + "</dd></div>";
    var secondaryRow =
      (isEmpty(cls.dozeMeses) ? "" : "<div><dt>% do CDI (12M)</dt><dd>" + formatCdiPercent(cls.cdi12m) + "</dd></div>") +
      "<div><dt>Desde o início</dt><dd>" + formatPercent(cls.desdeInicio) + "</dd></div>" +
      (isEmpty(cls.rating) ? "" : "<div><dt>Rating</dt><dd>" + cls.rating + "</dd></div>");
    container.innerHTML =
      "<div class=\"overview-stats-row overview-stats-row--primary\">" + primaryRow + "</div>" +
      "<div class=\"overview-stats-row overview-stats-row--secondary\">" + secondaryRow + "</div>";
  }

  function renderRetornoAlvo(fund) {
    var tbody = document.getElementById("retorno-alvo-table-body");
    if (!tbody) return;
    if (!fund.classes || !fund.classes.length) {
      tbody.innerHTML = '<tr><td colspan="4">' + NA + "</td></tr>";
      return;
    }
    tbody.innerHTML = fund.classes.map(function (c) {
      return (
        "<tr>" +
          "<td><strong>" + c.nome + "</strong></td>" +
          "<td>" + (isEmpty(c.percentPL) ? NA : Number(c.percentPL).toFixed(2).replace(".", ",") + "%") + "</td>" +
          "<td>" + (isEmpty(c.benchmark) ? "Residual (sem meta fixa)" : c.benchmark) + "</td>" +
          "<td>" + (isEmpty(c.rating) ? NA : c.rating) + "</td>" +
        "</tr>"
      );
    }).join("");
  }

  function renderPortfolio(fund) {
    var container = document.getElementById("portfolio-content");
    if (!container) return;
    if (!fund.composicaoPortfolio || !fund.composicaoPortfolio.length) {
      container.innerHTML = "<p>A composição detalhada da carteira por classe de ativo será publicada aqui assim que disponibilizada pelo administrador nos relatórios mensais.</p>";
      return;
    }
    container.innerHTML = fund.composicaoPortfolio.map(function (p) {
      return (
        '<div class="portfolio-row">' +
          '<div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-size: 0.9rem;"><span>' + p.categoria + '</span><strong>' + p.percent + '%</strong></div>' +
          '<div style="background: var(--color-gray-200); border-radius: 4px; height: 8px;"><div style="background: var(--color-gold-600); border-radius: 4px; height: 8px; width: ' + p.percent + '%;"></div></div>' +
        "</div>"
      );
    }).join("");
  }

  function renderClassesTable(fund) {
    var tbody = document.getElementById("classes-table-body");
    if (!tbody) return;
    if (!fund.classes || !fund.classes.length) {
      tbody.innerHTML = '<tr><td colspan="9">' + NA + "</td></tr>";
      return;
    }
    var rows = [];
    fund.classes.forEach(function (c) {
      rows.push(
        "<tr>" +
          "<td><strong>" + c.nome + "</strong></td>" +
          "<td>" + (isEmpty(c.percentPL) ? NA : Number(c.percentPL).toFixed(2).replace(".", ",") + "%") + "</td>" +
          "<td>" + (isEmpty(c.rating) ? NA : c.rating) + "</td>" +
          '<td class="value ' + percentClass(c.mes) + '">' + formatPercent(c.mes) + "</td>" +
          '<td class="value ' + percentClass(c.ano) + '">' + formatPercent(c.ano) + "</td>" +
          '<td class="value ' + percentClass(c.tresMeses) + '">' + formatPercent(c.tresMeses) + "</td>" +
          '<td class="value ' + percentClass(c.seisMeses) + '">' + formatPercent(c.seisMeses) + "</td>" +
          '<td class="value ' + percentClass(c.dozeMeses) + '">' + formatPercent(c.dozeMeses) + "</td>" +
          '<td class="value ' + percentClass(c.desdeInicio) + '">' + formatPercent(c.desdeInicio) + "</td>" +
        "</tr>"
      );
      rows.push(
        '<tr style="font-style: italic; color: var(--color-muted); font-size: 0.85rem;">' +
          "<td>% do CDI</td>" +
          "<td></td>" +
          "<td></td>" +
          "<td>" + formatCdiPercent(c.cdiMes) + "</td>" +
          "<td>" + formatCdiPercent(c.cdiAno) + "</td>" +
          "<td>" + formatCdiPercent(c.cdi3m) + "</td>" +
          "<td>" + formatCdiPercent(c.cdi6m) + "</td>" +
          "<td>" + formatCdiPercent(c.cdi12m) + "</td>" +
          "<td>" + formatCdiPercent(c.cdiInicio) + "</td>" +
        "</tr>"
      );
    });
    tbody.innerHTML = rows.join("");
  }

  var MONTHS_PT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  function formatMonthShort(iso) {
    var parts = iso.split("-");
    return MONTHS_PT[parseInt(parts[1], 10) - 1] + "-" + parts[0].slice(2);
  }

  function drawChartInto(svgId, boxId, nameElId, cls, dark) {
    var box = document.getElementById(boxId);
    var svg = document.getElementById(svgId);
    var data = cls ? cls.historicoMensal : null;
    var gridColor = dark ? "rgba(255,255,255,0.14)" : "#E4DFD3";
    var axisTextColor = dark ? "rgba(255,255,255,0.5)" : "#7A7568";
    var labelTextColor = dark ? "#FFFFFF" : "#282420";
    var dotStrokeColor = dark ? "#070222" : "#FFFDF6";

    if (!svg) return false;

    if (!data || data.length === 0) {
      if (box) box.style.display = "none";
      return false;
    }

    if (box) box.style.display = "block";
    var nameEl = document.getElementById(nameElId);
    if (nameEl) nameEl.textContent = cls.nome;

    var values = data.map(function (d) { return Number(d.rentabilidade); });
    var dataMin = Math.min.apply(null, values);
    var dataMax = Math.max.apply(null, values);

    // Rentabilidade mensal de crédito estruturado costuma variar pouco
    // (poucas dezenas de pontos-base) — sem um piso de faixa mínima, o
    // auto-zoom do eixo Y transforma uma linha quase reta numa serra,
    // exagerando ruído como se fosse volatilidade real.
    var MIN_RANGE = 1.2;
    var mid = (dataMax + dataMin) / 2;
    var span = Math.max(dataMax - dataMin, MIN_RANGE);
    var min = Math.min(0, mid - span / 2);
    var max = Math.max(0, mid + span / 2);
    var range = max - min;
    var step = Math.pow(10, Math.floor(Math.log(range) / Math.LN10) - 1);
    if (step < 0.25) step = 0.25;
    var niceMin = Math.floor(min / step) * step;
    var niceMax = Math.ceil(max / step) * step;
    if (niceMax === niceMin) niceMax = niceMin + step;

    var singlePoint = data.length === 1;
    var width = 640, height = singlePoint ? 150 : 210;
    var padding = { top: 26, right: 16, bottom: 30, left: 48 };
    var plotW = width - padding.left - padding.right;
    var plotH = height - padding.top - padding.bottom;

    function yFor(v) { return padding.top + (1 - (v - niceMin) / (niceMax - niceMin)) * plotH; }
    function xFor(i) { return padding.left + (singlePoint ? 0.5 : (i / (data.length - 1 || 1))) * plotW; }

    function formatAxisValue(v) {
      return (v >= 0 ? "+" : "") + Number(v).toFixed(1).replace('.', ',') + "%";
    }
    function formatLabelValue(v) {
      return (v >= 0 ? "+" : "") + Number(v).toFixed(2).replace('.', ',') + "%";
    }

    var gridCount = 4;
    var gridSvg = "";
    for (var g = 0; g <= gridCount; g++) {
      var v = niceMin + (niceMax - niceMin) * (g / gridCount);
      var y = yFor(v);
      gridSvg +=
        '<line x1="' + padding.left + '" y1="' + y.toFixed(1) + '" x2="' + (width - padding.right) + '" y2="' + y.toFixed(1) + '" stroke="' + gridColor + '" stroke-width="1" />' +
        '<text x="' + (padding.left - 10) + '" y="' + (y + 3.5).toFixed(1) + '" text-anchor="end" font-size="9.5" fill="' + axisTextColor + '">' + formatAxisValue(v) + '</text>';
    }

    var xLabelIndices = [];
    if (data.length <= 6) {
      for (var i = 0; i < data.length; i++) xLabelIndices.push(i);
    } else {
      var xStep = Math.ceil(data.length / 5);
      for (var i = 0; i < data.length; i += xStep) xLabelIndices.push(i);
      if (xLabelIndices[xLabelIndices.length - 1] !== data.length - 1) xLabelIndices.push(data.length - 1);
    }
    var xLabelsSvg = xLabelIndices.map(function (i) {
      return '<text x="' + xFor(i).toFixed(1) + '" y="' + (height - 8) + '" text-anchor="middle" font-size="9.5" fill="' + axisTextColor + '">' + formatMonthShort(data[i].mes) + '</text>';
    }).join("");

    var path = "M" + xFor(0).toFixed(1) + "," + yFor(values[0]).toFixed(1);
    for (var i = 1; i < values.length; i++) {
      path += " L" + xFor(i).toFixed(1) + "," + yFor(values[i]).toFixed(1);
    }

    var areaPath = path + ' L' + xFor(values.length - 1).toFixed(1) + ',' + (padding.top + plotH).toFixed(1) + ' L' + xFor(0).toFixed(1) + ',' + (padding.top + plotH).toFixed(1) + ' Z';
    var gradientId = 'gradient-' + svgId;

    // Rótulo de valor apenas no primeiro, último e nos extremos (min/max) —
    // com muitos pontos, rotular cada um deixava o gráfico "abarrotado" e
    // ilegível; assim ele comunica tendência e os números-chave sem poluir.
    var minIdx = values.indexOf(dataMin);
    var maxIdx = values.indexOf(dataMax);
    var labelIndices = data.length <= 5
      ? values.map(function (_, i) { return i; })
      : Array.from(new Set([0, minIdx, maxIdx, values.length - 1]));

    var circles = values.map(function (v, i) {
      var cx = xFor(i).toFixed(1);
      var cy = yFor(v);
      var showLabel = labelIndices.indexOf(i) !== -1;
      var r = showLabel ? 3.5 : 2.5;
      var dot = '<circle cx="' + cx + '" cy="' + cy.toFixed(1) + '" r="' + r + '" fill="#E89A14" stroke="' + dotStrokeColor + '" stroke-width="1.2" />';
      if (!showLabel) return dot;
      var nearTop = cy - padding.top < 20;
      var labelY = nearTop ? cy + 18 : cy - 10;
      var anchor = i === 0 ? "start" : (i === values.length - 1 ? "end" : "middle");
      var labelX = i === 0 ? Number(cx) - 4 : (i === values.length - 1 ? Number(cx) + 4 : Number(cx));
      return dot + '<text x="' + labelX.toFixed(1) + '" y="' + labelY.toFixed(1) + '" text-anchor="' + anchor + '" font-size="10.5" font-weight="700" fill="' + labelTextColor + '">' + formatLabelValue(v) + '</text>';
    }).join("");

    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Rentabilidade mensal da classe " + cls.nome + ": " + data.map(function (d) { return formatMonthShort(d.mes) + " " + formatLabelValue(Number(d.rentabilidade)); }).join(", "));
    svg.innerHTML =
      '<defs>' +
        '<linearGradient id="' + gradientId + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#E89A14" stop-opacity="0.24" />' +
          '<stop offset="100%" stop-color="#E89A14" stop-opacity="0" />' +
        '</linearGradient>' +
      '</defs>' +
      gridSvg +
      '<line x1="' + padding.left + '" y1="' + (padding.top + plotH).toFixed(1) + '" x2="' + (width - padding.right) + '" y2="' + (padding.top + plotH).toFixed(1) + '" stroke="' + gridColor + '" stroke-width="1" />' +
      (singlePoint ? '' : '<path d="' + areaPath + '" fill="url(#' + gradientId + ')" />' +
      '<path d="' + path + '" fill="none" stroke="#E89A14" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />') +
      circles + xLabelsSvg;
    return true;
  }

  function renderChart(fund) {
    var cls = principalClass(fund);
    var hasData = !!(cls && cls.historicoMensal && cls.historicoMensal.length);
    var emptyState = document.getElementById("rentabilidade-empty");
    if (emptyState) emptyState.style.display = (!hasData && fund.classes && fund.classes.length) ? "block" : "none";
    drawChartInto("rentabilidade-chart", "rentabilidade-chart-box", "chart-class-name", cls, false);
    var overviewHasChart = drawChartInto("overview-chart", "overview-chart-box", "overview-chart-class-name", cls, true);
    var overviewEmpty = document.getElementById("overview-chart-empty");
    if (overviewEmpty) overviewEmpty.style.display = overviewHasChart ? "none" : "block";
  }

  function renderDocuments(fund) {
    var container = document.getElementById("documentos-list");
    if (!container) return;
    container.innerHTML = fund.documentos.map(function (doc) {
      return (
        '<div class="document-row">' +
          "<span>" + doc.nome + "</span>" +
          '<span class="card-badge">' + (doc.disponivel ? "Disponível" : "Em breve") + "</span>" +
        "</div>"
      );
    }).join("");
  }

  function setupTabs() {
    var buttons = document.querySelectorAll(".tab-btn");
    var panels = document.querySelectorAll(".tab-panel");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");

        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        panels.forEach(function (p) { p.classList.remove("is-active"); });

        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        var panel = document.querySelector('.tab-panel[data-tab-panel="' + target + '"]');
        if (panel) panel.classList.add("is-active");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var slug = getParam("fundo");
    var fund = slug ? findFund(slug) : null;

    var content = document.getElementById("fund-content");
    var notFound = document.getElementById("fund-not-found");

    if (!fund) {
      if (content) content.style.display = "none";
      if (notFound) notFound.style.display = "block";
      return;
    }

    if (notFound) notFound.style.display = "none";
    if (content) content.style.display = "block";

    fillTitleAndMeta(fund);
    fillStatusBadge(fund);
    fillTextFields(document, fund);
    renderOverviewRentabilidade(fund);
    renderRetornoAlvo(fund);
    renderClassesTable(fund);
    renderChart(fund);
    renderPortfolio(fund);
    renderDocuments(fund);
    setupTabs();
    injectIcons(document);
  });
})();
