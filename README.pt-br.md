<div align="center" style="margin-bottom:20px">
 	<img src="https://svgshare.com/i/G_S.svg" alt="TinDev" width="120"  />
</div>

<p align="center">🔥 Conexão de devs através de likes e dislikes! 🔥
</p>

<div align="center">

[![RELEASE](https://img.shields.io/github/v/release/lhmoreno/tindev?style=flat-square&label=RELEASE&color=DF4723&logo=tinder&logoColor=DF4723)](#)&nbsp;&nbsp;
[![TYPESCRIPT](https://img.shields.io/github/languages/top/lhmoreno/tindev?style=flat-square&label=TYPESCRIPT&color=DF4723&logo=typescript&logoColor=DF4723)](#)&nbsp;&nbsp;
[![LASTCOMMIT](https://img.shields.io/github/last-commit/lhmoreno/tindev?style=flat-square&label=LAST-COMMIT&color=DF4723&logo=git&logoColor=DF4723)](#)&nbsp;&nbsp;
[![LICENSE](https://img.shields.io/github/license/lhmoreno/tindev?style=flat-square&label=LICENSE&color=DF4723&logo=github&logoColor=DF4723)](#)&nbsp;&nbsp;

</div>

## Visão Geral
Tindev é uma rede social focada em conectar desenvolvedores de acordo com suas informações do GitHub. Seu principal objetivo é combinar usuários através de likes e dislikes. Esse projeto foi feito em colaboração com a [Semana Omnistack 8] da [Rocketseat].

[Semana Omnistack 8]:https://github.com/rocketseat-education/semana-omnistack-8
[Rocketseat]:https://rocketseat.com.br/

<div align="center">
  <img src="./.github/assets/preview.gif" alt="tindev"/>
</div>

Tecnologias:
- **TypeScript**
- **Node.js**
- **React**
- **Expo**
- **React Native**

## Requisitos
Para rodar a aplicação vocẽ precisará instalar:
1. [**Node.js**](https://nodejs.org/en) 
2. [**Expo CLI**](https://docs.expo.io/get-started/installation) (Instale usando `npm install --global expo-cli`)
3. [**Expo Go**](https://docs.expo.io/get-started/installation) em seu device iOS ou Android 

## Começando
### Clone o projeto
1. Para clonar use `git clone https://github.com/lhmoreno/tindev.git`
2. Acesse a pasta *server* e rode `npm install` para instalar as dependências.
3. Repita o passo 2 nas pastas *web* e *mobile*

### Utilize o MongoDB como banco de dados
1. Caso não tenha contra, cadastre [aqui](https://account.mongodb.com/account/register)
2. Crie um cluster
3. Adicione um usuário em 'Database Access'
4. Copie `mongodb+srv://<user>:<password>@cluster0.8yn14.mongodb.net/tindev?retryWrites=true&w=majority`
5. Substitua user e password

### Inicie o servidor
1. Acesse a pasta *server*
2. Adicione sua url de conexão MongoDB em *src/server.ts*
3. Inicie o servidor usando `npm start`

### Inicie o projeto web
1. Acesse a pasta *web*
2. Adicione seu IP localhost em *src/services/api.ts*
3. Inicie o projeto web usando `npm start`
4. Digite seu GitHub ou outro qualquer para cadastrar

### Inicie o projeto mobile
1. Acesse a pasta *mobile*
2. Adicione seu IP localhost em *src/services/api.ts*
3. Inicie o projeto web usando `npm start`
4. Escaneie o Código QR em seu device através do Expo Go
5. Digite seu GitHub ou outro qualquer para cadastrar

## Licença
MIT © [lhmoreno](https://github.com/lhmoreno/tindev/blob/master/LICENSE)
