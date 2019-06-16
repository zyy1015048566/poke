$(function() {
        let poke=[];
        let colorArr=['s','h','d','c'];
        let flag={};
        while (poke.length<52){
            let index=Math.floor(Math.random()*colorArr.length);
            let color=colorArr[index];
            let number=Math.round(Math.random()*12+1);
            if(!flag[color+'_'+number]){
                poke.push({color,number});
                flag[color+'_'+number]=true;
            }
        }


        let index=-1;
        for(let i=0;i<7;i++){
            for(let j=0;j<=i;j++){
                index++;
                let obj=poke[index];
                let lefts=350-55*i+110*j;
                let tops=50*i;
                $('<div>')
                    .addClass('poke')
                    .css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg)`})
                    .attr({id:i+'_'+j})
                    .appendTo('.box')
                    .data({number:obj.number})
                    .delay(index*30)
                    .animate({left:lefts,top:tops,opacity:1});

            }
        }

        for(;index<52;index++){
            let obj=poke[index];
            let lefts=0;
            $('<div>')
                .addClass('poke')
                .addClass('left')
                .css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg)`})
                .attr({id:-2+'_'+-2})
                .data({number:obj.number})
                .appendTo('.box')
                .delay(index*30)
                .animate({left:lefts,top:476,opacity:1});

        }

        let frist=null;
       $('.box').on('click','.poke',function(){
           let _this=$(this);
           let [i,j]=_this.attr('id').split('_');
           let id1=i*1+1+'_'+j,id2=i*1+1+'_'+(j*1+1);

           if($('#'+id1).length||$('#'+id2).length){
               return;
           }

           if(_this.hasClass('active')){
               $(this).removeClass('active').animate({top:'+=30px'});
           }else{
               $(this).addClass('active').animate({top:'-=30px'});
           }


           if(!frist){
               frist=_this;
           }else{
               let number1=frist.data('number'),number2=_this.data('number');
               let lefts=Math.floor(Math.random()*711);
               let tops=Math.floor(Math.random()*480);
               if(number1 + number2 == 14){
                   $('.active').animate({top:tops,left:lefts,opacity:0},function(){
                       $(this).remove();
                   })
               }else{
                    $('.active').animate({top:'+=30'},function(){
                       $(this).removeClass('active');
                    })
               }

               frist=null
           }

       });

        let n=0;
        $(".rightBtn").on('click',function(){
            $('.left').last().animate({left:'706px',top:476}).css({"z-index":n++}).removeClass('left').addClass('right');
        });
        $(".leftBtn").on('click',function(){
            $('.right').animate({left:'0',top:476}).css({"z-index":1}).addClass('left').removeClass('right');
        })


});