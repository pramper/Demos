window.onload = function() {
    renderBg();
    var commander = new Commander();
    buttonHandler(commander);
    animation();
};

function renderBg() {
    var staticCanvas = document.querySelector("#static"),
        dynamicCanvas = document.querySelector("#dynamic"),
        right = document.querySelector("#right");
    //设置画布的大小和父元素相同
    staticCanvas.width = right.offsetWidth;
    staticCanvas.height = right.offsetHeight;
    dynamicCanvas.width = right.offsetWidth;
    dynamicCanvas.height = right.offsetHeight;

    renderStaticCanvas(staticCanvas);
}
/**
 * 通过绑定按钮，模拟指挥官发出命令
 * @param commander
 */
function buttonHandler(commander) {
    var controller = document.querySelector("#controller");
        command = {};
    controller.onclick = function() {
        var target = event.target || window.event.srcElement;
        if(target.tagName.toLowerCase() === "button") {
            command.id = target.parentNode.id;
            command.content = target.dataset.com;
            commander.order(command);
        }
    }
}
function renderStaticCanvas(canvas) {
    var earthImage = new Image(),
        context = canvas.getContext("2d");
    context.strokeStyle = "#ccc";
    context.lineWidth = 2;
    earthImage.src = "./images/earth.png";

    earthImage.onload = function() {
        context.drawImage(this, canvas.width/2-earthImage.width/2, canvas.height/2-earthImage.height/2);
    };
    //画轨道
    for(var i=0; i<4; i++) {
        drawTrack(i*70+100);
    }

    function drawTrack(radius) {
        context.beginPath();
        context.arc(canvas.width/2, canvas.height/2, radius, 0, (Math.PI/180)*360, false);
        context.stroke();
        context.closePath();
    }
}
/**
 * 飞船类
 * @param id：飞船的id
 * @param radius：飞船飞行半径
 * @constructor
 */
var SpaceShip = function(id, radius) {
    this.id = id;
    this.alive = true;
    this.speed = 1.5;
    this.energy = 1000;
    this.state = "stop";//两种状态fly,stop
    this.radius = radius;
    this.angle = 0;
    this.timer = null;
};
SpaceShip.prototype.fly = function() {
    var self = this;
    this.timer = setInterval(function() {
        self.angle -= self.speed;
        if(self.angle === -360) {
            self.angle = 0;
        }
        self.powerManager().discharge();
    }, 20);
};
SpaceShip.prototype.stop = function() {
    var self = this;
    this.timer = setInterval(function() {
        self.powerManager().charge();
    }, 20);

};
/**
 * 能源管理
 * @returns {{charge: charge, discharge: discharge}}
 */
SpaceShip.prototype.powerManager = function() {
    var chargeRate = 5,
        dischargeRate = 2,
        self = this;
    var charge = function() {
        if(self.energy < 1000) {
            self.energy += chargeRate;
        } else{
            clearInterval(self.timer);
        }
    };
    var discharge = function() {
        if(self.energy > 0) {
            self.energy -= dischargeRate;
        } else{
            clearInterval(self.timer);
            self.stop();
        }
    };

    return {
        charge: charge,
        discharge: discharge
    };

};
/**
 * 飞船状态管理
 */
SpaceShip.prototype.stateManager = function() {
    var self = this;
    var states = {
        fly: function() {
            self.state = "fly";
            self.fly();
        },
        stop: function() {
            self.state = "stop";
            self.stop();
        },
        destroySelf: function() {
            console.log("自毁");
        },
        createShip: function() {
            console.log("");
        }
    };

    var changeState = function(stateCom) {
        //根据指令执行相应的状态
        if(self.timer) {
            clearInterval(self.timer);
        }
        states[stateCom]();
    };
    return {
        changeState: changeState
    };
};
SpaceShip.prototype.receiveCom = function(com) {
    if(com.id === this.id) {
        this.stateManager().changeState(com.content);
    }
};
SpaceShip.prototype.drawSelf = function() {
    var shipImage = new Image(),
        dynamicCanvas = document.querySelector("#dynamic"),
        context = dynamicCanvas.getContext("2d"),
        energyBarW = 40,
        energyBarH = 6;
    shipImage.src = "./images/spaceship.png";
    this.image = shipImage;

    return function() {
        context.save();
        //更改画布坐标系，把原点放到轨道种种
        context.translate(dynamicCanvas.width/2, dynamicCanvas.height/2);
        //根据飞行角度，旋转图像
        context.rotate(this.angle*Math.PI/180);
        //画飞船
        context.drawImage(shipImage, this.radius - shipImage.width/2, 0 - shipImage.height/2);
        //绘制能源条边框
        context.beginPath();
        context.strokeStyle = "#ccc";
        context.strokeRect(this.radius-energyBarW/2, -shipImage.height/2-energyBarH,
            energyBarW, energyBarH);
        //填充能源条
        if(this.energy > 800) {
            context.fillStyle = "#0c3";
        } else if(this.energy<=800 && this.energy >300) {
            context.fillStyle = "#f4a460";
        } else {
            context.fillStyle = "#ff3030";
        }
        context.fillRect(this.radius-energyBarW/2, -shipImage.height/2-energyBarH,
            this.energy*energyBarW/1000, energyBarH);
        context.closePath();
        context.restore();
    };
}();

/**
 * 星球上的指挥官
 * @constructor
 */
var Commander = function() {
    this.name = "lin";
};
/**
 * 指挥官给塔台发送命令，塔台接收命令
 * @param command
 */
Commander.prototype.order = function(command) {
    mediator.receiveCom(command);
};
/**
 * 中介：信号塔
 * @constructor
 */
var mediator = function() {
    var ships = {}, options = {},
        commandList = document.querySelector("#command-list"), li;
    /**********新飞船就绪**************/
    options.createShip = function(com) {
        if(ships[com.id]) {
            return;
        }
        noticeShips(com);
        var spaceship = new SpaceShip(com.id, (parseInt(com.id.substr(-1, 1))-1)*70+100);
        spaceship.drawSelf();
        ships[com.id] = spaceship;
    };
    /**********飞船停止************/
    options.stop = function(com) {
        noticeShips(com);
    };
    /***********飞船起飞***************/
    options.fly = function(com) {
        noticeShips(com);
    };
    /****************飞船自毁**************/
    options.destroySelf = function(com) {
        ships[com.id] = null;
        delete ships[com.id];
        noticeShips(com);
        console.log(ships);
    };
    /**************把命令发给每一个飞船************/
    function noticeShips(com) {
        for(var ship in ships) {
            ships[ship].receiveCom(com);
        }
    }
    /**********模拟丢包，并打印指令；返回true表示真的丢包，false表示无丢包*********/
    function packetLost(com) {
        li = document.createElement("li");
        if(Math.random() <= 0.3) {
            li.innerHTML = com.id + "：" + com.content + " failed!";
            li.classList.add("red-font");
            commandList.appendChild(li);
            return true;
        }
        li.innerHTML = com.id + "：" + com.content + " successfully!";
        commandList.appendChild(li);
        return false;
    }
    /************中介信号塔就收命令*************/
    var receiveCom = function(com) {
        if(!packetLost(com)) {
            options[com.content].call(this, com);
        }
    };
    return {
        receiveCom: receiveCom,
        ships: ships
    };
}();

function animation() {
    window.requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame;
    var ships = mediator.ships,
        ship,
        dynamicCanvas = document.querySelector("#dynamic"),
        context = dynamicCanvas.getContext("2d");
    render();
    function render() {
        requestAnimationFrame(render);
        context.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
        for(ship in ships) {
            ships[ship].drawSelf();
        }
    }
}

