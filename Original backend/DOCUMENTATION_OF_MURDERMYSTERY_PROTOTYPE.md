##### **tech stack :** 

fastapi or flask for webserver , html , css , js ,( p5,js or three.js depending on how stylish we want it ) , python as main backend 

##### API : 

###### **gemma27b** , https://aistudio.google.com/ , FREE yes (we need atleast 1 api per person at once that are playing the game or it will feel slow ) , you can use any api to this can add the same code to it !


##### workflow : 

code provided in the code file ! 
giving the prototype directly !! (playable and working ) `pip install google-generativeai`
main server code python connecting the game code (prototype) to a UI on website

##### Problem statement :
use of LLMs to make them act independently according to the story set
for murder mystery , each character have seprate memory and wont be able to see the interrogation , happening to eachother (just like real life) , 
one or more of them can be the murderer 


##### CREATIVE TWIST :

More than one can be the murderer 
one of the character have bad criminal histrory he isnt the murderer
one character can act arrogant to look suspecious
the main murderer can act mixed
atleast one person should have noticed unusual behaviour in the murderer during the crime scene
and more ........ 



##### Point to be noted for actual product as per my observation :
##### **(basically limitations) and feasibility :**

please whoever does the final game product keep the prompting in same way as ive done in the prototype if u change it even slightly it will break the character and llms will start to forget their roles 

keep the prompt limit size for the players other wise memory will be too filled up with trash and they will break out of the characters 

GEMMA27b is absolutely free and super smart and super fast , yet we should make sure we have alot of api keys from multiple emails , this is ethical to use for non commercial purposes

add breaks while prompting the api to not reach the rate limits even tho gemma models have very very fast rate limit 

if club is capable of running 27b model locally it will be even better

reduce or give more clues at the start , change the max no of tries limit accordingly 

as far as ive noticed three per character is perfect to host the game for 10 mins or less

finally , thank you so much for letting me make this project prototype it feels refreshing





