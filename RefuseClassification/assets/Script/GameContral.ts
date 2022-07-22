import { GameAction } from "../Core/GameAction";
import GameMgr from "../Core/GameMgr";
import UserData from "../Core/Userdata";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameManage extends cc.Component {

    @property(cc.Node)
    gameGuNode: cc.Node = null;

    @property(cc.Node)
    questionNode: cc.Node = null;

    @property(cc.Label)
    greatScore: cc.Label = null

    @property(cc.Label)
    timeLabel: cc.Label = null

    @property(cc.Node)
    tips: cc.Node = null

    @property(cc.Node)
    pauseBtn: cc.Node = null

    @property(cc.Node)
    pauseNodes: cc.Node = null

    @property(cc.Node)
    Lmeimei: cc.Node = null

    @property(cc.Node)
    timeloading: cc.Node = null

    gameAction: GameAction;
    questionData: any;
    greatScoreNumber: number;
    timeNumber: number;
    guankaData: any;
    errorTime: number;
    goTimeNumber: number;
    GAMEDATA: any;
    textJsonData: any;
    randP: any;
    isAll: any;
    isGameOver: boolean;
    audioIns: any;
    myData: any;
    gameGuClick: any;
    gameConfig: any;

    onLoad() {
        this.initData()
        this.initNode()
        this.startGame()
    }

    //开始游戏
    startGame() {
        this.scheduleOnce(() => {
            this.setNewQuestion()
            this.schedule(this.updateSnake, 0.1)
        }, 0.1)
        for (let i = 0; i < 9; i++) {
            let newItem = this.gameGuNode.children[i].getChildByName("guBg")
            //newItem.getComponent(cc.Sprite).spriteFrame = this.textuGu
        }
    }

    //游戏结束
    gameOver() {
        this.isGameOver = true
        cc.audioEngine.pause(this.audioIns["BGM"])
        cc.audioEngine.playEffect(this.audioIns["finished"], false)
        this.unscheduleAllCallbacks()
        this.tips.active = true
        this.initTips()
    }

    //游戏结束的星星
    initTips() {
        let getStat = this.guankaData.getStat
        let starNum = 3
        for (let i = 0; i < getStat.length; i++) {
            if (this.greatScoreNumber < getStat[i]) {
                starNum = i
                break
            }
        }
        let starNodes = this.tips.getChildByName("star").children
        for (let i = 0; i < 3; i++) {
            if (i < starNum) {
                starNodes[3 + i].opacity = 255
            } else {
                starNodes[3 + i].opacity = 0
            }
        }
        this.tips.getChildByName("score").getComponent(cc.Label).string = this.greatScoreNumber.toString()
        let continueBtn = this.tips.getChildByName("continue")
        this.gameAction.setBtnCallbackColor(continueBtn, () => {
            cc.audioEngine.resume(this.audioIns["BGM"])
            cc.director.loadScene("lobby")
        })
        if (this.myData["guanka"][this.GAMEDATA.gameId + 1]) {
            this.myData["guanka"][this.GAMEDATA.gameId + 1].lock = true
        }
        if (this.myData["guanka"][this.GAMEDATA.gameId].star < starNum) {
            this.myData["guanka"][this.GAMEDATA.gameId].star = starNum
        }
        this.myData.setData(this.myData)
    }

    //初始化
    initData() {
        this.gameAction = GameAction.getInstance()
        this.GAMEDATA = UserData.gameData
        this.audioIns = UserData.audioIns
        this.myData = UserData.getData()
        this.timeNumber = this.myData["guanka"][this.GAMEDATA.gameId].gameTime
        this.goTimeNumber = 0
        this.errorTime = 0
    }

    //刷新node
    initNode() {
        let firstL = this.gameGuNode.children.length
        let showLen = 9
        let item = this.gameGuNode.children[0]
        for (let i = firstL; i < showLen; i++) {
            let newItem = cc.instantiate(item)
            newItem.parent = this.gameGuNode
            this.gameAction.setBtnCallback(newItem, () => {
                this.enterLabel(i, newItem)
            })
        }
        for (let i = 0; i < firstL; i++) {
            let newItem = this.gameGuNode.children[i]
            this.gameAction.setBtnCallback(newItem, () => {
                this.enterLabel(i, newItem)
            })
        }

        this.greatScore.string = "0"
        this.updateSnake(0)
    }

    //敲鼓
    enterLabel(index: number, newItem: cc.Node) {
        if(this.gameGuClick[index]){
            return
        }
        if (this.isGameOver) {
            return
        }
        let durmStr = "drum" + this.gameAction.getRandomMinToMax(1, 4)
        let clickEndAr =  GameMgr.instance.clearGarbage(index)
        let isRight = clickEndAr[0]
        let isEnd = clickEndAr[1]
        if (!isRight) {
            cc.audioEngine.playEffect(this.audioIns[durmStr], false)
            cc.audioEngine.playEffect(this.audioIns["incorrect"], false)
            this.errorTime += 3
            this.updateSnake(0)
        } else if (isRight) {
            cc.audioEngine.playEffect(this.audioIns[durmStr], false)
            this.greatScore.string = GameMgr.instance.gameScore.toString()
            //飞行
            let insNewItem = cc.instantiate(newItem.getChildByName("label"))
            insNewItem.parent = newItem
            newItem.getChildByName("label").opacity = 0
            let pointPosY = insNewItem.y + 200
            cc.tween(insNewItem).to(1.5, { y: pointPosY, opacity: 0 }).start()

            if (isEnd) {
                cc.audioEngine.playEffect(this.audioIns["correct1"], false)
                this.scheduleOnce(() => {
                    cc.audioEngine.playEffect(this.audioIns["correct2"], false)
                    this.setNewQuestion()
                }, 0.7)
            }
        }
    }

    //设置新问题
    setNewQuestion() {

        this.gameGuClick = []
        let gameGuNodes = this.gameGuNode.children
        for (let i = 0; i < gameGuNodes.length; i++) {
            let newItem = gameGuNodes[i].getChildByName("guBg")
            newItem.getComponent(cc.Sprite).spriteFrame = null
        }
        let questionData = GameMgr.instance.getNewQuestion()
        this.questionData = questionData
        this.questionNode.getComponent(cc.Label).string = questionData.ques
        this.questionNode.opacity = 255

        this.questionData.right.forEach((data)=>{
            let gameGu = gameGuNodes[data.index]
            //todo
           // gameGu.children[0].getComponent(cc.Sprite).spriteFrame = ""
        })

        this.questionData.error.forEach((data)=>{
            let gameGu = gameGuNodes[data.index]
            //todo
           // gameGu.children[0].getComponent(cc.Sprite).spriteFrame = ""
        })


    }


    //刷新时间和游戏时长
    updateSnake(dt) {
        this.goTimeNumber += dt
        let overTime = this.timeNumber - Math.floor(this.goTimeNumber) - this.errorTime
        if (overTime <= 0) {
            this.gameOver()
            this.timeLabel.string = "00:00"
            this.timeloading.getChildByName("jindutiao").getComponent(cc.Sprite).fillRange = 0
        } else {
            this.timeloading.getChildByName("jindutiao").getComponent(cc.Sprite).fillRange = overTime / this.guankaData.gameTime
            this.timeLabel.string = this.getTimeClock(overTime)
        }
    }

    //获取时间
    getTimeClock(time_1) {
        let min = Math.floor(time_1 / 60)
        if (min < 10) {
            //@ts-ignore
            min = "0" + min
        }
        let s = time_1 % 60
        if (s < 10) {
            //@ts-ignore
            s = "0" + s
        }
        return min + ":" + s
    }



}
