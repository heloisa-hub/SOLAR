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

  // Subordinada/Júnior é residual por desenho (recebe o que sobra depois das
  // classes seniores/mezanino — não tem meta fixa por definição). Outras
  // classes que não tenham benchmark declarado nas fontes disponíveis não são
  // "residuais": só não temos o número. Rotular as duas situações da mesma
  // forma sugeriria (errado) que uma classe sênior sem meta divulgada não tem
  // prioridade de pagamento, quando na verdade só falta o dado na fonte.
  function isResidualClass(nome) {
    var n = (nome || "").toLowerCase();
    return n.indexOf("subordinada") !== -1 || n.indexOf("júnior") !== -1 || n.indexOf("junior") !== -1;
  }

  // Estrutura de capital (era a aba "Retorno-alvo" — agora vive dentro de
  // Estrutura, com uma coluna a mais de prazo/amortização quando divulgado).
  function renderEstrutura(fund) {
    var tbody = document.getElementById("estrutura-table-body");
    if (!tbody) return;
    if (!fund.classes || !fund.classes.length) {
      tbody.innerHTML = '<tr><td colspan="5">' + NA + "</td></tr>";
      return;
    }
    tbody.innerHTML = fund.classes.map(function (c) {
      var benchmarkLabel = c.benchmark
        ? c.benchmark
        : (isResidualClass(c.nome) ? "Residual (sem meta fixa)" : "Não divulgado nas fontes disponíveis");
      return (
        "<tr>" +
          "<td><strong>" + c.nome + "</strong></td>" +
          "<td>" + (isEmpty(c.percentPL) ? NA : Number(c.percentPL).toFixed(2).replace(".", ",") + "%") + "</td>" +
          "<td>" + benchmarkLabel + "</td>" +
          "<td>" + (isEmpty(c.rating) ? NA : c.rating) + "</td>" +
          "<td>" + (isEmpty(c.prazo) ? "Não divulgado" : c.prazo) + "</td>" +
        "</tr>"
      );
    }).join("");
  }

  // "A tese em três pontos" (Estratégia) — texto vem de fund.tese, que por
  // sua vez vem do regulamento/objetivo do fundo (dados-fundos/manifest.json
  // e js/funds-data.js), nunca de composicaoPortfolio: a estratégia é o que
  // o fundo se propõe a fazer, não uma leitura do portfólio numa data-base.
  function renderThesis(fund) {
    var container = document.getElementById("thesis-grid");
    if (!container) return;
    var t = fund.tese;
    if (!t) { container.innerHTML = ""; return; }
    var items = [
      { label: "Originação", text: t.originacao },
      { label: "Estrutura de proteção", text: t.protecao },
      { label: "Geração de retorno", text: t.geracaoRetorno }
    ];
    container.innerHTML = items.map(function (it) {
      return (
        '<div class="thesis-card">' +
          '<span class="eyebrow">' + it.label + '</span>' +
          '<p>' + (it.text || NA) + '</p>' +
        '</div>'
      );
    }).join("");
  }

  // Índice de subordinação = 100% - soma do %PL de todas as classes "Sênior*"
  // (protege TODAS as camadas seniores juntas, não só a classe principal —
  // relevante para fundos como o Vialoc, com Sênior3 e Sênior2). Exige %PL
  // preenchido em toda classe sênior; sem isso, retorna null (mostra "—").
  function seniorPercentSum(fund) {
    if (!fund.classes || !fund.classes.length) return null;
    var senioras = fund.classes.filter(function (c) { return /^s[eê]nior/i.test(c.nome || ""); });
    if (!senioras.length) return null;
    var completo = senioras.every(function (c) { return !isEmpty(c.percentPL); });
    if (!completo) return null;
    return senioras.reduce(function (soma, c) { return soma + Number(c.percentPL); }, 0);
  }

  // Os 4 números do topo: PL (já cai em data-field="plAtual"), retorno-alvo
  // da Sênior, parcelas inadimplentes/PL e índice de subordinação.
  function renderHeroStats(fund) {
    var principal = principalClass(fund);
    var retornoEl = document.getElementById("hero-retorno-alvo-senior");
    if (retornoEl) retornoEl.textContent = (principal && principal.benchmark) ? principal.benchmark : NA;

    var inadEl = document.getElementById("hero-inadimplencia");
    if (inadEl) {
      inadEl.textContent = isEmpty(fund.inadimplenciaCvmPercentPL) ? NA : formatCdiPercent(fund.inadimplenciaCvmPercentPL);
    }

    var subEl = document.getElementById("hero-subordinacao");
    if (subEl) {
      var somaSeniores = seniorPercentSum(fund);
      subEl.textContent = somaSeniores === null ? NA : formatCdiPercent(Math.max(0, 100 - somaSeniores));
    }
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

  var MONTHS_PT_LONG = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

  function formatMonthLong(iso) {
    var parts = iso.split("-");
    return MONTHS_PT_LONG[parseInt(parts[1], 10) - 1] + " de " + parts[0];
  }

  function ensureTooltip(box, dark) {
    var tooltip = box.querySelector(".chart-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.className = "chart-tooltip";
      box.appendChild(tooltip);
    }
    tooltip.classList.toggle("chart-tooltip--dark", !!dark);
    return tooltip;
  }

  function attachChartInteractivity(svg, box, opts) {
    var data = opts.data, values = opts.values, xFor = opts.xFor, yFor = opts.yFor;
    var width = opts.width, height = opts.height, padding = opts.padding;
    var dark = opts.dark, formatLabelValue = opts.formatLabelValue, formatMonthLong = opts.formatMonthLong;
    var dotStrokeColor = opts.dotStrokeColor;
    var monthlyValues = opts.monthlyValues, cumulativeValues = opts.cumulativeValues;
    var monthlyIsPrimary = opts.viewMode === "mensal";

    var ns = "http://www.w3.org/2000/svg";
    var guide = document.createElementNS(ns, "line");
    guide.setAttribute("y1", padding.top);
    guide.setAttribute("y2", padding.top + opts.plotH);
    guide.setAttribute("stroke", dark ? "rgba(255,255,255,0.35)" : "rgba(7,2,34,0.25)");
    guide.setAttribute("stroke-width", "1");
    guide.setAttribute("stroke-dasharray", "3,3");
    guide.style.opacity = "0";
    svg.appendChild(guide);

    var highlight = document.createElementNS(ns, "circle");
    highlight.setAttribute("r", "5");
    highlight.setAttribute("fill", "#E89A14");
    highlight.setAttribute("stroke", dotStrokeColor);
    highlight.setAttribute("stroke-width", "2");
    highlight.style.opacity = "0";
    svg.appendChild(highlight);

    var overlay = document.createElementNS(ns, "rect");
    overlay.setAttribute("x", padding.left);
    overlay.setAttribute("y", 0);
    overlay.setAttribute("width", Math.max(width - padding.left - padding.right, 1));
    overlay.setAttribute("height", height);
    overlay.setAttribute("fill", "#000000");
    overlay.setAttribute("fill-opacity", "0");
    overlay.style.pointerEvents = "all";
    overlay.style.cursor = "crosshair";
    svg.appendChild(overlay);

    var tooltip = ensureTooltip(box, dark);

    function nearestIndex(svgX) {
      var best = 0, bestDist = Infinity;
      for (var i = 0; i < data.length; i++) {
        var d = Math.abs(xFor(i) - svgX);
        if (d < bestDist) { bestDist = d; best = i; }
      }
      return best;
    }

    function showAt(idx) {
      var cx = xFor(idx), cy = yFor(values[idx]);
      guide.setAttribute("x1", cx); guide.setAttribute("x2", cx);
      guide.style.opacity = "1";
      highlight.setAttribute("cx", cx); highlight.setAttribute("cy", cy);
      highlight.style.opacity = "1";

      var rect = svg.getBoundingClientRect();
      var scale = rect.width / width;
      var boxRect = box.getBoundingClientRect();
      var leftPx = (cx * scale) + (rect.left - boxRect.left);
      var topPx = (cy * scale) + (rect.top - boxRect.top);

      // O hover sempre mostra os dois números juntos — mês e acumulado
      // desde o início — não só o que está sendo desenhado no momento.
      // Quem passa o mouse quer comparar "quanto rendeu esse mês" com
      // "quanto rendeu no total" sem precisar trocar o toggle.
      var mesVal = monthlyValues ? monthlyValues[idx] : null;
      var acumVal = cumulativeValues ? cumulativeValues[idx] : null;
      var rows = [];
      if (monthlyIsPrimary) {
        if (mesVal != null) rows.push('<span class="chart-tooltip-value">Mês: ' + formatLabelValue(mesVal) + '</span>');
        if (acumVal != null) rows.push('<span class="chart-tooltip-value chart-tooltip-value--secondary">Desde o início: ' + formatLabelValue(acumVal) + '</span>');
      } else {
        if (acumVal != null) rows.push('<span class="chart-tooltip-value">Desde o início: ' + formatLabelValue(acumVal) + '</span>');
        if (mesVal != null) rows.push('<span class="chart-tooltip-value chart-tooltip-value--secondary">Mês: ' + formatLabelValue(mesVal) + '</span>');
      }
      tooltip.innerHTML =
        '<span class="chart-tooltip-date">' + formatMonthLong(data[idx].mes) + '</span>' +
        rows.join("");
      tooltip.style.opacity = "1";
      var tw = tooltip.offsetWidth || 120;
      var clampedLeft = Math.min(Math.max(leftPx, tw / 2 + 4), boxRect.width - tw / 2 - 4);
      tooltip.style.left = clampedLeft + "px";
      tooltip.style.top = Math.max(topPx - 14, 4) + "px";
    }

    function hide() {
      guide.style.opacity = "0";
      highlight.style.opacity = "0";
      tooltip.style.opacity = "0";
    }

    function onMove(evt) {
      var point = evt.touches ? evt.touches[0] : evt;
      var rect = svg.getBoundingClientRect();
      var scale = width / rect.width;
      var svgX = (point.clientX - rect.left) * scale;
      showAt(nearestIndex(svgX));
    }

    overlay.addEventListener("mousemove", onMove);
    overlay.addEventListener("mouseleave", hide);
    overlay.addEventListener("touchstart", onMove, { passive: true });
    overlay.addEventListener("touchmove", onMove, { passive: true });
    overlay.addEventListener("touchend", hide);
  }

  // Composição geométrica dos retornos mensais num índice acumulado (base 0%
  // no mês anterior ao início da série). Ex.: +1%, +1% seguidos viram
  // +1,00%, +2,01% acumulados — não +1%, +2% (soma simples subestima o
  // efeito de juros compostos, que é real mesmo em janelas curtas).
  function computeCumulativeSeries(historicoMensal) {
    var acc = 1;
    return (historicoMensal || []).map(function (d) {
      acc *= (1 + Number(d.rentabilidade) / 100);
      return { mes: d.mes, rentabilidade: (acc - 1) * 100 };
    });
  }

  function drawChartInto(svgId, boxId, nameElId, cls, dark, viewMode) {
    var box = document.getElementById(boxId);
    var svg = document.getElementById(svgId);
    var cumulativeSeries = cls ? computeCumulativeSeries(cls.historicoMensal) : null;
    var data = cls
      ? (viewMode === "mensal" ? cls.historicoMensal : cumulativeSeries)
      : null;
    var gridColor = dark ? "rgba(255,255,255,0.14)" : "#E4DFD3";
    var axisTextColor = dark ? "rgba(255,255,255,0.5)" : "#7A7568";
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
    var width = 640, height = singlePoint ? 130 : 170;
    var padding = { top: 24, right: 20, bottom: 28, left: 46 };
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

    // Rótulo em todo ponto polui a curva — mas o pedido é explícito por
    // rótulo de dado visível, não só no hover. Meio-termo: rótulo fixo só
    // no primeiro e no último ponto (o "de onde partiu" / "onde chegou" —
    // o que qualquer leitor quer ver de cara), demais valores seguem no
    // hover via attachChartInteractivity.
    var circles = values.map(function (v, i) {
      var cx = xFor(i).toFixed(1);
      var cy = yFor(v).toFixed(1);
      return '<circle cx="' + cx + '" cy="' + cy + '" r="2" fill="#E89A14" stroke="' + dotStrokeColor + '" stroke-width="1" />';
    }).join("");

    var labelColor = dark ? "#FFFFFF" : "#070222";
    var endpointLabels = "";
    if (values.length >= 1) {
      var lastIdx = values.length - 1;
      var lastX = xFor(lastIdx);
      var lastY = yFor(values[lastIdx]);
      var lastAbove = lastY - padding.top > 14;
      endpointLabels +=
        '<text x="' + lastX.toFixed(1) + '" y="' + (lastAbove ? lastY - 9 : lastY + 16).toFixed(1) +
        '" text-anchor="' + (lastIdx === 0 ? "middle" : "end") + '" font-size="11" font-weight="700" fill="' + labelColor + '">' +
        formatLabelValue(values[lastIdx]) + '</text>';
    }
    if (values.length >= 2) {
      var firstY = yFor(values[0]);
      var firstAbove = firstY - padding.top > 14;
      endpointLabels +=
        '<text x="' + xFor(0).toFixed(1) + '" y="' + (firstAbove ? firstY - 9 : firstY + 16).toFixed(1) +
        '" text-anchor="start" font-size="10" fill="' + (dark ? "rgba(255,255,255,0.55)" : "#7A7568") + '">' +
        formatLabelValue(values[0]) + '</text>';
    }

    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("role", "img");
    var ariaKind = viewMode === "mensal" ? "Rentabilidade mensal" : "Rentabilidade acumulada desde o início";
    svg.setAttribute("aria-label", ariaKind + " da classe " + cls.nome + ": " + data.map(function (d) { return formatMonthShort(d.mes) + " " + formatLabelValue(Number(d.rentabilidade)); }).join(", "));
    svg.innerHTML =
      '<defs>' +
        '<linearGradient id="' + gradientId + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#E89A14" stop-opacity="0.12" />' +
          '<stop offset="100%" stop-color="#E89A14" stop-opacity="0" />' +
        '</linearGradient>' +
      '</defs>' +
      gridSvg +
      '<line x1="' + padding.left + '" y1="' + (padding.top + plotH).toFixed(1) + '" x2="' + (width - padding.right) + '" y2="' + (padding.top + plotH).toFixed(1) + '" stroke="' + gridColor + '" stroke-width="1" />' +
      (singlePoint ? '' : '<path d="' + areaPath + '" fill="url(#' + gradientId + ')" />' +
      '<path d="' + path + '" fill="none" stroke="#E89A14" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />') +
      circles + xLabelsSvg + endpointLabels;

    if (box) {
      attachChartInteractivity(svg, box, {
        data: data, values: values, xFor: xFor, yFor: yFor,
        width: width, height: height, padding: padding, plotH: plotH,
        dark: dark, formatLabelValue: formatLabelValue, formatMonthLong: formatMonthLong,
        dotStrokeColor: dotStrokeColor, viewMode: viewMode,
        monthlyValues: cls && cls.historicoMensal ? cls.historicoMensal.map(function (d) { return Number(d.rentabilidade); }) : null,
        cumulativeValues: cumulativeSeries ? cumulativeSeries.map(function (d) { return Number(d.rentabilidade); }) : null
      });
    }
    return true;
  }

  function classesWithHistory(fund) {
    return (fund.classes || []).filter(function (c) { return c.historicoMensal && c.historicoMensal.length; });
  }

  // A aba Rentabilidade já mostra todas as classes lado a lado na tabela de
  // resumo (Mês/Ano/3M/6M/12M/Desde início), mas o gráfico de série mensal só
  // cabe uma classe por vez. Para fundos com mais de uma classe com
  // histórico, um seletor deixa o visitante trocar qual classe o gráfico
  // mostra — sem isso, o mês a mês completo de Mezanino/Subordinada (por
  // exemplo) simplesmente não aparecia em lugar nenhum da página.
  function renderChartClassPicker(fund, selectedNome, onSelect) {
    var picker = document.getElementById("rentabilidade-class-picker");
    if (!picker) return;
    var withHistory = classesWithHistory(fund);
    if (withHistory.length < 2) {
      picker.style.display = "none";
      picker.innerHTML = "";
      return;
    }
    picker.style.display = "flex";
    picker.innerHTML = withHistory.map(function (c) {
      var active = c.nome === selectedNome ? " is-active" : "";
      return '<button type="button" class="chart-class-picker-btn' + active + '" data-classe="' +
        c.nome.replace(/"/g, "&quot;") + '" aria-pressed="' + (c.nome === selectedNome) + '">' + c.nome + "</button>";
    }).join("");
    Array.prototype.forEach.call(picker.querySelectorAll(".chart-class-picker-btn"), function (btn) {
      btn.addEventListener("click", function () { onSelect(btn.getAttribute("data-classe")); });
    });
  }

  function renderChart(fund) {
    var principal = principalClass(fund);
    var withHistory = classesWithHistory(fund);
    var hasData = withHistory.length > 0;
    var emptyState = document.getElementById("rentabilidade-empty");
    if (emptyState) emptyState.style.display = (!hasData && fund.classes && fund.classes.length) ? "block" : "none";

    // "Desde o início" é a visão padrão (o que a maioria quer ver primeiro:
    // quanto rendeu no total) — "Mensal" fica disponível para quem quer o
    // detalhe mês a mês, que já existia antes deste toggle.
    var viewMode = "acumulado";
    var modeLabelEl = document.getElementById("chart-mode-label");

    function updateModeLabel() {
      if (modeLabelEl) modeLabelEl.textContent = viewMode === "mensal" ? "Rentabilidade mensal" : "Rentabilidade acumulada desde o início";
    }

    var currentClassNome = null;

    function selectClass(nome) {
      var cls = withHistory.filter(function (c) { return c.nome === nome; })[0] ||
        (principal && principal.historicoMensal && principal.historicoMensal.length ? principal : withHistory[0]);
      currentClassNome = cls ? cls.nome : null;
      drawChartInto("rentabilidade-chart", "rentabilidade-chart-box", "chart-class-name", cls, false, viewMode);
      renderChartClassPicker(fund, currentClassNome, selectClass);
      updateModeLabel();
    }

    var initial = (principal && principal.historicoMensal && principal.historicoMensal.length) ? principal : withHistory[0];
    selectClass(initial ? initial.nome : null);

    var toggle = document.getElementById("rentabilidade-view-toggle");
    if (toggle) {
      Array.prototype.forEach.call(toggle.querySelectorAll(".chart-class-picker-btn"), function (btn) {
        btn.addEventListener("click", function () {
          viewMode = btn.getAttribute("data-modo");
          Array.prototype.forEach.call(toggle.querySelectorAll(".chart-class-picker-btn"), function (b) {
            b.classList.toggle("is-active", b === btn);
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
          });
          selectClass(currentClassNome);
        });
      });
    }

    // A Visão Geral mostra só a classe principal, sempre acumulada desde o
    // início (é um resumo rápido, não a análise completa) — o toggle e o
    // seletor de classe ficam só na aba Rentabilidade.
    var overviewHasChart = drawChartInto("overview-chart", "overview-chart-box", "overview-chart-class-name", principal, true, "acumulado");
    var overviewEmpty = document.getElementById("overview-chart-empty");
    if (overviewEmpty) overviewEmpty.style.display = overviewHasChart ? "none" : "block";
  }

  function renderDocuments(fund) {
    var container = document.getElementById("documentos-list");
    if (!container) return;
    container.innerHTML = fund.documentos.map(function (doc) {
      var badge = doc.disponivel && doc.url
        ? '<a class="card-badge card-badge--link" href="' + doc.url + '" target="_blank" rel="noopener">Baixar PDF ↓</a>'
        : '<span class="card-badge">' + (doc.disponivel ? "Disponível" : "Em breve") + "</span>";
      return (
        '<div class="document-row">' +
          "<span>" + doc.nome + "</span>" +
          badge +
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
    renderHeroStats(fund);
    renderOverviewRentabilidade(fund);
    renderEstrutura(fund);
    renderThesis(fund);
    renderClassesTable(fund);
    renderChart(fund);
    renderPortfolio(fund);
    renderDocuments(fund);
    setupTabs();
    injectIcons(document);
  });
})();
