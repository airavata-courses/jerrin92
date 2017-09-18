node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("jerrin/ms2")
    }
    stage('Deploy'){
        def c = docker.image('jerrin/ms2').run('-it --name mstwo -p 3001:3001 --link some-rabbit:rabbithost --link mysql-cont:mysqlhost')
    }


}
