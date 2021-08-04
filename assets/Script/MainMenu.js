cc.Class({
    extends: cc.Component,

    properties: {
        instruction:{
            default:null,
            type:cc.Node,
        },
        startbtn:{
            default:null,
            type:cc.Node,
        },
        title:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        //console.log(this.startbtn.x,this.startbtn.y);
        console.log(this.node.width,this.node.height);
        this.instruction.setContentSize(Math.floor(this.node.height/3),Math.floor(this.node.width/4));
        this.instruction.children[0].setContentSize(Math.floor(this.node.height/3),Math.floor(this.node.width/4));
        console.log(this.instruction.width,this.instruction.height);
        this.instruction.setPosition(this.node.width/5,this.node.height/4);
        //this.instruction.setPosition(0,0);
        this.startbtn.setContentSize(Math.floor(this.node.height/3),Math.floor(this.node.width/4));
        this.startbtn.children[0].setContentSize(Math.floor(this.node.height/3),Math.floor(this.node.width/4));
        this.startbtn.setPosition(-this.node.width/5,this.node.height/4);
        //this.startbtn.setPosition(0,0);
        //console.log(this.startbtn.x,this.startbtn.y);
    },

    start () {

    },

    // update (dt) {},
});
