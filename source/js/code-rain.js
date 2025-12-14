/* source/js/code-rain.js */
window.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.id = 'code-rain-canvas';
    
    // --- 样式调整区 ---
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // 【关键】放回背景，因为我们现在有透明墙壁了
    canvas.style.zIndex = '-1'; 
    canvas.style.opacity = '1'; // 背景里的雨可以清楚一点
    
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var width, height;

    // 赛博字体集：加入更多片假名和数学符号，更有科技感
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ<>?:{}|+_)(*&^%$#@!~';
    letters = letters.split('');

    var fontSize = 14; // 字体稍微改小一点，更精致
    var columns;
    var drops = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = width / fontSize;
        drops = [];
        for(var x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    }
    
    initCanvas();

    function draw() {
        // 让拖尾更长一点（0.05 -> 0.03），看起来更丝滑
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; 
        ctx.fillRect(0, 0, width, height);

        // 【关键】改成“赛博冰蓝”，配合你的深色主题
        // 这种颜色 (#00FFFF) 在深黑背景上非常通透
        ctx.fillStyle = '#00FFFF'; 
        
        // 使用 Consolas 等宽字体，更有代码感
        ctx.font = fontSize + 'px Consolas, Monaco, monospace';

        for(var i = 0; i < drops.length; i++) {
            var text = letters[Math.floor(Math.random() * letters.length)];
            
            // 增加一点随机亮度（可选，让雨滴有明暗变化）
            // ctx.globalAlpha = Math.random() * 0.5 + 0.5;

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if(drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);

    window.addEventListener('resize', initCanvas);
};