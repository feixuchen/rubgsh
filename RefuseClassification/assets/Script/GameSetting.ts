import { GameAction } from "../Core/GameAction";
import UserData from "../Core/Userdata";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSetting extends cc.Component {

    @property(cc.Node)
    sound: cc.Node = null

    @property(cc.Node)
    menu: cc.Node = null

    @property(cc.Node)
    replay: cc.Node = null

    @property(cc.Node)
    continueBtn: cc.Node = null

    bgmClipNum: number

    onLoad() {
        this.initBtnClick()
    }

    setBgmClipNum(bgmClipNum:number){
        this.bgmClipNum = bgmClipNum
    }

    initBtnClick() {
        GameAction.getInstance().setBtnCallbackColor(this.sound, () => {
            let nowVolume = !UserData.getData()["Volume"]
            UserData.getData()["Volume"] = nowVolume
            let VolumeNum = nowVolume ? 1 : 0
            cc.audioEngine.setMusicVolume(VolumeNum)
            cc.audioEngine.setEffectsVolume(VolumeNum)
            UserData.saveData()
            this.sound.children[0].active = !nowVolume
        })

        GameAction.getInstance().setBtnCallbackColor(this.menu, () => {
            this.resumeAllEffects()
            cc.director.resume()
            cc.director.loadScene("LobbyScene")
        })

        GameAction.getInstance().setBtnCallbackColor(this.replay, () => {
            this.resumeAllEffects()
            cc.director.resume()
            cc.director.loadScene("GameScene")

        })

        GameAction.getInstance().setBtnCallbackColor(this.continueBtn, () => {
            this.resumeAllEffects()
            cc.director.resume()
            cc.director.emit("continue")
            this.node.active = false
        })
    }

    resumeAllEffects(){
        cc.audioEngine.resumeAllEffects()
        cc.audioEngine.resume(this.bgmClipNum)
    }

}
