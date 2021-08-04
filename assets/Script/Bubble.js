cc.Class({
    extends: cc.Component,

    properties: {
        maxTimer:{
            default:null,
            type:Int16Array,
        },
        
        time:{
            default:null,
            type:Int16Array,
        },

        //音效
        audio:{
            default:null,
            type:cc.AudioClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:
    

    onLoad () {
        this.node.opacity=50;
        this.maxTimer=2;
        this.time=-this.maxTimer/2;
        this.registerEvent();
        var blingAction = this.blingAction();
        cc.tween(this.node).then(blingAction).start()

    },

    registerEvent:function(){
        this.node.on('touchstart', this.onEventStart, this);
    },

    onEventStart:function(event){
        this.game.redraw=1;
        this.game.color=this.color;
        this.playAudio();
        //this.node.destroy();
    },

    playAudio:function(){
        cc.audioEngine.playEffect(this.audio, false);
    },

    blingAction:function () {
        // 泡泡变大
        var big = cc.tween().by(0.7, {width:3,height:3}, {easing: 'sineOut'});
        // 下落
        var small = cc.tween().by(0.7, {width:-3,height:-3}, {easing: 'sineIn'});

        // 创建一个缓动，实现泡泡的闪烁效果
        var tween = cc.tween().sequence(big, small)
        // 不断重复
        return cc.tween().repeatForever(tween);
    },

    update (dt) {
        var opacityRatio = - this.time/this.maxTimer;
        var minOpacity = 50;
        this.node.opacity = 255 + Math.floor(opacityRatio * (255 - minOpacity)); 
        this.time+=dt;
        if(this.time>=this.maxTimer){
            this.game.timeupRedraw=1;
        }       
    },
});
