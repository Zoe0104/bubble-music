// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        instruction:{
            default:null,
            type:cc.Node,
        },

        startButton:{
            default:null,
            type:cc.Node,
        },
        
    },

    onLoad:function () {
        console.log(this.startButton);
        this.instruction.setContentSize(this.node.width,this.node.width/2);
        this.instruction.setPosition(this.node.width*4/7,this.node.height/2);
        this.startButton.setContentSize(this.node.height/4,this.node.width/4);
        this.startButton.children[0].setContentSize(this.node.height/4,this.node.width/4);
        this.startButton.setPosition(this.node.width/6,0);
    },

    start () {

    },

    // update (dt) {},
});
