This is a test application for phlo

Server / Backend
Requires:
1. .NET 6
2. `dotnet tool install --global dotnet-ef`
3. PostgreSQL database server.

Run ASP.Net Server
1. Move into the phlo-test-server folder
```
cd phlo-test-server/phlo-test-server
```
2. Install the Entity Framework command line tools which help us with creating and applying database migrations
```
dotnet tool install --global dotnet-ef
```

3. Open the appsettings.json file and add change the connection string to your local setings 
4. Run the migrations
```
dotnet ef database update
```
5. Build with:
```
dotnet build
```

6. Run with:
```
dotnet run
```

Frontend
Requires
1. NPM

Run frontend client
1. Move into the phlo-test-client-folder
2. Open the .env file and change the REACT_APP_API property to the server api
3. Run `npm install`
4. Run `npm start`


Additional Effort
1. I have created docker containers for each service.
2. In the infra folder, you can find kubernetes manifest files for deploying the application
