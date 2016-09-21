var drop01;
var i = 0;

var hintres = [res.hint01_png, res.hint02_png, res.hint03_png];

var gamehint = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();


        drop01 = cc.Sprite.create(hintres[0]);　
        drop01.setPosition(size.width / 2, size.height * 0.6);　
        this.addChild(drop01);

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
        //if(touch.getLocation().x < 240){
        //}
        return true;
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        i++;
        //logかける
        console.log(i);
        /*if(i > 0){
          gamehint.removeChild(drop01);
          var drop01 = cc.Sprite.create(hintres[1]);　
          drop01.setPosition(size.width / 2, size.height * 0.6);　
          this.addChild(drop01);

          console.log("if院");*/
          if(i == 1){
            drop01.setTexture(res.hint02_png);
          }
          if(i == 2){
            drop01.setTexture(res.hint03_png);
          }
          if(i == 3){
            i = 0;
            cc.director.runScene(new GameStartScene());
          }
      //}

        //cc.director.runScene(new GameStartScene());
      },
});

var GameHintScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 200, 200, 128));
        this.addChild(backgroundLayer);

        var layer1 = new gamehint();
        this.addChild(layer1);
    }
});
