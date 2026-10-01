/* =========================================================
   VISION
   Banco de questões do Quiz
   Projeto Sou Cientista
   ========================================================= */

const questions = [

    {
        question: "O que acontece com a luz ao passar por um pequeno orifício em uma câmara escura?",
        options: [
            "Ela desaparece completamente",
            "Ela forma uma imagem invertida",
            "Ela muda para a cor azul",
            "Ela fica mais brilhante"
        ],
        answer: 1,
        explanation:
            "Os raios de luz que passam pelo pequeno orifício se cruzam e projetam uma imagem invertida no lado oposto da câmara."
    },

    {
        question: "Qual fenômeno explica a formação da imagem na câmara escura?",
        options: [
            "Reflexão da luz",
            "Dispersão da luz",
            "Propagação retilínea da luz",
            "Absorção da luz"
        ],
        answer: 2,
        explanation:
            "A luz se propaga aproximadamente em linha reta em meios homogêneos. Isso permite que os raios atravessem o pequeno orifício e formem a imagem."
    },

    {
        question: "Qual estrutura do olho controla a quantidade de luz que entra?",
        options: [
            "Retina",
            "Íris",
            "Cristalino",
            "Nervo óptico"
        ],
        answer: 1,
        explanation:
            "A íris controla o tamanho da pupila e, consequentemente, a quantidade de luz que entra no olho."
    },

    {
        question: "Qual estrutura funciona de maneira semelhante a uma tela onde a imagem é formada?",
        options: [
            "Retina",
            "Íris",
            "Córnea",
            "Pupila"
        ],
        answer: 0,
        explanation:
            "A retina recebe a luz e contém células sensíveis à luz que participam da formação da informação visual."
    },

    {
        question: "Qual é a função principal da pupila?",
        options: [
            "Produzir lágrimas",
            "Controlar a quantidade de luz que entra",
            "Enviar sinais ao cérebro",
            "Mudar a cor do olho"
        ],
        answer: 1,
        explanation:
            "A pupila é a abertura central da íris por onde a luz entra no olho."
    },

    {
        question: "Qual componente do olho ajuda a focalizar a luz sobre a retina?",
        options: [
            "Cristalino",
            "Nervo óptico",
            "Íris",
            "Esclera"
        ],
        answer: 0,
        explanation:
            "O cristalino altera sua forma para ajudar a focalizar a luz na retina."
    },

    {
        question: "O que acontece quando a luz branca é separada em diferentes cores?",
        options: [
            "Reflexão",
            "Dispersão",
            "Absorção",
            "Eletrização"
        ],
        answer: 1,
        explanation:
            "A dispersão pode separar a luz branca em diferentes componentes de cor, como ocorre em um prisma."
    },

    {
        question: "Qual destas cores faz parte do espectro visível?",
        options: [
            "Infravermelho",
            "Ultravioleta",
            "Verde",
            "Ondas de rádio"
        ],
        answer: 2,
        explanation:
            "O verde está dentro da faixa de radiação eletromagnética que nossos olhos conseguem detectar."
    },

    {
        question: "Por que objetos parecem ter cores diferentes?",
        options: [
            "Porque todos emitem luz própria",
            "Porque interagem de maneiras diferentes com a luz",
            "Porque a gravidade muda suas cores",
            "Porque a sombra altera permanentemente o objeto"
        ],
        answer: 1,
        explanation:
            "Os materiais absorvem e refletem diferentes componentes da luz. A luz que chega aos nossos olhos contribui para a percepção da cor."
    },

    {
        question: "O que é uma sombra?",
        options: [
            "Uma nova fonte de luz",
            "Uma região onde a luz é parcialmente ou totalmente bloqueada",
            "Uma reação química",
            "Uma imagem produzida pela retina"
        ],
        answer: 1,
        explanation:
            "A sombra surge quando um objeto bloqueia a passagem da luz para determinada região."
    },

    {
        question: "Qual destas é uma fonte natural de luz?",
        options: [
            "Lanterna",
            "Tela de celular",
            "Sol",
            "LED"
        ],
        answer: 2,
        explanation:
            "O Sol é uma fonte natural de luz. Lanternas, LEDs e telas são fontes artificiais."
    },

    {
        question: "Uma câmera fotográfica e o olho humano possuem uma função em comum. Qual?",
        options: [
            "Produzir sangue",
            "Captar e formar imagens a partir da luz",
            "Produzir som",
            "Controlar a temperatura do ambiente"
        ],
        answer: 1,
        explanation:
            "Tanto o olho quanto uma câmera utilizam sistemas ópticos para receber e focalizar a luz, permitindo a formação de imagens."
    },

    {
        question: "Qual componente de uma câmera controla a quantidade de luz que entra?",
        options: [
            "Sensor",
            "Diafragma",
            "Tela",
            "Bateria"
        ],
        answer: 1,
        explanation:
            "O diafragma controla a abertura pela qual a luz entra na câmera."
    },

    {
        question: "Em uma câmera digital, qual componente recebe a luz para registrar a imagem?",
        options: [
            "Sensor de imagem",
            "Alto-falante",
            "Microfone",
            "Bateria"
        ],
        answer: 0,
        explanation:
            "O sensor converte a luz recebida em sinais que podem ser processados para formar uma imagem digital."
    },

    {
        question: "Qual é uma vantagem de uma câmara escura feita com materiais simples?",
        options: [
            "Permite estudar princípios ópticos de forma acessível",
            "Elimina completamente a necessidade de luz",
            "Produz eletricidade",
            "Funciona sem qualquer fonte luminosa"
        ],
        answer: 0,
        explanation:
            "Uma câmara escura simples permite observar experimentalmente conceitos de óptica usando materiais acessíveis."
    },

    {
        question: "Qual material pode ser usado para bloquear a entrada indesejada de luz em uma câmara escura?",
        options: [
            "Papel transparente",
            "Material opaco",
            "Água",
            "Vidro completamente transparente"
        ],
        answer: 1,
        explanation:
            "Materiais opacos bloqueiam a passagem da luz e ajudam a manter o interior da câmara escuro."
    },

    {
        question: "Por que o interior da câmara escura precisa ser escuro?",
        options: [
            "Para aumentar o peso da câmera",
            "Para facilitar a observação da imagem projetada",
            "Para produzir energia",
            "Para mudar a velocidade da luz"
        ],
        answer: 1,
        explanation:
            "Reduzir a luz externa ajuda a tornar a imagem projetada pelo orifício mais visível."
    },

    {
        question: "Qual área da ciência estuda os fenômenos relacionados à luz?",
        options: [
            "Óptica",
            "Genética",
            "Geologia",
            "Ecologia"
        ],
        answer: 0,
        explanation:
            "A óptica é a área da Física dedicada ao estudo da luz e de seus fenômenos."
    },

    {
        question: "Qual área da ciência pode ajudar a explicar a composição e as propriedades de materiais utilizados em experimentos?",
        options: [
            "Química",
            "Astronomia",
            "Geografia",
            "Meteorologia"
        ],
        answer: 0,
        explanation:
            "A Química estuda a composição, estrutura, propriedades e transformações da matéria."
    },

    {
        question: "Por que é importante conhecer os materiais utilizados em equipamentos tecnológicos?",
        options: [
            "Apenas para deixar o equipamento mais bonito",
            "Para compreender seus impactos e utilizá-los de forma responsável",
            "Para aumentar o consumo de materiais",
            "Para evitar qualquer tipo de manutenção"
        ],
        answer: 1,
        explanation:
            "Conhecer os materiais ajuda a avaliar segurança, descarte, impactos ambientais e alternativas mais sustentáveis."
    },

    {
        question: "O que significa sustentabilidade no contexto tecnológico?",
        options: [
            "Usar recursos sem considerar seus impactos",
            "Desenvolver e utilizar tecnologias considerando seus impactos sociais e ambientais",
            "Utilizar somente equipamentos antigos",
            "Evitar toda forma de tecnologia"
        ],
        answer: 1,
        explanation:
            "A sustentabilidade busca considerar os impactos ambientais, sociais e econômicos associados às tecnologias."
    },

    {
        question: "Qual prática ajuda a reduzir impactos ambientais associados a equipamentos eletrônicos?",
        options: [
            "Descartar eletrônicos no lixo comum",
            "Aumentar o desperdício",
            "Realizar descarte e reciclagem adequados",
            "Queimar componentes eletrônicos"
        ],
        answer: 2,
        explanation:
            "O descarte adequado permite o encaminhamento correto de materiais e reduz riscos associados aos resíduos eletrônicos."
    },

    {
        question: "O que são resíduos eletrônicos?",
        options: [
            "Somente restos de alimentos",
            "Equipamentos eletrônicos ou componentes descartados",
            "Apenas resíduos de papel",
            "Somente materiais orgânicos"
        ],
        answer: 1,
        explanation:
            "Resíduos eletrônicos incluem equipamentos e componentes eletrônicos que chegaram ao fim de sua vida útil ou foram descartados."
    },

    {
        question: "Por que algumas substâncias utilizadas em tecnologias exigem cuidados especiais?",
        options: [
            "Porque podem apresentar riscos à saúde ou ao ambiente",
            "Porque sempre são radioativas",
            "Porque não possuem nenhuma propriedade química",
            "Porque não podem ser recicladas"
        ],
        answer: 0,
        explanation:
            "Algumas substâncias podem apresentar riscos dependendo de sua composição, concentração e forma de exposição."
    },

    {
        question: "Qual atitude é mais adequada ao trabalhar com materiais potencialmente perigosos?",
        options: [
            "Manipulá-los sem proteção",
            "Ignorar as informações do fabricante",
            "Seguir orientações de segurança e descarte",
            "Misturar substâncias desconhecidas"
        ],
        answer: 2,
        explanation:
            "Procedimentos de segurança e informações sobre os materiais são fundamentais para reduzir riscos."
    },

    {
        question: "Qual é uma relação entre Química e fotografia tradicional?",
        options: [
            "Processos fotográficos podem envolver reações químicas",
            "Fotografia não possui relação com matéria",
            "A química impede a formação de imagens",
            "Câmeras funcionam apenas por gravidade"
        ],
        answer: 0,
        explanation:
            "Processos fotográficos tradicionais utilizavam materiais fotossensíveis e etapas químicas para revelar imagens."
    },

    {
        question: "Qual é uma diferença importante entre uma câmera digital e uma câmara escura simples?",
        options: [
            "A câmara escura utiliza luz, enquanto a câmera digital não",
            "A câmera digital utiliza um sensor para registrar a imagem",
            "A câmara escura precisa de bateria",
            "A câmera digital não possui sistema óptico"
        ],
        answer: 1,
        explanation:
            "Uma câmera digital utiliza um sensor eletrônico para registrar a luz, enquanto a câmara escura simples projeta a imagem em uma superfície."
    },

    {
        question: "O que acontece quando aumentamos o tamanho do orifício de uma câmara escura?",
        options: [
            "A imagem pode ficar mais luminosa, mas menos definida",
            "A imagem sempre desaparece",
            "A luz deixa de entrar",
            "A imagem deixa de ser invertida"
        ],
        answer: 0,
        explanation:
            "Um orifício maior permite a entrada de mais luz, mas também pode permitir que diferentes raios se sobreponham mais, reduzindo a nitidez."
    },

    {
        question: "Por que a imagem formada em uma câmara escura fica invertida?",
        options: [
            "Porque a gravidade vira a imagem",
            "Porque os raios de luz se cruzam ao passar pelo orifício",
            "Porque o papel gira",
            "Porque o objeto muda de posição"
        ],
        answer: 1,
        explanation:
            "Os raios que vêm da parte superior do objeto chegam à região inferior da tela e vice-versa, formando uma imagem invertida."
    },

    {
        question: "Qual é uma característica importante de uma tecnologia socialmente sustentável?",
        options: [
            "Ser acessível e considerar as necessidades das pessoas",
            "Ser obrigatoriamente cara",
            "Utilizar o máximo possível de recursos",
            "Ser impossível de compreender"
        ],
        answer: 0,
        explanation:
            "A sustentabilidade social envolve considerar acesso, segurança, inclusão e necessidades das pessoas."
    },

    {
        question: "Qual é a principal proposta do projeto VISION?",
        options: [
            "Criar uma câmera profissional comercial",
            "Relacionar olho humano, câmera, óptica, química e sustentabilidade",
            "Substituir completamente os olhos humanos",
            "Construir um computador"
        ],
        answer: 1,
        explanation:
            "O VISION integra diferentes áreas da ciência para explicar como percebemos e registramos imagens e discutir os impactos das tecnologias."
    },

    {
        question: "Na miopia, onde a imagem de um objeto distante se forma?",
        options: ["Atrás da retina", "Na frente da retina", "Exatamente na retina", "No nervo óptico"],
        answer: 1,
        explanation: "No olho míope a imagem se forma antes da retina. A correção usa lentes divergentes (côncavas)."
    },
    {
        question: "Qual doença é caracterizada pela opacificação do cristalino?",
        options: ["Catarata", "Glaucoma", "Daltonismo", "Astigmatismo"],
        answer: 0,
        explanation: "Na catarata o cristalino perde a transparência, o que deixa a visão turva. O tratamento é cirúrgico."
    },
    {
        question: "Qual célula da retina é responsável pela visão de cores?",
        options: ["Bastonetes", "Cones", "Neurônios do cerebelo", "Células da córnea"],
        answer: 1,
        explanation: "Os cones (três tipos) permitem enxergar cores. Os bastonetes funcionam com pouca luz, mas não distinguem cores."
    },
    {
        question: "Na fotografia analógica, qual substância sensível à luz fica no filme?",
        options: ["Haletos de prata", "Silício puro", "Lítio", "Mercúrio"],
        answer: 0,
        explanation: "Cristais de haletos de prata (como AgBr) são sensíveis à luz. Na revelação química eles formam a imagem em prata metálica."
    },
    {
        question: "Qual componente da câmera digital faz o papel da retina?",
        options: ["Sensor de imagem (CMOS/CCD)", "Diafragma", "Flash", "Cartão de memória"],
        answer: 0,
        explanation: "O sensor, geralmente de silício, converte a luz em sinais elétricos, como a retina converte luz em sinais nervosos."
    },
    {
        question: "O que é logística reversa de eletrônicos?",
        options: ["Queimar o lixo eletrônico", "Devolver o produto descartado para a cadeia de reciclagem", "Enterrar pilhas e baterias", "Vender aparelhos usados sem controle"],
        answer: 1,
        explanation: "É o retorno de produtos pós-consumo ao fabricante ou à reciclagem por pontos de coleta, prevista na Política Nacional de Resíduos Sólidos."
    },
];

const QUESTIONS = questions;


/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */

/**
 * Retorna uma cópia aleatória das perguntas.
 *
 * Exemplo:
 * getRandomQuestions(5)
 */
function getRandomQuestions(amount = 5) {

    const shuffled = [...questions];

    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];

    }

    return shuffled.slice(
        0,
        Math.min(
            amount,
            shuffled.length
        )
    );
}


/**
 * Embaralha as alternativas
 * sem alterar o banco original.
 */
function shuffleOptions(question) {

    const options = question.options.map(
        (text, index) => ({
            text,
            correct:
                index === question.answer
        })
    );

    for (
        let i = options.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            options[i],
            options[randomIndex]
        ] = [
            options[randomIndex],
            options[i]
        ];

    }

    return options;
}