
// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

console.log(ctx);
const gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'magenta');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.strokeStyle = "white";

class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 5 + 2;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y =this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() *  1 - 0.5;
        this.vy = Math.random() *  1 - 0.5;
        
    }
    draw(context){
        //context.fillStyle = 'hsl(' + this.x * 0.5 + ', 100%, 50%)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        //context.stroke();
    }  
    update(){
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
        this.y += this.vy;

        if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
       
    }
}

class Effect{
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particle = [];
        this.nmberOfParticles = 200;
        this.createParticales();
    }
    
    createParticales(){
       for(let i = 0; i < this.nmberOfParticles; i++){
        this.particle.push(new Particle(this))
       }
    }
    handleParticales(context){
        this.connectParticales(context);
        this.particle.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
        
    }
    connectParticales(context){
        const maxDistance = 100;
        for(let a = 0; a < this.particle.length; a++){
            for(let b = a; b < this.particle.length; b++){
                const dx = this.particle[a].x - this.particle[b].x;
                const dy = this.particle[a].y - this.particle[b].y;
                const distance = Math.hypot(dx, dy);
            if (distance < maxDistance){
                context.save();
                const opacity = 1 - (distance/maxDistance);
                context.globalAlpha = opacity;
                context.beginPath();
                context.moveTo(this.particle[a].x, this.particle[a].y);
                context.lineTo(this.particle[b].x, this.particle[b].y);
                context.stroke();
                context.restore();
            }
            }
        }
           
    }
}
const effect = new Effect(canvas);


function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    effect.handleParticales(ctx);
    requestAnimationFrame(animate);
}
animate();
