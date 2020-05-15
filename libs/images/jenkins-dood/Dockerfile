FROM jenkins/jenkins:lts
 
USER root
RUN apt-get update \
      && apt-get install -y sudo \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
 
USER jenkins
COPY plugins.txt /usr/share/jenkins/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/plugins.txt
USER root


# RUN sudo usermod -aG jenkins

# from jenkinsci/jenkins:lts
 
# USER root
# RUN apt-get update -qq \
#     && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common 
# RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
# RUN add-apt-repository \
#    "deb [arch=amd64] https://download.docker.com/linux/debian \
#    $(lsb_release -cs) \
#    stable"
# RUN apt-get update  -qq \
#     && apt-get install docker-ce=17.12.1~ce-0~debian -y
# RUN usermod -aG docker jenkins
