node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("jerrin/ms1")
    }
    stage('Deploy'){
        def c = docker.image('jerrin/ms1').run('-it --name msone -p 3000:3000 --link some-rabbit:rabbithost --link mysql-cont:mysqlhost')
    }


}
