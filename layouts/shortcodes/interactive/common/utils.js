<script>
// 交互式演示公共工具函数

/**
 * 调整Canvas尺寸以适应容器
 * @param {HTMLCanvasElement} canvas - Canvas元素
 */
function resizeCanvas(canvas) {
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

/**
 * 创建并返回Web Worker
 * @param {Function} workerFunction - Worker内部的函数
 * @returns {Worker} 创建的Web Worker
 */
function createWorker(workerFunction) {
  const workerCode = workerFunction.toString();
  const blob = new Blob([
    `(${workerCode})()`
  ], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
}

/**
 * 生成HSL颜色
 * @param {number} index - 颜色索引
 * @param {number} total - 颜色总数
 * @param {number} saturation - 饱和度 (0-100)
 * @param {number} lightness - 亮度 (0-100)
 * @returns {string} HSL颜色字符串
 */
function generateHslColor(index, total, saturation = 70, lightness = 50) {
  const hue = (index * 360 / total) % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * 使用欧几里得距离计算两点之间的距离
 * @param {number[]} point1 - 第一个点的坐标 [x, y]
 * @param {number[]} point2 - 第二个点的坐标 [x, y]
 * @returns {number} 两点之间的距离
 */
function euclideanDistance(point1, point2) {
  return Math.hypot(point1[0] - point2[0], point1[1] - point2[1]);
}

/**
 * 使随机数生成具有可重复性
 * @param {number} seed - 随机种子
 * @returns {Function} 返回一个基于种子的随机数生成函数
 */
function seededRandom(seed = 1) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

/**
 * 为鼠标/触摸事件获取相对于Canvas的坐标
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {MouseEvent|TouchEvent} event - 鼠标或触摸事件
 * @returns {Object} 包含x和y坐标的对象
 */
function getRelativeCoordinates(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const clientX = event.clientX || (event.touches && event.touches[0].clientX);
  const clientY = event.clientY || (event.touches && event.touches[0].clientY);
  
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

/**
 * 创建简单的按钮组
 * @param {string[]} labels - 按钮标签
 * @param {Function[]} callbacks - 按钮回调函数
 * @param {string} containerClass - 容器的CSS类
 * @returns {HTMLElement} 按钮组容器
 */
function createButtonGroup(labels, callbacks, containerClass = 'button-group') {
  const container = document.createElement('div');
  container.className = containerClass;
  
  labels.forEach((label, index) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.className = 'demo-btn';
    button.addEventListener('click', callbacks[index]);
    container.appendChild(button);
  });
  
  return container;
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间(毫秒)
 * @returns {Function} 防抖处理后的函数
 */
function debounce(func, wait = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制(毫秒)
 * @returns {Function} 节流处理后的函数
 */
function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
</script> 