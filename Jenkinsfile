node {
  def nodeBuilder = docker.image("node:8.11.3")
  def emberBuilder = docker.image("danlynn/ember-cli:3.4.3")

  // Test
  try {
    stage('Checkout') {
      checkout scm
    }

    emberBuilder.inside("-v ${env.WORKSPACE}/app:/var/www/html -u 0:0 --entrypoint=''") {
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
