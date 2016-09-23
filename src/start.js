//start.js
var gamestart = cc.Layer.extend({
    ctor: function() {
        this._super();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.title_bgm, true);
        }

        var size = cc.director.getWinSize();

        var background = new cc.Sprite(res.background_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        this.addChild(backgroundLayer);

        var drop01 = cc.Sprite.create(res.title_png);　
        drop01.setPosition(size.width / 2, size.height * 0.6);
        drop01.setScale(0.8);　
        this.addChild(drop01);

        var drop02 = cc.Sprite.create(res.help01_png);　
        drop02.setPosition(size.width * 0.1, size.height * 0.1);
        //drop02.setScale(0.8);
        this.addChild(drop02);

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
        //ヒントのクリック判定
        if(touch.getLocation().x < 60 && touch.getLocation().y < 60 && touch.getLocation().x > 30 && touch.getLocation().y > 10){
          //console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          cc.director.runScene(new GameHintScene());
        }
        return true;
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        if(touch.getLocation().x < 330 && touch.getLocation().y < 190 && touch.getLocation().x > 140 && touch.getLocation().y > 150){
          //console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          cc.director.runScene(new gameScene());
        }

      },
});

var GameStartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 200, 200, 128));
        this.addChild(backgroundLayer);

        var layer1 = new gamestart();
        this.addChild(layer1);
    }
});
