create database db_controle_filmes_ab;

use db_controle_filmes_ab;

create table tbl_filme(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200)
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