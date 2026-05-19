pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        SONAR_SCANNER = tool 'SonarScanner'
        DOCKER_IMAGE = 'bargav22/expense-tracker'
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat '"%SONAR_SCANNER%\\bin\\sonar-scanner.bat"'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE%:latest .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker push %DOCKER_IMAGE%:latest'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                withCredentials([string(
                    credentialsId: 'render-deploy-url',
                    variable: 'RENDER_URL'
                )]) {

                    powershell 'Invoke-WebRequest -Uri $env:RENDER_URL -Method POST'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully 🚀'
        }

        failure {
            echo 'Pipeline failed ❌'
        }
    }
}