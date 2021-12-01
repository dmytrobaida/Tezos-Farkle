(this["webpackJsonptezos-farkle"]=this["webpackJsonptezos-farkle"]||[]).push([[0],{123:function(e,t){},127:function(e,t){},128:function(e,t){},149:function(e,t){},151:function(e,t){},176:function(e,t,n){"use strict";n.r(t);var i,r,c,a,o,s,l=n(0),h=n.n(l),u=n(34),d=n.n(u),f=n(15),b=n(16),p=n(13),j=n(18),m=n(85),x=n(21),g=n.n(x),v=new g.a.Math.RandomDataGenerator,w=function(){function e(t,n,i){var r=this;Object(p.a)(this,e),this.sprite=void 0,this.sprite=t.physics.add.sprite(n,i,"dice"),this.sprite.setInteractive(new g.a.Geom.Rectangle(0,0,100,100),g.a.Geom.Rectangle.Contains),this.sprite.on("pointerover",(function(){r.sprite.alpha=.5})),this.sprite.on("pointerout",(function(){r.sprite.alpha=1}))}return Object(j.a)(e,[{key:"throwDice",value:function(e){var t=v.shuffle([0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4]);t.push(e-1),this.sprite.anims.remove("roll"),this.sprite.anims.create({key:"roll",frames:this.sprite.anims.generateFrameNumbers("dice",{start:0,end:5,frames:t}),frameRate:15}),this.sprite.play("roll")}},{key:"getSprite",value:function(){return this.sprite}}]),e}(),O=function(){function e(){Object(p.a)(this,e),this.dices=[]}return Object(j.a)(e,[{key:"start",value:function(e){var t=this;new g.a.Game({type:g.a.AUTO,parent:e,width:"100",height:"100",physics:{default:"arcade",arcade:{gravity:{y:0}}},scene:{preload:function(){this.load.spritesheet("dice","./images/dice.png",{frameWidth:100,frameHeight:100})},create:function(){var e,n,i=[new w(n=this,400,100),new w(n,500,100),new w(n,600,100),new w(n,700,100),new w(n,800,100)];(e=t.dices).push.apply(e,Object(m.a)(i))}}})}},{key:"throwDices",value:function(e){this.dices.forEach((function(t,n){return t.throwDice(e[n])}))}}]),e}(),k=function(){function e(){Object(p.a)(this,e),this.game=new O}return Object(j.a)(e,[{key:"startGame",value:function(e){this.game.start(e)}},{key:"throwDices",value:function(){var e=[Phaser.Math.Between(1,6),Phaser.Math.Between(1,6),Phaser.Math.Between(1,6),Phaser.Math.Between(1,6),Phaser.Math.Between(1,6)];this.game.throwDices(e)}}]),e}(),y=n(31),z=n.n(y),C=n(46),B=n(6),T=n(49),S=function(){function e(){Object(p.a)(this,e),this.address="",this.balance="",this.connected=!1,this.tezosToolkit=void 0,Object(B.d)(this,{},{autoBind:!0})}return Object(j.a)(e,[{key:"connect",value:function(){var e=Object(C.a)(z.a.mark((function e(){var t,n,i,r=this;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.connected){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,T.a.isAvailable();case 4:return e.sent||alert("Temple Wallet not installed"),t=new T.a("Farkle"),e.next=10,t.connect({name:"Local",rpc:""});case 10:e.next=14;break;case 12:return e.next=14,t.connect("granadanet");case 14:return this.tezosToolkit=t.toTezos(),e.next=17,this.tezosToolkit.wallet.pkh();case 17:return n=e.sent,e.next=20,this.tezosToolkit.tz.getBalance(n);case 20:i=e.sent,Object(B.g)((function(){r.address=n,r.balance=i.toString(),r.connected=t.connected}));case 22:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"callContract",value:function(){var e=Object(C.a)(z.a.mark((function e(){var t,n;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,this.tezosToolkit.wallet.at("");case 3:return t=e.sent,e.next=6,t.methods.increment(5).send();case 6:return n=e.sent,e.next=9,n.confirmation();case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),D=function e(){Object(p.a)(this,e),this.tezosStore=new S,this.gameStore=new k},P=Object(l.createContext)(new D),F=function(){return Object(l.useContext)(P)},M=D,G=n(36),R=b.b.div(i||(i=Object(f.a)(["\n  line-height: 50px;\n  padding: 0 15px 0 15px;\n  color: black;\n  border-radius: 5px;\n  border: 1px solid black;\n  width: auto;\n  background-color: red;\n  text-align: center;\n  cursor: pointer;\n\n  :hover {\n    color: white;\n  }\n"]))),A=n(4),E="gameWindow",I=Object(G.a)((function(){var e=F().gameStore;return Object(l.useEffect)((function(){e.startGame(E)}),[e]),Object(A.jsx)("div",{id:E,style:{width:"100%",height:"100%"}})})),L=b.b.div(r||(r=Object(f.a)(["\n  position: relative;\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n"]))),W=b.b.div(c||(c=Object(f.a)(["\n  cursor: pointer;\n  font-size: 14px;\n  margin-right: 10px;\n\n  :hover {\n    color: red;\n  }\n"]))),J=b.b.div(a||(a=Object(f.a)(["\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  width: 100vw;\n  height: 12vh;\n"]))),H=b.b.div(o||(o=Object(f.a)(["\n  position: relative;\n  width: 80vw;\n  height: 76vh;\n  border: 5px solid white;\n  background-color: grey;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]))),N=Object(G.a)((function(){var e=F(),t=e.tezosStore,n=e.gameStore;return Object(A.jsxs)(L,{children:[Object(A.jsxs)(J,{children:[Object(A.jsxs)(W,{children:["Address: ",t.address]}),Object(A.jsxs)(W,{children:["Balance: ",t.balance]}),Object(A.jsx)(R,{style:{position:"absolute",right:"0"},onClick:t.connect,children:t.connected?"Connected":"Connect"}),t.connected&&Object(A.jsx)(R,{style:{position:"absolute",left:"0"},onClick:t.callContract,children:"Call contract"})]}),Object(A.jsxs)(H,{children:[Object(A.jsx)(I,{}),Object(A.jsx)(R,{style:{position:"absolute",bottom:"10px"},onClick:function(){return n.throwDices()},children:"Roll a dice"})]})]})})),U=Object(b.a)(s||(s=Object(f.a)(["\n  body {\n    margin: 0;\n    font-family: 'Roboto', monospace;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n"]))),q=new M,K=function(){return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(U,{}),Object(A.jsx)(P.Provider,{value:q,children:Object(A.jsx)(N,{})})]})},Q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,179)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),i(e),r(e),c(e),a(e)}))};d.a.render(Object(A.jsx)(h.a.StrictMode,{children:Object(A.jsx)(K,{})}),document.getElementById("root")),Q()},97:function(e,t){},99:function(e,t){}},[[176,1,2]]]);
//# sourceMappingURL=main.3b49d2d6.chunk.js.map