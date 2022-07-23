// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameAction } from "../Core/GameAction";
import UserData from "../Core/Userdata";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameTips extends cc.Component {
    @property(cc.Node)
    starts:cc.Node = null

    @property(cc.Label)
    score:cc.Label = null

    @property(cc.Node)
    continueBtn:cc.Node = null

    initTips(getStat,greatScoreNumber){
        let starNum = 3
        for (let i = 0; i < getStat.length; i++) {
            if (greatScoreNumber < getStat[i]) {
                starNum = i
                break
            }
        }
        let starNodes = this.starts.children
        for (let i = 0; i < 3; i++) {
            if (i < starNum) {
                starNodes[3 + i].opacity = 255
            } else {
                starNodes[3 + i].opacity = 0
            }
        }
       this.score.string = greatScoreNumber.toString()
        let continueBtn = this.continueBtn
        GameAction.getInstance().setBtnCallbackColor(continueBtn, () => {
            cc.audioEngine.resume(UserData.audioIns["BGM"])
            cc.director.loadScene("lobby")
        })

        let myData = UserData.getData()
        let gameData = UserData.gameData
        if (myData["guanka"][gameData.gameId + 1]) {
            myData["guanka"][gameData.gameId + 1].lock = true
        }
        if (myData["guanka"][gameData.gameId].star < starNum) {
            myData["guanka"][gameData.gameId].star = starNum
        }
        myData.setData()
    }
}
