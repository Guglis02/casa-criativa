// Importei o express para configurar o servidor
const express = require('express');
const server = express();

const db = require("./db")

// Objeto ideias
// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eum harum explicabo",
//         url: "https://rocketseat.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercício",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eum harum explicabo",
//         url: "https://rocketseat.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
//         title: "Yoga",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eum harum explicabo",
//         url: "https://rocketseat.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title: "Karaoke",
//         category: "Diversão em família",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eum harum explicabo",
//         url: "https://rocketseat.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//         title: "Pintura",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eum harum explicabo",
//         url: "https://rocketseat.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eum harum explicabo",
//         url: "https://rocketseat.com.br",
//     },
// ]

// Configurar arquivos estáticos (css, javascript, imagens)
server.use(express.static("frontend"));

// Habilita uso do req.body
server.use(express.urlencoded({ extended: true }))

// Configuração do Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Criei uma rota
// Capturo a requisição do usuário para responder
server.get('/', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse();

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea);
            }
        }
        return res.render("index.html", { ideas: lastIdeas });
    })
})

server.get('/ideias', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse();
        return res.render("ideias.html", { ideas: reversedIdeas.reverse()});
    })
})

server.post('/', function(req, res) {
    // Inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        
        return res.redirect('/ideias')
    })
})

server.post('/ideias', function(req, res) {
    // Inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        
        return res.redirect('/ideias')
    })
})

// Liguei o servidor na porta 3000
server.listen(3000);