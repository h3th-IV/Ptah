"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[745],{7745:(N,w,a)=>{a.r(w),a.d(w,{WalletWeb3Module:()=>J});var C=a(6895),l=a(4006),B=a(6630),E=a(4550),y=a(3546),A=a(4144),W=a(4859),M=a(7009),u=a(5861),k=a(5376),m=a(328),S=a(6003),p=a(4323),g=a(5159),f=a(2064),T=a(4304),v=a(9978),t=a(4650),x=a(5004),Z=a(9549);function U(o,c){1&o&&(t.TgZ(0,"span"),t._uU(1,"Connect your MetaMask"),t.qZA())}function H(o,c){if(1&o&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.AsE("",e.userData.address.substring(0,6),"...",e.userData.address.slice(-6),"")}}const{ethereum:O}=window,b="0x413744D59d31AFDC2889aeE602636177805Bd7b0";(0,T.j)({autoConnect:!0,provider:(0,S.yl)()});let D=(()=>{class o{constructor(e,n,s){this.keysService=e,this.snackBarHelperService=n,this.changeDetectorRef=s,this.session=!1,this.walletBalance="0",this.myBEEBalance=0,this.inputAmount=null,this.successResponse=!1,this.mintButtonDisabled=!0,this.challengeSolved=!1,this.errorMessage="",this.metamaskAddress=""}ngOnInit(){this.handleAuth(),window.ethereum.on("chainChanged",this.handleChainChanged.bind(this))}handleChainChanged(e){var n=this;return(0,u.Z)(function*(){yield n.handleAuth()})()}depositETH(){var e=this;return(0,u.Z)(function*(){try{const s=new p.Q(window.ethereum).getSigner(),r=new g.CH(b,m.F1,s),i=e.inputAmount.toString();yield(yield r.ethdeposit(e.metamaskAddress,{value:f.parseEther(i)})).wait(),e.getUserEthBalance()}catch(n){e.errorMessage=n.message}})()}withdrawETH(){var e=this;return(0,u.Z)(function*(){try{const s=new p.Q(window.ethereum).getSigner(),r=new g.CH(b,m.F1,s),i=e.inputAmount.toString();yield(yield r.withdraw(f.parseEther(i))).wait(),e.getUserEthBalance()}catch(n){e.errorMessage=n.message}})()}getUserEthBalance(){var e=this;return(0,u.Z)(function*(){try{const s=new p.Q(window.ethereum).getSigner(),i=yield new g.CH(b,m.F1,s).balanceOf(e.metamaskAddress),h=f.formatEther(i);e.walletBalance=h}catch(n){e.errorMessage=n.message}})()}handleAuth(){var e=this;return(0,u.Z)(function*(){var n;try{const{isConnected:s}=(0,v.D0)();if(s&&(yield(0,v.zP)()),!window.ethereum)return void e.snackBarHelperService.open("Please install a Web3 Wallet like Metamask to proceed.","errorBar");const r=yield(0,v.$j)({connector:new T.I});e.metamaskAddress=r.account,e.keysService.walletAddressSend(e.metamaskAddress).subscribe(d=>{d.success&&(e.successResponse=d.status,e.mintButtonDisabled=!0)},d=>{console.error(d)}),e.userData={address:r.account,chain:r.chain.id,network:"evm"},yield O.request({method:"wallet_addEthereumChain",params:[{chainId:"0xaa36a7",chainName:"Sepolia Test Network",nativeCurrency:{name:"SepoliaETH",symbol:"ETH",decimals:18},rpcUrls:["https://ethereum-sepolia.blockpi.network/v1/rpc/public"],blockExplorerUrls:["https://sepolia.etherscan.io/"]}]});const i="11155111",h=String(null===(n=r.chain)||void 0===n?void 0:n.id);r&&h!==i?(e.session=!1,e.snackBarHelperService.open("Please connect to the Sepolia Network","errorBar")):(e.session=!0,e.getUserEthBalance()),e.changeDetectorRef.detectChanges()}catch(s){console.log(s)}})()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(k.t),t.Y36(x.H),t.Y36(t.sBO))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-wallet-web3"]],decls:26,vars:5,consts:[[1,"mat-elevation-z6"],[1,"header_container"],[1,"metamask-button"],["mat-raised-button","","color","accent","type","button",3,"click"],[4,"ngIf"],[1,"confirmation"],["color","accent","appearance","outline",2,"width","100%"],["matInput","","placeholder","Enter ether amount to deposit/withdraw","type","number","id","inputAmount","aria-label","Text field for the withdrawal amount",3,"ngModel","ngModelChange"],[1,"error"],[1,"dwbutton_container"],["type","submit","mat-raised-button","","color","primary","aria-label","Button to deposit",1,"deposit_withdraw_button",3,"click"],["type","submit","mat-raised-button","","color","warning","aria-label","Button to withdraw",1,"deposit_withdraw_button",3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"mat-card",0)(1,"div",1)(2,"h1"),t._uU(3,"Crypto Wallet"),t.qZA(),t.TgZ(4,"div",2)(5,"button",3),t.NdJ("click",function(){return n.handleAuth()}),t.YNc(6,U,2,0,"span",4),t.YNc(7,H,2,2,"span",4),t.qZA()()(),t.TgZ(8,"p")(9,"b")(10,"span"),t._uU(11,"Your Wallet Balance:"),t.qZA(),t.TgZ(12,"span",5),t._uU(13),t.qZA()()(),t.TgZ(14,"div")(15,"mat-form-field",6)(16,"mat-label"),t._uU(17,"Enter amount:"),t.qZA(),t.TgZ(18,"input",7),t.NdJ("ngModelChange",function(r){return n.inputAmount=r}),t.qZA()(),t.TgZ(19,"h5",8),t._uU(20),t.qZA()(),t.TgZ(21,"div",9)(22,"button",10),t.NdJ("click",function(){return n.depositETH()}),t._uU(23," Deposit "),t.qZA(),t.TgZ(24,"button",11),t.NdJ("click",function(){return n.withdrawETH()}),t._uU(25," Withdraw "),t.qZA()()()),2&e&&(t.xp6(6),t.Q6J("ngIf",!n.session),t.xp6(1),t.Q6J("ngIf",n.session),t.xp6(6),t.hij(" ",n.walletBalance," ETH"),t.xp6(5),t.Q6J("ngModel",n.inputAmount),t.xp6(2),t.Oqu(n.errorMessage))},dependencies:[C.O5,l.Fj,l.wV,l.JJ,l.On,W.lW,y.a8,Z.KE,Z.hX,A.Nt],styles:[".header_container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:30px}.dwbutton_container[_ngcontent-%COMP%]{display:flex;gap:12px;justify-content:space-between}mat-card[_ngcontent-%COMP%]{display:block;margin-left:30%;margin-right:30%}mat-form-field[_ngcontent-%COMP%]{padding-top:10px;width:100%}.form-container[_ngcontent-%COMP%]{min-width:350px}.deposit_withdraw_button[_ngcontent-%COMP%]{width:100%}.heading[_ngcontent-%COMP%]{background:rgba(0,0,0,.2);font-size:x-large;justify-content:center;padding:12px 20px}"]}),o})();var I=a(8184);const P=[{path:"",component:D}];let J=(()=>{class o{constructor(e,n){this.configurationService=e,this.overlayContainer=n,e.getApplicationConfiguration().subscribe(s=>{n.getContainerElement().classList.add(s.application.theme+"-theme")})}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(E.e),t.LFG(I.Xj))},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[C.ez,B.Bz.forChild(P),l.u5,l.UX,W.ot,y.QW,A.c,M.ZX]}),o})()}}]);