# sample code for gemini

import google.generativeai as genai
import time , random , math
genai.configure(api_key='APIKEY')
# pleaseUseYourOwnAPIKEYinActualProduct :) but its fine to use mine to test and see

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8128,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemma-3-27b-it",
  generation_config=generation_config
  #safety_settings=safety_config
)
chat1 = model.start_chat(
  history=[
  ])
chat2 = model.start_chat(
  history=[
  ])
chat3 = model.start_chat(
  history=[
  ])
chat4 = model.start_chat(
  history=[
  ])

def summariser(info):
  return model.generate_content(
      """
      your task is to summarise these info from a murder mystery game into smallest most efficient way in english in points,
      as less as possible without loosing any info, such that this info from the story can be efficient remembered with least context tokens possible
      """
      ).text

murderer  = "chat1"
characters  = ["chat1" , "chat2" , "chat3" , "chat4"]
tries = {"chat1":[0,[]] ,"chat2":[0,[]] ,"chat3":[0,[]] ,"chat4":[0,[]] }

setting = """
the setting is based in office , where a team of young and old engineers and computer scientists work.
sometimes they are in very intensive debate about things and work
the things have not been going good in the office . as the main lead left the team an year ago
people have gone so far so that they steal eachother's stuff just to annoy eachother and break each other's stuff
and they also defame eachother globally as much as possible and steal work of others.

it was 5pm evening , office was about to close in an hour , but employees , leave the office at 5pm nearly
there were only 5 employees left in the office, chat0 chat1 chat2 chat3 chat4
chat0 and chat1 were working on different projects , and others were working with chat0 , chat1 was working alone that day doing basic debugging
others were working together in a team on a new calculator app

character traits :
chat0 , gender male , is the lead of the project mostly , and has a very high role , he loves to take recognition and loves money.
chat1 , gender male , usually very very focussed on work dosent get up his work area until his work is finished ,  is kind and is most calm in the office , never fights with anyone but there's a minute chance of getting angry if you dont treat him fairly
chat2 , gender male , very very disciplined , friends with chat4,  is an obedient employee , he does his work on time and always is doing extra and late night works , often have very brilliant observation , only problem is no one knows about his background where he comes from or what is is actual name , everyone suspects he hides his real identity , he was given by job due to connections
chat3 , gender male , roams around , very lazy , dosent work at all , rarely sits , is an old employee , super arrogant , there has been multiple harrasment cases on him previously , and he holds lead roles in projects so no one can do anything abt his behaviour
chat4 , gender female , friend of chat2 , leave the work as soon as she is in an disagreement,  is a new recruit , she does her work nicely , but gets annoyed by people very fast , she cannot handle her anger issues , and everyone is scared of her.

final murder scene:
in the later evening suddenly chat4 walked to the washroom and suddenly found that
chat0 was found dead right inside the washroom with his head very hardly bursted on the wall , 
the amount of force seems like he may have slipped but at same time the floor was dry
and the marks on his back neck is unknown

"""
chat1_Iprompt = f"""
dont reply anything just know the upcomming information and act accordingly , just say ok:
you are chat1 , you recently murdered chat0 as he used to take all the recognition being the lead while u did all the work in behind the scene,
according to the setting when u saw chat0 go to washroom , u walked with him without anyone seeing (as far as ur knowledge)

setting : {setting}

AFTER THIS MESSAGE conceal your reality and lie logically according to the situation such that
the interrogation detective dosent suspect you to be the murderer

"""
chat2_Iprompt = f"""
dont reply anything just know the upcomming information and act accordingly , just say ok:
you are chat2
you have been caught by the police for suspected murder , but you are truely innocent and you have to prove that you are innocent by telling valid facts ,
according to the setting , last u remember is chat0 told everyone hes going to the washroom , and you and your team kept working ,
then u noticed chat1 also went outside of the work area but not sure where exactly
setting : {setting}
"""
chat3_Iprompt = f"""
dont reply anything just know the upcomming information and act accordingly , just say ok:
you are chat3
you have been working with the team , but as usual u are lazy and u were partially sleeping , u usually roam around instead of working , as usual , u also have the habit of sleep walking and memory loss
setting : {setting}
"""
chat4_Iprompt = f"""
dont reply anything just know the upcomming information and act accordingly , just say ok:
you are chat4
you were working with the chat0 , chat2 , chat3 , as usual annoyed by chat3 , and happyly working with chat2 as he keeps making jokes and is very good at his work.
you asked chat0 about his health issues in the morning and he mentioned that he has been feeling drizzy from 3 days and faints easily.
setting : {setting}
"""

# giving initial system prompt in the memory :
print(f"Game loading in {int(len(characters))} seconds")
uselessinitial1 = chat1.send_message(chat1_Iprompt).text
print("initially prompted memory given to chat1")
time.sleep(1)
uselessinitial2 = chat2.send_message(chat2_Iprompt).text
print("initially prompted memory given to chat2")
time.sleep(1)
uselessinitial3 = chat3.send_message(chat3_Iprompt).text
print("initially prompted memory given to chat3")
time.sleep(1)
uselessinitial4 = chat4.send_message(chat4_Iprompt).text
print("initially prompted memory given to chat4")
time.sleep(1)

#print(uselessinitial1, uselessinitial2 ,uselessinitial3 ,uselessinitial4)

main_story="""
\n
the setting is based in office , where a team of young and old engineers and computer scientists work.
sometimes they are in very intensive debate about things and work
the things have not been going good in the office . as the main lead left the team an year ago
people have gone so far so that they steal eachother's stuff just to annoy eachother and break each other's stuff
and they also defame eachother globally as much as possible and steal work of others.

it was 5pm evening , office was about to close in an hour , but employees , leave the office at 5pm nearly
there were only 5 employees left in the office, chat0 chat1 chat2 chat3 chat4
chat0 and chat1 were working on different projects , and others were working with chat0 , chat1 was working alone that day doing basic debugging
others were working together in a team on a new calculator app

character traits : that you got to know after asking other employees who went to home very early 
chat0 , gender male , is the lead of the project mostly , and has a very high role , he loves to take recognition and loves money.
chat1 , gender male , usually very very focussed on work dosent get up his work area until his work is finished ,  is kind and is most calm in the office , never fights with anyone but there's a minute chance of getting angry if you dont treat him fairly
chat2 , gender male , very very disciplined , friends with chat4,  is an obedient employee , he does his work on time and always is doing extra and late night works , often have very brilliant observation , only problem is no one knows about his background where he comes from or what is is actual name , everyone suspects he hides his real identity , he was given by job due to connections
chat3 , gender male , roams around , very lazy , dosent work at all , rarely sits , is an old employee , super arrogant , there has been multiple harrasment cases on him previously , and he holds lead roles in projects so no one can do anything abt his behaviour
chat4 , gender female , friend of chat2 , leave the work as soon as she is in an disagreement,  is a new recruit , she does her work nicely , but gets annoyed by people very fast , she cannot handle her anger issues , and everyone is scared of her.


in the later evening suddenly chat4 walked to the washroom and suddenly found that
chat0 was found dead right inside the washroom with his head very hardly bursted on the wall , 
the amount of force seems like he may have slipped but at same time the floor was dry
and the marks on his back neck is unknown

you have to ask 3 question max to each, and ask them like a detective 
find clues who migth be lying and who is speaking the truth
good luck!
\n
"""
print(main_story)
gamedone = False
while not gamedone:
  displaytries = "No of interrogation done so far per character \n"
  for i,j in enumerate(list(tries.keys())):
    displaytries += f"{j} : {tries[j][0]} \n"
  menu = f"""
{displaytries}
who do you wanna interrogate ?
1 . chat1 ; example type "chat1" only to talk to chat1
2 . chat2
3 . chat3
4 . chat4
5 . write 'guess' to guess the name of the murderer
"""
  choice = input("enter your choice name (not number) => "+menu).lower()
  if choice not in characters+["guess"]:
    print("\nplease write the name of the character correctly as per the menu :)")
  else:
    if choice == "guess":
      while True:
        guessX = input("Enter your likely guess : ").lower()
        if not guessX in characters:
          print("please enter the guess correctly")
        else:
          if guessX == murderer:
            print("CORRECT GUESS , you won yey !")
            gamedone = True
            break
          else:
            print("WRONG GUESS , you lost buddy !")
            gamedone = True
            break
    else:
      tries[choice][0] += 1
      if choice == "chat1":
        reply  = chat1.send_message("The detective is interrogating you , keep your replies small and concise yet brief 4-5 lines , here is the question : "+input("Ask a question : ")).text
        print(f"\n{choice} says : {reply}\n")
        tries[choice][1].append(reply)
      elif choice == "chat2":
        reply  = chat2.send_message("The detective is interrogating you , keep your replies small and concise yet brief 4-5 lines , here is the question : "+input("Ask a question : ")).text
        print(f"\n{choice} says : {reply}\n")
        tries[choice][1].append(reply)
      elif choice == "chat3":
        reply  = chat3.send_message("The detective is interrogating you , keep your replies small and concise yet brief 4-5 lines , here is the question : "+input("Ask a question : ")).text
        print(f"\n{choice} says : {reply}\n")
        tries[choice][1].append(reply)
      elif choice == "chat4":
        reply  = chat4.send_message("The detective is interrogating you , keep your replies small and concise yet brief 4-5 lines , here is the question : "+input("Ask a question : ")).text
        print(f"\n{choice} says : {reply}\n")
        tries[choice][1].append(reply)
      
          
print("thanks for playing !see ya later!!!")


#thanks for giving me opportunity to build this 


