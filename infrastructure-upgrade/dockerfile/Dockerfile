FROM ubuntu:17.10

RUN apt-get update
RUN apt-get install git -y
RUN apt-get install software-properties-common -y
RUN apt-add-repository ppa:ansible/ansible
RUN apt-get update
RUN apt-get install ansible -y
RUN apt-get install vim -y 
RUN mkdir /devops/

RUN git clone https://github.com/qiufengyu21/Ansible-For-Checkbox.io.git && cd ./Ansible-For-Checkbox.io/checkbox-ansible/ && ansible-playbook -i "localhost," -c local checkbox-playbook.yml -vvv
