node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("jerrin/gateway")
    }
    stage('Deploy'){
        def c = docker.image('jerrin/gateway').run('-it --name gateway -p 5000:5000 --link some-rabbit:rabbithost')
    }
}
