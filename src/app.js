var itemsLayer;
var cart;
var xSpeed = 0; //カートの移動速度

var touchOrigin; //タッチ開始したときに表示するスプライト
var touching = false; //タッチしているかFlag
var touchEnd; //タッチが終了したときに表示するスプライト
var time = 60;
var score = 0;
var label01;
var label02;
var muki;
var nekoval;
var musinekopos;
var nekox = 0;
var wark = 0;
var hiscore = 0;
var timeX = 0;
var timeY = 0;
var countdown = 4;

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();
    //グラデーション背景
    //  var backgroundLayer = cc.LayerGradient.create(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));

    //森の背景
    var background = new cc.Sprite(res.background_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

    audioEngine.stopMusic();
    //音楽再生エンジン
    audioEngine = cc.audioEngine;
    //bgm再生
    if (!audioEngine.isMusicPlaying()) {
      //audioEngine.playMusic("res/bgm_main.mp3", true);
      audioEngine.playMusic(res.main_bgm, true);
    }

    countdown01 = cc.Sprite.create(res.count03_png);　
    countdown01.setPosition(250,200);　
    this.addChild(countdown01);

    //アイテムがおちてくるレイヤー
    itemsLayer = cc.Layer.create();
    this.addChild(itemsLayer);



    //ネコを操作するレイヤー
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    cart = cc.Sprite.create(res.cat_png);
    topLayer.addChild(cart, 2);
    cart.setPosition(240, 40);
    this.schedule(this.addItem, 1);

    //カゴ
    kago = cc.Sprite.create(res.basket1_png);
    cart.addChild(kago, -1);
    kago.setPosition(60, 60);

    scorebg = cc.Sprite.create(res.scorebg_png);
    topLayer.addChild(scorebg, 3);
    scorebg.setPosition(415, 25);

    //文字
    label01 = cc.LabelTTF.create("0", "Arial", 40);
    label01.setColor(0,0,0);
    this.addChild(label01); //文字つける時はこっち*/
    label01.setPosition(460, 20);

    label02 = cc.LabelTTF.create(time , "Arial", 70);
    label02.setColor(0,0,0);
    this.addChild(label02); //文字つける時はこっち*/
    label02.setPosition(50, 270);

    //タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);
    //カートの移動のため　Update関数を1/60秒ごと実行させる　
    this.scheduleUpdate();

    //小惑星の生成で追加
    this.schedule(this.addAsteroid, 5.0);
  },

  addItem: function() {
    var item = new Item();

      //カウントダウン終わったら発動
      if(countdown < 1){
    itemsLayer.addChild(item, 1);
  }
  },
  removeItem: function(item) {
    itemsLayer.removeChild(item);
  },
  //カートの移動のため　Update関数を1/60秒ごと実行させる関数
  update: function(dt) {

    if (touching) {
    //touchEnd(ドラックしている位置）とタッチ開始位置の差を計算する
    //そのままだと値が大きすぎるので50で割る
    xSpeed = (touchEnd.getPosition().x - touchOrigin.getPosition().x) / 50;
    //動く丸-タッチした丸/制限
      if (xSpeed > 0) {
        cart.setFlippedX(true);
        kago.setFlippedX(true);
        kago.setPosition(0, 60);
        muki = 1;
      }
      if (xSpeed < 0) {
        cart.setFlippedX(false);
        kago.setFlippedX(false);
        kago.setPosition(60, 60);
        muki = 0;
      }
      cart.setPosition(cart.getPosition().x + xSpeed, cart.getPosition().y);
      wark += 1;
      if(wark == 10 || wark == 30){
        cart.setTexture(res.cat02_png);
      }
      if(wark == 20){
        cart.setTexture(res.cat03_png);

      }
      if(wark == 40){
        cart.setTexture(res.cat_png);
        wark = 0;
      }
    }
    //カウントダウン処理
    if(countdown > -1 ){
    timeY++;
    console.log("みょーん");
      if(timeY == 70){
        console.log(countdown);
        timeY = 0;
        countdown--;
          if(countdown == 3) countdown01.setTexture(res.count02_png);
          if(countdown == 2) countdown01.setTexture(res.count01_png);
          if(countdown == 1) countdown01.setTexture(res.go_png);

      }
    }


    if(countdown < 0){
      //カウントダウン画像消す
      countdown01.setVisible(false);
      
    //制限時間
    timeX++;

    if(timeX == 60){
      time--;
      timeX = 0;
      label02.setString(time);
    }
    if(time == 0){
      cc.director.runScene(new GameStartScene()); //リザルトへ
    }
  }

  },
  //小惑星の生成で追加
addAsteroid: function(event) {
  var asteroid = new Asteroid();
  this.addChild(asteroid);
},
removeAsteroid: function(asteroid) {
  this.removeChild(asteroid);
},
});

var Item = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //ランダムに爆弾と果物を生成する
    if (Math.random() < 0.5) {
      this.initWithFile(res.bug_png);
      this.isBomb = true;
    } else {
      this.initWithFile(res.apple_png);
      this.isBomb = false;
    }
  },
  //アイテムが生成された後、描画されるときに実行
  onEnter: function() {
    this._super();
    //ランダムな位置に
    this.setPosition(Math.random() * 400 + 40, 350);
    //ランダムな座標に移動させる
    var moveAction = cc.MoveTo.create(5, new cc.Point(Math.random() * 400 + 40, -50));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //果物の処理　座標をチェックしてカートの接近したら
    if(muki == 1){
      if (this.getPosition().y < 70 && this.getPosition().y > 60 &&
        Math.abs(this.getPosition().x - (cart.getPosition().x - 30)) < 30 && !this.isBomb) {
          gameLayer.removeItem(this);
          console.log("FRUIT");
          score += 1;
          label01.setString(score);
          audioEngine.playEffect(res.ringo_se);
        }
      }
    else if(muki == 0){
      if (this.getPosition().y < 70 && this.getPosition().y > 60 &&
        Math.abs(this.getPosition().x - (cart.getPosition().x + 30)) < 30 && !this.isBomb) {
          gameLayer.removeItem(this);
          console.log("FRUIT");
          score += 1;
          label01.setString(score);
          audioEngine.playEffect(res.ringo_se);
        }
    }
    //爆弾の処理　座標をチェックしてカートの接近したら　フルーツより爆弾に当たりやすくしている
    if (this.getPosition().y < 60 && Math.abs(this.getPosition().x - cart.getPosition().x) < 25 &&
      this.isBomb) {
      gameLayer.removeItem(this);
      console.log("BOMB");
      score -=10;
      label01.setString(score);
      audioEngine.playEffect(res.kemusi_se);
      //↓■■ねこびっくりけむし
      cart.setTexture(res.musicat_png);

      /*musinekopos = cart.getPosition().x;

      var count = 0;

while(count < 4){
  nekoval = setInterval(function(){
          cart.setPosition(musinekopos + 20, 40);
          nekox = 1;
          console.log("いんたーばる０１");
          clearInterval(nekoval);　//idをclearIntervalで指定している
　　}, 200);

  nekoval = setInterval(function(){
      cart.setPosition(musinekopos + 20, 40);
      console.log("いんたーばる０2");
      clearInterval(nekoval);　//idをclearIntervalで指定している
　　  }, 200);
count++;
}
    cart.setTexture(res.cat_png);*/

    }
    if(score > 100 && score < 200){
      kago.setTexture(res.basket2_png);
    }
    if(score > 200 && score < 300){
      kago.setTexture(res.basket3_png);
    }
    if(score > 300 && score < 400){
      kago.setTexture(res.basket4_png);
    }
    //地面に落ちたアイテムは消去
    if (this.getPosition().y < -30) {
      gameLayer.removeItem(this)
    }
  }
});

//バーチャルアナログパッド用のタッチリスナーの実装
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event) {
    //タッチ開始位置にスプライトを表示させる デカい丸
    touchOrigin = cc.Sprite.create(res.touchorigin_png);
    topLayer.addChild(touchOrigin, 0);
    touchOrigin.setPosition(touch.getLocation().x, touch.getLocation().y);
　　//タッチ位置にドラック用スプライトを表示させる動く丸
    touchEnd = cc.Sprite.create(res.touchend_png);
    topLayer.addChild(touchEnd, 0);
    touchEnd.setPosition(touch.getLocation().x, touch.getLocation().y);
    //タッチしているぞflagをON
    touching = true;
    return true;
  },
  onTouchMoved: function(touch, event) {
    //移動中の指の位置にドラック用スプライトを表示させる
    touchEnd.setPosition(touch.getLocation().x, touchEnd.getPosition().y);
  },
  onTouchEnded: function(touch, event) {
    //タッチ終了のときはスプライトを消す　タッチflagをOFF
    touching = false;
    topLayer.removeChild(touchOrigin);
    topLayer.removeChild(touchEnd);
  }
});

//小惑星クラス
var Asteroid = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.kumo_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(600, Math.random() * 100 + 200);
    var moveAction = cc.MoveTo.create(10, new cc.Point(-100, Math.random() * 100 + 200 ));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
		//画面の外にでた小惑星を消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this);
    }
  }
});
