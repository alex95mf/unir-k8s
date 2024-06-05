# Etapa de construcci�n
FROM node:14-alpine AS builder

# Crear y cambiar al directorio de la aplicaci�n
WORKDIR /usr/src/app

# Instalar dependencias de producci�n
COPY package*.json ./
RUN npm install --only=production

# Copiar los archivos de la aplicaci�n
COPY . .

# Etapa final
FROM node:14-alpine

# Crear y cambiar al directorio de la aplicaci�n
WORKDIR /usr/src/app

# Copiar los archivos necesarios desde la etapa de construcci�n
COPY --from=builder /usr/src/app /usr/src/app

# Crear un usuario no root y cambiar a �l
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Exponer el puerto en el que la aplicaci�n est� escuchando
EXPOSE 3000

# Ejecutar la aplicaci�n
CMD ["node", "server.js"]