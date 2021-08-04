cc.Class({
    extends: cc.Component,

    properties: {
        baseline:{
            default:null,
            type:cc.SpriteFrame,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //卧槽，tmd，原来getComponents如果传入类型会返回队列，原来在匿名函数里面this不起作用
        var i=0;
        var baseline=this.baseline;
        this.node.getComponent(cc.Sprite).schedule(function(){
            //console.log(teddy1);
            if(i%2==0){
                var nowp=new cc.Vec2();
                nowp=cc.find("Canvas/baseline").getPosition();
                cc.find("Canvas/baseline").setPosition(nowp.x,40);
                
            }
            else{
                var nowp=new cc.Vec2();
                nowp=cc.find("Canvas/baseline").getPosition();
                cc.find("Canvas/baseline").setPosition(nowp.x,0);
                
            }
            i+=1;
            i=i%2;
        },0.7);
    },

    start () {

    },

    // update (dt) {},
});
