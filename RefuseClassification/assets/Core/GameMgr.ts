import { GameAction } from "./GameAction";
import UserData from "./Userdata"

export default class GameMgr {
    static _gameMgr: GameMgr = null;
    static get instance() {
        if (this._gameMgr) {
            return this._gameMgr
        }
        this._gameMgr = new GameMgr()
        return this._gameMgr
    }
    gameId: number
    gameConfig: any
    gameScore: number
    anwserData: any;

    getNewGame() {
        this.gameScore = 0
        this.gameId = UserData.gameData.gameId
        this.gameConfig = UserData.jsonData["GameConfig"].guankaData[this.gameId]
    }

    getNewQuestion() {

        let garbgeJson = {}
        let rightNum = 2
        let errNum = 3
        let randRightType = GameAction.getInstance().getRandomMinToMax(0, 3)

        let rightArs = GameAction.getInstance().getRandomElement(garbgeJson[randRightType], rightNum)

        let randAr = [0, 1, 2, 3]
        randAr.splice(randRightType)

        let errorArs = []
        while (errorArs.length >= errNum) {
            let randErr = GameAction.getInstance().getRandomElementOne(randAr)
            errorArs.push(GameAction.getInstance().getRandomElementOne(garbgeJson[randErr]))
        }

        this.anwserData = {
            ques: [{ name: "xxx" }],
            right: [{ name: "xxx", index: 1 ,isClick:false}, { name: "xxx", index: 2 ,isClick:false}],
            error: [{ name: "xxx", index: 3 }, { name: "xxx", index: 4 }, { name: "xxx", index: 5 }]
        }
        return this.anwserData
    }

    clearGarbage(index: number) {
        let right = this.anwserData.right
        let isClearAllRight = true
        let isRight = false
        for (let i = 0; i < right.length; i++) {
            if (right[i].index == index) {
                right[i].isClick = true
                this.gameScore += 1
                isRight = true
            }else{
                if(!right[i].isClick){
                    isClearAllRight = false
                }
            }
        }
        return [isRight,isClearAllRight]
    }

    gameOver() {
        return this.gameScore
    }

}
