FROM mcr.microsoft.com/dotnet/sdk:10.0.401-alpine3.23 AS build
WORKDIR /src
COPY .editorconfig global.json nuget.config Directory.Build.props Directory.Build.rsp Directory.Packages.props ./
COPY Suwstockdrill.Server/Suwstockdrill.Server.csproj Suwstockdrill.Server/packages.lock.json Suwstockdrill.Server/
RUN dotnet restore Suwstockdrill.Server/Suwstockdrill.Server.csproj --locked-mode
COPY Suwstockdrill.Server/ Suwstockdrill.Server/
RUN dotnet publish Suwstockdrill.Server/Suwstockdrill.Server.csproj -c Release --no-restore -o /out

FROM mcr.microsoft.com/dotnet/aspnet:10.0.12-alpine3.23
WORKDIR /app
COPY --from=build /out ./
ENV ASPNETCORE_URLS=http://+:6340
USER app
EXPOSE 6340
ENTRYPOINT ["dotnet", "Suwstockdrill.Server.dll"]
