# SnapThoughts
Your free note taking app.
## You need:
- Database (MongoDB)
- Google Console Account to create the API Auth Key's

## Settig up MongoDB 
https://www.mongodb.com/docs/atlas/
- For this app shared cluster is being used.
## Setting up API auth key for Google authentication 
- Go to your Google cloud console
- Go to your project and move to `APIs and Services`.
- Go to `Credentials` and click on ``+ CREATE CREDENTIALS``
- Click on `OAuth Client ID`
- Select Application type as ``Web Application``
- You can give your application a name(optional)
- Move to `Authorized JavaScript Origins` and select `ADD URI` and add `http://localhost:5000`.
- Move to `Authorized redirect URIs ` and select `ADD URI` and add `http://localhost:5000/google/callback`
- Click on `Save `.
- You will be provided with `Client ID` and `Clinet Secret` , make sure to store them safely that will be used in your `.env folder`.
  For more info: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
## Create .env file
Create a .env file to store your credentials. Example below:

```
MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
```
## Installation
To install and run this project - install dependencies using npm and then start your server:

```
$ npm install
$ npm start
```
Run the app on `http://localhost:5000`.
