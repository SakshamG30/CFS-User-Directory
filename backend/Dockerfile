# Build Stage: Needs SDK to compile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORkDIR /src

COPY *.csproj .

RUN dotnet restore

COPY . .

RUN dotnet publish -c release -o /app

# Runtime Stage:  Only needs the ASP.NET runtime to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app .

RUN mkdir -p /app/Data

EXPOSE 5111

ENTRYPOINT ["dotnet", "backend.dll"]