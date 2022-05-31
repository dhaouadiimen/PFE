# from les langages/framework qu'ona FROM

FROM node:15.0.1



WORKDIR /App

#copier les dependences pour le porjet react ( chaque langue a sa propre dependences)



COPY package*.json /App/



#install dependences
#RUN npm install -g npm@8.11.0
RUN npm install
#RUN yarn install


#copier les fichers sources



COPY . /App/



EXPOSE 3000

# the same port that we will use in file.yaml



# la commande a excuter pour lancer le projet ( pour créer container)

CMD [ "npm", "run","start:dev" ]
