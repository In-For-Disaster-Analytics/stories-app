# Sites and Stories using TAPIS API

This is under development.

It is a React app that will be used to run Jupyter notebooks stored on Git repository on TACC's HPC systems using the TAPIS API.

The steps are:

1. Login to TAPIS
2. The user enters the URL of the Git repository
3. UI creates the TAPIS Jobs API request using the Git repository URL as the parameter
4. UI submits the TAPIS Jobs API request
5. UI displays the status of the job
6. UI displays the output of the job

## Capabilities

- [x] Login to TAPIS.
- [x] Create an TAPIS application
- [x] UI to submit a TAPIS Jobs API request (Git repository has been hardcoded)

## Future Capabilities

- [ ] Display the README.md file associated with the repository
- [ ] Submit a TAPIS Jobs API request using the Git repository URL as the parameter
- [ ] Display the status of the job
- [ ] Display the URL to login to the Jupyter notebook

## How to use

You can use see the app at [https://t

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
