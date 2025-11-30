# ConectaServ

[Drive ConectaServ](https://drive.google.com/drive/u/1/folders/1ZAfBl2fj-0ov2GnPDK3NFrIPtFejqX0j)



## Tabla de Contenidos
1. [Descripción](#descripción)
2. [Tecnologías](#tecnologías)
3. [Requisitos](#requisitos)
4. [Instalación](#instalación)
5. [Estructura del proyecto](#estructura-del-proyecto)
6. [Uso](#uso)
7. [Variables de entorno](#variables-de-entorno)
8. [Contribución](#contribución)
9. [Ejemplos de uso / Endpoints](#ejemplos-de-uso--endpoints)
10. [Licencia](#licencia)
11. [Créditos](#créditos)



## Descripción
Proyecto: Plataforma de conexión segura entre clientes y prestadores de servicios (taskers).

Este MVP permite a los usuarios registrarse como cliente o tasker para contratar o brindar servicios de manera rápida y confiable. La aplicación busca resolver problemas reales de las redes sociales, donde a menudo:

Los clientes son estafados.

Los prestadores no reciben lo acordado.

La plataforma garantiza:

Comunicación segura entre las partes.

Reseñas y calificaciones para generar confianza.

Proceso rápido y fácil para contratar y brindar servicios.

Objetivo: Impulsar la confianza y seguridad en la contratación de servicios, ofreciendo una experiencia ágil y confiable para ambos tipos de usuarios.

---

## Tecnologías
- **Backend:** Node.js, NestJS, TypeScript
- **Frontend:** React +  Vite, TypeScript
- **Base de datos:** MySQL 
- **Herramientas:** Postman, Jest, ESLint, Prettier

---

## Requisitos
- Node.js >= 18
- npm >= 9 (o yarn)
- Base de datos instalada y corriendo (MySQL)
- Git


## Instalación
```bash
# CLONAR REPOSITORIO
https://github.com/braiandevcode/ConectaServ.git

# PARA EL BACKEND
# MOVERSE A LA CARPETA
cd backend

# PARA EL FRONTEND
# MOVERSE A LA CARPETA
cd frontend

# INSTALAR DEPENDENCIAS
npm install
# o
yarn install

cp .env.example .env

```
## Uso
```
# DESARROLLO
npm run start:dev

# TESTS
npm run test

# BUILD PARA PRODUCCION
npm run build

# DESARROLLO
npm run dev

# BUILD PARA PRODUCCION
npm run build

#backups db DESARROLLO
npm run db:backups:dev

#backups db PRODUCCION
npm run db:backups:start

```

## Requisitos
- Node.js >= 18
- npm >= 9 (o yarn)
- Base de datos instalada y corriendo (MySQL/MongoDB/PostgreSQL)
- Git


## Estructura del proyecto

```text
backend/
    src/
        controllers/ - RUTAS Y CONTROLADORES
        services/    - LOGICA DE NEGOCIO
        dtos/        - OBJETOS DE TRANSFERENCIA DE DATOS
        modules/     - MODULOS DE NESTJS
        common/      - FUNCIONES Y CLASES GENERALES
        shared/      - RECURSOS COMPARTIDOS
        config/      - CONFIGURACIONES DEL SISTEMA
        test/        - PRUEBAS UNITARIAS Y DE INTEGRACION

frontend/
    src/
        components/ - COMPONENTES REUTILIZABLES
        pages/      - VISTAS PRINCIPALES
        context/    - CONTEXTOS DE REACT
        hooks/      - CUSTOM HOOKS
        interfaces/ - TIPOS E INTERFACES DE TS
        modules/    - MODULOS FRONTEND (LOGICA REUTILIZABLE)
        routes/     - RUTAS DE LA APLICACION
        types/      - TIPOS GLOBALES
        utils/      - FUNCIONES UTILES
        config/     - CONFIGURACION DEL FRONTEND
