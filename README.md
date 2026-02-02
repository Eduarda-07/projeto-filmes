# Projeto filmes

---

## Índice

- [Visão Geral](#visao-geral)
- [URL base](#url-base)
- [Respostas comuns](#respostas-comuns)
- [Filme](#filme)
- [Nacionalidade](#nacionalidade)
- [Gênero](#genero)
- [Classificação](#classificacao)
- [Idioma](#idioma)
- [Premiaçõeo](#premiacoes)
- [Classe](#classe)
- [Avaliação](#avaliacao)

---

<a name="visao-geral"></a>
## Visão Geral

Esta API tem como objetivo realizar o **gerenciamento de filmes em um site**, permitindo que usuários sem a necessidade de cadastro ou de login, cadastrem filmes e vejam quais já foram previamente cadastrados no sistema.

---

<a name="url-base"></a>
## URL base
https://localhost:8080/v1/controle-filmes

---

<a name="respostas-comuns"></a>
## Respostas comuns

| Status | Status code | Mesnsagem |
|--------|-------------|-----------|
|  True  |     201     |Item criado com sucesso!!|
| False  |     400     |Não foi possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!!!|
| False  |     404     |Não foram encontrados itens de retorno!!!|
| False  |     415     |Não foi possível processar a requisição, pois o tipo de dados encaminhado não é processado pelo servidor. Favor encaminhar dados apenas no formato JSON!!!|
| False  |     500     |Devido a erros internos no servidor da model, não foi possível processar a requisição!!!|

---

<a name="Filme"></a>
## Filme

### Método: `POST`
### Caminho: /filme
### Descrição: Inserir novo filme

---

### Exemplo de Body

```json
{
    "nome":"teste 6",
    "duracao": "02:20",
    "data_lancamento": "2000-10-05",
    "sinopse": "teste",
    "foto_capa": "http://foto.jpg",
    "link_trailer":"http://link.mp4",
    "id_classificacao":1,
    "id_idioma":1,
    "id_nacionalidade":1,
    "genero": [
        {"id": 1},
        {"id": 2}
    ]
}
```
### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /filme/${id do filme}
### Descrição: Bucar um filme pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "films": [
        {
            "id": 24,
            "nome": "teste 6",
            "duracao": "1970-01-01T02:20:00.000Z",
            "sinopse": "teste",
            "data_lancamento": "2000-10-05T00:00:00.000Z",
            "foto_capa": "http://foto.jpg",
            "link_trailer": "http://link.mp4",
            "classificacao": [
                {
                    "id_classificacao": 1,
                    "descricao": "Permitido apenas para maiores de 18",
                    "classificacao": "+18",
                    "idade": "18"
                }
            ],
            "idioma": [
                {
                    "id_idioma": 1,
                    "pais": "Brasil",
                    "nome": "Português",
                    "codigo": "pt-BR"
                }
            ],
            "nacionalidade": [
                {
                    "id_nacionalidade": 1,
                    "descricao": "Brasileiro"
                }
            ],
            "genero": [
                {
                    "id_genero": 1,
                    "descricao": "Romance"
                },
                {
                    "id_genero": 2,
                    "descricao": "Comédia"
                }
            ]
        }
    ]
}
```

### Método: `GET`
### Caminho: /filme
### Descrição: Listar todos os filmes

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 24,
    "films": [
        {
            "id": 24,
            "nome": "teste 6",
            "duracao": "1970-01-01T02:20:00.000Z",
            "sinopse": "teste",
            "data_lancamento": "2000-10-05T00:00:00.000Z",
            "foto_capa": "http://foto.jpg",
            "link_trailer": "http://link.mp4",
            "classificacao": [
                {
                    "id_classificacao": 1,
                    "descricao": "Permitido apenas para maiores de 18",
                    "classificacao": "+18",
                    "idade": "18"
                }
            ],
            "idioma": [
                {
                    "id_idioma": 1,
                    "pais": "Brasil",
                    "nome": "Português",
                    "codigo": "pt-BR"
                }
            ],
            "nacionalidade": [
                {
                    "id_nacionalidade": 1,
                    "descricao": "Brasileiro"
                }
            ],
            "genero": [
                {
                    "id_genero": 1,
                    "descricao": "Romance"
                },
                {
                    "id_genero": 2,
                    "descricao": "Comédia"
                }
            ]
        },
        ...
    ]
  }
```

### Método: `PUT`
### Caminho: /filme/${id do filme}
### Descrição: Atualizar um filme pelo id 

---

### Exemplo de Body

```json
{
    "nome":"teste 1 - atualizacao",
    "duracao": "02:20",
    "data_lancamento": "2000-10-05",
    "sinopse": "teste",
    "foto_capa": "http://foto.jpg",
    "link_trailer":"http://link.mp4",
    "id_classificacao":1,
    "id_idioma":1,
    "id_nacionalidade":1,
    "genero": [
        {"id": 1},
        {"id": 1}
    ]
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

### Método: `DELETE`
### Caminho: /filme/${id do filme}
### Descrição: Deletar um filme

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

---

<a name="nacionalidade"></a>
## Nacionalidade

### Método: `POST`
### Descrição: Inserir nova nacionalidade
### Caminho: /nacionalidade

---

### Exemplo de Body

```json
{
    "descricao":"Brasileiro"
}
```

### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /nacionalidade
### Descrição: Listar todas as nacionalidades

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 2,
    "nacionalidade": [
        {
            "id_nacionalidade": 2,
            "descricao": "Brasileiro"
        },
        {
            "id_nacionalidade": 1,
            "descricao": "Brasileiro"
        }
    ]
}
```

### Método: `GET`
### Caminho: /nacionalidade/${id da nacionalidade}
### Descrição: Bucar uma nacionalidade pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "nacionalidade": [
        {
            "id_nacionalidade": 2,
            "descricao": "Brasileiro"
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /nacionalidade/${id da nacionalidade}
### Descrição: Deletar uma nacionalidade

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

### Método: `PUT`
### Caminho: /nacionalidade/${id da nacionalidade}
### Descrição: Atualizar uma nacionalidade pelo id 

---

### Exemplo de Body

```json
{
    "descricao":"Britânico"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

---

<a name="genero"></a>
## Gênero

### Método: `POST`
### Descrição: Inserir novo gênero
### Caminho: /genero

---

### Exemplo de Body

```json
{
    "descricao":"aventura"
}
```

### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /genero
### Descrição: Listar todos os gêneros

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 3,
    "generos": [
        {
            "id_genero": 3,
            "descricao": "Comédia"
        },
        {
            "id_genero": 2,
            "descricao": "Comédia"
        },
      ...
    ]
}
```

### Método: `GET`
### Caminho: /genero/${id do gênero}
### Descrição: Bucar um gênero pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "genero": [
        {
            "id_genero": 3,
            "descricao": "Comédia"
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /genero/${id do gênero}
### Descrição: Deletar um gênero

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

### Método: `PUT`
### Caminho: /genero/${id do gênero}
### Descrição: Atualizar um gênero pelo id 

---

### Exemplo de Body

```json
{
    "descricao":"Comédia"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

---

<a name="classificacao"></a>
## Classificação

### Método: `POST`
### Descrição: Inserir nova classificação
### Caminho: /classificacao

---

### Exemplo de Body

```json
{
    "descricao": "Permitido apenas para maiores de 18",
    "classificacao": "+18",
    "idade": "18"
}
```

### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /classificacao
### Descrição: Listar todas as classificações

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 2,
    "classificacao": [
        {
            "id_classificacao": 1,
            "descricao": "Permitido apenas para maiores de 18",
            "classificacao": "+18",
            "idade": "18"
        },
      ...
    ]
}
```

### Método: `GET`
### Caminho: /classificacao/${id da classificacao}
### Descrição: Bucar uma classificação pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "classificacao": [
        {
            "id_classificacao": 1,
            "descricao": "Permitido apenas para maiores de 18",
            "classificacao": "+18",
            "idade": "18"
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /classificacao/${id da classificação}
### Descrição: Deletar uma classificação

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

### Método: `PUT`
### Caminho: /classificacao/${id da classificação}
### Descrição: Atualizar uma classificação pelo id 

---

### Exemplo de Body

```json
{
    "descricao": "Permitido apenas para maiores de 16",
    "classificacao": "+16",
    "idade": "16"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

---

<a name="idioma"></a>
## Idioma

### Método: `POST`
### Descrição: Inserir novo idioma
### Caminho: /idioma

---

### Exemplo de Body

```json
{
    "pais": "Brasil",
    "nome": "Português",
    "codigo":"pt-BR"
}
```

### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /idioma
### Descrição: Listar todos os idiomas

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 2,
    "idiomas": [
        {
            "id_idioma": 1,
            "pais": "Brasil",
            "nome": "Português",
            "codigo": "pt-BR"
        },
      ...
    ]
}
```

### Método: `GET`
### Caminho: /idioma/${id do idioma}
### Descrição: Bucar um idioma pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "idiomas": [
        {
            "id_idioma": 1,
            "pais": "Brasil",
            "nome": "Português",
            "codigo": "pt-BR"
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /idioma/${id do idioma}
### Descrição: Deletar um idioma

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

### Método: `PUT`
### Caminho: /idioma/${id do idioma}
### Descrição: Atualizar um idioma pelo id 

---

### Exemplo de Body

```json
{
    "pais":"Estados Unidos da América",
    "nome":"Inglês",
    "codigo":"en-US"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

---

<a name="premiacao"></a>
## Premiação

### Método: `POST`
### Descrição: Inserir nova premiação
### Caminho: /premiacao

---

### Exemplo de Body

```json
{
    "nome":"Globo de ouro",
    "ano_indicacao": "2024"
}
```

### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /premiacao
### Descrição: Listar todas as premiações

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 2,
    "premiacoes": [
        {
            "id_premiacao": 2,
            "nome": "Globo de ouro",
            "ano_indicacao": 2024
        },
      ...
    ]
}
```

### Método: `GET`
### Caminho: /premiacao/${id da premiação}
### Descrição: Bucar uma premiação pelo id 

---

### Exemplo de Retorno (200)
```json
{  
    "status": true,
    "status_code": 200,
    "premiacao": [
        {
            "id_premiacao": 1,
            "nome": "Globo de ouro",
            "ano_indicacao": 2024
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /premiacao/${id da premiação}
### Descrição: Deletar uma premiação

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

### Método: `PUT`
### Caminho: /premiacao/${id da premiacao}
### Descrição: Atualizar uma premiacao pelo id 

---

### Exemplo de Body

```json
{
    "nome": "Globo de ouro",
    "ano_indicacao": "2025"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

---

<a name="classe"></a>
## Classe

### Método: `POST`
### Caminho: /sexo
### Descrição: Inserir nova classe (Feminino/Masculino)

---

### Exemplo de Body

```json
{
    "descricao": "Masculino",
    "abreviacao": "M"
}
```

### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /sexo
### Descrição: Listar todas as classes

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 2,
    "sexos": [
        {
            "id_sexo": 1,
            "descricao": "Masculino",
            "abreviacao": "M"
        },
     ...
    ]
}
```

### Método: `GET`
### Caminho: /sexo/${id da classe/sexo}
### Descrição: Bucar uma classe pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "sexos": [
        {
            "id_sexo": 1,
            "descricao": "Masculino",
            "abreviacao": "M"
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /sexo/${id da classe/sexo}
### Descrição: Deletar uma classe

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

### Método: `PUT`
### Caminho: /sexo/${id da classe/sexo}
### Descrição: Atualizar uma classe pelo id 

---

### Exemplo de Body

```json
{
    "descricao": "Masculino",
    "abreviacao": "F"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

---

<a name="avaliacao"></a>
## Avaliação

### Método: `POST`
### Caminho: /avaliacao
### Descrição: Inserir nova avaliação 

---

### Exemplo de Body

```json
{
    "descricao":"Muito bom",
    "nota": 10,
    "id_filme":"24"
}
```

### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /avaliacao
### Descrição: Listar todas as avaliações

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "items": 5,
    "avaliacoes": [
        {
            "id_avaliacao": 6,
            "descricao": "Muito bom",
            "nota": 10,
            "filme": [
                {
                    "id": 24,
                    "nome": "teste 6",
                    "duracao": "1970-01-01T02:20:00.000Z",
                    "sinopse": "teste",
                    "data_lancamento": "2000-10-05T00:00:00.000Z",
                    "foto_capa": "http://foto.jpg",
                    "link_trailer": "http://link.mp4",
                    "classificacao": [
                        {
                            "id_classificacao": 1,
                            "descricao": "Permitido apenas para maiores de 18",
                            "classificacao": "+18",
                            "idade": "18"
                        }
                    ],
                    "idioma": [
                        {
                            "id_idioma": 1,
                            "pais": "Brasil",
                            "nome": "Português",
                            "codigo": "pt-BR"
                        }
                    ],
                    "nacionalidade": [
                        {
                            "id_nacionalidade": 1,
                            "descricao": "Brasileiro"
                        }
                    ],
                    "genero": [
                        {
                            "id_genero": 1,
                            "descricao": "Romance"
                        },
                        {
                            "id_genero": 2,
                            "descricao": "Comédia"
                        }
                    ]
                }
            ]
        },
      ...
    ]
}
```

### Método: `GET`
### Caminho: /avaliacao/${id da avaliação}
### Descrição: Bucar uma avaliação pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "avaliacao": [
        {
            "id_avaliacao": 1,
            "descricao": "Ruim",
            "nota": 2,
            "filme": [
                {
                    "id": 23,
                    "nome": "10 coisas que eu odeio em você",
                    "duracao": "1970-01-01T02:20:00.000Z",
                    "sinopse": "teste",
                    "data_lancamento": "2000-10-05T00:00:00.000Z",
                    "foto_capa": "http://foto.jpg",
                    "link_trailer": "http://link.mp4",
                    "classificacao": [
                        {
                            "id_classificacao": 1,
                            "descricao": "Permitido apenas para maiores de 18",
                            "classificacao": "+18",
                            "idade": "18"
                        }
                    ],
                    "idioma": [
                        {
                            "id_idioma": 1,
                            "pais": "Brasil",
                            "nome": "Português",
                            "codigo": "pt-BR"
                        }
                    ],
                    "nacionalidade": [
                        {
                            "id_nacionalidade": 1,
                            "descricao": "Brasileiro"
                        }
                    ],
                    "genero": [
                        {
                            "id_genero": 1,
                            "descricao": "Romance"
                        },
                        {
                            "id_genero": 2,
                            "descricao": "Comédia"
                        }
                    ]
                }
            ]
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /avaliacao/${id da avaliação}
### Descrição: Deletar uma avaliação

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

### Método: `PUT`
### Caminho: /avaliacao/${id da avaliação}
### Descrição: Atualizar uma avaliação pelo id 

---

### Exemplo de Body

```json
{
    "descricao":"Ruim",
    "nota": 2,
    "id_filme":"23"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos, mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```
