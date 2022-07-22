import UserData from "./Userdata";

export  class GameAction  {
    static _gameAction:GameAction = null
    public static getInstance(){
        if(this._gameAction == null){
            this._gameAction = new GameAction()
        }
        return this._gameAction
    }
    showOpacityAction = function(node1) {
      if (node1.active) return;
      node1.active = true;
      node1.opacity = 0;
      cc.tween(node1).to(.8, {
        opacity: 255
      }).start();
    };
    showOpacityAction2 = function(node1, time, num) {
      void 0 === time && (time = .2);
      void 0 === num && (num = 200);
      node1.opacity = 0;
      cc.tween(node1).to(time, {
        opacity: num
      }).start();
    };
    showLoading = function(loading) {
      var labelCom = loading.getComponent(cc.Label);
      labelCom.unscheduleAllCallbacks();
      var strAr = [ ".", "..", "..." ];
      var i = 0;
      labelCom.schedule(function() {
        labelCom.string = "LOADING" + strAr[i];
        i++;
        i >= strAr.length && (i = 0);
      }, 1);
    };
    breathing = function(node1, time, scaleMin, scaleMax) {
      void 0 === time && (time = 1);
      void 0 === scaleMin && (scaleMin = .8);
      void 0 === scaleMax && (scaleMax = 1.5);
      cc.tween(node1).repeatForever(cc.tween().to(time, {
        scale: scaleMax
      }, {
        easing: "quadInOut"
      }).to(time, {
        scale: scaleMin
      }, {
        easing: "quadInOut"
      })).start();
    };
    breathing2 = function(node1, time, opacityMin, opacityMax) {
      void 0 === time && (time = 1);
      void 0 === opacityMin && (opacityMin = 125);
      void 0 === opacityMax && (opacityMax = 255);
      cc.tween(node1).repeatForever(cc.tween(node1).to(time, {
        opacity: opacityMax
      }, {
        easing: "quadInOut"
      }).to(time, {
        opacity: opacityMin
      }, {
        easing: "quadInOut"
      }).start()).start();
    };
    // showScaleTo = function(node1, time) {
    //   void 0 === time && (time = .8);
    //   this._easeBack || (this._easeBack = CustomEase.create("custom", "M0,0 C0,0 0.049,0.628 0.085,1.068 0.11,1.218 0.176,1.094 0.194,1.06 0.194,1.06 0.23,1 0.23,1 0.28,0.886 0.4,1 0.4,1 0.49,1 0.544,1 0.586,1 0.62,1 0.642,1 0.688,1 0.72,1 0.688,1 0.764,1 0.868,1 1,1 1,1 "));
    //   var scaleFr = node1.scale;
    //   node1.scale = .3 * scaleFr;
    //   cc.tween(node1).to(time, {
    //     scale: scaleFr
    //   }, {
    //     easing: this._easeBack.getRatio.bind(this._easeBack)
    //   }).start();
    // };
    shake = function(node1) {
      var _this = this;
      var posX = 5;
      var posX2 = 2;
      var posY = posX;
      var posY2 = posX2;
      var times = .5;
      var shakeV = 1 / 30;
      var shakeX = function(cowX, time) {
        var randomX;
        randomX = cowX > 0 ? _this.getRandomMinToMax(posX2, posX) : _this.getRandomMinToMax(-posX, -posX2);
        var randomTime = _this.getRandomMinToMax(.5, 1.5);
        var newTime = shakeV * randomTime;
        cc.tween(node1).to(newTime, {
          x: randomX
        }).call(function() {
          time += newTime;
          time < times ? shakeX(-cowX, time) : cc.tween(node1).to(newTime, {
            x: 0
          }).start();
        }).start();
      };
      var shakeY = function(cowY, time) {
        var randomY;
        randomY = cowY > 0 ? _this.getRandomMinToMax(posY2, posY) : _this.getRandomMinToMax(-posY, -posY2);
        var randomTime = _this.getRandomMinToMax(.5, 1.5);
        var newTime = shakeV * randomTime;
        cc.tween(node1).to(newTime, {
          y: randomY
        }).call(function() {
          time += newTime;
          time < times ? shakeY(-cowY, time) : cc.tween(node1).to(newTime, {
            y: 0
          }).start();
        }).start();
      };
      shakeX(1, 0);
      shakeY(1, 0);
    };
    getRandomMinToMax = function(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    };
    twinkle = function(node1, t) {
      void 0 === t && (t = 1);
      var t1 = t;
      node1.opacity = 0;
      cc.tween(node1).repeatForever(cc.tween(node1).to(t1, {
        opacity: 255
      }).to(t1, {
        opacity: 0
      })).start();
    };
    twinkle2 = function(node1, t1, t2, t3) {
      node1.opacity = 0;
      cc.tween(node1).repeatForever(cc.tween(node1).to(t1, {
        opacity: 255
      }).delay(t2).to(t3, {
        opacity: 0
      })).start();
    };
    getPoint = function(cx, cy, r, stx, sty, edx, edy) {
      if (edx == stx) {
        var sin\u03b81_1 = (stx - cx) / r;
        if (sin\u03b81_1 <= 1 || sin\u03b81_1 >= -1) {
          var x1_1 = edx;
          var y1_1 = 1 * r * Math.sqrt(1 - Math.pow(sin\u03b81_1, 2)) + cy;
          var x2_1 = edx;
          var y2_1 = -1 * r * Math.sqrt(1 - Math.pow(sin\u03b81_1, 2)) + cy;
          return 1 == sin\u03b81_1 || -1 == sin\u03b81_1 ? [ cc.v2(x1_1, y1_1) ] : [ cc.v2(x1_1, y1_1), cc.v2(x2_1, y2_1) ];
        }
        return [];
      }
      var k = (edy - sty) / (edx - stx);
      var b1 = edy - k * edx;
      var m = (cy - b1 - k * cx) / r;
      var a = Math.pow(k, 2) + 1;
      var b = -2 * k * m;
      var c = Math.pow(m, 2) - 1;
      var \u0394 = Math.pow(b, 2) - 4 * a * c;
      if (\u0394 < 0) {
        cc.log("\u76f4\u7ebf\u548c\u5706\u4e0d\u76f8\u4ea4");
        return [];
      }
      var sin\u03b81 = (-b + Math.sqrt(\u0394)) / (2 * a);
      var sin\u03b82 = (-b - Math.sqrt(\u0394)) / (2 * a);
      var x1 = r * sin\u03b81 + cx;
      var y1 = k * x1 + b1;
      var x2 = r * sin\u03b82 + cx;
      var y2 = k * x2 + b1;
      return 0 == \u0394 ? [ cc.v2(x1, y1) ] : [ cc.v2(x1, y1), cc.v2(x2, y2) ];
    };
    angleTo = function(node1, t) {
      void 0 === t && (t = 1);
      var t1 = t;
      cc.tween(node1).repeatForever(cc.tween(node1).to(t1, {
        angle: -360
      }).call(function() {
        node1.angle = 0;
      })).start();
    };
    getPostionForToNode = function(node1, pNode) {
      var posWorld = pNode.convertToWorldSpaceAR(cc.v2(0, 0));
      return node1.parent.convertToNodeSpaceAR(posWorld);
    };
    getPostionForToParent = function(parentNode, pNode) {
      var posWorld = pNode.convertToWorldSpaceAR(cc.v3(0, 0, 0));
      return parentNode.convertToNodeSpaceAR(posWorld);
    };
    setBtnCallback = function(node1, callback) {
      var _this = this;
      node1.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (!_this.canUserBtnClick(node1)) return;
      }, this);
      node1.on(cc.Node.EventType.TOUCH_END, function() {
        if (!_this.isCanUseBtn(node1)) return;
        callback();
      }, this);
    };
    setBtnCallback_2 = function(node1, callback, isEnable) {
      var _this = this;
      void 0 === isEnable && (isEnable = function() {
        return true;
      });
      node1.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (!_this.canUserBtnClick(node1)) return;
      }, this);
      node1.on(cc.Node.EventType.TOUCH_END, function() {
        if (!_this.isCanUseBtn(node1)) return;
        if (!isEnable()) return false;
        callback();
      }, this);
    };
    setBtnCallbackOnce = function(node1, callback) {
      var _this = this;
      node1.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (!_this.canUserBtnClick(node1)) return;
      }, this);
      node1.once(cc.Node.EventType.TOUCH_END, function() {
        if (!_this.isCanUseBtn(node1)) return;
        callback();
      }, this);
    };
    setBtnCallbackOpacty = function(node1, callback, opacity) {
      var _this = this;
      void 0 === opacity && (opacity = 100);
      node1.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (!_this.canUserBtnClick(node1)) return;
        node1.opacity = opacity;
      }, this);
      node1.on(cc.Node.EventType.TOUCH_CANCEL, function() {
        if (!_this.isCanUseBtn(node1)) return;
        node1.opacity = 255;
      }, this);
      node1.on(cc.Node.EventType.TOUCH_END, function() {
        if (!_this.isCanUseBtn(node1)) return;
        node1.opacity = 255;
        callback();
      }, this);
    };
    setUseBtnClick = function(isUse) {
      this.canotUseBtnClick = !isUse;
      cc.macro.ENABLE_MULTI_TOUCH = !isUse;
    };
    canUserBtnClick = function(node1) {
      node1.canotUseBtnClick = this.canotUseBtnClick;
      return !this.canotUseBtnClick;
    };
    isCanUseBtn = function(node1) {
      return !node1.canotUseBtnClick;
    };
    setBtnCallbackColor_endVioce = function(node1, callback, startFunc) {
      var _this = this;
      void 0 === startFunc && (startFunc = function() {

      });
      node1.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (!_this.canUserBtnClick(node1)) return;
        _this.setColorForChildren(node1, 155 / 255);
      }, this);
      node1.on(cc.Node.EventType.TOUCH_CANCEL, function() {
        if (!_this.isCanUseBtn(node1)) return;
        _this.setColorForChildren(node1, 1);
      }, this);
      node1.on(cc.Node.EventType.TOUCH_END, function() {
        if (!_this.isCanUseBtn(node1)) return;
        startFunc();
        _this.setColorForChildren(node1, 1);
        callback();
      }, this);
    };

    playEffect(nameString){
      cc.audioEngine.playEffect(UserData.audioIns[nameString],false)
    }

    setBtnCallbackColor = function(node1, callback, startFunc = ()=>{this.playEffect("button")}) {
      var _this = this;
      node1.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (!_this.canUserBtnClick(node1)) return;
        startFunc();
        _this.setColorForChildren(node1, 155 / 255);
      }, this);
      node1.on(cc.Node.EventType.TOUCH_CANCEL, function() {
        if (!_this.isCanUseBtn(node1)) return;
        _this.setColorForChildren(node1, 1);
      }, this);
      node1.on(cc.Node.EventType.TOUCH_END, function() {
        if (!_this.isCanUseBtn(node1)) return;
        _this.setColorForChildren(node1, 1);
        callback();
      }, this);
    };
    setBtnCallbackColor_2 = function(node1, callback, isEnable, startFunc) {
      var _this = this;
      void 0 === startFunc && (startFunc = function() {
      
      });
      node1.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (!_this.canUserBtnClick(node1)) return;
        if (!isEnable()) return false;
        startFunc();
        _this.setColorForChildren(node1, 155 / 255);
      }, this);
      node1.on(cc.Node.EventType.TOUCH_CANCEL, function() {
        if (!_this.isCanUseBtn(node1)) return;
        if (!isEnable()) return false;
        _this.setColorForChildren(node1, 1);
      }, this);
      node1.on(cc.Node.EventType.TOUCH_END, function() {
        if (!_this.isCanUseBtn(node1)) return;
        if (!isEnable()) return false;
        _this.setColorForChildren(node1, 1);
        callback();
      }, this);
    };
    setColorForChildren = function(node_parent, colorTime) {
      node_parent.firstColor = node_parent.firstColor || node_parent.color;
      var firstColor = node_parent.firstColor;
      node_parent.color = cc.color(firstColor.r * colorTime, firstColor.g * colorTime, firstColor.b * colorTime, 255);
      if (node_parent.children.length >= 1) for (var i = 0; i < node_parent.children.length; i++) this.setColorForChildren(node_parent.children[i], colorTime);
    };
    targetOffForChildren = function(node_parent, target) {
      node_parent.targetOff(target);
      if (node_parent.children.length >= 1) for (var i = 0; i < node_parent.children.length; i++) this.targetOffForChildren(node_parent.children[i], target);
    };
    isBaoHanAr = function(ar1, ar2) {
      var equalAr = [];
      for (var i = 0; i < ar1.length; i++) {
        var isHave = false;
        for (var j = 0; j < ar2.length; j++) if (ar1[i] == ar2[j] && -1 == equalAr.indexOf(j)) {
          isHave = true;
          equalAr.push(j);
          break;
        }
        if (!isHave) return false;
      }
      return true;
    };
    getRandForConfig = function(superRand) {
      var randNow = Math.random();
      var p = 0;
      var maxRand = 0;
      for (var i = 0; i < superRand.length; i++) maxRand += superRand[i][0];
      for (var i = 0; i < superRand.length; i++) {
        if (randNow < p + superRand[i][0] / maxRand) return superRand[i][1];
        p += superRand[i][0] / maxRand;
      }
      return superRand[superRand.length - 1][1];
    };
    getRandForConfig2 = function(superTimes, superRandConfig) {
      var superRand = [];
      for (var i = 0; i < superRandConfig.length; i++) 0 != superRandConfig[i][0] && superRand.push(superRandConfig[i]);
      var superRandNow = superRand.slice(-1);
      if (0 == superTimes) superRandNow = superRand.slice(0, -1); else for (var i = 0; i < superRand.length; i++) if (superRand[i][1] == superTimes && i != superRand.length - 1) {
        superRandNow = superRand.slice(i + 1);
        break;
      }
      return this.getRandForConfig(superRandNow);
    };
    getRandForConfigNum = function(levelUpBetRand) {
      var betRandAr = [];
      for (var i = 0; i < levelUpBetRand.length; i++) levelUpBetRand[i][0] && betRandAr.push(levelUpBetRand[i][1]);
      return betRandAr;
    };
    randomWord = function(randomFlag, min, max) {
      var str = "", range = min, arr = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
      randomFlag && (range = Math.round(Math.random() * (max - min)) + min);
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    };
    setGray = function(node1, isGray, GaySpriteMaterial, SpriteMaterial) {
      var renderCom = null;
      var SpriteCom = node1.getComponent(cc.Sprite);
      if (SpriteCom) renderCom = [ SpriteCom, 0 ]; else {
        var LabelCom = node1.getComponent(cc.Label);
        LabelCom && (renderCom = [ LabelCom, 1 ]);
      }
      if (renderCom) {
        node1.colorFrist = node1.colorFrist || node1.color;
        var colorFrist = node1.colorFrist;
        if (isGray) if (0 == renderCom[1]) renderCom[0].setMaterial(0, GaySpriteMaterial); else {
          var rgbS = 155 / 255;
          node1.color = cc.color(colorFrist.getR() * rgbS, colorFrist.getG() * rgbS, colorFrist.getB() * rgbS, colorFrist.getA());
        } else 0 == renderCom[1] ? renderCom[0].setMaterial(0, SpriteMaterial) : node1.color = colorFrist;
      }
      if (node1.children.length > 0) for (var i = 0; i < node1.children.length; i++) this.setGray(node1.children[i], isGray, GaySpriteMaterial, SpriteMaterial);
    };
    setDollar = function(num) {
      return (num / 100).toFixed(2);
    };
    setCoins = function(num, isAbb) {
      void 0 === isAbb && (isAbb = false);
      if (num < 100) return num + "\uffe0";
      if (num < 1e5) return "$" + (num / 100).toFixed(2);
      var leftFix:any = num % 100;
      leftFix < 10 && (leftFix = "0" + leftFix);
      return "$" + this.splitNumberByComma(Math.ceil(num / 100)) + "." + leftFix;
    };
    setCoinsNoLeft = function(num, isAbb) {
      void 0 === isAbb && (isAbb = false);
      return num < 100 ? num + "\uffe0" : num < 1e5 ? "$" + (num / 100).toFixed(2) : "$" + this.splitNumberByComma(Math.ceil(num / 100));
    };
    splitNumberByComma = function(numStr) {
      if (numStr < 1e3) return String(numStr);
      numStr = Math.floor(numStr);
      var str = String(numStr);
      if (str.length <= 0) return str;
      var signBit = "";
      if ("+" === str[0] || "-" === str[0]) {
        signBit = str[0];
        str = str.substring(1);
      }
      var intDec = str.split(".");
      var int = intDec[0];
      var dec = intDec[1];
      var newNumStr = "";
      var span = 3;
      var idx = int.length - span;
      for (;idx > 0; idx -= span) newNumStr = "," + int.substr(idx, span) + newNumStr;
      newNumStr = int.substr(0, idx + span) + newNumStr;
      null != dec && (newNumStr += "." + dec);
      newNumStr = signBit + newNumStr + (dec ? "." + dec : "");
      return newNumStr;
    };
    MathFactorial = function(n) {
      if (0 == n) return 1;
      var sum = 1;
      for (var i = 1; i <= n; i++) sum *= i;
      return sum;
    };
    MathA_m_n = function(m, n) {
      if (0 == m) return 1;
      if (1 == m) return n;
      var sum = 1;
      for (var i = 0; i < m; i++) sum *= n - i;
      return sum;
    };
    MathC_m_n = function(m, n) {
      if (0 == m) return 1;
      if (1 == m) return n;
      var sum = this.MathA_m_n(m, n) / this.MathFactorial(m);
      return Math.round(sum);
    };
    getRandomIndex = function(allRand) {
      if (!allRand.maxRand) {
        allRand.maxRand = 0;
        for (var i = 0; i < allRand.length; i++) allRand.maxRand += allRand[i];
      }
      var randNow = Math.random();
      var maxRand = allRand.maxRand;
      if (0 == maxRand) return allRand.length - 1;
      var p = 0;
      for (var i = 0; i < allRand.length; i++) {
        if (randNow <= p + allRand[i] / maxRand) return i;
        p += allRand[i] / maxRand;
      }
      return allRand.length - 1;
    };
    getRandomElement = function(allRand, num) {
      var allRand2 = allRand.slice(0);
      if (allRand2.length <= num) return allRand2;
      var randElement = [];
      for (var i = 0; i < num; i++) {
        var randIndex = this.getRandomMinToMax(0, allRand2.length - 1);
        randElement.push(allRand2[randIndex]);
        allRand2.splice(randIndex, 1);
      }
      return randElement;
    };
    getRandomElementOne = function(allRand) {
      return allRand[this.getRandomMinToMax(0, allRand.length - 1)];
    };
    sortAr = function(gerRandPoker) {
      for (var j, x, i = gerRandPoker.length; i; j = parseInt( String( Math.random() * i )), x = gerRandPoker[--i], 
      gerRandPoker[i] = gerRandPoker[j], gerRandPoker[j] = x) ;
      return gerRandPoker;
    };
    abbreviateDigtal = function(num, length, fixed) {
      void 0 === length && (length = 3);
      void 0 === fixed && (fixed = 2);
      var result = 0;
      var value = Number(num);
      var postFix = "";
      if (value >= Math.pow(10, length - 1)) if (num >= 1e15) {
        postFix = "Q";
        result = 1e-15 * value;
      } else if (num >= 1e12) {
        postFix = "T";
        result = 1e-12 * value;
      } else if (value >= 1e9) {
        postFix = "B";
        result = 1e-9 * value;
      } else if (value >= 1e6) {
        postFix = "M";
        result = 1e-6 * value;
      } else if (value >= 1e3) {
        postFix = "K";
        result = .001 * value;
      } else result = value; else result = value;
      var actualFixed = this.getFixedNum(result, fixed);
      return result.toFixed(actualFixed) + postFix;
    };
    getFixedNum = function(value, fixedNum) {
      void 0 === fixedNum && (fixedNum = 2);
      var ret = fixedNum;
      var fixedString = value.toFixed(fixedNum);
      var len = fixedString.length;
      for (var i = 0; i < fixedNum; i++) {
        if ("0" !== fixedString[len - 1 - i]) break;
        ret--;
      }
      return ret;
    };
    goToTargetNumberForALl = function(target, oldNum, newNum, time, refresh, endCallBack, frame) {
      void 0 === time && (time = 5);
      void 0 === refresh && (refresh = function(num) {});
      void 0 === endCallBack && (endCallBack = function() {});
      void 0 === frame && (frame = 60);
      if (Math.round(oldNum) != oldNum || Math.round(newNum) != newNum) {
        oldNum = Math.round(oldNum);
        newNum = Math.round(newNum);
      }
      if (time <= 0) {
        return;
      }
      target.refreshNumFunc && target.unschedule(target.refreshNumFunc);
      var sNum = newNum - oldNum;
      var Sym = sNum >= 0 ? 1 : -1;
      var sNumString = String(Math.abs(sNum));
      var minNum = 1;
      var vFrame = 10;
      for (var i = 0; i < sNumString.length; i++) {
        if (Math.floor(sNum / Math.pow(10, sNumString.length - i - 1)) < time * frame * vFrame) {
          minNum = sNumString.length - i - 1;
          continue;
        }
        break;
      }
      var newNum2Head = Math.floor(newNum / Math.pow(10, minNum));
      var oldNum2Head = Math.floor(oldNum / Math.pow(10, minNum));
      var newNum2Tail = newNum % Math.pow(10, minNum);
      var oldNum2Tail = oldNum % Math.pow(10, minNum);
      var oldNum2TailV = this.mathFunc(minNum);
      var vNum = (newNum2Head - oldNum2Head) / time * Sym;
      var oldTime = new Date().getTime();
      var refreshNumFunc = function() {
        var sTime = (new Date().getTime() - oldTime) / 1e3;
        var oldNum3Head = oldNum2Head + Math.floor(vNum * sTime) * Sym;
        oldNum2Tail += oldNum2TailV * Sym;
        oldNum2Tail %= Math.pow(10, minNum);
        if (Sym >= 0 && oldNum3Head >= newNum2Head || Sym < 0 && oldNum3Head <= newNum2Head) {
          refresh(newNum);
          endCallBack();
          target.unschedule(refreshNumFunc);
        } else refresh(oldNum3Head * Math.pow(10, minNum) + oldNum2Tail);
      };
      target.refreshNumFunc = refreshNumFunc;
      target.schedule(refreshNumFunc, 1 / frame);
    };
    mathFunc = function(n) {
      var s = 0;
      for (var i = 0; i < n; i++) s += Math.pow(10, i);
      return s;
    };
    strReplace = function(str) {
      var deleteStr = [ ",", "$", "\xa2" ];
      var newStr = "";
      var multi = 1;
      for (var i = 0; i < str.length; i++) {
        var index = deleteStr.indexOf(str[i]);
        -1 != index ? 1 == index && (multi = 100) : newStr += str[i];
      }
      return Number(newStr) * multi;
    };
    dollarFan = function(num) {
      var newNum = Math.round(100 * Number(num));
      return newNum;
    };
    showOpacity = function(node1, time) {
      node1.stopAllActions();
      node1.opacity = 0;
      cc.tween(node1).to(.3, {
        opacity: 255
      }).delay(time).call(function() {
        node1.opacity = 0;
      }).start();
    };
    getCm_nAr = function(n, m) {
      var arAll = [];
      for (var i = 0; i < n; i++) {
        var ar1 = [];
        if (1 == m) {
          ar1.push(i);
          arAll.push(ar1);
        } else {
          ar1.push(i);
          this.getCm_n(arAll, ar1, n, m - 1, i + 1);
        }
      }
      return arAll;
    };
    getCm_n = function(arAll, ar, n, m, start) {
      for (var i = start; i < n; i++) {
        var ar1 = ar.slice(0);
        if (1 == m) {
          ar1.push(i);
          arAll.push(ar1);
        } else {
          ar1.push(i);
          this.getCm_n(arAll, ar1, n, m - 1, i + 1);
        }
      }
    };
    _easeBack = null;
    canotUseBtnClick = false;
    cloneForJson = function(obj) {
      return JSON.parse(JSON.stringify(obj));
    };
  }