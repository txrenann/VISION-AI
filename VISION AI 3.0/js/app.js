/* =========================================================
   VISION — app.js
   Projeto Sou Cientista • EREM Padre Nércio Rodrigues • 2ºA
   Depende de: js/questions.js (define QUESTIONS)
   ========================================================= */

const QUIZ_SIZE = 5;

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const state = {
    quiz: { questions: [], options: [], current: 0, score: 0, answered: false, running: false, misses: [] }
};

/* armazenamento seguro (funciona mesmo se o navegador bloquear) */
const store = {
    get(key, fallback = null) {
        try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
        catch { return fallback; }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignora */ }
    }
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* =========================================================
   NAVEGAÇÃO (usa o hash da URL, então o botão "voltar" funciona)
   ========================================================= */

function show(id) {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains("screen")) id = "home";

    $$(".screen").forEach(s => s.classList.toggle("active", s.id === id));
    $$(".bottom-nav button").forEach(b => b.classList.toggle("active", b.dataset.go === id));

    if (id === "quiz" && !state.quiz.running) renderQuizStart();

    window.scrollTo({ top: 0 });
}

function openSection(id) {
    if (location.hash.slice(1) === id) show(id);
    else location.hash = id;
}

function showHome() { openSection("home"); }

window.addEventListener("hashchange", () => show(location.hash.slice(1) || "home"));

/* =========================================================
   ABAS
   ========================================================= */

function switchTab(button) {
    const box = button.closest(".tabbed");
    if (!box) return;
    box.querySelectorAll(":scope > .tabs button").forEach(b => b.classList.toggle("active", b === button));
    box.querySelectorAll(":scope > .tab-panel").forEach(p => p.classList.toggle("active", p.id === button.dataset.tab));
}

/* filtro da Home */
function filterCards(filter) {
    $$("#homeFilter .chip").forEach(c => c.classList.toggle("active", c.dataset.filter === filter));
    $$(".cards .card").forEach(card => {
        const subjects = card.dataset.subjects.split(" ");
        card.classList.toggle("hide", filter !== "all" && !subjects.includes(filter));
    });
}

/* =========================================================
   OLHO HUMANO
   ========================================================= */

const EYE = {
    cornea: {
        title: "Córnea", area: "Biologia • Física",
        text: "Camada transparente na frente do olho. Ela faz a maior parte da refração (desvio) da luz, cerca de dois terços do poder de focalização do olho.",
        camera: "a lente frontal da objetiva, que também protege o interior."
    },
    iris: {
        title: "Íris", area: "Biologia",
        text: "Estrutura muscular colorida (a cor vem da melanina). Seus músculos abrem e fecham a pupila conforme a quantidade de luz.",
        camera: "o diafragma, que controla a abertura."
    },
    pupila: {
        title: "Pupila", area: "Biologia • Física",
        text: "Abertura no centro da íris por onde a luz entra. Com muita luz ela diminui (miose); no escuro, aumenta (midríase). Mexa no controle de luz para ver!",
        camera: "a abertura do diafragma (número f)."
    },
    cristalino: {
        title: "Cristalino", area: "Biologia • Física",
        text: "Lente flexível e transparente. Os músculos ciliares mudam sua curvatura para focar de perto ou de longe, processo chamado acomodação.",
        camera: "a lente com foco automático."
    },
    vitreo: {
        title: "Humor vítreo", area: "Biologia",
        text: "Gel transparente que preenche o olho, mantém seu formato e permite que a luz chegue à retina.",
        camera: "o espaço interno entre a lente e o sensor."
    },
    retina: {
        title: "Retina", area: "Biologia • Física",
        text: "Tecido nervoso com cones (cores e detalhes) e bastonetes (pouca luz). Transforma luz em impulsos elétricos. A imagem se forma invertida e o cérebro a interpreta.",
        camera: "o filme (analógica) ou o sensor CMOS/CCD (digital)."
    },
    fovea: {
        title: "Fóvea", area: "Biologia",
        text: "Pequena região da retina com maior concentração de cones. É onde a visão é mais nítida, usada para ler e reconhecer rostos.",
        camera: "o centro do sensor, onde está a maior nitidez (analogia)."
    },
    nervo: {
        title: "Nervo óptico", area: "Biologia",
        text: "Leva os impulsos da retina ao cérebro. No ponto em que ele sai do olho não há receptores de luz, e por isso existe o ponto cego.",
        camera: "o cabo que leva os dados do sensor ao processador."
    }
};

function showEyeInfo(part) {
    const data = EYE[part];
    if (!data) return;

    $$(".eye-part").forEach(p => p.classList.toggle("active", p.dataset.part === part));
    $$("#eyeChips .chip").forEach(c => c.classList.toggle("active", c.dataset.part === part));

    $("#eyeInfo").innerHTML = `
        <span class="info-label">ESTRUTURA DO OLHO • ${data.area.toUpperCase()}</span>
        <h3>${data.title}</h3>
        <p>${data.text}</p>
        <p class="cam-note">📷 <b>Na câmera:</b> ${data.camera}</p>`;
}

/* luz do ambiente → tamanho da pupila + raios */
function setLight(value) {
    const p = 36 - (value / 100) * 28;                 /* meia-abertura da pupila: 36 (escuro) → 8 (claro) */
    const gapTop = 150 - p, gapBottom = 150 + p;

    $("#irisTop").setAttribute("height", gapTop - 84);
    $("#irisBot").setAttribute("y", gapBottom);
    $("#irisBot").setAttribute("height", 216 - gapBottom);
    $("#pupilHit").setAttribute("y", gapTop);
    $("#pupilHit").setAttribute("height", p * 2);

    const frontPupil = $("#frontPupil");
    if (frontPupil) {
        /* perfil: p 36 (escuro) → 8 (claro); frente: raio 58 → 16 */
        const r = 16 + ((p - 8) / 28) * 42;
        frontPupil.setAttribute("r", r.toFixed(1));
    }

    const opacity = (0.3 + (value / 100) * 0.7).toFixed(2);
    $("#rays").innerHTML = [-40, -30, -20, -10, 0, 10, 20, 30, 40].map(offset => {
        const y = 150 + offset;
        return Math.abs(offset) <= p
            ? `<path class="ray" style="opacity:${opacity}" d="M24 ${y} L252 ${y} L421 150"/>`
            : `<path class="ray blocked" d="M24 ${y} L214 ${y}"/>`;
    }).join("");

    const mm = 2 + ((p - 8) / 28) * 6;                 /* aproximadamente 2 a 8 mm */
    $("#lightVal").textContent = value + "%";
    $("#pupilReadout").innerHTML =
        `Abertura da pupila ≈ <b>${mm.toFixed(1)} mm</b> • ` +
        (value > 66 ? "muita luz: pupila pequena" : value < 33 ? "pouca luz: pupila grande" : "luz moderada");
}

/* =========================================================
   CÂMARA ESCURA
   ========================================================= */

function updatePinhole() {
    const h = +$("#holeRange").value;
    const d = +$("#distRange").value;

    const WALL = 260, SCREEN = 450, DEPTH = SCREEN - WALL, TOP = 70, AXIS = 130;
    const objX = WALL - d;
    const k = (d + DEPTH) / d;
    const screenY = edge => TOP + (edge - TOP) * k;

    const yTop = screenY(AXIS - h / 2);
    const yBot = screenY(AXIS + h / 2);
    const imgEnd = AXIS + (AXIS - TOP) * DEPTH / d;

    $("#objLine").setAttribute("x1", objX);
    $("#objLine").setAttribute("x2", objX);
    $("#objFlame").setAttribute("cx", objX);
    $("#objLbl").setAttribute("x", objX);

    $("#cone").setAttribute("points", `${objX},${TOP} ${SCREEN},${yTop.toFixed(1)} ${SCREEN},${yBot.toFixed(1)}`);

    $("#wallTop").setAttribute("height", AXIS - h / 2 - 40);
    $("#wallBot").setAttribute("y", AXIS + h / 2);
    $("#wallBot").setAttribute("height", 250 - (AXIS + h / 2));

    $("#imgLine").setAttribute("y2", imgEnd.toFixed(1));
    $("#imgFlame").setAttribute("cy", imgEnd.toFixed(1));
    $("#camBlurStd").setAttribute("stdDeviation", ((yBot - yTop) / 5).toFixed(2));
    $("#imgGroup").style.opacity = Math.min(1, 0.35 + (h / 24) * 0.65).toFixed(2);

    $("#holeVal").textContent = h + " mm";
    $("#distVal").textContent = d + " cm";

    const quality = h <= 6 ? "nítida, porém escura"
                  : h <= 14 ? "um pouco borrada e mais clara"
                  : "bem borrada, porém clara";
    $("#pinReadout").innerHTML =
        `Imagem <b>${quality}</b>. Tamanho: <b>${(DEPTH / d).toFixed(2)}×</b> o do objeto, e <b>invertida</b>.`;
}

/* =========================================================
   LUZ E CORES
   ========================================================= */

function wavelengthToRGB(w) {
    let r = 0, g = 0, b = 0;
    if (w < 440)      { r = -(w - 440) / 60; b = 1; }
    else if (w < 490) { g = (w - 440) / 50;  b = 1; }
    else if (w < 510) { g = 1; b = -(w - 510) / 20; }
    else if (w < 580) { r = (w - 510) / 70;  g = 1; }
    else if (w < 645) { r = 1; g = -(w - 645) / 65; }
    else              { r = 1; }

    const f = w < 420 ? 0.3 + 0.7 * (w - 380) / 40
            : w > 700 ? 0.3 + 0.7 * (750 - w) / 50
            : 1;

    return [r, g, b].map(c => Math.round(255 * Math.pow(Math.max(c * f, 0), 0.8)));
}

function colorName(w) {
    if (w < 450) return "violeta";
    if (w < 495) return "azul";
    if (w < 570) return "verde";
    if (w < 590) return "amarelo";
    if (w < 620) return "laranja";
    return "vermelho";
}

const cone = (w, mu, sigma) => Math.exp(-0.5 * Math.pow((w - mu) / sigma, 2));

function updateSpectrum() {
    const w = +$("#waveRange").value;
    const [r, g, b] = wavelengthToRGB(w);

    $("#waveSwatch").style.background = `rgb(${r},${g},${b})`;
    $("#waveVal").textContent = w + " nm";
    $("#waveText").innerHTML =
        `<b>${colorName(w)}</b> • frequência ≈ <b>${(299792.458 / w).toFixed(0)} THz</b>`;

    $("#coneS").style.width = (cone(w, 440, 22) * 100).toFixed(0) + "%";
    $("#coneM").style.width = (cone(w, 535, 38) * 100).toFixed(0) + "%";
    $("#coneL").style.width = (cone(w, 565, 42) * 100).toFixed(0) + "%";
}

function updateRGB() {
    const [r, g, b] = ["rR", "rG", "rB"].map(id => +document.getElementById(id).value);
    const hex = "#" + [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("").toUpperCase();

    $("#mixSwatch").style.background = `rgb(${r},${g},${b})`;
    $("#rRv").textContent = r;
    $("#rGv").textContent = g;
    $("#rBv").textContent = b;
    $("#mixText").innerHTML = `rgb(${r}, ${g}, ${b}) • <b>${hex}</b>`;
}

const LIGHTS  = { branca: [1, 1, 1], vermelha: [1, 0, 0], verde: [0, 1, 0], azul: [0, 0, 1] };
const OBJECTS = { vermelho: [230, 40, 40], verde: [40, 200, 90], azul: [50, 90, 240], branco: [245, 245, 245] };
const pick = { light: "branca", obj: "vermelho" };

function updateObjectColor() {
    const L = LIGHTS[pick.light], O = OBJECTS[pick.obj];
    const rgb = O.map((c, i) => Math.round(c * L[i]));
    const brightness = (rgb[0] + rgb[1] + rgb[2]) / 3;

    $("#objSwatch").style.background = `rgb(${rgb.join(",")})`;
    $("#objText").innerHTML = brightness < 25
        ? `O objeto <b>${pick.obj}</b> absorve quase toda a luz <b>${pick.light}</b> e parece <b>preto</b>.`
        : `O objeto <b>${pick.obj}</b> reflete parte da luz <b>${pick.light}</b>. Sua cor é a que chega aos nossos olhos.`;
}

/* =========================================================
   DOENÇAS VISUAIS
   ========================================================= */

const DISEASES = {
    normal: {
        title: "Visão normal", area: "Biologia • Física",
        causa: "A luz converge exatamente sobre a retina, formando uma imagem nítida.",
        correcao: "Não precisa de correção. Consultas periódicas ao oftalmologista continuam importantes."
    },
    miopia: {
        title: "Miopia", area: "Biologia • Física",
        causa: "O olho é alongado ou o sistema óptico converge demais: a imagem se forma antes da retina e objetos distantes ficam borrados.",
        correcao: "Lentes divergentes (côncavas) afastam o foco para a retina."
    },
    hipermetropia: {
        title: "Hipermetropia", area: "Biologia • Física",
        causa: "O olho é curto ou converge pouco: o foco fica depois da retina. A dificuldade costuma ser maior para perto.",
        correcao: "Lentes convergentes (convexas)."
    },
    astigmatismo: {
        title: "Astigmatismo", area: "Biologia • Física",
        causa: "A córnea ou o cristalino tem curvatura irregular, e os raios focam em pontos diferentes. A imagem fica distorcida em uma direção.",
        correcao: "Lentes cilíndricas (tóricas)."
    },
    catarata: {
        title: "Catarata", area: "Biologia • Química",
        causa: "O cristalino perde a transparência (alteração nas proteínas), espalhando a luz. A visão fica turva e as cores desbotadas.",
        correcao: "Cirurgia: o cristalino é substituído por uma lente artificial."
    },
    glaucoma: {
        title: "Glaucoma", area: "Biologia",
        causa: "Lesão do nervo óptico, em geral ligada à pressão elevada dentro do olho. Reduz o campo de visão e pode causar visão em túnel. No início, quase não dá sintomas.",
        correcao: "Colírios, laser ou cirurgia. O diagnóstico precoce é essencial."
    },
    daltonismo: {
        title: "Daltonismo", area: "Biologia • Física",
        causa: "Alteração nos cones, em geral de origem genética, que dificulta distinguir certas cores (mais comum entre vermelho e verde). A simulação mostrada é aproximada.",
        correcao: "Não tem cura, mas há recursos de adaptação. O diagnóstico é feito por testes, como o de Ishihara."
    }
};

function setDisease(key) {
    const d = DISEASES[key];
    if (!d) return;

    $("#simScene").dataset.mode = key;
    $$("#diseaseChips .chip").forEach(c => c.classList.toggle("active", c.dataset.disease === key));
    $("#simSliderWrap").classList.toggle("hidden", key === "normal" || key === "daltonismo");

    $("#diseaseInfo").innerHTML = `
        <span class="info-label">${d.area.toUpperCase()}</span>
        <h3>${d.title}</h3>
        <p><b>O que acontece:</b> ${d.causa}</p>
        <p><b>Correção / tratamento:</b> ${d.correcao}</p>
        <p class="note">Conteúdo educativo e simulação aproximada. Diagnóstico e tratamento são feitos por oftalmologista.</p>`;
}

function setSim(value) {
    $("#simScene").style.setProperty("--sim", value / 100);
    $("#astigStd").setAttribute("stdDeviation", `${((value / 100) * 9).toFixed(1)} 0.3`);
    $("#simVal").textContent = value + "%";
}

/* =========================================================
   QUÍMICA
   ========================================================= */

const ELEMENTS = {
    Ag: { name: "Prata", z: 47,
          uso: "Haletos de prata (AgBr) são os cristais sensíveis à luz do filme fotográfico.",
          cuidado: "Pode ser recuperada de resíduos de revelação e de placas eletrônicas. Evite descartar no esgoto." },
    Si: { name: "Silício", z: 14,
          uso: "Material dos sensores CMOS/CCD e de chips. É um semicondutor.",
          cuidado: "Os chips ficam em placas que precisam de reciclagem especializada." },
    Li: { name: "Lítio", z: 3,
          uso: "Baterias de íons de lítio de celulares e câmeras.",
          cuidado: "Baterias danificadas podem aquecer e pegar fogo. Descarte em ponto de coleta específico." },
    Cu: { name: "Cobre", z: 29,
          uso: "Fios, trilhas e conectores dos circuitos eletrônicos.",
          cuidado: "É muito reciclável. A reciclagem poupa energia e minério." },
    Au: { name: "Ouro", z: 79,
          uso: "Contatos e conectores, em pequenas quantidades, por não oxidar.",
          cuidado: "Pode ser recuperado em reciclagem de placas, o que reduz a necessidade de nova mineração." },
    Pb: { name: "Chumbo", z: 82,
          uso: "Em soldas antigas e em vidros de alguns equipamentos mais antigos.",
          cuidado: "Metal tóxico que pode contaminar solo e água e se acumular nos seres vivos. Nunca descarte no lixo comum." }
};

function showElement(symbol) {
    const e = ELEMENTS[symbol];
    if (!e) return;

    $$(".tile").forEach(t => t.classList.toggle("active", t.dataset.el === symbol));
    $("#elInfo").innerHTML = `
        <span class="info-label">NÚMERO ATÔMICO ${e.z}</span>
        <h3>${e.name} (${symbol})</h3>
        <p><b>Onde aparece:</b> ${e.uso}</p>
        <p><b>Cuidado / descarte:</b> ${e.cuidado}</p>`;
}

/* =========================================================
   CHECKLIST DE SUSTENTABILIDADE
   ========================================================= */

function updateChecklist() {
    const boxes = $$(".todo input");
    const done = boxes.filter(b => b.checked).length;

    $("#todoBar").style.width = (done / boxes.length) * 100 + "%";
    $("#todoText").textContent = done === boxes.length
        ? "Parabéns! Seu aparelho terá o destino certo ♻️"
        : `${done} de ${boxes.length} passos concluídos`;
}

/* =========================================================
   VISION QUIZ
   ========================================================= */

function renderQuizStart() {
    const box = $("#quizContainer");
    if (!box) return;

    state.quiz.running = false;
    const total = typeof QUESTIONS !== "undefined" ? QUESTIONS.length : 0;
    const best = store.get("visionBest");

    box.innerHTML = `
        <div class="info-card quiz-start">
            <div class="quiz-big-icon">🧠</div>
            <h3>VISION quiz</h3>
            <p>O banco tem ${total} perguntas sobre luz, olho, câmeras, doenças, química e sustentabilidade. Cada partida sorteia ${QUIZ_SIZE}.</p>
            ${best ? `<div class="best">🏆 Melhor resultado: <b>${best.score}/${best.total}</b></div><br>` : ""}
            <button class="start-btn" data-action="start-quiz">Iniciar quiz</button>
        </div>`;
}

function startQuiz() {
    if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
        $("#quizContainer").innerHTML = `
            <div class="info-card">
                <h3>⚠️ Opa!</h3>
                <p>Não foi possível carregar as perguntas. Verifique se o arquivo <b>questions.js</b> está na pasta <b>js</b>.</p>
            </div>`;
        return;
    }

    const quiz = state.quiz;
    quiz.questions = shuffle([...QUESTIONS]).slice(0, Math.min(QUIZ_SIZE, QUESTIONS.length));
    Object.assign(quiz, { current: 0, score: 0, answered: false, running: true, misses: [] });

    openSection("quiz");
    renderQuestion();
}

function renderQuestion() {
    const quiz = state.quiz;
    const q = quiz.questions[quiz.current];
    if (!q) { finishQuiz(); return; }

    quiz.answered = false;
    quiz.options = shuffle(q.options.map((text, i) => ({ text, correct: i === q.answer })));

    const number = quiz.current + 1;
    const total = quiz.questions.length;

    $("#quizContainer").innerHTML = `
        <div class="quiz-question">
            <div class="quiz-top">
                <span>QUESTÃO ${number} DE ${total}</span>
                <strong>${quiz.score} pts</strong>
            </div>
            <div class="quiz-progress"><div class="quiz-progress-fill" style="width:${(number / total) * 100}%"></div></div>

            <div class="quiz-question-card">
                <span class="quiz-label">VISION quiz</span>
                <h3>${q.question}</h3>
                <div class="quiz-options">
                    ${quiz.options.map((o, i) => `
                        <button class="quiz-option" data-index="${i}">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span>${o.text}</span>
                        </button>`).join("")}
                </div>
                <div id="quizFeedback" class="quiz-feedback hidden"></div>
                <button id="nextQuestion" class="start-btn quiz-next hidden" data-action="next">
                    ${number === total ? "Ver resultado" : "Próxima pergunta"}
                </button>
            </div>
        </div>`;
}

function answerQuestion(index) {
    const quiz = state.quiz;
    if (quiz.answered) return;
    quiz.answered = true;

    const q = quiz.questions[quiz.current];
    const chosen = quiz.options[index];
    const ok = chosen.correct;

    if (ok) quiz.score++;
    else quiz.misses.push({ q: q.question, chosen: chosen.text, right: quiz.options.find(o => o.correct).text });

    $$(".quiz-option").forEach((btn, i) => {
        btn.disabled = true;
        if (quiz.options[i].correct) btn.classList.add("correct");
        else if (i === index) btn.classList.add("wrong");
    });

    const fb = $("#quizFeedback");
    fb.className = "quiz-feedback " + (ok ? "feedback-correct" : "feedback-wrong");
    fb.innerHTML = `<strong>${ok ? "✓ Resposta correta!" : "× Resposta incorreta"}</strong>
                    <p>${q.explanation || "Continue explorando o VISION."}</p>`;

    $("#nextQuestion").classList.remove("hidden");
}

function nextQuestion() {
    state.quiz.current++;
    if (state.quiz.current >= state.quiz.questions.length) finishQuiz();
    else renderQuestion();
}

function finishQuiz() {
    const quiz = state.quiz;
    const total = quiz.questions.length;
    const score = quiz.score;
    const pct = total ? Math.round((score / total) * 100) : 0;

    quiz.running = false;

    const best = store.get("visionBest");
    if (!best || pct > best.pct) store.set("visionBest", { score, total, pct });

    const message = pct === 100 ? "Você acertou todas as questões!"
                  : pct >= 80 ? "Excelente resultado!"
                  : pct >= 60 ? "Bom resultado! Continue explorando."
                  : pct >= 40 ? "Você já tem uma boa base."
                  : "Que tal revisar o conteúdo e tentar novamente?";

    const review = quiz.misses.length ? `
        <details class="acc review">
            <summary>Revisar o que errei (${quiz.misses.length})</summary>
            <div class="body">
                ${quiz.misses.map(m => `
                    <p><b>${m.q}</b><br>Você marcou: ${m.chosen}<br>Correta: <b>${m.right}</b></p>`).join("")}
            </div>
        </details>` : "";

    $("#quizContainer").innerHTML = `
        <div class="info-card quiz-result">
            <div class="quiz-result-icon">${pct >= 60 ? "🔬" : "🧠"}</div>
            <span class="quiz-label">RESULTADO</span>
            <h3>${score} / ${total}</h3>
            <div class="quiz-score">${pct}%</div>
            <p>${message}</p>
            <div class="quiz-result-stats">
                <div><strong>${score}</strong><span>Acertos</span></div>
                <div><strong>${total - score}</strong><span>Erros</span></div>
                <div><strong>${total}</strong><span>Perguntas</span></div>
            </div>
            ${review}
            <button class="start-btn" data-action="start-quiz">Jogar novamente</button>
            <button class="back-result" data-go="home">Voltar ao início</button>
        </div>`;
}

/* =========================================================
   EVENTOS (delegação: um único "click" para quase tudo)
   ========================================================= */

document.addEventListener("click", e => {
    const t = e.target;
    let el;

    if ((el = t.closest("[data-go]")))                    return openSection(el.dataset.go);
    if ((el = t.closest(".tabs button[data-tab]")))       return switchTab(el);
    if ((el = t.closest("#homeFilter .chip")))            return filterCards(el.dataset.filter);
    if ((el = t.closest("[data-part]")))                  return showEyeInfo(el.dataset.part);
    if ((el = t.closest("[data-disease]")))               return setDisease(el.dataset.disease);
    if ((el = t.closest("[data-el]")))                    return showElement(el.dataset.el);

    if ((el = t.closest("#lightPick .chip"))) {
        pick.light = el.dataset.light;
        $$("#lightPick .chip").forEach(c => c.classList.toggle("active", c === el));
        return updateObjectColor();
    }
    if ((el = t.closest("#objPick .chip"))) {
        pick.obj = el.dataset.obj;
        $$("#objPick .chip").forEach(c => c.classList.toggle("active", c === el));
        return updateObjectColor();
    }

    if ((el = t.closest("[data-action]"))) {
        if (el.dataset.action === "start-quiz") return startQuiz();
        if (el.dataset.action === "next")       return nextQuestion();
    }

    if ((el = t.closest(".quiz-option"))) return answerQuestion(Number(el.dataset.index));
});

document.addEventListener("change", e => {
    if (e.target.matches(".todo input")) updateChecklist();
});

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* splash */
    const splash = $("#splash");
    if (splash) {
        setTimeout(() => {
            splash.classList.add("splash-hidden");
            setTimeout(() => { splash.style.display = "none"; }, 650);
        }, 1200);
    }

    /* animação escalonada dos cards */
    $$(".cards .card").forEach((card, i) => card.style.setProperty("--i", i));

    /* sliders */
    $("#lightRange").addEventListener("input", e => setLight(+e.target.value));
    $("#holeRange").addEventListener("input", updatePinhole);
    $("#distRange").addEventListener("input", updatePinhole);
    $("#waveRange").addEventListener("input", updateSpectrum);
    ["rR", "rG", "rB"].forEach(id => document.getElementById(id).addEventListener("input", updateRGB));
    $("#simRange").addEventListener("input", e => setSim(+e.target.value));

    /* estado inicial de cada módulo */
    setLight(50);
    updatePinhole();
    updateSpectrum();
    updateRGB();
    updateObjectColor();
    setDisease("normal");
    setSim(60);
    updateChecklist();

    /* tela inicial conforme o endereço */
    show(location.hash.slice(1) || "home");

    /* modo offline (só funciona em http/https) */
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
        navigator.serviceWorker.register("./service-worker.js").catch(err =>
            console.error("VISION: erro no Service Worker.", err));
    }
});

/* funções globais (úteis para testes no console) */
window.openSection = openSection;
window.showHome = showHome;
window.startQuiz = startQuiz;