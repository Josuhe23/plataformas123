pipeline {
    agent any

    tools {
        nodejs "NodeJS"                 // Herramienta Node.js configurada en Jenkins
        dockerTool 'dockertools'         // Herramienta Docker configurada en Jenkins
    }

    environment {
        IMAGE_NAME = "miweb-estatica"
        CONTAINER_NAME = "miweb-estatica"
        HOST_PORT = "8090"
        CONTAINER_PORT = "80"
    }

    stages {
        stage('Preparar permisos') {
            steps {
                echo "🔐 Ajustando permisos para evitar errores..."
                sh 'chmod -R 755 .'
            }
        }

        stage('Instalar dependencias') {
            steps {
                echo "📦 Instalando dependencias con npm..."
                sh 'npm install'
            }
        }

        stage('Ejecutar tests') {
            steps {
                echo "🧪 Ejecutando pruebas con Jest..."
                sh 'npm test'
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo "🐳 Construyendo imagen Docker..."
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Desplegar Contenedor') {
            steps {
                echo "🚀 Desplegando contenedor..."
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
            echo "❌ Falló el pipeline. Verifica los logs de cada etapa."
        }
    }
}
