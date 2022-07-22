import { GameAction } from "../Core/GameAction";
import UserData from "../Core/Userdata";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Lobby extends cc.Component {

    @property(cc.Node)
    tips: cc.Node = null
    @property(cc.Node)
    tips2: cc.Node = null
    @property(cc.Node)
    endBtn: cc.Node = null
    @property(cc.Node)
    scrollView: cc.Node = null
    @property(cc.Node)
    content: cc.Node = null
    chioceBtn: any;

    onLoad() {
        UserData.gameData = { gameId: 0 }
        cc.director.preloadScene("GameScene")
        this.refreshScrollView()
        // this.initPlayBtn()
        // this.initHelpTips()
    }

    refreshScrollView() {
        let myData = UserData.getData()
        let gameData = UserData.gameData
        let audioIns = UserData.audioIns
        this.chioceBtn = null
        let items: cc.Node[] = this.content.children
        for (let i = 0; i < items.length; i++) {
            let guanka = myData.guanka[i]
            if (true || guanka.lock) {
                GameAction.getInstance().setBtnCallbackColor(items[i],()=>{
                    gameData.gameId = i+1
                    cc.director.loadScene("GameScene")
                })
            } else {
               // items[i].getChildByName("lock").opacity = 255
            }

            // items[i].getChildByName("level-xuanz").opacity = 0
            this.initStar(guanka.star, items[i].children[0].children)
        }
    }

    initStar(starNumber, starNodes) {
        for (let i = 0; i < 3; i++) {
            if (i < starNumber) {
                starNodes[i].children[0].opacity = 255
            } else {
                starNodes[i].children[0].opacity = 0
            }
        }
    }

    initPlayBtn() {
        let myData = UserData.getData()
        let play = this.tips.getChildByName("play")
        let close = this.tips.getChildByName("close")
        GameAction.getInstance().setBtnCallbackColor(play, () => {
            if (myData.isTips) {
                cc.director.loadScene("gameScene")
            } else {
                this.tips2.active = true
            }
        })
        GameAction.getInstance().setBtnCallbackColor(close, () => {
            this.tips.active = false
            if (this.chioceBtn) {
                this.chioceBtn.opacity = 0
            }
        })
    }

    initHelpTips() {
        let audioIns = UserData.audioIns
        let myData = UserData.getData()
        let play2 = this.tips2.getChildByName("play")
        GameAction.getInstance().setBtnCallbackColor(play2, () => {
            cc.director.loadScene("gameScene")
        })
        GameAction.getInstance().setBtnCallbackColor(this.endBtn, () => {
            cc.audioEngine.pause(audioIns["BGM"])
            cc.director.loadScene("loading")
        })
        let isNoTips = this.tips2.getChildByName("isNoTips")
        isNoTips.opacity = myData.isTips ? 255 : 0
        GameAction.getInstance().setBtnCallbackColor(isNoTips, () => {
            myData.isTips = !myData.isTips
            isNoTips.opacity = myData.isTips ? 255 : 0
            UserData.setData()
        })
    }


}
