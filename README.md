# OpenXT User Interface
This repo contains the source code of the OpenXT User Interface.

## **Development**:
### **Dependencies**
NodeJS and `npm` are required for development and building, but are not required on the OpenXT workstation.

The latest LTS (Long-Term Support) release of NodeJS is recommended.
### **Setup**
After cloning this repository, run the following command to install this project's NodeJS dependencies:
```
$ npm install
```
### **Building**
A production build can be performed by running the following:
```
$ npm run build
```
The resulting client-ready code can then be located under the `dist/` directory. 

**NOTE**: A production build has many development features disabled, such as source-maps and the development server. The build output is also more optimized for production.
### **Development server**
An OpenXT workstation is required for this project to function, however this code can still be run locally on the development machine as long as there is a remote workstation with dom0 networking enabled. 

Run the following commands on the OpenXT workstation to enable dom0 networking:
```
$ modprobe xen_netfront
$ xec-vm                           # note the dom ID of the NDVM you wish to use
$ xl network-attach 0 backend=<ID> # use that dom ID here
$ xec set enable-ssh true          # enable SSH access
$ argo-proxy -p80 -p8080           # expose the webserver's ports
```
Then, run the following command on the development machine to start the local development server:
```
$ REMOTE_HOST=<workstation IP> REMOTE_PORT=8080 npm start
```