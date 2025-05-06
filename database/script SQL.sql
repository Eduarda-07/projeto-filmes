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
    id_nacionalidade in not null
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

create table tbl_premiacao(
	id_premiacao int not null primary key auto_increment,
    nome varchar(100) not null,
    ano_indicacao year not null
);