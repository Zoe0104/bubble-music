cc.Class({
    extends: cc.Component,

    properties: {
        teddy1:{
            default:null,
            type:cc.SpriteFrame,
        },

        teddy2:{
            default:null,
            type:cc.SpriteFrame,
        },

        i:{
            default:0,
            type:Int16Array,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        //卧槽，tmd，原来getComponents如果传入类型会返回队列，原来在匿名函数里面this不起作用
        var i=0;
        var teddy1=this.teddy1;
        var teddy2=this.teddy2;
        console.log(teddy1);
        this.node.getComponent(cc.Sprite).schedule(function(){
            //console.log(teddy1);
            if(i%2==0){
                console.log(cc.find("Canvas/teddy").getComponents(cc.Sprite)[0].spriteFrame);
                cc.find("Canvas/teddy").getComponents(cc.Sprite)[0].spriteFrame=teddy1;
                console.log(cc.find("Canvas/teddy").getComponents(cc.Sprite)[0].spriteFrame);
                
            }
            else{
                //console.log(cc.find("Canvas/teddy").getComponents(cc.Sprite)[0].spriteFrame);
                cc.find("Canvas/teddy").getComponents(cc.Sprite)[0].spriteFrame=teddy2;
                
            }
            i+=1;
            i=i%2;
        },0.7);
    },

    start () {        

    },

    // update (dt) {},
});
