//clear.js
var suu = 1;

var gameclear = cc.Layer.extend({
    ctor: function() {
        this._super();
        gameoverLayer = new GameClearScene();
        gameoverLayer.init();
        var size = cc.director.getWinSize();

        /*cache.addSpriteFrames(res.spritesheet_plist);

        var pl = cc.Sprite.create(cache.getSpriteFrame("player.png"));
        pl.setPosition(size.width / 3, size.height / 2);
        pl.setScale(5);
        this.addChild(pl);*/
/*
        var label = cc.LabelTTF.create("次のステージへ", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 3);
        this.addChild(label, 1); //文字つける時はこっち*/

        //------------BGM---------

        audioEngine.stopMusic();

        audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.bgm_clear);
        //-----------BGM----------
        // タップイベントリスナーを登録する

                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: this.onTouchBegan,
                    onTouchMoved: this.onTouchMoved,
                    onTouchEnded: this.onTouchEnded
                }, this);

        return true;
    },

      onTouchBegan: function(touch, event) {
        return true;
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        audioEngine.stopMusic();
        cc.director.runScene(new gameScene ());
      },

});

var GameClearScene = cc.Scene.extend({
    init: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(39, 38, 24, 128));
        this.addChild(backgroundLayer);

        // ------------result.js initメソッドの中に追加---------------
    var highScore = parseInt(sys.localStorage.getItem("Sample/highScore") || 0);
    if (g.score > highScore) {
      highScore = g.score;
      sys.localStorage.setItem("Sample/highScore", highScore);
    }
    var highLabel = cc.LabelTTF.create("ハイスコア " + highScore, "Arial", 20);
    highLabel.setPosition(cc.p(size.width / 2, size.height / 2 - 50));
    this.addChild(highLabel);

    // いちいちリロードするのは面倒なので、
    // 2.0秒経ったら画面をタップしてゲームに戻れるようにします。
    this.scheduleOnce(function () {
      this.onTouchesBegan = function (touches, event) {
         g.score = 0;
         cc.Director.getInstance().replaceScene(new GameStartScene());
      };
    }, 2.0);
//-------------------------------------------------------------
        //var layer1 = new gameclear();
        //this.addChild(layer1);
    }
});
