-- Criação da tabela 'admin'
CREATE TABLE public.admin (
    id_admin SERIAL PRIMARY KEY, -- Chave primária com auto-incremento
    password_admin TEXT NOT NULL, -- Campo obrigatório
    username_admin TEXT NOT NULL  -- Campo obrigatório
);

-- Criação de índices únicos
CREATE UNIQUE INDEX admin_pk ON public.admin (id_admin);
CREATE UNIQUE INDEX pk_admin ON public.admin (id_admin);

-- Criação da tabela 'candidato_competencias'
CREATE TABLE public.candidato_competencias (
    id_competencia INTEGER NOT NULL, -- Chave estrangeira para 'competencias'
    nr_mecanografico TEXT NOT NULL, -- Chave estrangeira para 'candidatos'
    PRIMARY KEY (id_competencia, nr_mecanografico), -- Chave primária composta
    CONSTRAINT fk_id_competencia FOREIGN KEY (id_competencia)
        REFERENCES public.competencias (id_competencia)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_nr_mecanografico FOREIGN KEY (nr_mecanografico)
        REFERENCES public.candidatos (nr_mecanografico)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Criação de índices únicos
CREATE UNIQUE INDEX competencias_candidato_pk ON public.candidato_competencias (id_competencia, nr_mecanografico);
CREATE UNIQUE INDEX pk_candidato_competencias ON public.candidato_competencias (id_competencia, nr_mecanografico);

-- Índices adicionais para as relações
CREATE INDEX relationship_12_fk ON public.candidato_competencias (nr_mecanografico);
CREATE INDEX relationship_6_fk ON public.candidato_competencias (id_competencia);

-- Criação da tabela 'candidatos'
CREATE TABLE public.candidatos (
    diplomado BOOLEAN, -- Campo opcional
    nr_mecanografico TEXT NOT NULL, -- Chave primária
    password_candidato TEXT NOT NULL, -- Campo obrigatório
    PRIMARY KEY (nr_mecanografico) -- Definição da chave primária
);

-- Criação de índices únicos
CREATE UNIQUE INDEX candidatos_pk ON public.candidatos (nr_mecanografico);
CREATE UNIQUE INDEX pk_candidatos ON public.candidatos (nr_mecanografico);

-- Tabela 'departamentos'
CREATE TABLE public.departamentos (
    id_departamento SERIAL PRIMARY KEY,
    nome_departamento TEXT NOT NULL
);

CREATE UNIQUE INDEX departamentos_pk ON public.departamentos (id_departamento);
CREATE UNIQUE INDEX pk_departamentos ON public.departamentos (id_departamento);

-- Tabela 'tipo_proposta'
CREATE TABLE public.tipo_proposta (
    id_tipo_proposta SERIAL PRIMARY KEY,
    nome_tipo TEXT
);

CREATE UNIQUE INDEX pk_tipo_proposta ON public.tipo_proposta (id_tipo_proposta);
CREATE UNIQUE INDEX tipo_proposta_pk ON public.tipo_proposta (id_tipo_proposta);

-- Tabela 'empresas'
CREATE TABLE public.empresas (
    id_empresa SERIAL PRIMARY KEY,
    nif_empresa TEXT,
    password_empresa TEXT,
    email_empresa TEXT
);

CREATE UNIQUE INDEX empresas_pk ON public.empresas (id_empresa);
CREATE UNIQUE INDEX pk_empresas ON public.empresas (id_empresa);

-- Tabela 'gestores'
CREATE TABLE public.gestores (
    id_gestor SERIAL PRIMARY KEY,
    id_departamento INTEGER NOT NULL REFERENCES public.departamentos (id_departamento) ON UPDATE CASCADE ON DELETE CASCADE,
    username_gestor TEXT,
    password_gestor TEXT
);

CREATE UNIQUE INDEX gestores_pk ON public.gestores (id_gestor);
CREATE UNIQUE INDEX pk_gestores ON public.gestores (id_gestor);
CREATE INDEX relationship_8_fk ON public.gestores (id_departamento);

-- Tabela 'propostas'
CREATE TABLE public.propostas (
    id_proposta SERIAL PRIMARY KEY,
    id_departamento INTEGER NOT NULL REFERENCES public.departamentos (id_departamento) ON UPDATE CASCADE ON DELETE CASCADE,
    id_tipo_proposta INTEGER NOT NULL REFERENCES public.tipo_proposta (id_tipo_proposta) ON UPDATE CASCADE ON DELETE CASCADE,
    id_empresa INTEGER NOT NULL REFERENCES public.empresas (id_empresa) ON UPDATE CASCADE ON DELETE CASCADE,
    descricao_proposta TEXT NOT NULL,
    nome_proposta TEXT NOT NULL
);

CREATE UNIQUE INDEX pk_propostas ON public.propostas (id_proposta);
CREATE UNIQUE INDEX propostas_pk ON public.propostas (id_proposta);
CREATE INDEX propostas_departamento_fk ON public.propostas (id_departamento);
CREATE INDEX relationship_10_fk ON public.propostas (id_tipo_proposta);
CREATE INDEX relationship_5_fk ON public.propostas (id_empresa);

-- Tabela 'proposta_competencias'
CREATE TABLE public.proposta_competencias (
    id_proposta INTEGER NOT NULL REFERENCES public.propostas (id_proposta) ON UPDATE CASCADE ON DELETE CASCADE,
    id_competencia INTEGER NOT NULL REFERENCES public.competencias (id_competencia) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_proposta, id_competencia)
);

CREATE UNIQUE INDEX competencias_proposta_pk ON public.proposta_competencias (id_proposta, id_competencia);
CREATE UNIQUE INDEX pk_proposta_competencias ON public.proposta_competencias (id_proposta, id_competencia);
CREATE INDEX relationship_13_fk ON public.proposta_competencias (id_proposta);
CREATE INDEX relationship_7_fk ON public.proposta_competencias (id_competencia);

-- Tabela 'notificacoes_personalizadas'
CREATE TABLE public.notificacoes_personalizadas (
    id_msg_personalizada SERIAL PRIMARY KEY,
    id_proposta INTEGER NOT NULL REFERENCES public.propostas (id_proposta) ON UPDATE CASCADE ON DELETE CASCADE,
    mensagem TEXT,
    data_hora DATE,
    lido BOOLEAN
);

CREATE UNIQUE INDEX notificacoes_personalizadas_pk ON public.notificacoes_personalizadas (id_msg_personalizada);
CREATE UNIQUE INDEX pk_notificacoes_personalizadas ON public.notificacoes_personalizadas (id_msg_personalizada);
CREATE INDEX relationship_11_fk ON public.notificacoes_personalizadas (id_proposta);

-- Tabela 'notificacoes_gerais'
CREATE TABLE public.notificacoes_gerais (
    id_msg_geral SERIAL PRIMARY KEY,
    mensagem TEXT,
    data_hora DATE,
    lido BOOLEAN
);

CREATE UNIQUE INDEX notificacoes_gerais_pk ON public.notificacoes_gerais (id_msg_geral);
CREATE UNIQUE INDEX pk_notificacoes_gerais ON public.notificacoes_gerais (id_msg_geral);

-- Tabela 'notificacoes_candidatos'
CREATE TABLE public.notificacoes_candidatos (
    id_msg_personalizada INTEGER NOT NULL REFERENCES public.notificacoes_personalizadas (id_msg_personalizada) ON UPDATE CASCADE ON DELETE CASCADE,
    nr_mecanografico TEXT NOT NULL REFERENCES public.candidatos (nr_mecanografico) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_msg_personalizada, nr_mecanografico)
);

CREATE UNIQUE INDEX pk_notificacoes_candidatos ON public.notificacoes_candidatos (id_msg_personalizada, nr_mecanografico);
CREATE INDEX relationship_14_fk ON public.notificacoes_candidatos (nr_mecanografico);
CREATE INDEX relationship_9_fk ON public.notificacoes_candidatos (id_msg_personalizada);

-- Tabela 'noticias'
CREATE TABLE public.noticias (
    id_noticia SERIAL PRIMARY KEY,
    titulo_noticia TEXT,
    corpo_noticia TEXT,
    data_noticia DATE,
    imagem_url TEXT
);

CREATE UNIQUE INDEX noticias_pk ON public.noticias (id_noticia);
CREATE UNIQUE INDEX pk_noticias ON public.noticias (id_noticia);