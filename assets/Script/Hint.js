// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        var blingAction = this.blingAction();
        cc.tween(this.node).then(blingAction).start()
    },

    blingAction:function () {
        // 泡泡变大
        var big = cc.tween().by(0.4, {width:3,height:3}, {easing: 'sineOut'});
        // 下落
        var small = cc.tween().by(0.4, {width:-3,height:-3}, {easing: 'sineIn'});

        // 创建一个缓动，实现泡泡的闪烁效果
        var tween = cc.tween().sequence(big, small)
        // 不断重复
        return cc.tween().repeatForever(tween);
    },

    start () {

    },

    // update (dt) {},
});
