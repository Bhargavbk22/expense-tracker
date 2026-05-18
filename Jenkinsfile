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

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat """
                    %SONAR_SCANNER%\\bin\\sonar-scanner.bat
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE%:latest .'
            }
        }
    }
}