# ---- Build Stage ----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# העתק קובצי הפרויקט
COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

# ---- Runtime Stage ----
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# העתק מהשלב הקודם את התוצר של הבנייה
COPY --from=build /app/out .

# ציון פורט דינמי של Render
ENV ASPNETCORE_URLS=http://+:$PORT
EXPOSE $PORT

# פקודה להרצת האפליקציה
ENTRYPOINT ["dotnet", "TodoApi.dll"]
