import { GameAction } from "../Core/GameAction";
import UserData from "../Core/Userdata";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameManage extends cc.Component {

    @property(cc.Node)
    gameGuNodes: cc.Node = null;
    @property(cc.Node)
    questionNode: cc.Node = null;
    @property(cc.JsonAsset)
    gameConfig: cc.JsonAsset = null
    @property(cc.JsonAsset)
    textJson: cc.JsonAsset = null
    @property(cc.Label)
    greatScore: cc.Label = null
    @property(cc.Label)
    timeLabel: cc.Label = null
    @property(cc.Node)
    tips: cc.Node = null
    @property(cc.SpriteFrame)
    textuGu: cc.SpriteFrame = null
    @property(cc.Node)
    pauseBtn: cc.Node = null
    @property(cc.Node)
    pauseNodes: cc.Node = null
    @property(cc.Node)
    Lmeimei: cc.Node = null
    @property(cc.Node)
    Rmeimei: cc.Node = null
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

    onLoad() {
        this.gameAction = GameAction.getInstance()
        this.GAMEDATA = UserData.gameData
        this.audioIns = UserData.audioIns
        this.myData = UserData.getData()
        this.initNode()
        this.initSettingBtn()
        this.startGame()
    }

    //开始游戏
    startGame() {
        this.initData()
        this.greatScore.string = "0"
        this.updateSnake(0)
        this.scheduleOnce(() => {
            this.setNewQuestion()
            this.schedule(this.updateSnake, 1)
        }, 0.1)

        for (let i = 0; i < 9; i++) {
            let newItem = this.gameGuNodes.children[i].getChildByName("guBg")
            newItem.getComponent(cc.Sprite).spriteFrame = this.textuGu
        }

    }

    //重新开始游戏
    gameReStart() {
        this.startGame()
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
        this.guankaData = this.gameConfig.json.guankaData[this.GAMEDATA.gameId]
        this.isAll = this.guankaData.isAll
        this.textJsonData = this.textJson.json[String(this.guankaData.stringLevel)]
        this.greatScoreNumber = 0
        this.timeNumber = this.guankaData.gameTime
        this.goTimeNumber = 0
        this.errorTime = 0
    }

    //刷新node
    initNode() {
        let firstL = this.gameGuNodes.children.length
        let showLen = 9
        let item = this.gameGuNodes.children[0]
        for (let i = firstL; i < showLen; i++) {
            let newItem = cc.instantiate(item)
            newItem.parent = this.gameGuNodes
            this.gameAction.setBtnCallback(newItem, () => {
                this.enterLabel(i, newItem)
            })
        }
        for (let i = 0; i < firstL; i++) {
            let newItem = this.gameGuNodes.children[i]
            this.gameAction.setBtnCallback(newItem, () => {
                this.enterLabel(i, newItem)
            })
        }

    }

    //敲鼓
    enterLabel(index: number, newItem: cc.Node) {
        let newTime = new Date().getTime()
        if (newItem["oldTime"] && newTime - newItem["oldTime"] < 600) {
            return
        }
        newItem["oldTime"] = newTime
        if (this.isGameOver) {
            return
        }
        let durmStr = "drum" + this.gameAction.getRandomMinToMax(1, 4)
        let errAr = this.questionData.error
        let rigAr = this.questionData.right
        if (errAr.indexOf(index) != -1) {
            cc.audioEngine.playEffect(this.audioIns[durmStr], false)
            errAr.splice(errAr.indexOf(index), 1)
            newItem.getChildByName("guBg").getComponent(cc.Animation).play("qiaocuo")
            newItem.getChildByName("guchui").getComponent(cc.Animation).play("guchui1")
            this.errorTime += 3
            this.updateSnake(0)
            this.Lmeimei.getComponent(cc.Animation).play("Ldacuo")
            this.Rmeimei.getComponent(cc.Animation).play("Rdacuo")
            cc.audioEngine.playEffect(this.audioIns["incorrect"], false)
            cc.log("qiao_cuo")
            newItem.getChildByName("label").color = new cc.Color(184, 171, 165, 255)
        } else if (rigAr.indexOf(index) != -1) {
            cc.audioEngine.playEffect(this.audioIns[durmStr], false)
            rigAr.splice(rigAr.indexOf(index), 1)
            if (rigAr.length == 0) {
                cc.audioEngine.playEffect(this.audioIns["correct1"], false)
                this.scheduleOnce(() => {
                    cc.audioEngine.playEffect(this.audioIns["correct2"], false)
                    this.Lmeimei.getComponent(cc.Animation).play("Ldadui")
                    this.Rmeimei.getComponent(cc.Animation).play("Rdadui")
                    this.setNewQuestion()
                }, 0.7)
            }
            this.greatScoreNumber += this.guankaData.getScore.first
            if (this.isAll) {
                this.timeNumber += 2
            }
            this.greatScore.string = this.greatScoreNumber.toString()
            newItem.getChildByName("guBg").getComponent(cc.Animation).play("qiaodui")
            newItem.getChildByName("guchui").getComponent(cc.Animation).play("guchui1")
            cc.log("qiao_dui")
            let insNewItem = cc.instantiate(newItem.getChildByName("label"))
            insNewItem.parent = newItem
            newItem.getChildByName("label").opacity = 0
            let pointPosY = insNewItem.y + 200
            cc.tween(insNewItem).to(1.5, { y: pointPosY, opacity: 0 }).start()
        } else {
            cc.audioEngine.playEffect(this.audioIns[durmStr], false)
            newItem.getChildByName("guchui").getComponent(cc.Animation).play("guchui1")
        }
    }

    //设置新问题
    setNewQuestion() {
        for (let i = 0; i < 9; i++) {
            let newItem = this.gameGuNodes.children[i].getChildByName("guBg")
            newItem.getComponent(cc.Animation).stop()
            newItem.getComponent(cc.Sprite).spriteFrame = this.textuGu
        }
        let questionData = this.getQuestionData()
        this.questionData = questionData
        this.questionNode.getComponent(cc.Label).string = questionData.ques
        this.questionNode.opacity = 255
        for (let i = 0; i < this.gameGuNodes.children.length; i++) {
            let guNode = this.gameGuNodes.children[i].getChildByName("label")
            if (questionData.anwser[i] != -1) {
                guNode.opacity = 255
                guNode.color = new cc.Color(111, 73, 54, 255)
                guNode.getComponent(cc.Label).string = questionData.anwser[i]
            } else {
                guNode.opacity = 0
            }
        }
    }

    //获取问题
    getQuestionData() {
        let correct = this.guankaData.correct
        let errorNum = this.guankaData.error
        let stringLevel = this.guankaData.stringLevel

        if (this.isAll) {
            let randArSSS = [
                { stringLevel: 1, correct: 2, errorNum: 2 },
                { stringLevel: 1, correct: 2, errorNum: 3 },
                { stringLevel: 2, correct: 3, errorNum: 3 },
                { stringLevel: 2, correct: 3, errorNum: 4 },
                { stringLevel: 3, correct: 4, errorNum: 4 },
                { stringLevel: 3, correct: 4, errorNum: 5 },
            ]
            let randArss = this.gameAction.getRandomElementOne(randArSSS)
            correct = randArss.correct
            errorNum = randArss.errorNum
            stringLevel = randArss.stringLevel
        }

        this.textJsonData = this.textJson.json[String(stringLevel)]
        let randP = this.gameAction.getRandomMinToMax(1, this.textJsonData.length - 1)
        let randPAr = this.textJsonData[randP]
        let anquan = 0
        while (randPAr.length - 2 < correct || this.randP == randP) {
            anquan++
            if (anquan >= 99999) {
                console.error("无限循环")
                break
            }
            randP = this.gameAction.getRandomMinToMax(1, this.textJsonData.length - 1)
            randPAr = this.textJsonData[randP]
        }
        this.randP = randP
        let randHanzi = randPAr.slice(2)
        let ques = randPAr[1]
        let rightAr = this.gameAction.getRandomElement(randHanzi, correct)
        let errorArs = []
        let errorAr = []
        anquan = 0
        while (errorNum > 0) {
            anquan++
            if (anquan >= 99999) {
                console.error("无限循环")
                break
            }
            let randP2 = this.gameAction.getRandomMinToMax(1, this.textJsonData.length - 1)
            if (randP2 == randP || errorArs.indexOf(randP2) != -1 || this.textJsonData[randP2].length < 3) {
                continue
            }
            errorArs.push(randP2)
            errorNum--
        }
        for (let i = 0; i < errorArs.length; i++) {
            let randPAr2 = this.textJsonData[errorArs[i]]
            let r1 = randPAr2[this.gameAction.getRandomMinToMax(2, randPAr2.length - 1)]
            if (!r1) {
                console.log("发现错误")
                console.log(randPAr2)
            }
            errorAr.push(r1)
        }

        let anwser = []
        anwser = anwser.concat(rightAr)
        anwser = anwser.concat(errorAr)
        for (let i = 0, len = anwser.length; i < 9 - len; i++) {
            anwser.push(-1)
        }
        anwser = this.gameAction.sortAr(anwser)

        let error = []
        let right = []
        for (let i = 0; i < anwser.length; i++) {
            if (errorAr.indexOf(anwser[i]) != -1) {
                error.push(i)
            } else if (rightAr.indexOf(anwser[i]) != -1) {
                right.push(i)
            }
        }
        //ques 偏旁
        //anwser 各种答案
        //error 正确答案
        //right 错误答案
        return { ques: ques, anwser: anwser, error: error, right: right }
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

    //设置按钮
    initSettingBtn() {
        let gameAction = this.gameAction
        gameAction.setBtnCallbackColor(this.pauseBtn, () => {
            this.pauseNodes.active = true
            cc.director.pause()
            cc.audioEngine.pause(this.audioIns["BGM"])
        })
        let voice1 = this.pauseNodes.getChildByName("voice1").children[0]
        voice1.active = this.myData["Volume"] == 0
        gameAction.setBtnCallbackColor(this.pauseNodes.getChildByName("voice1"), () => {
            cc.log("关闭声音or打开声音")
            this.myData["Volume"] = this.myData["Volume"] == 0 ? 1 : 0
            this.myData.setData(this.myData)
            cc.audioEngine.setMusicVolume(this.myData["Volume"])
            cc.audioEngine.setEffectsVolume(this.myData["Volume"])
            voice1.active = this.myData["Volume"] == 0
        })
        gameAction.setBtnCallbackColor(this.pauseNodes.getChildByName("menu1"), () => {
            cc.director.resume()
            cc.director.loadScene("lobby")
            cc.audioEngine.resume(this.audioIns["BGM"])
        })
        gameAction.setBtnCallbackColor(this.pauseNodes.getChildByName("Replay1"), () => {
            cc.director.resume()
            this.pauseNodes.active = false
            this.gameReStart()
            cc.audioEngine.resume(this.audioIns["BGM"])
        })
        gameAction.setBtnCallbackColor(this.pauseNodes.getChildByName("Continue_button_1"), () => {
            cc.director.resume()
            cc.audioEngine.resume(this.audioIns["BGM"])
            this.pauseNodes.active = false
        })
    }


}
