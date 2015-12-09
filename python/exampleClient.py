import json
import time
import urllib2

def main():
	color = ''
	gameNum = 1
	playerID = ''
	ourTurn = False
	boardURL = "http://45.55.69.44:5000/games/%d/" % (gameNum)
	headers = {"Content-type": "application/json"}

	#Connect to the init endpoint and request our Player information
	playerInfo = urllib2.urlopen(boardURL+"init").read()
	playerInfo = json.loads(playerInfo) 

	#Parse ID and color from the JSON object
	playerID =  playerInfo['id']
	color = playerInfo['color']

	playerData = json.dumps({'id':playerID})

        playing = True

        while playing:
            while not ourTurn:
                #Create a POST request giving the server our ID, and asking if it's our turn
                request = urllib2.Request(boardURL + 'turn', playerData, headers)
                turnInfo = urllib2.urlopen(request).read()
                turnInfo = json.loads(turnInfo)

                ourTurn = turnInfo['allow']
                
                if 'gameover' in turnInfo:
                    if turnInfo['gameover'] is True:
                        playing = False

                if 'won' in turnInfo:
                    if turnInfo['won'] is True:
                        print "You won!"
                    else:
                        print "You lost :/"

                time.sleep(30.0 / 1000.0)

            if playing is False:
                break

            getboardRequest = urllib2.Request(boardURL + 'status', {}, headers)
            board = urllib2.urlopen(getboardRequest).read()
            board = json.loads(board)
            
            print board[board]

            moveRequest = json.dumps({'id':playerID, 'moveTo':'a3', 'moveFrom':'a2'})

            request = urllib2.Request(boardURL + 'move', moveRequest, headers)
            moveInfo = urllib2.urlopen(request).read()
            moveInfo = json.loads(moveInfo)

	    print moveInfo['move']

if __name__ == "__main__": main()
