
const { ccclass, property } = cc._decorator;

@ccclass
export default class UserData {

    static readonly version: number = 1;
    static readonly gameName: string = "refuseclassification";
    static saveData: any;
    static audioIns: any;
    static gameData: { gameId: number };
    static spriteIns: any;
    static jsonData: any;

    public static getData() {
        if (this.saveData) {
            return this.saveData
        }
        let saveData = JSON.parse(cc.sys.localStorage.getItem(this.gameName + 'userData')) || this.initData()
        this.saveData = saveData
        return saveData
    }

    public static setData() {
        cc.sys.localStorage.setItem(this.gameName + 'userData', JSON.stringify(this.getData()))
    }

    public static initData() {
        let allData = {
            userId: 1,
            level: 1,
            Volume: 1,
            guanka: [{ lock: true, star: 0 }],
            version: 1,
            isTips: false,
        }

        for (let i = 0; i < 3; i++) {
            allData.guanka.push({ lock: false, star: 0 })
        }
        return allData
    }

    // 读取数据
    // cc.sys.localStorage.getItem(key)

    // 和 setItem 相对应，getItem 方法只要一个键值参数就可以取出我们之前保存的值了。对于上文中储存的用户数据：




}
