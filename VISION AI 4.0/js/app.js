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
   DOENÇAS VISUAIS — DOIS OLHOS + VISÃO FUNDIDA
   ========================================================= */

const DISEASES = {
    normal: {
        title: "Visão normal", area: "Biologia • Física",
        causa: "A luz é focalizada adequadamente na retina e a imagem chega ao cérebro com boa nitidez.",
        correcao: "Não há correção refrativa necessária nesta simulação."
    },
    miopia: {
        title: "Miopia", area: "Biologia • Física",
        causa: "O foco tende a se formar antes da retina. Objetos distantes podem parecer borrados.",
        correcao: "Lentes divergentes (côncavas) são usadas para corrigir a miopia."
    },
    hipermetropia: {
        title: "Hipermetropia", area: "Biologia • Física",
        causa: "O foco tende a ficar depois da retina. A dificuldade costuma aparecer principalmente para objetos próximos.",
        correcao: "Lentes convergentes (convexas) são usadas para correção."
    },
    astigmatismo: {
        title: "Astigmatismo", area: "Biologia • Física",
        causa: "A curvatura da córnea ou do cristalino é irregular, fazendo a luz não convergir igualmente em todos os meridianos.",
        correcao: "A correção pode usar lentes cilíndricas ou tóricas, com eixo específico."
    },
    catarata: {
        title: "Catarata", area: "Biologia • Química",
        causa: "O cristalino perde transparência e espalha parte da luz, podendo deixar a imagem turva e as cores menos intensas.",
        correcao: "O tratamento definitivo, quando indicado, é cirúrgico com substituição do cristalino por uma lente intraocular."
    },
    glaucoma: {
        title: "Glaucoma", area: "Biologia",
        causa: "Há dano progressivo do nervo óptico. A alteração do campo visual é uma característica importante, e o início pode ter poucos sintomas.",
        correcao: "O tratamento depende do caso e pode envolver colírios, laser ou cirurgia."
    },
    daltonismo: {
        title: "Daltonismo", area: "Biologia • Física",
        causa: "Alterações nos cones da retina podem dificultar a distinção de determinadas cores, especialmente algumas combinações vermelho-verde.",
        correcao: "Não há uma correção refrativa equivalente a um “grau”; existem recursos de adaptação e testes específicos para diagnóstico."
    }
};

const visionEyes = {
    left: { disease: "normal", degree: 0, cylinder: 0, axis: 0 },
    right: { disease: "normal", degree: 0, cylinder: 0, axis: 0 }
};

function formatDiopter(value) {
    const n = Number(value) || 0;
    return `${n > 0 ? "+" : ""}${n.toFixed(2).replace(".", ",")} D`;
}

function getShortEyeStatus(eye) {
    const names = {
        normal: "Visão normal",
        miopia: `Miopia ${formatDiopter(eye.degree)}`,
        hipermetropia: `Hipermetropia ${formatDiopter(eye.degree)}`,
        astigmatismo: `Astigmatismo ${formatDiopter(eye.cylinder)} • eixo ${Math.round(eye.axis)}°`,
        catarata: "Catarata — simulação",
        glaucoma: "Glaucoma — simulação",
        daltonismo: "Daltonismo — simulação"
    };
    return names[eye.disease] || "Visão normal";
}

function getVisionDescription(eye) {
    const d = DISEASES[eye.disease];
    if (!d) return "";
    if (eye.disease === "miopia" || eye.disease === "hipermetropia") {
        return `${d.title}: ${formatDiopter(eye.degree)}. ${d.causa}`;
    }
    if (eye.disease === "astigmatismo") {
        return `${d.title}: cilindro ${formatDiopter(eye.cylinder)}, eixo ${Math.round(eye.axis)}°. ${d.causa}`;
    }
    return `${d.title}. ${d.causa}`;
}

function getEyeIntensity(eye) {
    switch (eye.disease) {
        case "miopia":
        case "hipermetropia": return Math.min(Math.abs(Number(eye.degree)) / 12, 1);
        case "astigmatismo": return Math.min(Math.abs(Number(eye.cylinder)) / 6, 1);
        case "catarata": return .65;
        case "glaucoma": return .65;
        case "daltonismo": return .35;
        default: return 0;
    }
}

function updateEyeSimulation(side) {
    const eye = visionEyes[side];
    if (!eye) return;

    const prefix = side === "left" ? "left" : "right";
    const scene = document.getElementById(`${prefix}VisionScene`);
    const status = document.getElementById(`${prefix}Status`);
    const reading = document.getElementById(`${prefix}Reading`);
    const degree = document.getElementById(`${prefix}Degree`);
    const cylinder = document.getElementById(`${prefix}Cylinder`);
    const axis = document.getElementById(`${prefix}Axis`);
    const degreeVal = document.getElementById(`${prefix}DegreeVal`);
    const cylinderVal = document.getElementById(`${prefix}CylinderVal`);
    const axisVal = document.getElementById(`${prefix}AxisVal`);

    if (degree) degree.value = eye.degree;
    if (cylinder) cylinder.value = eye.cylinder;
    if (axis) axis.value = eye.axis;
    if (degreeVal) degreeVal.textContent = formatDiopter(eye.degree);
    if (cylinderVal) cylinderVal.textContent = formatDiopter(eye.cylinder);
    if (axisVal) axisVal.textContent = `${Math.round(eye.axis)}°`;
    if (status) status.textContent = getShortEyeStatus(eye);
    if (reading) reading.textContent = getVisionDescription(eye);

    if (scene) {
        scene.dataset.mode = eye.disease;
        scene.style.setProperty("--eye-intensity", getEyeIntensity(eye).toFixed(3));
        scene.style.setProperty("--eye-axis", `${eye.axis}deg`);
        scene.classList.toggle("show-refractive", eye.disease === "miopia" || eye.disease === "hipermetropia");
        scene.classList.toggle("show-cylinder", eye.disease === "astigmatismo");
    }

    updateComparison();
    updateBinocularVision();
}

function setEyeDisease(side, disease) {
    const eye = visionEyes[side];
    if (!eye || !DISEASES[disease]) return;
    eye.disease = disease;

    const prefix = side === "left" ? "left" : "right";
    const cylinderField = document.querySelector(`#${prefix}Cylinder`)?.closest(".cylinder-field");
    const axisField = document.querySelector(`#${prefix}Axis`)?.closest(".axis-field");
    const refractiveFields = document.querySelectorAll(`#${prefix}Degree`);

    const isAstig = disease === "astigmatismo";
    const isRefractive = disease === "miopia" || disease === "hipermetropia";
    if (cylinderField) cylinderField.classList.toggle("field-disabled", !isAstig);
    if (axisField) axisField.classList.toggle("field-disabled", !isAstig);
    refractiveFields.forEach(input => input.closest(".vision-field")?.classList.toggle("field-disabled", !isRefractive));

    if (!isRefractive) eye.degree = 0;
    if (!isAstig) { eye.cylinder = 0; eye.axis = 0; }
    updateEyeSimulation(side);
}

function updateComparison() {
    const left = visionEyes.left;
    const right = visionEyes.right;
    const title = $("#visionComparisonTitle");
    const text = $("#visionComparisonText");
    if (!title || !text) return;

    const difference = Math.abs(getEyeIntensity(left) - getEyeIntensity(right));
    if (difference < .12 && left.disease === right.disease) {
        title.textContent = "Os dois olhos estão em condições semelhantes";
        text.textContent = "As duas entradas visuais apresentam pouca diferença nesta simulação, favorecendo uma representação binocular mais equilibrada.";
    } else if (difference < .4) {
        title.textContent = "Existe uma diferença moderada entre os olhos";
        text.textContent = "O cérebro recebe informações com características diferentes. A página Visão Fundida torna essa diferença visualmente perceptível.";
    } else {
        title.textContent = "Existe uma diferença acentuada entre os olhos";
        text.textContent = "As duas entradas visuais estão bastante diferentes nesta simulação. Isso pode tornar a fusão representada menos uniforme.";
    }
}

function updateBinocularVision() {
    const leftEye = visionEyes.left;
    const rightEye = visionEyes.right;
    const leftLayer = $("#binocularLeft");
    const rightLayer = $("#binocularRight");
    const fused = $("#binocularFused");
    if (!leftLayer || !rightLayer || !fused) return;

    const leftStatus = $("#binocularLeftStatus");
    const rightStatus = $("#binocularRightStatus");
    if (leftStatus) leftStatus.textContent = getShortEyeStatus(leftEye);
    if (rightStatus) rightStatus.textContent = getShortEyeStatus(rightEye);

    const leftIntensity = getEyeIntensity(leftEye);
    const rightIntensity = getEyeIntensity(rightEye);
    applyBinocularEffect(leftLayer, leftEye);
    applyBinocularEffect(rightLayer, rightEye);

    const difference = Math.abs(leftIntensity - rightIntensity);
    const separation = Math.min(difference * 14, 8);

    // As duas entradas ficam apenas como uma referência discreta.
    // A imagem central é a percepção fundida e permanece nítida.
    leftLayer.style.transform = `translate(calc(-50% - ${separation}px), -50%) translateZ(12px) rotateY(2deg)`;
    rightLayer.style.transform = `translate(calc(-50% + ${separation}px), -50%) translateZ(12px) rotateY(-2deg)`;
    leftLayer.style.opacity = difference > .12 ? ".10" : ".035";
    rightLayer.style.opacity = difference > .12 ? ".10" : ".035";

    const combinedBlur = (leftIntensity + rightIntensity) / 2;
    // Blur muito mais suave na percepção final; as camadas laterais já mostram a diferença.
    fused.style.filter = `blur(${Math.min(combinedBlur * 1.2, 1.8)}px)`;
    fused.style.opacity = "1";
    updateBinocularDepth(difference, leftEye, rightEye);
}

function applyBinocularEffect(layer, eye) {
    const scene = layer.querySelector(".binocular-scene");
    if (!scene) return;
    scene.style.filter = "";
    scene.style.opacity = "1";
    scene.style.transform = "";
    const intensity = getEyeIntensity(eye);
    switch (eye.disease) {
        case "miopia": scene.style.filter = `blur(${0.5 + intensity * 4}px)`; break;
        case "hipermetropia": scene.style.filter = `blur(${0.4 + intensity * 3}px)`; break;
        case "astigmatismo":
            scene.style.filter = `blur(${0.5 + intensity * 3}px)`;
            scene.style.transform = `scaleX(${1 + intensity * .04}) rotate(${(Number(eye.axis) - 90) * .015}deg)`;
            break;
        case "catarata":
            scene.style.filter = `blur(${1 + intensity * 2}px) saturate(.65)`;
            scene.style.opacity = `${1 - intensity * .25}`;
            break;
        case "daltonismo": scene.style.filter = "saturate(.45) hue-rotate(12deg)"; break;
        case "glaucoma":
            scene.style.filter = "brightness(.75) contrast(.9)";
            scene.style.opacity = `${1 - intensity * .18}`;
            break;
    }
}

function updateBinocularDepth(difference, leftEye, rightEye) {
    const text = $("#binocularDepthText");
    if (!text) return;
    if (leftEye.disease === "normal" && rightEye.disease === "normal") {
        text.textContent = "Os dois olhos estão recebendo imagens semelhantes. O cérebro pode comparar pequenas diferenças entre elas para contribuir para a percepção de profundidade.";
        return;
    }
    if (difference < .15) {
        text.textContent = "As condições dos dois olhos são relativamente semelhantes nesta simulação. A representação mantém uma fusão binocular relativamente estável.";
        return;
    }
    if (difference < .4) {
        text.textContent = "Os dois olhos apresentam diferenças moderadas nesta simulação. A informação visual ainda é combinada, mas as imagens apresentadas a cada olho não são iguais.";
        return;
    }
    text.textContent = "Existe uma diferença acentuada entre as duas entradas visuais. A simulação aumenta a separação entre as imagens para tornar essa diferença perceptível.";
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

    ["left", "right"].forEach(side => {
        const prefix = side;
        $("#" + prefix + "Disease").addEventListener("change", e => setEyeDisease(side, e.target.value));
        $("#" + prefix + "Degree").addEventListener("input", e => { visionEyes[side].degree = +e.target.value; updateEyeSimulation(side); });
        $("#" + prefix + "Cylinder").addEventListener("input", e => { visionEyes[side].cylinder = +e.target.value; updateEyeSimulation(side); });
        $("#" + prefix + "Axis").addEventListener("input", e => { visionEyes[side].axis = +e.target.value; updateEyeSimulation(side); });
    });

    /* estado inicial de cada módulo */
    setLight(50);
    updatePinhole();
    updateSpectrum();
    updateRGB();
    updateObjectColor();
    setEyeDisease("left", "normal");
    setEyeDisease("right", "normal");
    updateEyeSimulation("left");
    updateEyeSimulation("right");
    updateBinocularVision();
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