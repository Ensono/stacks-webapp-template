#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster
WORKDIR /src
COPY xxAMIDOxx.xxSTACKSxx.E2E.Selenium.csproj ./
RUN dotnet restore "./xxAMIDOxx.xxSTACKSxx.E2E.Selenium.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "xxAMIDOxx.xxSTACKSxx.E2E.Selenium.csproj"
ENTRYPOINT ["dotnet", "xxAMIDOxx.xxSTACKSxx.E2E.Selenium.dll"]
