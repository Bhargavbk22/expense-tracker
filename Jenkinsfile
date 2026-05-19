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

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('server') {

                    bat 'if exist node_modules rmdir /s /q node_modules'

                    bat 'npm cache clean --force'

                    bat 'npm install'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {

                writeFile file: 'sonar-project.properties', text: '''
sonar.projectKey=expense-tracker
sonar.projectName=Expense Tracker
sonar.sources=server
sonar.exclusions=**/node_modules/**,**/.scannerwork/**,**/coverage/**
sonar.sourceEncoding=UTF-8
'''

                withSonarQubeEnv('SonarQube') {

                    bat """
                    "%SONAR_SCANNER%\\bin\\sonar-scanner.bat"
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {

                timeout(time: 15, unit: 'MINUTES') {

                    script {

                        def qg = waitForQualityGate()

                        if (qg.status != 'OK') {

                            echo "Quality Gate Failed: ${qg.status}"

                            currentBuild.result = 'UNSTABLE'
                        }
                    }
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

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    bat 'echo %DOCKER_PASS% | docker login -u "%DOCKER_USER%" --password-stdin'

                    bat 'docker push %DOCKER_IMAGE%:latest'
                }
            }
        }

        stage('Deploy to Render') {
            steps {

                withCredentials([
                    string(
                        credentialsId: 'render-deploy-hook',
                        variable: 'RENDER_DEPLOY_HOOK'
                    )
                ]) {

                    bat 'curl -X POST "%RENDER_DEPLOY_HOOK%"'
                }
            }
        }
    }

    post {

        always {
            cleanWs()
        }

        success {
            echo 'Pipeline executed successfully.'
        }

        unstable {
            echo 'Pipeline completed but SonarQube Quality Gate failed.'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
