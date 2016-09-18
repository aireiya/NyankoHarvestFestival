//start.js
var gamestart = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var drop01 = cc.Sprite.create(res.title_png);　
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
        cc.director.runScene(new gameScene());
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
