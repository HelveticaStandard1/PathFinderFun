import {HostListener} from "@angular/core";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from "../socket.service";

@Component({
    selector: 'app-whiteboard',
    templateUrl: './whiteboard.component.html',
    styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit, OnDestroy {

    canvas;
    colors;
    context;
    whiteBoardConnection;
    clearBoardConnection;
    initialBoardStateConnection;
    current = {color: 'black', x: '', y: ''};
    drawing = false;

    constructor(private socketService: SocketService) {
    }

    clearWhiteBoard() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.socketService.emit('clear-drawing', {});
        this.clearWhiteBoard();
    }

    drawLine(x0, y0, x1, y1, color, emit) {
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.strokeStyle = color;
        if (color === 'white') {
            this.context.lineWidth = 20;
        } else {
            this.context.lineWidth = 2;
        }
        this.context.stroke();
        this.context.closePath();

        if (!emit) {
            return;
        }
        const w = this.canvas.width;
        const h = this.canvas.height;

        this.socketService.emit('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color,
            canvas: this.canvas.toDataURL()
        });
    }

    onMouseDown(e) {
        this.drawing = true;
        this.current.x = e.clientX;
        this.current.y = e.clientY;
    }

    onTouchStart(e) {
        if (e.target === this.canvas) {
            e.preventDefault();
        }
        this.onMouseDown(this.getTouchPos(this.canvas, e));
    }

    onMouseUp(e) {
        if (!this.drawing) {
            return;
        }
        this.drawing = false;
        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
    }

    onTouchEnd(e) {
        if (e.target === this.canvas) {
            e.preventDefault();
        }
        this.onMouseUp(this.getTouchPos(this.canvas, e));
    }

    onMouseMove(e) {
        if (!this.drawing) {
            return;
        }
        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
        this.current.x = e.clientX;
        this.current.y = e.clientY;
    }

    onTouchMove(e) {
        if (e.target === this.canvas) {
            e.preventDefault();
        }
        this.onMouseMove(this.getTouchPos(this.canvas, e));
    }

    onColorUpdate(e) {
        this.current.color = e.target.className.split(' ')[1];
    }

    throttle(callback, delay) {
        let previousCall = new Date().getTime();
        return function () {
            const time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    getTouchPos(canvasDom, touchEvent) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            clientX: touchEvent.touches[0].clientX - rect.left,
            clientY: touchEvent.touches[0].clientY - rect.top
        };
    }

    drawCurrentState(canvasUrl) {
        const img = new Image;
        const context = this.context;
        img.onload = function() {
            context.drawImage(img, 0, 0);
        };
        img.src = canvasUrl;
    }

    @HostListener("window:resize", [])
    onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    onDrawingEvent(data) {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, false);
    }

    ngOnInit() {
        this.canvas = document.getElementsByClassName('whiteboard')[0];
        this.colors = document.getElementsByClassName('color');
        this.context = this.canvas.getContext('2d');

        this.whiteBoardConnection = this.socketService.getUpdateBoard().subscribe(data => {
            this.onDrawingEvent(data);
        });

        this.clearBoardConnection = this.socketService.getWhiteBoardClear().subscribe(data => {
            this.clearWhiteBoard();
        });

        this.initialBoardStateConnection = this.socketService.getWhiteBoardState().subscribe(data => {
            this.drawCurrentState(data[0].canvasUrl);
        });

        this.socketService.emit('get-drawing', {});

        this.onResize();
    }

    ngOnDestroy() {
        this.whiteBoardConnection.unsubscribe();
        this.clearBoardConnection.unsubscribe();
        this.initialBoardStateConnection.unsubscribe();
    }

}
