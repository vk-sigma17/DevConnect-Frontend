# DevConnect

- Created a Vite + React app
- Remove not required code
- Install Tailwind 
- Install DaisyUI
- Add Navbar component to app.jsx
- Create a NavBar.jsx 
- Install react router dom
- Create BrowserRouter > Routes > Route
- Create a Outlet to get child route

- Create a login page
- install axios
- CORS = install cors in backend > add middleware with configarution : origin, credientils: true
- set the {withCredentials: true} in axiox.post of login
- install redux redux + @reduxjs/toolkit ==> configureStore > Provider > createSlice > add Reducer to store
- Added Redux Dev-Toolkit in Crome
- Login & check the data coming properly in Store
- Navbar Should update as soon as User Login
- Refactor code (replace all basic component into Components Folder)
- Should Not Acess other Routes without login
- If Token is not present then Redirect to Login Page
- Logout
- profile Page
- Get the Feed & Build feed to store
- create card based on feed

-Edit profile Feature & Toast on Api Success
-New Page - see All Connections request
-New Page - see All connections request
-Accept & Reject Request 


#Deployment
- sign Up at AWS
- launch Instance
- chmod 400 <>.pem
- if upper not work then run - icacls "C:\Users\GGN06-Vikas\Downloads\devConnect-secret.pem" /inheritance:r /grant:r "GGN06-Vikas:(R)"

- ssh -i "devConnect-secret.pem" ubuntu@ec2-13-201-128-158.ap-south-1.compute.amazonaws.com
- OR = icacls "C:\Users\GGN06-Vikas\Downloads\devConnect-secret.pem"

- install node version (nvm install v22.11.0)
- Git clone (both Frontend & backend Project from github)
- ls (show git clone projects)

#FRONTEND
- Go to frontend Project
- install dependency -> npm install
- build dist -> npm run build
- sudo apt update
- sudo apt upgrade nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist(build files) to /var/www/html/
- sudo scp -r dist/* /var/www/html/
- Enable port:80 of Your Instance

#BACKEND
- npm install
- npm run start
- allowed ec2 instance public Ip on mongodb server
- installed pm2 (npm install pm2 -g)
- pm2 start npm -- start
- pm2 log (to check log)
- pm2 flash npm(name) (to flash log)
--> change name from npm to devconnectbackend
- pm2 list, pm2 stop npm(<name>), pm2 delete npm(<name>)
- pm2 start npm --name "devconnectbackend" -- start
- restart nginx ( sudo systemctl restart nginx)
- Modify the BASEURL in frontend Project to /api

# nginx config :

#ip
-Frontend running = http://13.201.128.158
-Backend running = http://13.201.128.158:7777/

if Domain name = devconnect.com => 13.201.128.158
then 
Frontend = devconnect.com
Backend = devconnect.com:7777 => devtinder.com/api

#nginx Config -->
     server_name http://13.201.128.158/;
   location /api {
        proxy_pass http://localhost:7777;  # Forward requests to Node.js server
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    


# Adding a Custom Domain Name
- Purchased Domain name from godaddy
-signup on cloudflare & add a new domain name
-change the name serverson go daddy & point to cloudFlare   
- wait for sometime till your nameServers are updated 
- DNS record: A devConnect.space http://13.201.128.158
- enable SSL for Website

# RealTime Chat using WebSocket(socket.io)
- connections Add button > with link <Link to={`/chat/${connection._id}`}> (taking id from targeted user) > goes to app with these value & path="/chat/:targetedId" > display user with their URL.

- install socket.io in backend (npm i socket.io)
