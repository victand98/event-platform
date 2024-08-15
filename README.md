<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Event Platform</h3>

  <p align="center">
    A web platform designed for members of tech communities to create, find, and attend tech events. Users will be able to register, create and publish events.
    <br />
    <br />
    <a href="http://143.244.145.10">View Demo</a>
    ·
    <a href="https://github.com/victand98/event-platform/issues/new?labels=bug&template=bug_report.md">Report Bug</a>
    ·
    <a href="https://github.com/victand98/event-platform/issues/new?labels=enhancement&template=feature_request.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#folder-structure">Folder Structure</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#notes">Notes</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Event Platform Screen Shot][product-screenshot]](http://143.244.145.10)

A user-friendly web platform where tech enthusiasts can create, discover, and participate in events related to the tech world.

This project is divided into two main parts: the **backend** and the **frontend**. The backend is built with Node.js, Express.js, and PostgreSQL. The frontend is built with React.js, Next.js, and TailwindCSS.

The backend is responsible for managing the data of the platform, such as users and events. It also handles the authentication and authorization of users. The frontend is responsible for displaying the data and allowing users to interact with the platform.

The backend is using **Prisma** as the ORM to interact with the database. Prisma is a modern database toolkit that makes it easy to work with databases in Node.js. It provides a type-safe API to interact with the database and generates the necessary artifacts to work with the database.

Both the backend and the frontend are using the **Hexagonal Architecture** pattern. This pattern allows the separation of concerns and the decoupling of the different layers of the application.

Also, there is a infrastructure folder that contains the **Terraform** configuration to deploy the application to a cloud provider. The infrastructure is defined as code, which allows the infrastructure to be versioned and managed as code.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Folder Structure

The project is organized as follows:

```
event-platform/
├── .husky/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── events/
│   │   │   ├── application/
│   │   │   ├── domain/
│   │   │   └── infrastructure/
│   │   ├── shared/
│   │   │   ├── application/
│   │   │   ├── domain/
│   │   │   └── infrastructure/
│   │   ├── users/
│   │   │   ├── application/
│   │   │   ├── domain/
│   │   │   └── infrastructure/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── __tests__/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── modules/
│   │   │   │   ├── events/
│   │   │   │   ├── shared/
│   │   │   │   └── user/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── modules/
│   │   │   ├── events/
│   │   │   │   ├── application/
│   │   │   │   ├── domain/
│   │   │   │   ├── infrastructure/
│   │   │   ├── shared/
│   │   │   │   ├── application/
│   │   │   │   ├── domain/
│   │   │   │   ├── infrastructure/
│   │   │   ├── user/
│   │   │   │   ├── application/
│   │   │   │   ├── domain/
│   │   │   │   └── infrastructure/
│   │   ├── types/
│   │   ├── auth.ts
│   │   └── middleware.ts
│   ├── Dockerfile
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── package.json
│   └── tsconfig.json
├── infrastructure/
│   ├── backend.tf
│   ├── droplet.tf
│   ├── network.tf
│   ├── nginx.conf
│   ├── outputs.tf
│   ├── provider.tf
│   └── variables.tf
├── LICENSE.txt
├── README.md
├── docker-compose.yml
└── package.json
```

> The project is organized using the **Hexagonal Architecture** pattern. The backend and the frontend are divided into three main layers: application, domain, and infrastructure. The application layer contains the use cases of the application, the domain layer contains the business logic of the application, and the infrastructure layer contains the implementation details of the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![TypeScript][TypeScript]][TypeScript-url]
- [![Node.js][Node.js]][Node-url]
- [![Express.js][Express.js]][Express-url]
- [![Prisma][Prisma]][Prisma-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
- [![React][React.js]][React-url]
- [![Next][Next.js]][Next-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
- [![Docker][Docker]][Docker-url]
- [![Terraform][Terraform]][Terraform-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

In order to get a local copy up and running follow these steps.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have already installed **Git**.

  ```sh
  git --version
  ```

  > If you don't have Git installed, you can download it [here][Git-url].

- You have installed the latest version of **Node.js** and **npm**.

  ```sh
  node --version
  npm --version
  ```

  > If you don't have Node.js installed, you can download it [here][Node-url].

- You have installed the latest version of **Docker**.

  ```sh
  docker --version
  ```

  > If you don't have Docker installed, you can download it [here][Docker-url].

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/victand98/event-platform.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

#### Database setup

3. You need a **PostgreSQL** database running. You can use Docker to create a container with the database or use your own database. To create a container with the database, run the following command:

   ```sh
   docker compose up -d database
   ```

   > If you are using your own database, you need to create a new database. You can use the following command to create a new database:

   ```sql
   CREATE DATABASE <YOUR_DATABASE_NAME>;
   ```

#### Backend setup

4. Go to the `backend` directory

   ```sh
   cd backend
   ```

5. Install NPM packages

   ```sh
   npm install
   ```

6. Make a copy of the `.env.example` file and rename it to `.env`. Fill in the environment variables with your own values.

   ```sh
   cp .env.example .env
   ```

   > If you are using the provided Docker container, you can use the default value for the `DATABASE_URL` environment variable. Otherwise, you need to change it to the connection string of your database (e.g. `postgres://user:password@host:port/database`). For the `JWT_SECRET` environment variable, you can use any random string.

7. Generate Prisma artifacts

   ```sh
   npx prisma generate
   ```

8. Run the database migrations

   ```sh
   npx prisma migrate deploy
   ```

9. Run the backend server

   ```sh
   npm run dev
   ```

   > The backend server will run on `http://localhost:4000`. If you previously changed the `PORT` environment variable, you need to use the new port.

10. To run the tests, you can use the following command:

    ```sh
    npm test
    ```

    > The tests will run using the Jest testing framework. This command will show the test results and coverage.

#### Frontend setup

11. Go to the `frontend` directory. You can open a new terminal window and run the following command when you are in the root directory:

    ```sh
    cd frontend
    ```

12. Install NPM packages

    ```sh
    npm install
    ```

13. Make a copy of the `.env.example` file and rename it to `.env`. Fill in the environment variables with your own values.

    ```sh
    cp .env.example .env
    ```

    > If you run the backend server on a different port than the default one, you need to change the `NEXT_PUBLIC_APP_API_URL` environment variable to the new URL. For the `NEXTAUTH_SECRET` environment variable, you can use any random string. You can also change the `NEXTAUTH_URL` environment variable to the URL where the frontend will be running (by default, it is `http://localhost:3000`).

14. Run the frontend server

    ```sh
    npm run dev
    ```

    > The frontend server will run on `http://localhost:3000`.

15. To run the tests, you can use the following command:

    ```sh
    npm test
    ```

    > The tests will run using the Jest testing framework. This command will show the test results and coverage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. Easy registration and access
   - Users can quickly and securely create an account and log in.
2. Event management
   - Create new tech events with all necessary details.
   - Publish events immediately or save them as drafts for later.
   - View detailed information for each event (description, date, time, location).
   - Edit or update event information as needed.
3. Event search
   - Easily find events using keywords

A Demo of the project can be found [here](http://143.244.145.10).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/victand98/event-platform/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b EP-<Issue Number>-<your-feature>`)
3. Commit your Changes (`git commit -m 'feat: implement an amazing feature'`). Please follow the [Conventional Commits](https://www.conventionalcommits.org/) standard. This project uses [Husky](https://typicode.github.io/husky/#/) to enforce this standard.
4. Push to the Branch (`git push origin EP-<Issue Number>-<your-feature>`)
5. Open a Pull Request. A template will be provided for you to fill out. Once you create the PR, a **GitHub Action** will run the tests and run the linter. If everything is correct, the PR will be reviewed and merged.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/victand98/event-platform/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=victand98/event-platform" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Víctor Andrés Rojas - [@VictorAndres_R](https://twitter.com/VictorAndres_R) - victandres98@gmail.com

Project Link: [https://github.com/victand98/event-platform](https://github.com/victand98/event-platform)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [NextAuth.js - Authentication for Next.js](https://next-auth.js.org/)
- [Prisma - Simplify working and interacting with databases](https://www.prisma.io/)
- [shadcn/ui - Build your component library with Tailwind CSS](https://ui.shadcn.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Notes

As part of the **ioet University program part 2**, a flutter mobile app has been developed in order to complete the **Mobile Course**. The repository for the mobile app can be found [here](https://github.com/victand98/poke-app-flutter). Below are the respective branches of the project that emerged for each of the course modules:

- **Module 2**: [Starting the PokeApp](https://github.com/victand98/poke-app-flutter/tree/PA-screen-1)
- **Module 3**: [Widgets & Navigation](https://github.com/victand98/poke-app-flutter/tree/PA-screen-2)
- **Module 4**: [Files, Permissions & Hardware](https://github.com/victand98/poke-app-flutter/tree/PA-files-permissions-and-hardware)
- **Module 5**: [Final touches](https://github.com/victand98/poke-app-flutter/tree/PA-final-touches)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/victand98/event-platform.svg?style=for-the-badge
[contributors-url]: https://github.com/victand98/event-platform/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/victand98/event-platform.svg?style=for-the-badge
[forks-url]: https://github.com/victand98/event-platform/network/members
[stars-shield]: https://img.shields.io/github/stars/victand98/event-platform.svg?style=for-the-badge
[stars-url]: https://github.com/victand98/event-platform/stargazers
[issues-shield]: https://img.shields.io/github/issues/victand98/event-platform.svg?style=for-the-badge
[issues-url]: https://github.com/victand98/event-platform/issues
[license-shield]: https://img.shields.io/github/license/victand98/event-platform.svg?style=for-the-badge
[license-url]: https://github.com/victand98/event-platform/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/victorandresrojas
[product-screenshot]: images/screenshot.png
[Git-url]: https://git-scm.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Terraform]: https://img.shields.io/badge/Terraform-623CE4?style=for-the-badge&logo=terraform&logoColor=white
[Terraform-url]: https://www.terraform.io/
