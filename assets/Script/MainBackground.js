// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // background:{
        //     default:null,
        //     type:cc.Node,
        // },

        backgroundImage1:{
            default:null,
            type:cc.SpriteFrame,
        },

        backgroundImage2:{
            default:null,
            type:cc.SpriteFrame,
        },

        // backgroundImage3:{
        //     default:null,
        //     type:cc.SpriteFrame,
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        
        
    },

    start () {
        var i=0;
        this.node.getComponent(cc.Sprite).schedule(function(){
            if(i%2==0){
                this.node.rotation=-100;
            }
            else{
                this.node.rotation=-80;
            }
            i+=1;
            i=i%2;
        },0.7)
    },

    update (dt) {
    },
});
