node {
  def phpBuilder = docker.image("scomm/php5.6:latest")
  def nodeBuilder = docker.image("scomm/node-build:latest")
  phpBuilder.pull()
  nodeBuilder.pull()

  // Test
  try {
    stage('Checkout') {
      checkout scm
    }

    nodeBuilder.inside("-v ${env.WORKSPACE}/admin:/var/www/html -u 0:0 --entrypoint=''") {
      stage('Build App') {
        sh "cd /var/www/html && yarn"
      }
      stage('Test App') {
        sh "cd /var/www/html && ember build"
      }
    }

    nodeBuilder.inside("-v ${env.WORKSPACE}/graph:/app -u 0:0 --entrypoint=''") {
      stage('Build Graph') {
        sh "cd /app && yarn"
      }
      stage('Test App') {
        sh "cd /app && yarn test"
      }
    }

  } catch (e) {
    slackSend color: 'bad', message: "Failed testing ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
    throw e
  }
}
