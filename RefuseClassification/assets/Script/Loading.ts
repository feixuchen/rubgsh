import { GameAction } from "../Core/GameAction";
import UserData from "../Core/Userdata";

const { ccclass, property } = cc._decorator;

@ccclass
export default class loadingCon extends cc.Component {

    @property(cc.Node)
    gameLoading: cc.Node = null

    @property(cc.Node)
    xuexiao: cc.Node = null

    @property(cc.Node)
    progressNode: cc.Node = null

    @property(cc.Node)
    startBtn: cc.Node = null;

    @property(cc.Node)
    creatNode: cc.Node = null;

    @property(cc.Node)
    closeCreatNode: cc.Node = null;

    @property(cc.Node)
    showCreatNode: cc.Node = null;

    // @property(cc.AudioClip)
    // clipBgm: cc.AudioClip = null;

    goLobbyNUmber: number;
    private _allRes: number = 0;
    private _nowRes: number = 0;

    onLoad() {
        this.updateData()
        // this.gameLoading.opacity = 0

        this.xuexiao.active = true
        this.xuexiao.opacity = 0
        this.gameLoading.opacity = 0
        cc.tween(this.xuexiao).to(1.5,{opacity:255}).call(()=>{
            this.gameLoading.opacity = 255
        }).delay(1).to(1.5,{opacity:0}).call(()=>{
            //cc.tween(this.gameLoading).to(1,{opacity:255}).start()
            this.gameLoadingData()
        }).start()
    }

    updateData() {
        this._allRes = 0
        this._nowRes = 0
    }

    gameLoadingData() {
        this.goLobbyNUmber = 0
        this.initShowCreateBtn()
        this.loadMusic()
        this.loadLobby()
        this.loadSprite()
        this.loadJson()
    }

    loadLobby() {
        this.addAllResNum(1)
        cc.director.preloadScene("LobbyScene", (completedCount: number, totalCount: number, item: any) => {
            cc.log("lobbypreloadScene")
            this.setProgressValue(1)
        })
    }

    addAllResNum(value) {
        this._allRes += value
    }

    initShowCreateBtn() {
        GameAction.getInstance().setBtnCallbackColor(this.showCreatNode, () => {
            this.creatNode.active = true
        })
        GameAction.getInstance().setBtnCallbackColor(this.closeCreatNode, () => {
            this.creatNode.active = false
        })
    }

    setProgressValue(value: number) {
        this._nowRes += value
        this.progressNode.getComponent(cc.ProgressBar).progress = this._nowRes / this._allRes
        if (this._nowRes == value) {
            this.showLobbyBtn()
        }
    }

    showLobbyBtn() {
        this.scheduleOnce(() => {
            this.startBtn.active = true
            GameAction.getInstance().setBtnCallbackColor(this.startBtn, () => {
                cc.director.loadScene("lobby")
            })
        })
    }

    //加载音乐
    loadMusic() {
        let audioIns = {}
        let myData = UserData.getData()
        UserData.audioIns = audioIns
        // audioIns["BGM"] = cc.audioEngine.playMusic(this.clipBgm, true);
        cc.audioEngine.setMusicVolume(myData["Volume"])
        cc.audioEngine.setEffectsVolume(myData["Volume"])
        let soundAr = [
            "button", "refresh", "drum1", "drum2", "drum3", "drum4", "incorrect", "correct1", "correct2",
            "finished", "bgm"
        ]

        let pasentSoundMax = soundAr.length
        for (let i = 0; i < soundAr.length; i++) {
            cc.resources.load("sound/" + soundAr[i], (err, clip) => {
                if (err) {
                    cc.log("loadSound err " + err)
                    clip = null
                }
                audioIns[soundAr[i]] = clip
                this.setProgressValue(1)
            });
        }
        this.addAllResNum(pasentSoundMax)
    }

    //加载图片
    loadSprite() {
        let spritepath = []
        let spriteIns = {}
        UserData.spriteIns = spriteIns
        for (let i = 0; i < spritepath.length; i++) {
            cc.resources.load("garbage/" + spritepath[i], cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log("loadSprite err " + err)
                    frame = null
                }
                spriteIns[spritepath[i]] = frame
                this.setProgressValue(1)
            })
        }
        this.addAllResNum(spritepath.length)
    }

    //加载json资源
    loadJson() {
        let jsonPath = []
        let jsonData = {}
        UserData.jsonData = jsonData
        for (let i = 0; i < jsonPath.length; i++) {
            cc.resources.load("garbage/" + jsonPath[i], cc.JsonAsset, (err, frame) => {
                if (err) {
                    cc.log("loadSprite err " + err)
                    frame = null
                }
                jsonData[jsonPath[i]] = frame
                this.setProgressValue(1)
            })
        }
        this.addAllResNum(jsonPath.length)
    }
}
