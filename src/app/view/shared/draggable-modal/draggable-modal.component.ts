import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

let highestZIndex = 1050;

@Component({
  standalone: false,
  selector: 'app-draggable-modal',
  templateUrl: './draggable-modal.component.html',
  styleUrls: ['./draggable-modal.component.css']
})
export class DraggableModalComponent implements AfterViewInit, OnDestroy {
  @Input() title: string = 'Painel';
  @Input() isOpen: boolean = false;
  @Input() showFooter: boolean = false;
  @Input() initialTop: number = 100;
  @Input() initialLeft: number = 100;

  @Output() isOpenChange = new EventEmitter<boolean>();

  @ViewChild('modalDialog') modalDialog!: ElementRef<HTMLDivElement>;
  @ViewChild('modalHeader') modalHeader!: ElementRef<HTMLDivElement>;

  public zIndex: number = highestZIndex;
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  private mouseMoveListener?: (e: MouseEvent) => void;
  private mouseUpListener?: () => void;

  ngAfterViewInit(): void {
    const dialogEl = this.modalDialog.nativeElement;
    dialogEl.style.top = `${this.initialTop}px`;
    dialogEl.style.left = `${this.initialLeft}px`;

    const headerEl = this.modalHeader.nativeElement;
    headerEl.addEventListener('mousedown', (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('btn-close')) return;

      this.bringToFront();
      this.isDragging = true;
      const rect = dialogEl.getBoundingClientRect();

      this.offsetX = e.clientX - rect.left;
      this.offsetY = e.clientY - rect.top;

      this.mouseMoveListener = (evt: MouseEvent) => this.onMouseMove(evt);
      this.mouseUpListener = () => this.onMouseUp();

      document.addEventListener('mousemove', this.mouseMoveListener);
      document.addEventListener('mouseup', this.mouseUpListener);
    });
  }

  @HostListener('mousedown')
  bringToFront(): void {
    highestZIndex++;
    this.zIndex = highestZIndex;
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;
    const dialogEl = this.modalDialog.nativeElement;
    dialogEl.style.left = `${e.clientX - this.offsetX}px`;
    dialogEl.style.top = `${e.clientY - this.offsetY}px`;
  }

  private onMouseUp(): void {
    this.isDragging = false;
    if (this.mouseMoveListener) document.removeEventListener('mousemove', this.mouseMoveListener);
    if (this.mouseUpListener) document.removeEventListener('mouseup', this.mouseUpListener);
  }

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  ngOnDestroy(): void {
    this.onMouseUp();
  }
}
