// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        highestScore:0,

        bluePrefab1:{
            default:null,
            type:cc.Prefab
        },

        redPrefab1:{
            default:null,
            type:cc.Prefab
        },

        greenPrefab1:{
            default:null,
            type:cc.Prefab
        },

        orangePrefab1:{
            default:null,
            type:cc.Prefab
        },

        purplePrefab1:{
            default:null,
            type:cc.Prefab
        },

        //存放泡泡的颜色种类，元素是colorPrefab1
        bubbleType:{
            default:null,
            type:Array
        },

        //存放泡泡的颜色种类，元素是string
        bubbleType:{
            default:null,
            type:String
        },

        //存放当前应该点击的泡泡颜色
        bubblePoint:{
            default:null,
            type:Array
        },

        //中线位置
        middleLine:0,

        //圆圈的半径
        radius:30,

        //半边屏幕中放得下半个圆圈的行数
        rows:10,

        //是否重新生成圆圈的标志
        redraw:0,

        //点击到的泡泡的颜色
        color:"none",

        //应该点击到的泡泡的颜色
        rightColor:"none",

        //记录分数的label
        scoreLabel:{
            default:null,
            type:cc.Label
        },

        //记录最高分的label
        highestScoreLabel:{
            default:null,
            type:cc.Label
        },

        //分数
        score:0,

        //生命值
        heart:0,

        //提示词的label
        hintLabel:{
            default:null,
            type:cc.Label,
        },

        //所有颜色的
        allColors:{
            default:null,
            type:Array
        },

        //游戏结束的提示字
        gameover:{
            default:null,
            type:cc.Node,
        },

        //返回标题的按钮
        backmain:{
            default:null,
            type:cc.Node,
        },

        //重新开始的按钮
        restart:{
            default:null,
            type:cc.Node,
        },

        //所有生命值的图案
        allHeart:{
            default:null,
            type:Array,
        },

        //销毁生命值的下标
        heartIndex:0,

        //空生命值
        emptyHeart:{
            default:null,
            type:cc.SpriteFrame,
        },

        //新纪录提示符
        newRecord:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //确定中线位置
        this.middleLine=Math.floor(this.node.height/2);
        this.radius=Math.floor(this.middleLine/this.rows);

        //记录bubble类型的数组
        this.bubbleType=new Array();
        this.bubbleType[0]=this.bluePrefab1;
        this.bubbleType[1]=this.redPrefab1;
        this.bubbleType[2]=this.greenPrefab1;
        this.bubbleType[3]=this.orangePrefab1;
        this.bubbleType[4]=this.purplePrefab1;

        //记录bubble颜色的数组
        this.bubbleTypeName=new Array();
        this.bubbleTypeName[0]="蓝";
        this.bubbleTypeName[1]="红";
        this.bubbleTypeName[2]="绿";
        this.bubbleTypeName[3]="橙";
        this.bubbleTypeName[4]="紫";

        //所有颜色的rgba值
        this.allColors=new Array();
        this.allColors[0]=new cc.color(79,135,219,177);//蓝色
        this.allColors[1]=new cc.color(182,50,50,168);//红色
        this.allColors[2]=new cc.color(102,170,132,197);//绿色
        this.allColors[3]=new cc.color(231,107,10,232);//橙色
        this.allColors[4]=new cc.color(194,17,228,168);//紫色

        //初始化应当点击的颜色
        var index=Math.floor(Math.random()*this.bubbleTypeName.length);
        this.rightColor=this.bubbleTypeName[index];

        //初始化分数
        this.score=0;
        this.scoreLabel.string="SCORE:"+String(this.score);
        cc.find("Canvas/score").setPosition(Math.floor(-this.node.width/2+this.radius/5),-this.node.height/2+this.radius*1.5);
        cc.find("Canvas/score").setContentSize(Math.floor(this.node.height/2),this.radius/4);
        console.log(Math.floor(this.node.width/4),Math.floor(this.node.width/20)); 

        //初始化最高分
        this.highestScore=parseInt(cc.sys.localStorage.getItem("score"));
        if(Number.isNaN(this.highestScore))
        {
            this.highestScore=0;
        }
        this.highestScoreLabel.string="BEST:"+String(this.highestScore);
        cc.find("Canvas/highestScore").setPosition(Math.floor(-this.node.width/2+this.radius*6/5),-this.node.height/2+this.radius*1.5);
        cc.find("Canvas/highestScore").setContentSize(Math.floor(this.node.height/2),this.radius/4);

        //初始化提示词
        this.hintLabel.string=this.rightColor;
        cc.find("Canvas/hint").color=this.allColors[(index+Math.floor(Math.random()*100))%this.bubbleTypeName.length];
        cc.find("Canvas/hint").setContentSize(Math.floor(this.node.width/4),Math.floor(this.radius*4/3));
        cc.find("Canvas/hint").setPosition(Math.floor(-this.node.width/2+this.radius/3),this.radius*1.5);
        console.log(Math.floor(this.node.width/4),Math.floor(this.node.width/20));

        //初始化小熊
        console.log(cc.find("Canvas/teddy"));
        cc.find("Canvas/teddy").setContentSize(this.radius*2,this.radius*2.7);
        cc.find("Canvas/teddy").setPosition(-this.node.width/2+Math.floor(this.radius/2),0);
        //console.log(cc.find("Canvas/teddy"));

        //初始化分割线的位置和宽度
        cc.find("Canvas/baseline").setContentSize(this.node.height*1.5,this.radius/3);
        cc.find("Canvas/baseline").setPosition(-this.node.width/2+this.radius*2,5);

        //把游戏结束的按钮和提示词藏起来
        this.gameover.setContentSize(this.node.height,this.radius*2.5);
        this.backmain.setContentSize(this.radius*3,this.radius*1.3);
        this.restart.setContentSize(this.radius*3,this.radius*1.3);
        this.newRecord.setContentSize(this.radius*2.4,this.radius*1.3);
        this.gameover.setPosition(this.node.width,0);
        this.backmain.setPosition(this.node.width+this.radius*4,this.radius);
        this.restart.setPosition(this.node.width+this.radius*4,-this.radius);
        this.newRecord.setPosition(this.node.width+this.radius*4,-this.radius);


        //初始化生命值
        this.allHeart=new Array(3);
        this.allHeart[0]=cc.find("Canvas/heart1");
        this.allHeart[1]=cc.find("Canvas/heart2");
        this.allHeart[2]=cc.find("Canvas/heart3");
        var i=0;
        for(i=0;i<3;i++)
        {
            this.allHeart[i].setContentSize(this.radius,this.radius);
            this.allHeart[i].setPosition(Math.floor(-this.node.width/2+this.radius/3),this.node.height/2-this.radius*(i*1.5+1));
        }
        console.log("生命值：");
        console.log(this.allHeart[0]);
        this.drawBubble()
    },

    drawBubble:function(){
        this.spawnNewBubble(0,this.middleLine);
        this.spawnNewBubble(-this.middleLine,0);
    },

    spawnNewBubble:function(ymin,ymax){
        //将半边屏幕划分为刚好放得下1/4个圆圈的几个区域
        var cols=Math.floor(this.node.width/this.radius);
        //var rows=Math.floor(this.middleLine/this.radius);
        var bubblePositions=new Array();
        var i=0;
        var j=0;
        var count=0;
        var index=0;
        for(i=0;i<this.rows;i++){
            bubblePositions[i]=new Array();
            for(j=0;j<cols;j++){
                //记录每个小方格是否被占有，初始时都没有被占用
                bubblePositions[i][j]=0;
            }
        }

        for(count=0;count<this.bubbleType.length;count++){
            //新建一个泡泡对象
            var newBubble=cc.instantiate(this.bubbleType[count]);
            //将该对象加入到子节点中
            this.node.addChild(newBubble);
            //为该泡泡设置位置
            newBubble.setPosition(this.getNewPosition(cols,this.rows,ymin,ymax,bubblePositions));
            //动态设置泡泡的大小
            newBubble.setContentSize((this.radius-5)*2,(this.radius-5)*2);
            //动态设置泡泡上的字的大小（以后可以把字的内容也一起设置了）
            newBubble.children[0].setContentSize(Math.floor(this.radius*2*5/12),Math.floor(this.radius*2/6*5));
            //设置字的内容            
            while(true){
                index=Math.floor(Math.random()*this.bubbleTypeName.length);
                if(index==count){
                    continue;
                }
                else{
                    break;
                }
            }
            newBubble.children[0].getComponent(cc.Label).string=this.bubbleTypeName[index];

            //为泡泡传入game组件
            newBubble.getComponent('Bubble').game=this;
            //设置泡泡的颜色属性
            newBubble.getComponent('Bubble').color=this.bubbleTypeName[count];
        }
    },

    getNewPosition: function(cols,rows,ymin,ymax,bubblePositions){
        var basex=-this.node.width/2;
        var basey=ymin;
        var randx=0;
        var randy=0;
        var flag=1;
        
        while(true){
            randx=Math.floor(Math.random()*cols);
            randy=Math.floor(Math.random()*rows);

            //判断这个坐标是否超出边界
            if(randx==cols-1 || randy==rows-1){flag=0;}
            else if(randx<3 || randy==0){flag=0;}
            else{
                //判断生成的这个坐标是否和已有的坐标冲突
                flag=1;
                if (bubblePositions[randy][randx]==1 ||
                    bubblePositions[randy+1][randx]==1 ||
                    bubblePositions[randy][randx+1]==1 ||
                    bubblePositions[randy+1][randx+1]==1){
                        flag=0;
                    }
                else{
                    bubblePositions[randy][randx]=1;
                    bubblePositions[randy+1][randx]=1;
                    bubblePositions[randy][randx+1]=1;
                    bubblePositions[randy+1][randx+1]=1;
                }
            }
            
            
            if(flag){
                //console.log(randx,randy);
                break;
            }
        }
        //console.log(randx,randy);
        return cc.v2(basex+(randx+1)*this.radius,basey+(randy+1)*this.radius);
    },

    updateHint:function(){
        //更新提示词
        var index=Math.floor(Math.random()*this.bubbleTypeName.length)
        this.rightColor=this.bubbleTypeName[index];
        this.hintLabel.string=this.rightColor;
        cc.find("Canvas/hint").color=this.allColors[(index+Math.floor(Math.random()*100))%this.bubbleTypeName.length];
    },

    destroyBubble:function(){
        //销毁泡泡
        for(let i in this.node.children){
            if (this.node.children[i].name=="bubble-blue" ||
                this.node.children[i].name=="bubble-red" ||
                this.node.children[i].name=="bubble-green"||
                this.node.children[i].name=="bubble-orange"||
                this.node.children[i].name=="bubble-purple"){
                this.node.children[i].destroy();
            }
        }
    },

    gameoverfun:function(){
        //游戏结束逻辑，清空泡泡，显示gameover以及点击屏幕再重新开始
        this.destroyBubble();
        //让早早准备好的gameover和按钮出现
        this.gameover.setPosition(-this.node.width/2+3.5*this.radius,0);
        this.backmain.setPosition(-this.node.width/2+6.5*this.radius,this.radius);
        this.restart.setPosition(-this.node.width/2+6.5*this.radius,-this.radius);
        //处理最高分
        if(this.score>this.highestScore)
        {
            cc.sys.localStorage.setItem("score", this.score.toString());
            this.newRecord.setPosition(-this.node.width/2+5*this.radius,this.radius);
        }
    },

    start () {

    },

    update (dt) {
        if(this.heart>0){        
            if(this.redraw==1){
                if(this.color==this.rightColor){
                    //点击了正确的泡泡，分数增加
                    this.score+=1;
                    this.destroyBubble();
                    this.updateHint();
                    this.redraw=0;
                    this.scoreLabel.string="SCORE: "+String(this.score);
                    this.drawBubble(); 
                }
                else{
                    //泡泡点错了,扣生命值
                    this.heart-=1;
                    this.allHeart[this.heartIndex].getComponent(cc.Sprite).spriteFrame=this.emptyHeart;
                    this.heartIndex+=1;
                    if(this.heart<=0)
                    {
                        this.gameoverfun();
                    }
                    else{
                        this.destroyBubble();
                        this.updateHint();
                        this.redraw=0;
                        this.scoreLabel.string="SCORE: "+String(this.score);
                        this.drawBubble(); 
                    }
                }
                
                
            }
            if(this.timeupRedraw){
                //没有点击泡泡就泡泡消失了,扣生命值
                this.heart-=1;
                this.allHeart[this.heartIndex].getComponent(cc.Sprite).spriteFrame=this.emptyHeart;
                this.heartIndex+=1;
                if(this.heart<=0)
                {
                    this.gameoverfun();
                }
                else{
                    this.destroyBubble();
                    this.updateHint();
                    this.timeupRedraw=0;
                    this.drawBubble(); 
                }
                
            }
        }
    },
});
