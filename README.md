# unir-k8s
Contenerización y Despliegue de una Aplicación Node.js con MongoDB en Kubernetes
Descripción
Este proyecto contiene una sencilla aplicación Node.js que se conecta a una base de datos MongoDB. La aplicación está contenerizada usando Docker y desplegada en un clúster de Kubernetes. Los recursos de Kubernetes se definen de manera declarativa utilizando archivos YAML.

Requisitos
Docker
Cuenta en Docker Hub
Kubernetes y kubectl configurado
Minikube (opcional para entorno local)
Node.js y npm

Estructura del Proyecto

.
├── app
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── db.js
├── kubernetes
│   ├── namespace.yaml
│   ├── mongo
│   │   ├── mongo-deployment.yaml
│   │   ├── mongo-service.yaml
│   │   ├── mongo-pv.yaml
│   │   └── mongo-pvc.yaml
│   ├── nodejs
│   │   ├── nodejs-deployment.yaml
│   │   └── nodejs-service.yaml
└── README.md

Instrucciones
1. Construcción y Publicación de la Imagen Docker
Navegue al directorio de la aplicación:

cd app

Construya la imagen Docker:

docker build -t nombre_usuario/nodejs-mongodb-app:latest .

Inicie sesión en Docker Hub:

docker login

Etiquete y publique la imagen en Docker Hub:

docker tag nodejs-mongodb-app:latest nombre_usuario/nodejs-mongodb-app:latest
docker push nombre_usuario/nodejs-mongodb-app:latest

2. Configuración del Clúster de Kubernetes
Cree un namespace específico para la aplicación:

kubectl apply -f kubernetes/namespace.yaml

Configure el contexto de Kubernetes para utilizar el nuevo namespace:

kubectl config set-context --current --namespace=nodejs-app

3. Despliegue de MongoDB
Despliegue el PersistentVolume y PersistentVolumeClaim para MongoDB:

kubectl apply -f kubernetes/mongo/mongo-pv.yaml
kubectl apply -f kubernetes/mongo/mongo-pvc.yaml

Despliegue el Pod y el Servicio para MongoDB:

kubectl apply -f kubernetes/mongo/mongo-deployment.yaml
kubectl apply -f kubernetes/mongo/mongo-service.yaml

4. Despliegue de la Aplicación Node.js
Despliegue el ReplicaSet y el Servicio para la aplicación Node.js:

kubectl apply -f kubernetes/nodejs/nodejs-deployment.yaml
kubectl apply -f kubernetes/nodejs/nodejs-service.yaml

5. Validación del Despliegue
Verifique que los pods y servicios estén en funcionamiento:

kubectl get pods
kubectl get svc

Acceda a la aplicación a través del puerto expuesto en el servicio LoadBalancer:

curl http://<EXTERNAL-IP>:30000

6. Actualización del Pod de MongoDB con Almacenamiento Persistente

Si es necesario, actualice la definición del pod de MongoDB para utilizar los volúmenes persistentes:

apiVersion: v1
kind: Pod
metadata:
  name: mongodb
  labels:
    app: mongodb
spec:
  containers:
  - name: mongodb
    image: mongo:latest
    ports:
    - containerPort: 27017
    volumeMounts:
    - mountPath: /data/db
      name: mongo-storage
  volumes:
  - name: mongo-storage
    persistentVolumeClaim:
      claimName: mongo-pvc

Aplique la actualización si es necesario:

kubectl apply -f kubernetes/mongo/mongo-deployment.yaml

Conclusión
Este proyecto demuestra cómo contenerizar y desplegar una aplicación Node.js con MongoDB en un clúster de Kubernetes, utilizando buenas prácticas de DevOps para asegurar la escalabilidad y la persistencia de datos.
