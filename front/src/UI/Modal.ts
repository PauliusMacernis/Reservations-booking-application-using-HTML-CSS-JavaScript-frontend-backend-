export class Modal {

  private readonly fallbackText: string;
  private contentTemplateEl: HTMLTemplateElement;
  private modalTemplateEl: HTMLTemplateElement;
  private modalElement: HTMLDivElement|null;
  private backdropElement: HTMLDivElement|null;

  public constructor(contentId: string, fallbackText: string) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId) as HTMLTemplateElement;
    this.modalTemplateEl = document.getElementById('modal-template') as HTMLTemplateElement;
    this.modalElement = null;
    this.backdropElement = null;
  }

  public show(): void {
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true // Make a deep clone of modalTemplateEl
      );
      this.modalElement = modalElements.querySelector('.modal') as HTMLDivElement;
      this.backdropElement = modalElements.querySelector('.backdrop') as HTMLDivElement;
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElement);

      const modalCloseButtonEl = this.modalElement.querySelector('.modal-close-button') as HTMLElement;
      modalCloseButtonEl.addEventListener('click', this.xHandler.bind(this))

      this.backdropElement.addEventListener('click', this.backdropHandler.bind(this));

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }

  private hide(): void {
    if(this.modalElement !== null) {
      document.body.removeChild(this.modalElement); // this.modalElement.remove()
      this.modalElement = null;
    }
    if(this.backdropElement !== null) {
      document.body.removeChild(this.backdropElement);
      this.backdropElement = null;
    }
  }

  private backdropHandler(): void {
    this.hide();
  }

  private xHandler(): void {
    this.hide();
  }
}