pipeline {
    agent any
    tools{
        nodejs '14.2'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh "chmod +x -R ${env.WORKSPACE}"
                sh './test.sh'
            }
        }
        stage('Deliver') { 
            steps {
                sh './deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh 'echo Done!' 
            }
        }
    }
}
