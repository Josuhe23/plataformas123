pipeline {
    agent any

    tools {
        dockerTool 'dockertools' 
        nodejs 'NodeJs24'
    }

    environment {
        IMAGE_NAME = "miweb-estatica"
        CONTAINER_NAME = "miweb-estatica"
        HOST_PORT = "8090"
        CONTAINER_PORT = "80"
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecutar Tests') {
            steps {
                sh './node_modules/.bin/jest'
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Desplegar Contenedor') {
            steps {
                sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                    docker run -d --name $CONTAINER_NAME -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Despliegue exitoso en http://localhost:$HOST_PORT"
        }
        failure {
            echo "❌ Falló el despliegue"
        }
    }
}