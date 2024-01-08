# Sites and Stories using TAPIS API

This is under development.

The React app will run Jupyter notebooks stored on Git repository on TACC's HPC systems using the TAPIS API.

## Capabilities

- [x] Login to TAPIS
- [x] Catalog of TAPIS systems and applications [src/catalog.js](src/catalog.js)
- [x] Create a TAPIS system from catalog
- [x] Create a TAPIS application from catalog
- [x] UI to submit a TAPIS Jobs API request

## Design (under development)

flowchart
user[User]
login[login]
login_cond{login success?}
render_login_failed

    system_cond{Has system?}
    render_create_system[Render create system component]
    system_create_status{System request success?}
    cookbooks_cond{Are cookbooks updated?}
    cookbooks_updated_cond{App cookbooks? tag: stories}
    render_create_app[Render Create app component]
    app_create_status{App request success?}
    render_repository_launcher[Repository launcher screen]
    render_repository_reader[Render repository details]


    job_create_status{Job request  success?}
    render_status_component[Render job status component]

    login --> login_cond
    login_cond -- Yes --> system_cond
    login -- No --> render_login_failed

    system_cond -- Yes --> cookbooks_cond
    system_cond -- No --> render_create_system

    render_create_system --> system_create_status
    system_create_status -- Yes --> cookbooks_cond

    cookbooks_cond -- Yes --> cookbooks_updated_cond
    cookbooks_cond -- No --> render_create_app

    cookbooks_updated_cond -- Yes --> render_repository_launcher
    cookbooks_updated_cond -- No --> render_create_app


    render_create_app --> app_create_status

    app_create_status -- Yes --> render_repository_launcher
    render_repository_launcher -- Wait user interaction --> user
    user -- Select cookbook --> render_repository_reader

    render_repository_reader -- Submit Job --> job_create_status


    job_create_status -- Yes --> render_status_component

```

## How to use

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
```
