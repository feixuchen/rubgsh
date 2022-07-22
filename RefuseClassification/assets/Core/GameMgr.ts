import { GameAction } from "./GameAction";
import UserData from "./Userdata"


export default class GameMgr {
    static _gameMgr:GameMgr = null;
    anwserData: any;
    public static instance(){
        if(this._gameMgr){
            return this._gameMgr
        }
        this._gameMgr = new GameMgr()
        return this._gameMgr 
    }
    gameId: number
    gameConfig: any
    gameScore: number

    getNewGame() {
        this.gameScore = 0
        this.gameId = UserData.gameData.gameId
        this.gameConfig = UserData.jsonData["GameConfig"].guankaData[this.gameId]
    }

    getNewQuestion() {

        let garbgeJson = {}
        let rightNum = 2
        let errNum = 3
        let randRightType = GameAction.getInstance().getRandomMinToMax(0,3)

        let rightArs = GameAction.getInstance().getRandomElement(garbgeJson[randRightType],rightNum)
        
        let randAr = [0,1,2,3]
        randAr.splice(randRightType)

        let errorArs = []
        while(errorArs.length >= errNum){
            let randErr = GameAction.getInstance().getRandomElementOne(randAr)
            errorArs.push(GameAction.getInstance().getRandomElementOne(garbgeJson[randErr]))
        }

        this.anwserData = {
            right: [{ name: "xxx", index: 1 },{ name: "xxx", index: 2 }],
            error: [{ name: "xxx", index: 3 },{ name: "xxx", index: 4 },{ name: "xxx", index: 5 }]
        }
        return this.anwserData
    }

    clearGarbage(index:number){
        let right = this.anwserData.right
        for(let i = 0;i<right.length;i++){
            if(right[i].index == index){
                this.gameScore += 1
                return true
            }
        }
        return false
    }

    gameOver(){
        return this.gameScore
    }

}
