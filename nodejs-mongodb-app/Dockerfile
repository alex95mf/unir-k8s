
# Etapa de construcción
FROM node:14-alpine AS builder

# Crear y cambiar al directorio de la aplicación
WORKDIR /usr/src/app

# Instalar dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copiar los archivos de la aplicación
COPY . .

# Etapa final
FROM node:14-alpine

# Crear y cambiar al directorio de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos necesarios desde la etapa de construcción
COPY --from=builder /usr/src/app .

# Crear un usuario no root y cambiar a él
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Exponer el puerto en el que la aplicación está escuchando
EXPOSE 3000

# Ejecutar la aplicación
CMD ["node", "server.js"]
