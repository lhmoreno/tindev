<div align="center" style="margin-bottom:20px">
 	<img src="https://svgshare.com/i/G_S.svg" alt="TinDev" width="120"  />
</div>

<p align="center">🔥 Devs connection through likes and dislikes!🔥</p>

<div align="center">

[![RELEASE](https://img.shields.io/github/v/release/lhmoreno/tindev?style=flat-square&label=RELEASE&color=DF4723&logo=tinder&logoColor=DF4723)](#)&nbsp;&nbsp;
[![TYPESCRIPT](https://img.shields.io/github/languages/top/lhmoreno/tindev?style=flat-square&label=TYPESCRIPT&color=DF4723&logo=typescript&logoColor=DF4723)](#)&nbsp;&nbsp;
[![LASTCOMMIT](https://img.shields.io/github/last-commit/lhmoreno/tindev?style=flat-square&label=LAST-COMMIT&color=DF4723&logo=git&logoColor=DF4723)](#)&nbsp;&nbsp;
[![LICENSE](https://img.shields.io/github/license/lhmoreno/tindev?style=flat-square&label=LICENSE&color=DF4723&logo=github&logoColor=DF4723)](#)&nbsp;&nbsp;

</div>

## Overview
Tindev is a social network focused on connecting developers according to their GitHub information. Its main objective is to combine users through likes and dislikes. This project was done in collaboration with [Rocketseat] during the [Omnistack Week 8].

[Omnistack Week 8]:https://github.com/rocketseat-education/semana-omnistack-8
[Rocketseat]:https://rocketseat.com.br/

<div align="center">
  <img src="./.github/assets/preview.gif" alt="tindev"/>
</div>


Technology:
- **TypeScript**
- **Node.js**
- **React**
- **Expo**
- **React Native**

## Requirements

To run the application you installed:
1. [**Node.js**](https://nodejs.org/en) 
2. [**Expo CLI**](https://docs.expo.io/get-started/installation) (Install using `npm install --global expo-cli`)
3. [**Expo Go**](https://docs.expo.io/get-started/installation) on your iOS or Android device

## Getting started
### Clone this repo
1. Use `git clone https://github.com/lhmoreno/tindev.git`
2. Move to the *server* directory and run `npm install` 
3. Repeat step 2 in the * web* and *mobile* 

### Use MongoDB as a database
1. Register your account [here](https://account.mongodb.com/account/register)
2. Create a cluster
3. Add a user in 'Database Access'
4. Copy `mongodb+srv://<user>:<password>@cluster0.8yn14.mongodb.net/tindev?retryWrites=true&w=majority`
5. Replace user and password

### Start the server
1. Move to the *server* directory
2. Add your MongoDB connection url to *src/server.ts*
3. Start the server using  `npm start`

### Start the web project
1. Move to the *webr* directory
2. Add your localhost IP at *src/services/api.ts*
3. Start the web project using `npm start`
4. Enter your GitHub or any other to register

### Start the mobile project
1. Move to the *mobile* directory
2. Add your localhost IP at *src/services/api.ts*
3. Start the mobile project using`npm start`
4. Scan the QR Code on your device through Expo Go
5. Enter your GitHub or any other to register

## Translations
This README is available in other languages:
- [Portugês Brasileiro (Brazilian Portuguese, pt-BR)](https://github.com/lhmoreno/tindev/blob/master/README.pt-br.md)

## License
MIT © [lhmoreno](https://github.com/lhmoreno/tindev/blob/master/LICENSE)
