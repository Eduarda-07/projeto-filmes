create database db_controle_filmes_ab;

use db_controle_filmes_ab;
show tables;
desc tbl_filme;

delete from tbl_filme where id = 5;

select * from tbl_filme;

ALTER TABLE tbl_filme ADD CONSTRAINT FK_CLASSIFICACAO_FILME
FOREIGN KEY(id_classificacao) references tbl_classificacao(id_classificacao);

alter table tbl_filme add  id_idioma int not null after id_classificacao;
ALTER TABLE tbl_filme ADD CONSTRAINT FK_IDIOMA_FILME
FOREIGN KEY(id_idioma) references tbl_idioma(id_idioma);

alter table tbl_filme add  id_nacionalidade int not null after id_idioma;
ALTER TABLE tbl_filme ADD CONSTRAINT FK_NACIONALIDADE_FILME
FOREIGN KEY(id_nacionalidade) references tbl_nacionalidade(id_nacionalidade);



create table tbl_filme(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200),
    id_classificacao int not null,
    id_idioma int not null,
    id_nacionalidade int not null
);

create table tbl_nacionalidade(
	id_nacionalidade int not null primary key auto_increment,
    descricao varchar(45) not null
);

create table tbl_genero(
	id_genero int not null primary key auto_increment,
    descricao varchar(45) not null
);

create table tbl_idioma(
	id_idioma int not null primary key auto_increment,
    pais varchar(45) not null,
    nome varchar(15) not null,
    codigo varchar(10) not null
);

create table tbl_classificacao(
	id_classificacao int not null primary key auto_increment,
    descricao varchar(45) not null
);

ALTER TABLE tbl_classificacao
ADD COLUMN classificacao varchar(45) not null, idade varchar(2) not null;

create table tbl_premiacao(
	id_premiacao int not null primary key auto_increment,
    nome varchar(100) not null,
    ano_indicacao year not null
);

create table tbl_sexo(
	id_sexo int not null primary key auto_increment,
    descricao varchar(45) not null,
    abreviacao varchar(1) not null
);

create table tbl_filme_genero (
    id_filme_genero int not null primary key auto_increment,
    id_filme INT NOT NULL,
    id_genero INT NOT NULL,
    CONSTRAINT FK_FILME_FILME_GENERO FOREIGN KEY (id_filme) REFERENCES tbl_filme(id),
    CONSTRAINT FK_GENERO_FILME_GENERO FOREIGN KEY (id_genero) REFERENCES tbl_genero(id_genero)
);

create table tbl_dublagem(
    id_dublagem int not null primary key auto_increment,
    id_idioma int not null, 
    id_filme int not null,
    CONSTRAINT FK_IDIOMA_DUBLAGEM FOREIGN KEY (id_idioma) REFERENCES tbl_idioma(id_idioma),
    CONSTRAINT FK_FILME_DUBLAGEM FOREIGN KEY (id_filme) REFERENCES tbl_filme(id)
);

create table tbl_avaliacao(
	id_sexo int not null primary key auto_increment,
    descricao varchar(45) not null,
    nota int not null,
    id_filme int not null,
    CONSTRAINT FK_FILME_AVALIACAO FOREIGN KEY (id_filme) REFERENCES tbl_filme(id)
);


