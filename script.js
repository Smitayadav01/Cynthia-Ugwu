const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),   // el means a top level element in html 
    smooth: true
});

function firstPageAnim(){
    var t = gsap.timeline();

    t.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        delay:-1,
        stagger: .2
    })
    .from("#herofooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
} 

var timeout;

function circleChaptaKaro(){
    // define default scale value
    var xscale = 1;
    var yscale =1; 
    
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        var xdiff = dets.clientX-xprev;
        var ydiff = dets.clientY-yprev;
        
        xscale=gsap.utils.clamp(.8,1.2,xdiff);
        yscale= gsap.utils.clamp(.8,1.2,ydiff);
         
        xprev=dets.clientX;
        yprev=dets.clientY;
        
        circleMouseFollower(xscale,yscale);
        timeout= setTimeout(function(){
        this.document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
         },100);
    });
}

circleChaptaKaro();

function  circleMouseFollower(xscale,yscale){
  window.addEventListener("mousemove",function(dets){
   this.document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  })
}
circleMouseFollower();
firstPageAnim();


document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("mousemove",function(dets){
       var diff= dets.clientY-elem.getBoundingClientRect().top;

        gsap.to(elem.querySelector("img"),{
        opacity:1,
        ease:Power1,
        top:diff,
        left:dets.clientX,
    })
    });
});
