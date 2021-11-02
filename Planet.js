class Planet {
    constructor(radius, distance, orbitspeed, angle, img) {
        this.v = p5.Vector.random3D();

        this.radius = radius;
        this.distance = distance;
        this.v.mult(this.distance);
        this.orbitspeed = orbitspeed;
        this.angle = angle;
        this.planets = [];

        this.texture = img;
    }

    orbit() {
        this.angle += this.orbitspeed;
        for (let i in this.planets) {
            this.planets[i].orbit();
        }
    }

    spawnMoons(total, level) {
        for (let i = 0; i < total; i++) {
            let r = random(this.radius / 2, this.radius / (level * 2));
            let d = random(this.radius + r, (this.radius + r) * 2);
            let o = random(-0.1, 0.1);
            let a = random(TWO_PI);
            let index = int(random(0, textures.length));
            this.planets[i] = new Planet(r / 2, d, o, random(-a, a), textures[index]);
            if (level < 3) {
                let num = Math.floor(random(0, 4));
                this.planets[i].spawnMoons(num, level + 1);
            }
        }
    }

    show() {
        push();
        fill(255);
        noStroke();

        let v2 = createVector(1, 0, 1);
        let p = this.v.cross(v2);

        if (p.x != 0 || p.y != 0 || p.z != 0) {
            rotate(this.angle, p);
        }
        stroke(255);
        /*line(0, 0, 0, this.v.x, this.v.y, this.v.z);
        line(0, 0, 0, p.x, p.y, p.z);*/

        translate(this.v.x, this.v.y, this.v.z);
        noStroke();

        rotate(this.angle);

        texture(this.texture);
        sphere(this.radius)
        for (let i in this.planets) {
            this.planets[i].show();
        }
        pop();
    }
}