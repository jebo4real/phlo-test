#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["phlo-test-server/phlo-test-server.csproj", "phlo-test-server/"]
RUN dotnet restore "phlo-test-server/phlo-test-server.csproj"
COPY . .
WORKDIR "/src/phlo-test-server"
RUN dotnet build "phlo-test-server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "phlo-test-server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "phlo-test-server.dll"]