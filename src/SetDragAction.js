class SetDragAction {
  cursorStartX = 0;
  cursorStartY = 0;
  cursorMoveX = 0;
  cursorMoveY = 0;
  targetFirstTop = 0;
  targetFirstLeft = 0;
  ui = null;
  startItems = [];
  moveItmes = [];
  isDown = false;

  option = {
    forcePlaceholderSize: false,
    targetZindex: 100,
    dragstart: (event, obj) => {},
    drag: (event, obj) => {},
    dragchange: (event, obj) => {},
    dragend: (event, obj) => {},
    change: (event, obj) => {}
  }

  constructor(option) {
    this.init(option);
  }

  init = (option) => {
    this.option = {...this.option, ...option};

    this.el = this.option.el;
    this.items = [...this.el.children];

    this.placeHolder = document.createElement(this.items[0].tagName.toLowerCase());
    this.placeHolder.classList.add('sd-placeholder');

    this.el.classList.add('sd-sortable');

    this.el.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  mouseDown = (e) => {
    if(this.items.includes(e.target) === true) {
      this.target = e.target;
    } else {
      return false;
    }

    this.isDown = true;

    this.cursorStartX = e.pageX;
    this.cursorStartY = e.pageY;

    this.targetFirstTop = this.target.offsetTop;
    this.targetFirstLeft = this.target.offsetLeft;

    this.target.insertAdjacentElement('beforeBegin', this.placeHolder);
    this.target.classList.add('sd-target');

    if(this.option.forcePlaceholderSize === true) {
      this.placeHolder.style.width = `${this.target.offsetWidth}px`;
      this.placeHolder.style.height = `${this.target.offsetHeight}px`;
    }

    this.target.style.position = 'absolute';
    this.target.style.zIndex = this.option.targetZindex;
    this.target.style.top = `${this.targetFirstTop}px`;
    this.target.style.left = `${this.targetFirstLeft}px`;

    this.startItems = this.items;
    this.moveItmes = [...this.el.children].filter((el) => !el.className.includes('sd-target')); 

    this.ui = this.getUI();

    if(typeof this.option.dragStart === 'function') {
      this.option.dragStart.call(this, e, this.ui);
    }
  }

  mouseMove = (e) => {
    if(this.isDown === false) {
      return false;
    }

    this.cursorMoveX = e.pageX;
    this.cursorMoveY = e.pageY;

    this.target.style.top = `${this.targetFirstTop + this.cursorMoveY - this.cursorStartY}px`;
    this.target.style.left = `${this.targetFirstLeft + this.cursorMoveX - this.cursorStartX}px`;

    this.items = [...this.el.children].filter((el) => !el.className.includes('sd-target'));

    const distances = this.items.map((item, index) => ({
      index: index,
      distance: Math.abs((item.offsetLeft + item.offsetWidth / 2) - this.cursorMoveX) + Math.abs((item.offsetTop + item.offsetHeight / 2) - this.cursorMoveY)
    })).sort((a, b) => a.distance - b.distance);

    const firstItem = this.items[distances[0].index];
    const secondItem = this.items[distances[1].index];

    const insertPos = this.findInsertPos(firstItem, secondItem);

    if(insertPos.to !== this.placeHolder) {
      insertPos.to.insertAdjacentElement(insertPos.direction, this.placeHolder);
    }

    this.ui = this.getUI();

    if(typeof this.option.drag === 'function') {
      this.option.drag.call(this, e, this.ui);
    }

    if(this.moveItmes.indexOf(this.placeHolder) !== this.items.indexOf(this.placeHolder)) {
      if(typeof this.option.dragChange === 'function') {
        this.option.dragChange.call(this, e, this.ui);
      }

      this.moveItmes = this.items;
    }
  }

  mouseUp = (e) => {
    if(this.isDown === false) {
      return false;
    }

    this.target.style.position = '';
    this.target.style.zIndex = '';
    this.target.style.top = '';
    this.target.style.left = '';
    this.target.classList.remove('sd-target');
    this.placeHolder.insertAdjacentElement('beforebegin', this.target);
    this.el.removeChild(this.placeHolder);

    this.items = [...this.el.children];

    this.ui = this.getUI();

    if(typeof this.option.dragEnd === 'function') {
      this.option.dragEnd.call(this, e, this.ui);
    }

    if(this.startItems.indexOf(this.target) !== this.items.indexOf(this.target)) {
      if(typeof this.option.change === 'function') {
        this.option.change.call(this, e, this.ui);
      }
    }

    this.isDown = false;
  }

  findTo = (first, second) => {
    const firstTop = first.offsetTop;
    const secondTop = second.offsetTop;
    const compareTarget = firstTop < secondTop ? [first, second] : [second, first];
    const topOffset = compareTarget[0].offsetTop;
    const bottomOffset = compareTarget[1].offsetTop;
    const topSize = compareTarget[1].offsetHeight;
    const center = (bottomOffset + topSize - topOffset) / 2;
    const betweenCursor = this.cursorMoveY - topOffset;
    const isSameOffset = topOffset === bottomOffset;
    const isUnderCenter = betweenCursor < center;

    return (isSameOffset ? compareTarget[0] : isUnderCenter) ? compareTarget[0] : compareTarget[1];
  }

  findInsertPos = (first, second) => {
    const firstTop = first.offsetTop;
    const secondTop = second.offsetTop;
    const firstLeft = first.offsetLeft;
    const secondLeft = second.offsetLeft;
    const to = this.findTo(first, second);
    const isSameTop = firstTop === secondTop;
    const isFirstOver = firstLeft < secondLeft;
    const isUnderCenter = this.cursorMoveX < to.offsetLeft + (to.offsetWidth / 2);
    const direction = (isSameTop ? isFirstOver : isUnderCenter) ? 'beforebegin' : 'afterend';

    return {
      to: to,
      direction: direction
    };
  }

  getUI = () => {
    return {
      target: {
        el: this.target,
        offset: {
          top: this.target.offsetTop,
          left: this.target.offsetLeft,
          width: this.target.offsetWidth,
          height: this.target.offsetHeight
        }
      },
      placeholder: {
        el: this.placeHolder,
        offset: {
          top: this.placeHolder.offsetTop,
          left: this.placeHolder.offsetLeft,
          width: this.placeHolder.offsetWidth,
          height: this.placeHolder.offsetHeight
        }
      }
    };
  }

  reflesh = () => {
    this.items = [...this.el.children];
  }
}

exports["default"] = SetDragAction;
module.exports = exports["default"];