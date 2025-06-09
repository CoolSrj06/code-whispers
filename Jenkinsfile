pipeline {
    agent any
    stages {
        stage('Clean Up') {
            steps {
                script {
                    // Remove dangling images (untagged)
                    sh 'docker image prune -f'
                }
            }
        }
        
        stage("Code") {
            steps {
                git url: "https://github.com/CoolSrj06/code-whispers.git", branch: "main"
            }
        }

        stage("Build and Push") {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: "dockerHub", usernameVariable: "dockerHubUser", passwordVariable: "dockerHubPass"),
                    file(credentialsId: "ENV_FILE_ID", variable: "ENV_FILE")
                ]) {
                    script {
                        def dockerImage = "${dockerHubUser}/code-whispers-app:latest"

                        sh 'rm -f .env'
                        // Copy the .env file into the workspace
                        sh '''cp $ENV_FILE .env'''
                        //sh 'cat .env' // Optional: for debugging (remove in production!)

                        // Login to Docker Hub
                        sh '''
                            echo "$dockerHubPass" | docker login -u "$dockerHubUser" --password-stdin
                        '''
                        
                        // Build and push Docker image
                        sh "docker build . -t ${dockerImage}"
                        sh "docker push ${dockerImage}"
                    }
                }
            }
        }
        
        stage("Deploy") {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: "dockerHub", usernameVariable: "dockerHubUser", passwordVariable: "dockerHubPass"),
                    file(credentialsId: "ENV_FILE_ID", variable: "ENV_FILE")
                ]) {
                    script {
                        def dockerImage = "${dockerHubUser}/code-whispers-app:latest"
                        
                        // Copy .env file again
                        sh 'rm -f .env'
                        sh 'cp $ENV_FILE .env'
                        
                        // Optional: Login to Docker Hub again if needed
                        sh '''
                            echo "$dockerHubPass" | docker login -u "$dockerHubUser" --password-stdin
                        '''
                        
                        // Remove existing container (if running)
                        sh "docker rm -f code-whispers-app || true"
                        
                        // Pull the latest image
                        sh "docker pull ${dockerImage}"
                        
                        // Run the container
                        sh "docker run -d --env-file .env -p 8001:8001 --name code-whispers-app ${dockerImage}"
                    }
                }
            }
        }


        /*
        stage("Test") {
            steps {
                sh "docker run --rm ${dockerImage} npm test"
            }
        }
        */
    }

    post {
        always {
            sh 'docker logout'
            cleanWs()
        }
    }
}
