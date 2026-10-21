
/* =====================================================
   VISION — BANCO OFICIAL DE QUESTÕES
   Projeto Sou Cientista
   Total: 50 perguntas | 5 por partida
   ===================================================== */

const QUESTIONS = [
    // 01–08 | ANATOMIA DO OLHO HUMANO
    {
        question: "Qual estrutura do olho é responsável por transformar a luz em sinais nervosos?",
        options: ["Íris", "Retina", "Córnea", "Pupila"],
        answer: 1
    },
    {
        question: "Qual é a principal função da íris?",
        options: [
            "Controlar o tamanho da pupila",
            "Produzir os sinais nervosos da visão",
            "Proteger o nervo óptico",
            "Focalizar sozinha toda a luz"
        ],
        answer: 0
    },
    {
        question: "Qual estrutura ajuda a focalizar a luz sobre a retina?",
        options: ["Nervo óptico", "Íris", "Cristalino", "Esclera"],
        answer: 2
    },
    {
        question: "Qual é a função do nervo óptico?",
        options: [
            "Produzir lágrimas",
            "Transmitir informações visuais ao cérebro",
            "Controlar diretamente a pupila",
            "Proteger a parte externa do olho"
        ],
        answer: 1
    },
    {
        question: "Onde a imagem precisa ser focalizada para que a visão fique nítida?",
        options: ["Na retina", "Na íris", "Na esclera", "Na pálpebra"],
        answer: 0
    },
    {
        question: "Qual estrutura transparente fica na parte anterior do olho e ajuda a desviar a luz?",
        options: ["Retina", "Coroide", "Nervo óptico", "Córnea"],
        answer: 3
    },
    {
        question: "Por que a pupila fica menor quando estamos em um ambiente muito iluminado?",
        options: [
            "Para aumentar a produção de lágrimas",
            "Para controlar a quantidade de luz que entra no olho",
            "Para mudar a cor da íris",
            "Para desligar a retina"
        ],
        answer: 1
    },
    {
        question: "O que acontece com a imagem formada na retina?",
        options: [
            "Ela é formada sempre na posição correta, sem inversão",
            "Ela é transformada em som",
            "Ela é formada invertida, e o cérebro processa as informações visuais",
            "Ela permanece armazenada na pupila"
        ],
        answer: 2
    },

    // 09–14 | DOENÇAS E CORREÇÃO VISUAL
    {
        question: "Na miopia, onde a imagem de objetos distantes tende a se formar?",
        options: [
            "Atrás da retina",
            "Na íris",
            "Exatamente sobre a córnea",
            "Antes da retina"
        ],
        answer: 3
    },
    {
        question: "Qual tipo de lente é geralmente utilizado para corrigir a miopia?",
        options: [
            "Lente divergente",
            "Lente convergente",
            "Espelho plano",
            "Prisma sem correção óptica"
        ],
        answer: 0
    },
    {
        question: "Na hipermetropia, a imagem tende a se formar onde, sem acomodação suficiente?",
        options: [
            "Antes da retina",
            "Atrás da retina",
            "Dentro da pupila",
            "Sobre a íris"
        ],
        answer: 1
    },
    {
        question: "O que caracteriza o astigmatismo?",
        options: [
            "Ausência completa da íris",
            "Produção excessiva de lágrimas",
            "Diferenças de curvatura ou de poder óptico que podem causar visão distorcida",
            "Impossibilidade de perceber qualquer cor"
        ],
        answer: 2
    },
    {
        question: "O que é daltonismo?",
        options: [
            "Uma alteração na percepção de determinadas cores",
            "Uma infecção causada por bactérias",
            "Uma dificuldade exclusiva para enxergar de perto",
            "Uma doença que sempre causa cegueira total"
        ],
        answer: 0
    },
    {
        question: "Qual atitude é adequada quando alguém percebe uma mudança persistente na visão?",
        options: [
            "Usar os óculos de outra pessoa",
            "Aumentar o grau por conta própria",
            "Ignorar o problema até desaparecer",
            "Procurar avaliação de um profissional de saúde visual"
        ],
        answer: 3
    },

    // 15–21 | ÓPTICA, LUZ E CORES
    {
        question: "O que acontece quando a luz passa de um material para outro e muda de direção?",
        options: ["Refração", "Combustão", "Evaporação", "Fermentação"],
        answer: 0
    },
    {
        question: "Qual fenômeno ocorre quando a luz retorna ao encontrar uma superfície?",
        options: ["Absorção total", "Reflexão", "Sublimação", "Condução elétrica"],
        answer: 1
    },
    {
        question: "A luz branca é composta por:",
        options: [
            "Apenas luz vermelha",
            "Somente luz azul e violeta",
            "Diferentes comprimentos de onda da luz visível",
            "Ondas sonoras de várias frequências"
        ],
        answer: 2
    },
    {
        question: "Por que uma folha parece verde sob luz branca?",
        options: [
            "Porque cria luz verde sem receber iluminação",
            "Porque absorve toda a luz verde",
            "Porque transforma luz em som",
            "Porque reflete mais luz verde do que muitas das outras cores incidentes"
        ],
        answer: 3
    },
    {
        question: "O que ocorre quando a luz branca atravessa um prisma e se separa em várias cores?",
        options: ["Dispersão da luz", "Eletrização", "Condução térmica", "Difração sonora"],
        answer: 0
    },
    {
        question: "Qual é a principal diferença entre misturar luzes coloridas e misturar tintas?",
        options: [
            "São processos exatamente iguais",
            "Luzes se misturam de forma aditiva; pigmentos funcionam principalmente por absorção seletiva",
            "Tintas produzem apenas luz branca",
            "A mistura de luzes nunca produz outras cores"
        ],
        answer: 1
    },
    {
        question: "O que é o espectro visível?",
        options: [
            "O conjunto de todos os sons audíveis",
            "A região da radiação usada exclusivamente em radiografias",
            "A faixa de radiação eletromagnética que o olho humano consegue perceber",
            "A luz que não interage com materiais"
        ],
        answer: 2
    },

    // 22–27 | CÂMARA ESCURA
    {
        question: "Por que a imagem aparece invertida em uma câmara escura com pequeno orifício?",
        options: [
            "Porque as paredes produzem eletricidade",
            "Porque o objeto gira dentro da caixa",
            "Porque a luz perde todas as suas cores",
            "Porque os raios de luz cruzam ao passar pelo orifício"
        ],
        answer: 3
    },
    {
        question: "O que acontece com a imagem na tela de uma câmara escura quando a distância entre o orifício e a tela aumenta?",
        options: [
            "A imagem tende a ficar maior",
            "A imagem sempre desaparece",
            "A imagem muda para uma cor única",
            "A imagem deixa de ser formada por luz"
        ],
        answer: 0
    },
    {
        question: "Qual é a função do pequeno orifício da câmara escura?",
        options: [
            "Produzir luz artificial",
            "Limitar a passagem de luz e permitir a formação da imagem",
            "Transformar luz em energia sonora",
            "Aumentar a temperatura da caixa"
        ],
        answer: 1
    },
    {
        question: "O que pode acontecer se o orifício de uma câmara escura ficar grande demais?",
        options: [
            "A imagem ficará sempre mais definida",
            "A imagem ficará necessariamente colorida",
            "A imagem poderá ficar mais luminosa, porém menos nítida",
            "A luz deixará de atravessar o orifício"
        ],
        answer: 2
    },
    {
        question: "Qual objeto é necessário para observar a imagem projetada dentro de uma câmara escura?",
        options: [
            "Uma tela ou superfície de projeção",
            "Um alto-falante",
            "Um espelho obrigatório",
            "Uma lâmpada dentro da caixa"
        ],
        answer: 0
    },
    {
        question: "Qual semelhança existe entre a câmara escura e o olho humano?",
        options: [
            "Ambos utilizam filmes fotográficos",
            "Ambos precisam de espelhos reflex para formar imagens",
            "Ambos produzem imagens sem luz",
            "Ambos permitem que a luz entre por uma abertura e forme uma imagem invertida"
        ],
        answer: 3
    },

    // 28–33 | CÂMERAS FOTOGRÁFICAS
    {
        question: "Qual é a função principal da objetiva de uma câmera?",
        options: [
            "Armazenar as fotografias",
            "Recolher e focalizar a luz",
            "Reproduzir o som do ambiente",
            "Carregar a bateria"
        ],
        answer: 1
    },
    {
        question: "Qual componente de uma câmera digital transforma a luz recebida em sinais elétricos?",
        options: ["Flash", "Visor", "Sensor de imagem", "Alça"],
        answer: 2
    },
    {
        question: "Para que serve o diafragma de uma câmera?",
        options: [
            "Controlar a abertura por onde passa a luz",
            "Armazenar os arquivos de imagem",
            "Alterar fisicamente o objeto fotografado",
            "Limpar automaticamente a lente"
        ],
        answer: 0
    },
    {
        question: "Em uma câmera DSLR, qual é a função do espelho reflex?",
        options: [
            "Substituir o sensor digital",
            "Criar as cores da fotografia",
            "Impedir toda a entrada de luz",
            "Direcionar a luz para o sistema óptico do visor"
        ],
        answer: 3
    },
    {
        question: "O que controla o tempo de exposição em uma fotografia?",
        options: [
            "A cor da armação da câmera",
            "O tempo durante o qual a luz é registrada pelo sensor ou filme",
            "A distância entre os olhos do fotógrafo",
            "A quantidade de pixels do visor"
        ],
        answer: 1
    },
    {
        question: "Qual é uma diferença entre fotografia digital e analógica?",
        options: [
            "A fotografia analógica não utiliza luz",
            "A fotografia digital exige sempre um filme químico",
            "A digital registra a imagem por sensores; a analógica tradicional usa material fotossensível",
            "A fotografia analógica não forma imagens"
        ],
        answer: 2
    },

    // 34–39 | QUÍMICA DAS LENTES
    {
        question: "O que são polímeros utilizados em muitas lentes oftálmicas?",
        options: [
            "Materiais formados por longas cadeias de moléculas",
            "Apenas metais líquidos",
            "Ondas luminosas armazenadas",
            "Tecidos vivos do olho"
        ],
        answer: 0
    },
    {
        question: "O que é o índice de refração de um material?",
        options: [
            "Uma medida da massa de uma lente",
            "Uma medida relacionada à propagação da luz no material",
            "A quantidade de cores da armação",
            "O grau de limpeza da lente"
        ],
        answer: 1
    },
    {
        question: "Para que serve um tratamento antirreflexo?",
        options: [
            "Para fazer a lente produzir luz própria",
            "Para mudar permanentemente a cor dos olhos",
            "Para reduzir reflexos indesejados na superfície da lente",
            "Para substituir a necessidade de qualquer exame"
        ],
        answer: 2
    },
    {
        question: "A cor escura de uma lente solar garante, sozinha, proteção contra radiação ultravioleta?",
        options: [
            "Sim, toda lente escura bloqueia 100% da radiação UV",
            "Sim, quanto mais preta, maior a proteção garantida",
            "Sim, porque a cor substitui os testes de proteção",
            "Não; é necessário verificar a proteção UV especificada para o produto"
        ],
        answer: 3
    },
    {
        question: "Qual processo químico é importante na fotografia analógica tradicional?",
        options: [
            "Reações fotoquímicas em materiais sensíveis à luz",
            "Fermentação de açúcar dentro da câmera",
            "Produção de oxigênio pelo filme",
            "Transformação de plástico em tecido vivo"
        ],
        answer: 0
    },
    {
        question: "Por que produtos químicos de revelação fotográfica exigem destinação adequada?",
        options: [
            "Porque todos podem ser despejados no solo sem risco",
            "Porque alguns podem causar danos ambientais se forem descartados inadequadamente",
            "Porque se transformam sempre em água potável",
            "Porque não interagem com outros materiais"
        ],
        answer: 1
    },

    // 40–44 | REAPROVEITAMENTO E SUSTENTABILIDADE
    {
        question: "Qual é um exemplo de consumo sustentável relacionado aos óculos?",
        options: [
            "Trocar a armação sempre que surgir um novo modelo",
            "Descartar qualquer lente antiga no lixo comum sem verificar alternativas",
            "Consertar uma armação quando isso for seguro e viável",
            "Comprar óculos sem verificar sua qualidade"
        ],
        answer: 2
    },
    {
        question: "É possível colocar qualquer lente antiga em qualquer armação?",
        options: [
            "Sim, todas as lentes têm o mesmo formato",
            "Sim, basta pressionar a lente para encaixá-la",
            "Sim, desde que a armação seja de outra cor",
            "Não; é preciso verificar medidas, formato, estado e compatibilidade"
        ],
        answer: 3
    },
    {
        question: "O que deve ser considerado antes de doar um par de óculos?",
        options: [
            "O estado dos óculos e as regras do projeto que recebe a doação",
            "Apenas a cor da armação",
            "Somente o preço original",
            "Se a pessoa que vai receber tem a mesma idade de quem doou"
        ],
        answer: 0
    },
    {
        question: "Por que prolongar a vida útil de um produto pode beneficiar o ambiente?",
        options: [
            "Porque elimina automaticamente todos os resíduos",
            "Porque pode diminuir a necessidade de fabricar e substituir produtos",
            "Porque transforma todo material em algo biodegradável",
            "Porque impede qualquer consumo de energia"
        ],
        answer: 1
    },
    {
        question: "Todo material que pode ser reciclado será necessariamente reciclado?",
        options: [
            "Sim, em qualquer cidade e circunstância",
            "Sim, mesmo quando está contaminado",
            "Não; depende da separação, da infraestrutura e dos processos disponíveis",
            "Não; nenhum material pode ser reciclado"
        ],
        answer: 2
    },

    // 45–50 | IMPACTOS SOCIAIS E INCLUSÃO
    {
        question: "Como uma dificuldade visual não corrigida pode afetar a vida escolar?",
        options: [
            "Não pode afetar nenhuma atividade escolar",
            "Sempre aumenta a capacidade de leitura",
            "Melhora automaticamente a concentração",
            "Pode dificultar a leitura do quadro, de livros e de materiais digitais"
        ],
        answer: 3
    },
    {
        question: "Por que o acesso a exames de visão é uma questão social?",
        options: [
            "Porque custo, transporte e disponibilidade de serviços podem criar barreiras",
            "Porque exames só são necessários para atletas",
            "Porque a visão não influencia atividades cotidianas",
            "Porque todas as pessoas possuem as mesmas necessidades visuais"
        ],
        answer: 0
    },
    {
        question: "Qual alternativa ajuda a tornar um aplicativo mais acessível para pessoas com baixa visão?",
        options: [
            "Usar letras pequenas e baixo contraste",
            "Permitir ampliar textos e oferecer contraste adequado",
            "Transmitir informações somente por cores",
            "Impedir o uso de leitores de tela"
        ],
        answer: 1
    },
    {
        question: "Óculos corrigem todos os tipos de doenças oculares?",
        options: [
            "Sim, corrigem qualquer doença dos olhos",
            "Sim, substituem todos os exames",
            "Não; corrigem determinados problemas de refração, mas não tratam todas as doenças",
            "Não; óculos nunca ajudam na visão"
        ],
        answer: 2
    },
    {
        question: "Como uma iniciativa de doação responsável pode beneficiar a sociedade?",
        options: [
            "Distribuindo qualquer lente sem avaliação",
            "Substituindo todos os serviços de saúde",
            "Garantindo que todos os problemas visuais desapareçam",
            "Ajudando a ampliar o acesso a óculos adequados, com triagem e orientação"
        ],
        answer: 3
    },
    {
        question: "Qual afirmação sobre pessoas com deficiência visual é correta?",
        options: [
            "Com acessibilidade e recursos adequados, podem estudar, trabalhar e participar da sociedade",
            "Todas possuem exatamente a mesma condição visual",
            "Nenhuma consegue utilizar tecnologia",
            "A inclusão depende apenas da pessoa, nunca do ambiente"
        ],
        answer: 0
    }
];
